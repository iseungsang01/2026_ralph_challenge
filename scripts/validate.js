#!/usr/bin/env node
/**
 * validate.js — 품질 게이트 (zero-dependency)
 *
 * 사용:  node scripts/validate.js           # 일반 모드 (skeleton 노드 허용)
 *        node scripts/validate.js --strict  # 최종 게이트 (전 노드 detail + 개수 + 예산)
 *
 * 이 파일은 사람이 소유한다. 루프는 크래시 버그만 고칠 수 있고
 * 기준(하한·개수·금지 규칙)을 완화할 수 없다. (CLAUDE.md, POLICY 참조)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const STRICT = process.argv.includes('--strict');
const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ---- 기대값 (PRD §2, §5) --------------------------------------------------
const SECTOR_IDS = ['nlp_llm', 'vision', 'generative', 'rl_games', 'multimodal',
  'speech_audio', 'robotics', 'code_agents', 'ai4science'];
const EXPECTED_COUNTS = { nlp_llm: 17, vision: 14, generative: 12, rl_games: 11,
  multimodal: 9, speech_audio: 9, robotics: 10, code_agents: 10, ai4science: 9 };
const TOTAL_MIN = 95;
const FLOORS = { // 태그 제거 후 글자 수 하한 (PRD §3)
  major: { intro: 400, mid: 600, deep: 1000, impact: 200, deepSteps: 4 },
  minor: { intro: 200, mid: 200, deep: 200, impact: 100, deepSteps: 0 },
};
const ALLOWED_TAGS = new Set(['p', 'ol', 'ul', 'li', 'b', 'i', 'em', 'strong',
  'code', 'sub', 'sup', 'br', 'a']);
const VOID_TAGS = new Set(['br']);
const SECTOR_FILE_BUDGET = 200 * 1024;      // POLICY §23
const SITE_BUDGET = 2.5 * 1024 * 1024;

// ---- 데이터 로드 -----------------------------------------------------------
const metaPath = path.join(ROOT, 'data', 'meta.js');
if (!fs.existsSync(metaPath)) {
  if (STRICT) { console.error('FAIL: data/meta.js가 없다. 스캐폴드(Phase 1)가 완료되지 않았다.'); process.exit(1); }
  console.log('OK (pre-scaffold): data/meta.js가 아직 없다 — Phase 1 스캐폴드 전이면 정상이다.');
  process.exit(0);
}

const sandbox = { window: {}, console };
vm.createContext(sandbox);
function runFile(rel) {
  const p = path.join(ROOT, rel);
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: rel });
    return true;
  } catch (e) {
    err(`${rel}: 실행 오류 — ${e.message}`);
    return false;
  }
}
runFile('data/meta.js');

const AITL = sandbox.window.AITL;
if (!AITL || !Array.isArray(AITL.sectors) || typeof AITL.register !== 'function' || !Array.isArray(AITL.items)) {
  console.error('FAIL: data/meta.js는 window.AITL = { sectors: [...], items: [], register(item){...} }를 정의해야 한다.');
  process.exit(1);
}

const sectorDir = path.join(ROOT, 'data', 'sectors');
const sectorFiles = fs.existsSync(sectorDir)
  ? fs.readdirSync(sectorDir).filter((f) => f.endsWith('.js')).sort()
  : [];
for (const f of sectorFiles) runFile(`data/sectors/${f}`);

// ---- 섹터 레지스트리 검사 (PRD §2) ----------------------------------------
const regIds = AITL.sectors.map((s) => s && s.id);
for (const sid of SECTOR_IDS) if (!regIds.includes(sid)) err(`meta.js: 섹터 '${sid}' 누락`);
for (const s of AITL.sectors) {
  if (!s || typeof s !== 'object') { err('meta.js: 잘못된 섹터 항목'); continue; }
  if (!SECTOR_IDS.includes(s.id)) err(`meta.js: PRD에 없는 섹터 '${s.id}'`);
  for (const k of ['name_ko', 'name_en', 'color']) if (typeof s[k] !== 'string' || !s[k]) err(`meta.js: 섹터 '${s.id}'의 ${k} 누락`);
  if (typeof s.order !== 'number') err(`meta.js: 섹터 '${s.id}'의 order 누락`);
}

// ---- 노드 검사 -------------------------------------------------------------
const items = AITL.items;
const byId = new Map();
const stripTags = (h) => String(h).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const MATH_INTRO_BAN = /[∑∏√∫∂∇≈∈αβγδεζηθικλμνξπρστυφχψωΓΔΘΛΞΠΣΦΨΩ]|<su[bp]>/u;
const EMOJI_BAN = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/u;

function checkHtml(id, field, html) {
  const stack = [];
  const re = /<\s*(\/?)\s*([a-zA-Z0-9]+)([^>]*)>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) { err(`${id}.${field}: 허용되지 않은 태그 <${tag}> (허용: ${[...ALLOWED_TAGS].join(',')})`); continue; }
    if (VOID_TAGS.has(tag)) continue;
    if (closing) {
      if (stack.pop() !== tag) err(`${id}.${field}: 태그 짝 불일치 (</${tag}>)`);
    } else if (!/\/\s*>$/.test(m[0])) {
      stack.push(tag);
    }
    if (tag === 'a' && !closing) {
      const href = /href\s*=\s*["']([^"']*)["']/.exec(m[3]);
      if (!href || !(/^https?:\/\//.test(href[1]) || href[1].startsWith('#/'))) {
        err(`${id}.${field}: <a> href는 https:// 또는 #/ 로 시작해야 한다`);
      }
    }
  }
  if (stack.length) err(`${id}.${field}: 닫히지 않은 태그 <${stack.join(',')}>`);
}

for (const it of items) {
  if (!it || typeof it !== 'object') { err('register(): 객체가 아닌 항목'); continue; }
  const id = it.id || '(id없음)';
  if (typeof it.id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(it.id)) err(`${id}: id는 kebab-case여야 한다`);
  if (byId.has(it.id)) err(`${id}: id 중복`);
  byId.set(it.id, it);

  if (!SECTOR_IDS.includes(it.sector)) err(`${id}: sector '${it.sector}' 무효`);
  if (!Array.isArray(it.also_in)) err(`${id}: also_in은 배열이어야 한다`);
  else for (const a of it.also_in) {
    if (!SECTOR_IDS.includes(a)) err(`${id}: also_in의 '${a}' 무효`);
    if (a === it.sector) err(`${id}: also_in에 자기 섹터 포함 금지 (POLICY §1)`);
  }
  if (!['paper', 'model', 'product'].includes(it.type)) err(`${id}: type 무효`);
  if (!['major', 'minor'].includes(it.tier)) err(`${id}: tier 무효`);
  if (!Number.isInteger(it.year) || it.year < 2012 || it.year > 2026) err(`${id}: year는 2012~2026 (POLICY §7,§12)`);
  if (typeof it.date !== 'string' || !/^\d{4}(-(0[1-9]|1[0-2]))?$/.test(it.date)) err(`${id}: date 형식은 YYYY 또는 YYYY-MM (POLICY §13)`);
  else if (it.date.slice(0, 4) !== String(it.year)) err(`${id}: date와 year 불일치`);
  if (typeof it.title_en !== 'string' || !it.title_en) err(`${id}: title_en 누락`);
  if (typeof it.name_ko !== 'string' || !it.name_ko) err(`${id}: name_ko 누락`);
  if (typeof it.oneliner !== 'string' || !it.oneliner) err(`${id}: oneliner 누락`);
  else {
    if (it.oneliner.length > 60) err(`${id}: oneliner ${it.oneliner.length}자 (≤60)`);
    if (/<[^>]*>/.test(it.oneliner)) err(`${id}: oneliner에 HTML 금지`);
  }
  if (it.link !== null) {
    const l = it.link;
    if (!l || typeof l !== 'object') err(`${id}: link는 객체 또는 null`);
    else {
      if (!['arxiv', 'report', 'blog'].includes(l.kind)) err(`${id}: link.kind 무효`);
      if (typeof l.url !== 'string' || !/^https:\/\//.test(l.url)) err(`${id}: link.url은 https 필수`);
      if (typeof l.label !== 'string' || !l.label) err(`${id}: link.label 누락`);
      if (l.kind === 'arxiv' && !/arxiv\.org\/abs\/\d{4}\.\d{4,5}$/.test(l.url)) err(`${id}: arXiv URL 형식 오류 (불확실하면 link:null — POLICY §14)`);
    }
  }
  if (!Array.isArray(it.evolves_from)) err(`${id}: evolves_from은 배열 (루트면 [])`);
  else if (it.evolves_from.length > 2) err(`${id}: evolves_from 최대 2개 (POLICY §8)`);

  // ---- detail (skeleton 모드: 필드 자체가 없으면 통과, strict에서는 필수) ----
  if (it.detail === undefined) {
    if (STRICT) err(`${id}: detail 없음 (strict에서는 전 노드 필수)`);
    continue;
  }
  const d = it.detail;
  if (!d || typeof d !== 'object' || !d.levels || typeof d.levels !== 'object') { err(`${id}: detail.levels 구조 오류`); continue; }
  if (typeof d.tldr !== 'string' || d.tldr.length < 20 || d.tldr.length > 120) err(`${id}: tldr는 20~120자`);
  const floors = FLOORS[it.tier] || FLOORS.minor;
  for (const lv of ['intro', 'mid', 'deep']) {
    const html = d.levels[lv];
    if (typeof html !== 'string' || !html.trim()) { err(`${id}: levels.${lv} 누락`); continue; }
    checkHtml(id, `levels.${lv}`, html);
    const text = stripTags(html);
    if (text.length < floors[lv]) err(`${id}: levels.${lv} ${text.length}자 < 하한 ${floors[lv]}자 (${it.tier})`);
    if (!/[가-힣]/.test(text)) err(`${id}: levels.${lv}에 한국어가 없다 (POLICY §22)`);
    if (/(중급에서|입문에서|심화에서)\s*(설명|다룬|말한)/.test(text)) err(`${id}: levels.${lv} 레벨 간 참조 금지 (POLICY §19)`);
  }
  if (typeof d.levels.intro === 'string' && MATH_INTRO_BAN.test(d.levels.intro)) {
    err(`${id}: intro에 수식·그리스 문자·sub/sup 금지 (POLICY §18)`);
  }
  if (typeof d.levels.deep === 'string' && it.tier === 'major') {
    const steps = (d.levels.deep.match(/<(li|p)[\s>]/g) || []).length;
    if (steps < FLOORS.major.deepSteps) err(`${id}: major deep은 <p>/<li> 단계 ≥${FLOORS.major.deepSteps} (현재 ${steps})`);
  }
  if (typeof d.impact !== 'string' || stripTags(d.impact).length < floors.impact) err(`${id}: impact ${d.impact ? stripTags(d.impact).length : 0}자 < 하한 ${floors.impact}자`);
  else checkHtml(id, 'impact', d.impact);
  if (!Array.isArray(d.uncertainty)) err(`${id}: uncertainty는 배열`);
  if (it.year >= 2025 && Array.isArray(d.uncertainty) && d.uncertainty.length === 0) {
    err(`${id}: 2025년 이후 노드는 uncertainty 필수 (POLICY §16)`);
  }
  for (const lv of ['intro', 'mid', 'deep']) {
    const s = d.levels[lv];
    if (typeof s === 'string' && EMOJI_BAN.test(s)) err(`${id}: levels.${lv}에 이모지 금지 (⚠는 uncertainty에서만 — POLICY §22)`);
  }
  if (typeof d.impact === 'string' && EMOJI_BAN.test(d.impact)) err(`${id}: impact에 이모지 금지`);
}

// ---- 계보 무결성 (POLICY §5) ----------------------------------------------
for (const it of items) {
  if (!it || !Array.isArray(it.evolves_from)) continue;
  for (const ref of it.evolves_from) {
    if (ref === it.id) { err(`${it.id}: evolves_from 자기 참조`); continue; }
    const t = byId.get(ref);
    if (!t) err(`${it.id}: evolves_from '${ref}' — 존재하지 않는 id`);
    else if (t.year > it.year) err(`${it.id}: evolves_from '${ref}'(${t.year}) 가 미래다 (POLICY §5)`);
  }
}
{ // 사이클 검출 (DFS)
  const state = new Map();
  const dfs = (id, trail) => {
    state.set(id, 1);
    const it = byId.get(id);
    for (const ref of (it && it.evolves_from) || []) {
      if (!byId.has(ref)) continue;
      if (state.get(ref) === 1) { err(`계보 사이클: ${[...trail, id, ref].join(' → ')}`); continue; }
      if (!state.has(ref)) dfs(ref, [...trail, id]);
    }
    state.set(id, 2);
  };
  for (const id of byId.keys()) if (!state.has(id)) dfs(id, []);
}

// ---- 개수 (strict 전용 — Phase 1 샘플 단계에서는 검사하지 않음) --------------
if (STRICT) {
  const counts = {};
  for (const it of items) counts[it.sector] = (counts[it.sector] || 0) + 1;
  for (const sid of SECTOR_IDS) {
    const c = counts[sid] || 0;
    const exp = EXPECTED_COUNTS[sid];
    if (c < exp - 1) err(`섹터 ${sid}: 노드 ${c}개 < 기대 ${exp}개 (PRD §5)`);
    else if (c !== exp) warn(`섹터 ${sid}: 노드 ${c}개 (기대 ${exp}개) — Log에 근거가 있어야 한다`);
  }
  if (items.length < TOTAL_MIN) err(`전체 노드 ${items.length}개 < ${TOTAL_MIN}개`);
}

// ---- index.html 배선 -------------------------------------------------------
const indexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  const posMeta = html.indexOf('data/meta.js');
  const posApp = html.indexOf('js/app.js');
  if (posMeta < 0) err('index.html: data/meta.js 스크립트 누락');
  if (posApp < 0) err('index.html: js/app.js 스크립트 누락');
  if (/https?:\/\//.test(html.replace(/<!--[\s\S]*?-->/g, ''))) {
    for (const m of html.matchAll(/(?:src|href)\s*=\s*["'](https?:\/\/[^"']*)["']/g)) {
      err(`index.html: 외부 리소스 금지 — ${m[1]} (POLICY §23, PRD 비목표)`);
    }
  }
  for (const f of sectorFiles) {
    const pos = html.indexOf(`data/sectors/${f}`);
    if (pos < 0) err(`index.html: data/sectors/${f} 스크립트 누락`);
    else {
      if (posMeta >= 0 && pos < posMeta) err(`index.html: ${f}가 meta.js보다 먼저 로드된다`);
      if (posApp >= 0 && pos > posApp) err(`index.html: ${f}가 app.js보다 나중에 로드된다`);
    }
  }
} else if (STRICT) err('index.html 없음');

// ---- 예산 (strict) ---------------------------------------------------------
if (STRICT) {
  let total = 0;
  const addDir = (rel) => {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) return;
    for (const f of fs.readdirSync(p, { recursive: true })) {
      const fp = path.join(p, String(f));
      if (fs.statSync(fp).isFile()) total += fs.statSync(fp).size;
    }
  };
  ['index.html'].forEach((f) => { const p = path.join(ROOT, f); if (fs.existsSync(p)) total += fs.statSync(p).size; });
  ['css', 'js', 'data'].forEach(addDir);
  if (total > SITE_BUDGET) err(`사이트 합계 ${(total / 1024 / 1024).toFixed(2)}MB > 2.5MB (POLICY §23)`);
  for (const f of sectorFiles) {
    const size = fs.statSync(path.join(sectorDir, f)).size;
    if (size > SECTOR_FILE_BUDGET) err(`data/sectors/${f}: ${(size / 1024).toFixed(0)}KB > 200KB (POLICY §23)`);
  }
}

// ---- 결과 ------------------------------------------------------------------
const withDetail = items.filter((i) => i && i.detail !== undefined).length;
for (const w of warns) console.log(`WARN: ${w}`);
if (errors.length) {
  console.error(`\nFAIL — ${errors.length}건:`);
  errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`));
  process.exit(1);
}
console.log(`OK${STRICT ? ' (strict)' : ''}: 섹터 ${AITL.sectors.length}개, 노드 ${items.length}개 (detail ${withDetail}개, skeleton ${items.length - withDetail}개)`);
