// flowchart.js — 시계열 계보도(SVG) 렌더러. 외부 라이브러리 없음.
// window.AITLChart.render(sectorId) → SVG 마크업 문자열
(function () {
  "use strict";

  const YEAR_MIN = 2012, YEAR_MAX = 2026;
  const YEAR_W = 108;          // 1년의 가로 폭(px)
  const NODE_W = 150, NODE_H = 46;
  const LANE_H = 66;           // 레인 세로 간격
  const PAD_L = 16, PAD_T = 34, PAD_B = 16, GAP = 14;

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

    const W = xOf(YEAR_MAX + 1) + PAD_L;
    const H = PAD_T + laneEnd.length * LANE_H + PAD_B;
    const out = [];
    out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sectorOf(sectorId).name_ko)} 계보도">`);
    out.push('<defs><marker id="fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a8b3c2"/></marker></defs>');

    // 연도 축
    out.push('<g class="fc-axis">');
    for (let y = YEAR_MIN; y <= YEAR_MAX; y++) {
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
    for (const it of nodes) {
      const p = pos.get(it.id);
      const isGhost = ghosts.includes(it.id);
      const shared = !isGhost && it.sector !== sectorId;      // also_in으로 공동 노출된 노드
      const color = sectorOf(it.sector).color;
      const name = it.name_ko.length > 14 ? it.name_ko.slice(0, 13) + "…" : it.name_ko;
      const cls = `fc-node tier-${it.tier}${isGhost ? " ghost" : ""}`;
      out.push(`<g class="${cls}" data-item="${esc(it.id)}" tabindex="0" role="link" aria-label="${esc(it.name_ko)} 상세 보기">`);
      out.push(`<title>${esc(it.name_ko)} (${it.year}) — ${esc(it.oneliner)}</title>`);
      out.push(`<rect x="${p.x}" y="${p.y}" width="${NODE_W}" height="${NODE_H}" rx="8" stroke="${color}"/>`);
      out.push(`<text class="fc-name" x="${p.x + 10}" y="${p.y + 19}">${esc(name)}</text>`);
      const sub = isGhost ? `${it.year} · ${esc(sectorOf(it.sector).name_ko)}` : String(it.year);
      out.push(`<text class="fc-year" x="${p.x + 10}" y="${p.y + 36}">${sub}</text>`);
      if (shared) {
        out.push(`<rect x="${p.x + NODE_W - 40}" y="${p.y - 8}" width="36" height="16" rx="8" fill="#1f6b45"/>`);
        out.push(`<text class="fc-badge" x="${p.x + NODE_W - 33}" y="${p.y + 4}">공동</text>`);
      }
      out.push("</g>");
    }
    out.push("</svg>");
    return out.join("");
  }

  window.AITLChart = { render };
})();
