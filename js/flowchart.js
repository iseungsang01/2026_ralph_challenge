// flowchart.js — 시계열 계보도(SVG) 렌더러. 외부 라이브러리 없음.
// window.AITLChart.render(sectorId) → SVG 마크업 문자열
(function () {
  "use strict";

  const YEAR_MIN = 2012, YEAR_MAX = 2026;
  const YEAR_W = 116;          // 1년의 가로 폭(px)
  const NODE_W = 158, NODE_H = 52;
  const LANE_H = 76;           // 레인 세로 간격
  const PAD_L = 16, PAD_T = 38, PAD_B = 18, GAP = 16;

  // 차트 노드용 짧은 라벨: 괄호 안 영문 병기를 떼어내 잘림을 줄인다.
  const shortName = (s) => {
    const base = String(s).replace(/\s*[（(].*$/, "").trim() || String(s);
    return base.length > 15 ? base.slice(0, 14) + "…" : base;
  };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // date("YYYY-MM") → 연 단위 실수 시각. 월이 없으면 연 중간(0.45)에 배치해 눈금과 겹침을 줄인다.
  function timeOf(item) {
    const m = /^(\d{4})-(\d{2})$/.exec(item.date || "");
    if (m) return Number(m[1]) + (Number(m[2]) - 1) / 12;
    return item.year + 0.45;
  }
  const xOf = (t) => PAD_L + (t - YEAR_MIN) * YEAR_W;

  function sectorOf(id) {
    return window.AITL.sectors.find((s) => s.id === id) || { color: "#888", name_ko: id };
  }

  function render(sectorId) {
    const all = window.AITL.items;
    const byId = new Map(all.map((i) => [i.id, i]));
    const own = all.filter((i) => i.sector === sectorId || (i.also_in || []).includes(sectorId));
    const shown = new Map(own.map((i) => [i.id, i]));

    // ghost: 이 섹터 노드가 계승하는 타 섹터 노드 (POLICY §6)
    const ghosts = [];
    for (const it of own) {
      for (const ref of it.evolves_from || []) {
        if (!shown.has(ref) && byId.has(ref)) {
          shown.set(ref, byId.get(ref));
          ghosts.push(ref);
        }
      }
    }
    const nodes = [...shown.values()].sort((a, b) => timeOf(a) - timeOf(b) || a.id.localeCompare(b.id));
    if (!nodes.length) return '<p class="chart-hint">이 섹터에는 아직 노드가 없다.</p>';

    // 이 섹터의 실제 연도 범위로 축을 크롭해 앞쪽 빈 공간을 없앤다 (잘림감 완화)
    const yMin = Math.floor(Math.min(...nodes.map(timeOf)));
    const yMax = Math.min(YEAR_MAX, Math.ceil(Math.max(...nodes.map(timeOf))));
    const xOf = (t) => PAD_L + (t - yMin) * YEAR_W;   // 지역 xOf가 바깥 것을 가린다

    // 동시점 부모-자식은 부모가 먼저 오도록 안정화 (레인 배정이 부모 우선이 되게)
    for (let pass = 0; pass < nodes.length; pass++) {
      let swapped = false;
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        if (timeOf(a) === timeOf(b) && (a.evolves_from || []).includes(b.id)) {
          nodes[i] = b; nodes[i + 1] = a; swapped = true;
        }
      }
      if (!swapped) break;
    }

    // ---- 레인 배정: 같은 계보는 같은 레인 유지, 분기·충돌 시 새 레인 ----
    const laneEnd = [];               // lane → 마지막 노드의 끝 x
    const pos = new Map();            // id → {x, y, lane}
    const laneOf = new Map();
    for (const it of nodes) {
      const x = xOf(timeOf(it));
      let lane = -1;
      for (const ref of it.evolves_from || []) {
        if (laneOf.has(ref)) {
          const pl = laneOf.get(ref);
          if (laneEnd[pl] + GAP <= x) { lane = pl; break; }   // 부모 레인이 비어 있으면 계승
        }
      }
      if (lane < 0) {
        for (let l = 0; l < laneEnd.length; l++) {
          if (laneEnd[l] + GAP <= x) { lane = l; break; }
        }
      }
      if (lane < 0) { lane = laneEnd.length; laneEnd.push(-Infinity); }
      laneEnd[lane] = x + NODE_W;
      laneOf.set(it.id, lane);
      pos.set(it.id, { x, y: PAD_T + lane * LANE_H, lane });
    }

    const W = xOf(yMax + 1) + PAD_L;
    const H = PAD_T + laneEnd.length * LANE_H + PAD_B;
    const out = [];
    out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sectorOf(sectorId).name_ko)} 계보도">`);
    out.push('<defs><marker id="fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a8b3c2"/></marker></defs>');

    // 연도 축
    out.push('<g class="fc-axis">');
    for (let y = yMin; y <= yMax; y++) {
      const gx = xOf(y);
      out.push(`<line x1="${gx}" y1="${PAD_T - 8}" x2="${gx}" y2="${H - PAD_B}"/>`);
      out.push(`<text x="${gx + 4}" y="${PAD_T - 14}">${y}</text>`);
    }
    out.push("</g>");

    // 엣지 (노드 아래에 깔리도록 먼저)
    for (const it of nodes) {
      const p = pos.get(it.id);
      for (const ref of it.evolves_from || []) {
        const q = pos.get(ref);
        if (!q) continue;
        const ghost = ghosts.includes(ref) ? " ghost-edge" : "";
        const x1 = q.x + NODE_W, y1 = q.y + NODE_H / 2;
        const x2 = p.x, y2 = p.y + NODE_H / 2;
        if (x2 >= x1 + 4) {
          const mx = (x1 + x2) / 2;
          out.push(`<path class="fc-edge${ghost}" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" marker-end="url(#fc-arrow)"/>`);
        } else {
          // 같은 시점(가로 겹침): 부모 아래/위 변에서 자식으로 세로 연결
          const down = p.y > q.y;
          const sx = q.x + NODE_W / 2, sy = down ? q.y + NODE_H : q.y;
          const ex = p.x + NODE_W / 2, ey = down ? p.y : p.y + NODE_H;
          const my = (sy + ey) / 2;
          out.push(`<path class="fc-edge${ghost}" d="M${sx},${sy} C${sx},${my} ${ex},${my} ${ex},${ey}" marker-end="url(#fc-arrow)"/>`);
        }
      }
    }

    // 노드
    const tint = (hex, a) => { // hex + 알파(0~1) → rgba
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    };
    for (const it of nodes) {
      const p = pos.get(it.id);
      const isGhost = ghosts.includes(it.id);
      const shared = !isGhost && it.sector !== sectorId;      // also_in으로 공동 노출된 노드
      const color = sectorOf(it.sector).color;
      const major = it.tier === "major";
      const name = shortName(it.name_ko);
      const cls = `fc-node tier-${it.tier}${isGhost ? " ghost" : ""}`;
      const fill = isGhost ? "#fafbfc" : major ? tint(color, 0.1) : "#fff";
      const tx = p.x + (major && !isGhost ? 14 : 12);
      out.push(`<g class="${cls}" data-item="${esc(it.id)}" tabindex="0" role="link" aria-label="${esc(it.name_ko)} 상세 보기">`);
      out.push(`<title>${esc(it.name_ko)} (${it.year}) — ${esc(it.oneliner)}</title>`);
      out.push(`<rect x="${p.x}" y="${p.y}" width="${NODE_W}" height="${NODE_H}" rx="10" fill="${fill}" stroke="${color}" stroke-width="${major ? 2 : 1.3}"${isGhost ? ' stroke-dasharray="5 4"' : ''}/>`);
      // 왼쪽 색 스트라이프 (major 강조)
      if (major && !isGhost) out.push(`<rect x="${p.x}" y="${p.y}" width="4" height="${NODE_H}" rx="2" fill="${color}"/>`);
      out.push(`<text class="fc-name" x="${tx}" y="${p.y + 22}" fill="${major ? color : '#1c2330'}" font-weight="${major ? 700 : 600}">${esc(name)}</text>`);
      const sub = isGhost ? `${it.year} · ${esc(sectorOf(it.sector).name_ko)}` : `${it.year}${major ? " · 주요" : ""}`;
      out.push(`<text class="fc-year" x="${tx}" y="${p.y + 40}">${esc(sub)}</text>`);
      if (shared) {
        out.push(`<rect x="${p.x + NODE_W - 42}" y="${p.y - 9}" width="38" height="17" rx="8.5" fill="#1f6b45"/>`);
        out.push(`<text class="fc-badge" x="${p.x + NODE_W - 34}" y="${p.y + 3.5}">공동</text>`);
      }
      out.push("</g>");
    }
    out.push("</svg>");
    return out.join("");
  }

  // 상세 페이지용 미니 계보도: 직전 계보 → 현재 → 다음 계보를 가로로
  function miniLineage(itemId) {
    const all = window.AITL.items;
    const byId = new Map(all.map((i) => [i.id, i]));
    const cur = byId.get(itemId);
    if (!cur) return "";
    const parents = (cur.evolves_from || []).map((p) => byId.get(p)).filter(Boolean);
    const children = all.filter((c) => (c.evolves_from || []).includes(itemId));
    if (!parents.length && !children.length) return "";

    const NW = 132, NH = 40, GAPX = 44, GAPY = 10;
    const cols = [parents, [cur], children];
    const maxRows = Math.max(1, ...cols.map((c) => c.length));
    const W = cols.length * NW + (cols.length - 1) * GAPX + 4;
    const H = maxRows * (NH + GAPY) + 6;
    const colX = (ci) => 2 + ci * (NW + GAPX);
    const rowY = (n, ci) => {
      const arr = cols[ci];
      const total = arr.length * NH + (arr.length - 1) * GAPY;
      const top = (H - total) / 2;
      return top + n * (NH + GAPY);
    };

    const out = [`<div class="mini-lineage"><div class="ml-label">계보 흐름 — 이 모델의 앞뒤</div>`];
    out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
    // 엣지: parents → cur, cur → children
    const curX = colX(1), curY = rowY(0, 1);
    parents.forEach((p, i) => {
      const x1 = colX(0) + NW, y1 = rowY(i, 0) + NH / 2;
      const x2 = curX, y2 = curY + NH / 2, mx = (x1 + x2) / 2;
      out.push(`<path class="ml-edge" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}"/>`);
    });
    children.forEach((c, i) => {
      const x1 = curX + NW, y1 = curY + NH / 2;
      const x2 = colX(2), y2 = rowY(i, 2) + NH / 2, mx = (x1 + x2) / 2;
      out.push(`<path class="ml-edge" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}"/>`);
    });
    // 노드
    const drawNode = (it, ci, ri, isCur) => {
      const x = colX(ci), y = rowY(ri, ci);
      const nm = it.name_ko.length > 12 ? it.name_ko.slice(0, 11) + "…" : it.name_ko;
      const g = isCur
        ? `<g class="ml-node cur">`
        : `<g class="ml-node" data-item="${esc(it.id)}" tabindex="0" role="link" aria-label="${esc(it.name_ko)} 상세">`;
      out.push(g);
      out.push(`<title>${esc(it.name_ko)} (${it.year})</title>`);
      out.push(`<rect class="ml-box" x="${x}" y="${y}" width="${NW}" height="${NH}" rx="9"/>`);
      out.push(`<text x="${x + NW / 2}" y="${y + 17}" text-anchor="middle">${esc(nm)}</text>`);
      out.push(`<text x="${x + NW / 2}" y="${y + 31}" text-anchor="middle" fill="#8a94a3" font-size="10">${it.year}</text>`);
      out.push(`</g>`);
    };
    parents.forEach((p, i) => drawNode(p, 0, i, false));
    drawNode(cur, 1, 0, true);
    children.forEach((c, i) => drawNode(c, 2, i, false));
    out.push("</svg></div>");
    return out.join("");
  }

  // 구조 도식: 위→아래 파이프라인. steps 각 원소는 문자열 | {label,sub,accent} | [배열=병렬 행]
  function diagram(spec) {
    if (!spec || !Array.isArray(spec.steps) || !spec.steps.length) return "";
    const BW_MIN = 122, BH = 46, BH_SUB = 56, ROW_GAP = 34, COL_GAP = 16, PAD = 8;
    const norm = (b) => (typeof b === "string" ? { label: b } : b || {});
    const boxW = (b) => {
      const n = norm(b);
      const labLen = (n.label || "").length * 8.6;
      const subLen = (n.sub || "").length * 6.4;   // sub는 폰트가 더 작다
      return Math.max(BW_MIN, Math.min(320, Math.max(labLen, subLen) + 26));
    };
    const boxH = (b) => (norm(b).sub ? BH_SUB : BH);
    const rows = spec.steps.map((s) => (Array.isArray(s) ? s.map(norm) : [norm(s)]));

    let maxRowW = 0;
    const rowW = rows.map((r) => {
      const w = r.reduce((a, b) => a + boxW(b), 0) + (r.length - 1) * COL_GAP;
      maxRowW = Math.max(maxRowW, w); return w;
    });
    const rowH = rows.map((r) => Math.max(...r.map(boxH)));
    const W = maxRowW + PAD * 2;
    let H = PAD; rowH.forEach((h, i) => { H += h + (i < rows.length - 1 ? ROW_GAP : 0); }); H += PAD;

    const out = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">`];
    out.push('<defs><marker id="dg-ar" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9aa4b3"/></marker></defs>');
    let y = PAD;
    const rowMid = [];
    rows.forEach((r, ri) => {
      const h = rowH[ri];
      let x = PAD + (maxRowW - rowW[ri]) / 2;
      rowMid.push({ topY: y, botY: y + h });
      for (const b of r) {
        const w = boxW(b), by = y + (h - boxH(b)) / 2;
        out.push(`<g class="dg-box${b.accent ? " accent" : ""}">`);
        out.push(`<rect x="${x}" y="${by}" width="${w}" height="${boxH(b)}" rx="9"/>`);
        if (b.sub) {
          out.push(`<text class="dg-label" x="${x + w / 2}" y="${by + 22}" text-anchor="middle">${esc(b.label)}</text>`);
          out.push(`<text class="dg-sub" x="${x + w / 2}" y="${by + 40}" text-anchor="middle">${esc(b.sub)}</text>`);
        } else {
          out.push(`<text class="dg-label" x="${x + w / 2}" y="${by + boxH(b) / 2 + 5}" text-anchor="middle">${esc(b.label)}</text>`);
        }
        out.push(`</g>`);
        x += w + COL_GAP;
      }
      y += h + ROW_GAP;
    });
    // 세로 화살표 (행 중앙 사이)
    const cx = PAD + maxRowW / 2;
    for (let i = 0; i < rows.length - 1; i++) {
      out.push(`<path class="dg-arrow" d="M${cx},${rowMid[i].botY} L${cx},${rowMid[i + 1].topY}" marker-end="url(#dg-ar)"/>`);
    }
    out.push("</svg>");
    const cap = spec.caption ? `<div class="fig-cap">${esc(spec.caption)}</div>` : "";
    const note = spec.note ? `<div class="fig-legend">${esc(spec.note)}</div>` : "";
    return `<div class="detail-figure">${cap}<div class="fig-scroll">${out.join("")}</div>${note}</div>`;
  }

  window.AITLChart = { render, miniLineage, diagram };
})();
