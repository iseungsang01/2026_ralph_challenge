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

- [ ] nlp_llm: 17개 골격 (기존 샘플 2건은 유지) + Phase 3 id 동기화 확인
- [ ] vision: 14개 골격
- [ ] generative: 12개 골격
- [ ] rl_games: 11개 골격
- [ ] multimodal: 9개 골격
- [ ] speech_audio: 9개 골격
- [ ] robotics: 10개 골격
- [ ] code_agents: 10개 골격
- [ ] ai4science: 9개 골격

## Phase 3 — Detail content (노드당 1태스크. 같은 섹터의 연속 미완료 항목을 major 최대 3개 / minor 최대 5개까지 한 이터레이션에 묶을 수 있음 — 전부 품질 기준 충족 시에만)

### nlp_llm
- [ ] word2vec-2013 detail
- [ ] seq2seq-2014 detail
- [ ] attention-2014 detail
- [ ] transformer-2017 detail (골드 스탠다드 기반 보강 — 분량 하한 재확인)
- [ ] gpt1-2018 detail
- [ ] bert-2018 detail
- [ ] gpt2-2019 detail (골드 스탠다드 기반 보강)
- [ ] t5-2019 detail
- [ ] gpt3-2020 detail
- [ ] scaling-laws-2020 detail
- [ ] chinchilla-2022 detail
- [ ] instructgpt-2022 detail
- [ ] chatgpt-2022 detail
- [ ] llama-2023 detail
- [ ] gpt4-2023 detail
- [ ] o1-2024 detail
- [ ] deepseek-r1-2025 detail

### vision
- [ ] alexnet-2012 detail
- [ ] rcnn-2013 detail
- [ ] vgg-2014 detail
- [ ] googlenet-2014 detail
- [ ] resnet-2015 detail
- [ ] faster-rcnn-2015 detail
- [ ] yolo-2015 detail
- [ ] unet-2015 detail
- [ ] vit-2020 detail
- [ ] dino-v1-2021 detail
- [ ] dino-v2-2023 detail
- [ ] sam-2023 detail
- [ ] sam2-2024 detail
- [ ] dino-v3-2025 detail

### generative
- [ ] vae-2013 detail
- [ ] gan-2014 detail
- [ ] dcgan-2015 detail
- [ ] pix2pix-2016 detail
- [ ] stylegan-2018 detail
- [ ] ddpm-2020 detail
- [ ] nerf-2020 detail
- [ ] dalle-2021 detail
- [ ] dalle2-2022 detail
- [ ] stable-diffusion-2022 detail
- [ ] gaussian-splatting-2023 detail
- [ ] sora-2024 detail

### rl_games
- [ ] dqn-2013 detail
- [ ] a3c-2016 detail
- [ ] alphago-2016 detail
- [ ] ppo-2017 detail
- [ ] alphago-zero-2017 detail
- [ ] alphazero-2017 detail
- [ ] openai-five-2018 detail
- [ ] alphastar-2019 detail
- [ ] muzero-2019 detail
- [ ] decision-transformer-2021 detail
- [ ] dreamerv3-2023 detail

### multimodal
- [ ] show-and-tell-2015 detail
- [ ] clip-2021 detail
- [ ] flamingo-2022 detail
- [ ] blip2-2023 detail
- [ ] llava-2023 detail
- [ ] gpt4v-2023 detail
- [ ] gemini-2023 detail
- [ ] imagebind-2023 detail
- [ ] gpt4o-2024 detail

### speech_audio
- [ ] deep-speech-2014 detail
- [ ] wavenet-2016 detail
- [ ] tacotron2-2017 detail
- [ ] wav2vec2-2020 detail
- [ ] hubert-2021 detail
- [ ] whisper-2022 detail
- [ ] vall-e-2023 detail
- [ ] musicgen-2023 detail
- [ ] moshi-2024 detail

### robotics
- [ ] visuomotor-2015 detail
- [ ] domain-randomization-2017 detail
- [ ] dactyl-2019 detail
- [ ] saycan-2022 detail
- [ ] rt1-2022 detail
- [ ] rt2-2023 detail
- [ ] diffusion-policy-2023 detail
- [ ] act-aloha-2023 detail
- [ ] openvla-2024 detail
- [ ] pi0-2024 detail

### code_agents
- [ ] codex-2021 detail
- [ ] copilot-2021 detail
- [ ] alphacode-2022 detail
- [ ] react-2022 detail
- [ ] toolformer-2023 detail
- [ ] voyager-2023 detail
- [ ] swe-bench-2023 detail
- [ ] swe-agent-2024 detail
- [ ] cursor-2024 detail
- [ ] devin-2024 detail

### ai4science
- [ ] alphafold1-2018 detail
- [ ] alphafold2-2021 detail
- [ ] alphatensor-2022 detail
- [ ] esm2-2022 detail
- [ ] graphcast-2023 detail
- [ ] gnome-2023 detail
- [ ] funsearch-2023 detail
- [ ] alphageometry-2024 detail
- [ ] alphafold3-2024 detail

## Phase 4 — QA & Polish

- [ ] 교차 검토 1 (nlp_llm/vision/generative 전 노드): 비유↔실제 대응 존재, 확신 3단계 준수, 계보 엣지 타당성, minor의 변경점 중심 여부, 문체 — 발견 사항 수정 커밋
- [ ] 교차 검토 2 (rl_games/multimodal/speech_audio): 동일 기준
- [ ] 교차 검토 3 (robotics/code_agents/ai4science): 동일 기준
- [ ] UI 패스: 데스크톱/모바일(375px) 레이아웃, 드로어, 404, 뒤로가기, 레벨 토글 localStorage, flow chart 노드 겹침·엣지 교차 최소화, 페이지 수평 스크롤 없음(차트 내부 제외)
- [ ] `scripts/build_standalone.js` 작성 + `dist/index_standalone.html` 생성 — css/js/data 전부 인라인, file://로 열어 홈→차트→상세→토글 동작 구조 확인
- [ ] 최종 게이트: `node scripts/validate.js --strict` 통과 + PRD §9 수용 기준 전 항목 자체 점검 결과를 Log에 기록

## Log (이터레이션마다 1줄 append)

<!-- 형식: - YYYY-MM-DD iterNNN: <작업> — <특이사항/판단 근거, 없으면 "-"> -->
- 2026-08-01 iter001: [phase1] meta.js 섹터 레지스트리 — -
- 2026-08-01 iter002: [phase1] index.html+css 셸 — 스텁 js/데이터 파일 동시 생성(콘솔 에러 0 요건)
- 2026-08-01 iter003: [phase1] app.js 라우터+뷰 — -
- 2026-08-01 iter004: [phase1] flowchart.js SVG 렌더러 — 동시점 부모-자식은 세로 엣지로 처리
- 2026-08-01 iter005: [phase1] nlp_llm 샘플 — 참조 무결성 위해 attention-2014/seq2seq-2014/gpt1-2018 골격 선등록(POLICY §25), 골드 deep 분량 하한 보강
