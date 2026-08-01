// ai4science — AI for Science 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "alphafold1-2018", sector: "ai4science", also_in: [], type: "model", tier: "minor",
  year: 2018, date: "2018-12", evolves_from: [],
  title_en: "AlphaFold (CASP13)",
  name_ko: "AlphaFold",
  oneliner: "딥러닝으로 단백질 구조 예측 대회 CASP13 1위",
  link: null
});

window.AITL.register({
  id: "alphafold2-2021", sector: "ai4science", also_in: [], type: "paper", tier: "major",
  year: 2021, date: "2021-07", evolves_from: ["alphafold1-2018", "transformer-2017"],
  title_en: "Highly accurate protein structure prediction with AlphaFold",
  name_ko: "AlphaFold2",
  oneliner: "실험 수준 정확도의 단백질 구조 예측으로 문제를 사실상 해결",
  link: null
});

window.AITL.register({
  id: "alphatensor-2022", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2022, date: "2022-10", evolves_from: ["alphazero-2017"],
  title_en: "Discovering faster matrix multiplication algorithms with reinforcement learning",
  name_ko: "AlphaTensor",
  oneliner: "강화학습이 행렬 곱셈의 새 알고리즘을 발견",
  link: null
});

window.AITL.register({
  id: "esm2-2022", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2022, date: "2022", evolves_from: ["bert-2018"],
  title_en: "Evolutionary-scale prediction of atomic-level protein structure with a language model",
  name_ko: "ESM-2",
  oneliner: "단백질 서열 언어 모델만으로 구조를 직접 예측",
  link: null
});

window.AITL.register({
  id: "graphcast-2022", sector: "ai4science", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-12", evolves_from: [],
  title_en: "GraphCast: Learning skillful medium-range global weather forecasting",
  name_ko: "GraphCast",
  oneliner: "그래프 신경망이 수치 기상 예보를 속도·정확도에서 추월",
  link: { kind: "arxiv", label: "arXiv:2212.12794", url: "https://arxiv.org/abs/2212.12794" }
});

window.AITL.register({
  id: "gnome-2023", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-11", evolves_from: [],
  title_en: "Scaling deep learning for materials discovery (GNoME)",
  name_ko: "GNoME",
  oneliner: "안정 무기 결정 수십만 종을 예측한 재료 탐색 AI",
  link: null
});

window.AITL.register({
  id: "funsearch-2023", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-12", evolves_from: [],
  title_en: "Mathematical discoveries from program search with large language models (FunSearch)",
  name_ko: "FunSearch",
  oneliner: "LLM 프로그램 탐색이 조합론의 새 결과를 발견",
  link: null
});

window.AITL.register({
  id: "alphageometry-2024", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024-01", evolves_from: [],
  title_en: "Solving olympiad geometry without human demonstrations (AlphaGeometry)",
  name_ko: "AlphaGeometry",
  oneliner: "신경-기호 결합으로 올림피아드 기하 문제를 증명",
  link: null
});

window.AITL.register({
  id: "alphafold3-2024", sector: "ai4science", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024-05", evolves_from: ["alphafold2-2021"],
  title_en: "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
  name_ko: "AlphaFold 3",
  oneliner: "확산 모듈로 단백질·핵산·리간드 복합체까지 예측 확장",
  link: null
});
