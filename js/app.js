// app.js — 해시 라우터 + 뷰 렌더링 (홈 / 섹터 flow chart / 상세 / 404)
(function () {
  "use strict";

  const AITL = window.AITL;
  const $main = document.getElementById("main");
  const $nav = document.getElementById("sector-nav");
  const $sidebar = document.getElementById("sidebar");
  const $dim = document.getElementById("drawer-dim");
  const $menuBtn = document.getElementById("menu-btn");

  const LEVELS = [
    { key: "intro", label: "입문" },
    { key: "mid", label: "중급" },
    { key: "deep", label: "심화" },
  ];
  const LEVEL_KEY = "aitl_level";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const byId = () => new Map(AITL.items.map((i) => [i.id, i]));
  const sectorOf = (id) => AITL.sectors.find((s) => s.id === id);
  const countOf = (sid) =>
    AITL.items.filter((i) => i.sector === sid || (i.also_in || []).includes(sid)).length;

  // 2012 이전 필수 배경 — 정적 프리퀄 블록 (POLICY §12, 상세 페이지 없음)
  const PREQUELS = [
    { name: "퍼셉트론(Perceptron)", year: "1958", desc: "가중치 합으로 이진 분류를 학습하는 최초의 인공 뉴런 모델이다." },
    { name: "역전파(Backpropagation)", year: "1986", desc: "오차를 출력에서 입력 방향으로 전파해 다층 신경망을 학습시키는 알고리즘이다." },
    { name: "LSTM", year: "1997", desc: "게이트로 정보 흐름을 제어해 긴 시퀀스의 기억을 유지하는 순환 신경망 구조다." },
    { name: "ImageNet 데이터셋", year: "2009", desc: "1,400만 장 규모의 이미지 분류 데이터셋으로, 딥러닝 부흥의 무대가 됐다." },
    { name: "GPU 범용 연산", year: "2000년대 후반", desc: "그래픽 프로세서의 병렬 연산을 신경망 학습에 활용하는 기반이 마련됐다." },
  ];

  // ---- 사이드바 ----
  function renderNav(activeSector) {
    $nav.innerHTML = AITL.sectors
      .slice().sort((a, b) => a.order - b.order)
      .map((s) => `<li><a href="#/sector/${s.id}" class="${s.id === activeSector ? "active" : ""}" style="--c:${s.color}">
        <span class="nav-dot" style="background:${s.color}"></span>${esc(s.name_ko)}
        <span class="nav-count">${countOf(s.id)}</span></a></li>`)
      .join("");
  }

  function closeDrawer() { $sidebar.classList.remove("open"); $dim.hidden = true; }
  $menuBtn.addEventListener("click", () => {
    const open = $sidebar.classList.toggle("open");
    $dim.hidden = !open;
  });
  $dim.addEventListener("click", closeDrawer);
  $nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeDrawer(); });

  // ---- 뷰: 홈 ----
  function viewHome() {
    document.title = "AI 발전 흐름 by Sector";
    const sectors = AITL.sectors.slice().sort((a, b) => a.order - b.order)
      .map((s) => `<a class="card sector-card" href="#/sector/${s.id}" style="--c:${s.color}">
        <span class="cnt">${countOf(s.id)}</span><b>${esc(s.name_ko)}</b>
        <span class="en">${esc(s.name_en)}</span></a>`)
      .join("");
    const prequels = PREQUELS.map((p) => `<div class="card prequel-card">
      <b>${esc(p.name)} <span style="font-weight:400;color:var(--muted)">· ${esc(p.year)}</span></b>
      <span>${esc(p.desc)}</span></div>`).join("");
    const totalNodes = AITL.items.length;
    $main.innerHTML = `
      <div class="home-hero">
        <h1 class="home-title">AI 발전 흐름 <span class="accent">by Sector</span></h1>
        <p class="home-desc">2012년 AlexNet부터 2026년까지, AI의 발전사를 9개 기술 섹터의
        시계열 계보도(flow chart)로 정리했다. 섹터를 고르면 모델·논문의 병렬/직렬 발전 과정이 보이고,
        노드를 누르면 입문·중급·심화 3단계 수준별 해설로 들어간다.</p>
        <div class="home-stats">
          <div><b>9</b><span>기술 섹터</span></div>
          <div><b>${totalNodes}</b><span>모델·논문 노드</span></div>
          <div><b>2012–2026</b><span>시간 범위</span></div>
          <div><b>3</b><span>수준별 해설</span></div>
        </div>
      </div>
      <div class="section-label">2012 이전 — 배경</div>
      <div class="prequel-grid">${prequels}</div>
      <div class="section-label">섹터</div>
      <div class="sector-grid">${sectors}</div>`;
  }

  // ---- 뷰: 섹터 flow chart ----
  function viewSector(sid) {
    const s = sectorOf(sid);
    if (!s) return view404();
    document.title = `${s.name_ko} — AI 발전 흐름`;
    $main.innerHTML = `
      <div class="sector-head"><h1>${esc(s.name_ko)}</h1><span class="en">${esc(s.name_en)}</span></div>
      <p class="chart-hint">노드를 클릭하면 상세 해설로 이동한다. 차트는 좌우로 스크롤할 수 있다.</p>
      <div class="chart-scroll">${window.AITLChart.render(sid)}</div>
      <div class="fc-legend">
        <span><span class="sw major" style="border-color:${s.color}"></span>주요(major) 노드</span>
        <span><span class="sw" style="border-color:${s.color}"></span>후속(minor) 노드</span>
        <span><span class="sw ghost"></span>타 섹터에서 계승 (점선)</span>
      </div>`;
    $main.querySelectorAll(".fc-node").forEach((g) => {
      const go = () => { location.hash = "#/item/" + g.dataset.item; };
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  // ---- 뷰: 상세 ----
  function currentLevel(qsLevel) {
    if (qsLevel && LEVELS.some((l) => l.key === qsLevel)) return qsLevel;
    const saved = localStorage.getItem(LEVEL_KEY);
    return LEVELS.some((l) => l.key === saved) ? saved : "mid";
  }

  function viewItem(id, qsLevel) {
    const map = byId();
    const it = map.get(id);
    if (!it) return view404();
    const s = sectorOf(it.sector);
    document.title = `${it.name_ko} — AI 발전 흐름`;
    const level = currentLevel(qsLevel);
    const children = AITL.items.filter((c) => (c.evolves_from || []).includes(id));
    const parents = (it.evolves_from || []).map((p) => map.get(p)).filter(Boolean);

    const linkBtn = it.link
      ? `<a class="link-btn" href="${esc(it.link.url)}" target="_blank" rel="noopener">${esc(it.link.label)} ↗</a>` : "";
    const badges = `
      <span class="badge sector-badge" style="background:${s.color}">${esc(s.name_ko)}</span>
      ${(it.also_in || []).map((a) => `<span class="badge shared">공동: ${esc(sectorOf(a).name_ko)}</span>`).join("")}
      <span class="badge tier-${it.tier}">${it.tier === "major" ? "주요" : "후속"}</span>
      <span class="badge">${{ paper: "논문", model: "모델", product: "제품" }[it.type] || it.type}</span>
      <span class="badge">${esc(it.date)}</span>
      ${linkBtn}`;

    let body;
    if (!it.detail) {
      body = `<div class="card" style="margin-top:20px">이 노드의 상세 해설은 아직 준비 중이다.
        <br><span style="color:var(--muted);font-size:13px">${esc(it.oneliner)}</span></div>`;
    } else {
      const d = it.detail;
      const tabs = LEVELS.map((l) =>
        `<button data-level="${l.key}" class="${l.key === level ? "active" : ""}">${l.label}</button>`).join("");
      const unc = d.uncertainty && d.uncertainty.length
        ? `<div class="uncertainty-box">${d.uncertainty.map((u) => `<p>${esc(u)}</p>`).join("")}</div>` : "";
      const fig = d.diagram ? window.AITLChart.diagram(d.diagram) : "";
      body = `
        <div class="tldr">${esc(d.tldr)}</div>
        ${fig}
        <div class="level-tabs" role="tablist">${tabs}</div>
        <div class="level-body" id="level-body">${d.levels[level]}</div>
        <div class="impact-title">영향과 의의</div>
        <div class="impact-body">${d.impact}</div>
        ${unc}`;
    }

    const nav = `
      <div class="lineage-nav">
        ${parents.map((p) => `<a href="#/item/${p.id}">← ${esc(p.name_ko)} (${p.year})</a>`).join("")}
        <span class="spacer"></span>
        ${children.map((c) => `<a href="#/item/${c.id}">${esc(c.name_ko)} (${c.year}) →</a>`).join("")}
      </div>`;

    const mini = window.AITLChart.miniLineage(id);
    $main.innerHTML = `
      <div class="detail-wrap" style="--sec:${s.color}">
        <a class="back-btn" href="#/sector/${it.sector}">← ${esc(s.name_ko)} flow chart로</a>
        <div class="detail-card">
          <div class="detail-head">
            <div class="detail-kicker">${esc(s.name_ko)} · ${esc(it.date)}</div>
            <h1>${esc(it.name_ko)}</h1>
            <div class="title-en">${esc(it.title_en)}</div>
            <div class="badge-row">${badges}</div>
          </div>
          ${mini}
          ${body}
          ${nav}
        </div>
      </div>`;

    $main.querySelectorAll(".level-tabs button").forEach((b) => {
      b.addEventListener("click", () => {
        const lv = b.dataset.level;
        localStorage.setItem(LEVEL_KEY, lv);
        $main.querySelectorAll(".level-tabs button").forEach((x) => x.classList.toggle("active", x === b));
        document.getElementById("level-body").innerHTML = it.detail.levels[lv];
      });
    });
    $main.querySelectorAll(".ml-node[data-item]").forEach((g) => {
      const go = () => { location.hash = "#/item/" + g.dataset.item; };
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    $main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  // ---- 뷰: 404 ----
  function view404() {
    document.title = "페이지 없음 — AI 발전 흐름";
    $main.innerHTML = `<div class="notfound"><h1>404</h1>
      <p>존재하지 않는 페이지다.</p><p><a href="#/">홈으로 돌아가기</a></p></div>`;
  }

  // ---- 라우터 ----
  function route() {
    const raw = location.hash || "#/";
    const [pathPart, qs] = raw.slice(1).split("?");
    const seg = pathPart.split("/").filter(Boolean);
    const qsLevel = qs ? new URLSearchParams(qs).get("level") : null;
    let active = null;
    if (seg.length === 0) viewHome();
    else if (seg[0] === "sector" && seg.length === 2) { active = seg[1]; viewSector(seg[1]); }
    else if (seg[0] === "item" && seg.length === 2) {
      const it = byId().get(seg[1]);
      active = it ? it.sector : null;
      viewItem(seg[1], qsLevel);
    } else view404();
    renderNav(active);
  }

  window.addEventListener("hashchange", route);
  route();
})();
