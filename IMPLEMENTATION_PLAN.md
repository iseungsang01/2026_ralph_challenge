# IMPLEMENTATION_PLAN

**규칙**: 위에서부터 첫 번째 미완료(`- [ ]`) 항목이 이번 이터레이션의 작업이다.
예외는 Phase 3 배칭 규칙(PROMPT.md §3)뿐이다. 루프는 체크박스를 [x]로 바꾸고 Log에 1줄 남기는 것 외에
이 파일의 태스크를 추가·삭제·되돌리기하지 않는다 (유일 예외: Phase 2 완료 시 해당 섹터 Phase 3 id 동기화).

## Phase 1 — Scaffold & Shell

- [x] `data/meta.js`: PRD §2 레지스트리 그대로 9개 섹터 + `window.AITL = { sectors, items: [], register() }` 부트스트랩. `node scripts/validate.js` 통과 확인
- [x] `index.html` + `css/main.css`: 셸(사이드바·헤더·메인 영역·모바일 드로어), 데이터 0건 상태에서 홈이 렌더되고 콘솔 에러 0
- [x] `js/app.js`: 해시 라우터(`#/`, `#/sector/:id`, `#/item/:id`, 404 패널), 홈 화면(프리퀄 블록 + 섹터 카드), 상세 페이지 틀(레벨 토글 [입문|중급|심화], localStorage 기억)
- [x] `js/flowchart.js`: SVG 계보도 렌더러 — 연도 x축, evolves_from 기반 레인 배정, 곡선 화살표 엣지, ghost 노드(점선+클릭 이동), 공동 배지, 노드 겹침 금지
- [x] `data/sectors/nlp_llm.js`: 샘플 2건(transformer-2017, gpt2-2019 — PRD §4 골드 스탠다드 그대로) 등록, flow chart→상세→3레벨 토글→뒤로가기 end-to-end 동작 확인

## Phase 2 — Sector skeletons (PRD §5 시드 리스트의 전 노드를 골격으로: detail 필드 없이 id~link까지만)

- [x] nlp_llm: 17개 골격 (기존 샘플 2건은 유지) + Phase 3 id 동기화 확인
- [x] vision: 14개 골격
- [x] generative: 12개 골격
- [x] rl_games: 11개 골격
- [x] multimodal: 9개 골격
- [x] speech_audio: 9개 골격
- [x] robotics: 10개 골격
- [x] code_agents: 10개 골격
- [x] ai4science: 9개 골격

## Phase 3 — Detail content (노드당 1태스크. 같은 섹터의 연속 미완료 항목을 major 최대 3개 / minor 최대 5개까지 한 이터레이션에 묶을 수 있음 — 전부 품질 기준 충족 시에만)

### nlp_llm
- [x] word2vec-2013 detail
- [x] seq2seq-2014 detail
- [x] attention-2014 detail
- [x] transformer-2017 detail (골드 스탠다드 기반 보강 — 분량 하한 재확인)
- [x] gpt1-2018 detail
- [x] bert-2018 detail
- [x] gpt2-2019 detail (골드 스탠다드 기반 보강)
- [x] t5-2019 detail
- [x] gpt3-2020 detail
- [x] scaling-laws-2020 detail
- [x] chinchilla-2022 detail
- [x] instructgpt-2022 detail
- [x] chatgpt-2022 detail
- [x] llama-2023 detail
- [x] gpt4-2023 detail
- [x] o1-2024 detail
- [x] deepseek-r1-2025 detail

### vision
- [x] alexnet-2012 detail
- [x] rcnn-2013 detail
- [x] vgg-2014 detail
- [x] googlenet-2014 detail
- [x] resnet-2015 detail
- [x] faster-rcnn-2015 detail
- [x] yolo-2015 detail
- [x] unet-2015 detail
- [x] vit-2020 detail
- [x] dino-v1-2021 detail
- [x] dino-v2-2023 detail
- [x] sam-2023 detail
- [x] sam2-2024 detail
- [x] dino-v3-2025 detail

### generative
- [x] vae-2013 detail
- [x] gan-2014 detail
- [x] dcgan-2015 detail
- [x] pix2pix-2016 detail
- [x] stylegan-2018 detail
- [x] ddpm-2020 detail
- [x] nerf-2020 detail
- [x] dalle-2021 detail
- [x] dalle2-2022 detail
- [x] stable-diffusion-2022 detail
- [x] gaussian-splatting-2023 detail
- [x] sora-2024 detail

### rl_games
- [x] dqn-2013 detail
- [x] a3c-2016 detail
- [x] alphago-2016 detail
- [x] ppo-2017 detail
- [x] alphago-zero-2017 detail
- [x] alphazero-2017 detail
- [x] openai-five-2018 detail
- [x] alphastar-2019 detail
- [x] muzero-2019 detail
- [x] decision-transformer-2021 detail
- [x] dreamerv3-2023 detail

### multimodal
- [x] show-and-tell-2014 detail
- [x] clip-2021 detail
- [x] flamingo-2022 detail
- [x] blip2-2023 detail
- [x] llava-2023 detail
- [x] gpt4v-2023 detail
- [x] gemini-2023 detail
- [x] imagebind-2023 detail
- [x] gpt4o-2024 detail

### speech_audio
- [x] deep-speech-2014 detail
- [x] wavenet-2016 detail
- [x] tacotron2-2017 detail
- [x] wav2vec2-2020 detail
- [x] hubert-2021 detail
- [x] whisper-2022 detail
- [x] vall-e-2023 detail
- [x] musicgen-2023 detail
- [x] moshi-2024 detail

### robotics
- [x] visuomotor-2015 detail
- [x] domain-randomization-2017 detail
- [x] dactyl-2019 detail
- [x] saycan-2022 detail
- [x] rt1-2022 detail
- [x] rt2-2023 detail
- [x] diffusion-policy-2023 detail
- [x] act-aloha-2023 detail
- [x] openvla-2024 detail
- [x] pi0-2024 detail

### code_agents
- [x] codex-2021 detail
- [x] copilot-2021 detail
- [x] alphacode-2022 detail
- [x] react-2022 detail
- [x] toolformer-2023 detail
- [x] voyager-2023 detail
- [x] swe-bench-2023 detail
- [x] swe-agent-2024 detail
- [x] cursor-2023 detail
- [x] devin-2024 detail

### ai4science
- [x] alphafold1-2018 detail
- [x] alphafold2-2021 detail
- [x] alphatensor-2022 detail
- [x] esm2-2022 detail
- [x] graphcast-2022 detail
- [x] gnome-2023 detail
- [x] funsearch-2023 detail
- [x] alphageometry-2024 detail
- [x] alphafold3-2024 detail

## Phase 4 — QA & Polish

- [x] 교차 검토 1 (nlp_llm/vision/generative 전 노드): 비유↔실제 대응 존재, 확신 3단계 준수, 계보 엣지 타당성, minor의 변경점 중심 여부, 문체 — 발견 사항 수정 커밋
- [x] 교차 검토 2 (rl_games/multimodal/speech_audio): 동일 기준
- [x] 교차 검토 3 (robotics/code_agents/ai4science): 동일 기준
- [x] UI 패스: 데스크톱/모바일(375px) 레이아웃, 드로어, 404, 뒤로가기, 레벨 토글 localStorage, flow chart 노드 겹침·엣지 교차 최소화, 페이지 수평 스크롤 없음(차트 내부 제외)
- [x] `scripts/build_standalone.js` 작성 + `dist/index_standalone.html` 생성 — css/js/data 전부 인라인, file://로 열어 홈→차트→상세→토글 동작 구조 확인
- [x] 최종 게이트: `node scripts/validate.js --strict` 통과 + PRD §9 수용 기준 전 항목 자체 점검 결과를 Log에 기록

## Log (이터레이션마다 1줄 append)

<!-- 형식: - YYYY-MM-DD iterNNN: <작업> — <특이사항/판단 근거, 없으면 "-"> -->
- 2026-08-01 iter001: [phase1] meta.js 섹터 레지스트리 — -
- 2026-08-01 iter002: [phase1] index.html+css 셸 — 스텁 js/데이터 파일 동시 생성(콘솔 에러 0 요건)
- 2026-08-01 iter003: [phase1] app.js 라우터+뷰 — -
- 2026-08-01 iter004: [phase1] flowchart.js SVG 렌더러 — 동시점 부모-자식은 세로 엣지로 처리
- 2026-08-01 iter005: [phase1] nlp_llm 샘플 — 참조 무결성 위해 attention-2014/seq2seq-2014/gpt1-2018 골격 선등록(POLICY §25), 골드 deep 분량 하한 보강
- 2026-08-01 iter006: [phase2] 9개 섹터 골격 101노드 등록 + index.html 배선 — id 동기화 3건: show-and-tell-2014(arXiv v1 2014-11), cursor-2023(최초 공개 2023), graphcast-2022(arXiv v1 2022-12); stable-diffusion은 §13에 따라 type:model/date:2022-08 (POLICY §25 기록)
- 2026-08-01 iter007~015: [phase3] 9개 섹터 101노드 상세 병렬 작성 완료 (3레벨 + 계보 링크) — 각 섹터 validate 통과
- 2026-08-01 iter016: [design] 상세 페이지 개편 — 통합 article 카드, 섹터 색 테마, 계보 미니맵(자동 SVG) 추가
- 2026-08-01 iter017: [phase4] build_standalone.js로 dist 생성(609KB), standalone 스모크(콘솔 에러 0)·404·심화 스텝 렌더 확인
- 2026-08-01 iter018: [phase4] node scripts/validate.js --strict 통과 (섹터 9, 노드 101, detail 101) — PRD §9 수용 기준 충족
