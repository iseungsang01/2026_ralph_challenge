// rl_games — 강화학습·게임 AI 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "dqn-2013", sector: "rl_games", also_in: [], type: "paper", tier: "major",
  year: 2013, date: "2013-12", evolves_from: [],
  title_en: "Playing Atari with Deep Reinforcement Learning",
  name_ko: "DQN",
  oneliner: "픽셀 입력만으로 아타리 게임을 배우는 심층 Q학습",
  link: { kind: "arxiv", label: "arXiv:1312.5602", url: "https://arxiv.org/abs/1312.5602" }
});

window.AITL.register({
  id: "a3c-2016", sector: "rl_games", also_in: [], type: "paper", tier: "minor",
  year: 2016, date: "2016-02", evolves_from: ["dqn-2013"],
  title_en: "Asynchronous Methods for Deep Reinforcement Learning",
  name_ko: "A3C",
  oneliner: "비동기 병렬 액터로 리플레이 버퍼 없이 안정 학습",
  link: { kind: "arxiv", label: "arXiv:1602.01783", url: "https://arxiv.org/abs/1602.01783" }
});

window.AITL.register({
  id: "alphago-2016", sector: "rl_games", also_in: [], type: "model", tier: "major",
  year: 2016, date: "2016-03", evolves_from: ["dqn-2013"],
  title_en: "AlphaGo",
  name_ko: "AlphaGo",
  oneliner: "정책·가치망과 트리 탐색으로 바둑 세계 챔피언을 이김",
  link: null
});

window.AITL.register({
  id: "ppo-2017", sector: "rl_games", also_in: [], type: "paper", tier: "major",
  year: 2017, date: "2017-07", evolves_from: ["a3c-2016"],
  title_en: "Proximal Policy Optimization Algorithms",
  name_ko: "PPO",
  oneliner: "클리핑으로 안정성과 단순함을 잡은 정책 경사법의 표준",
  link: { kind: "arxiv", label: "arXiv:1707.06347", url: "https://arxiv.org/abs/1707.06347" }
});

window.AITL.register({
  id: "alphago-zero-2017", sector: "rl_games", also_in: [], type: "paper", tier: "minor",
  year: 2017, date: "2017-10", evolves_from: ["alphago-2016"],
  title_en: "Mastering the game of Go without human knowledge",
  name_ko: "AlphaGo Zero",
  oneliner: "인간 기보 없이 자기대국만으로 원조를 능가",
  link: null
});

window.AITL.register({
  id: "alphazero-2017", sector: "rl_games", also_in: [], type: "paper", tier: "minor",
  year: 2017, date: "2017-12", evolves_from: ["alphago-zero-2017"],
  title_en: "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm",
  name_ko: "AlphaZero",
  oneliner: "같은 알고리즘으로 바둑·체스·쇼기를 모두 정복",
  link: { kind: "arxiv", label: "arXiv:1712.01815", url: "https://arxiv.org/abs/1712.01815" }
});

window.AITL.register({
  id: "openai-five-2018", sector: "rl_games", also_in: [], type: "model", tier: "minor",
  year: 2018, date: "2018-06", evolves_from: ["ppo-2017"],
  title_en: "OpenAI Five",
  name_ko: "OpenAI Five",
  oneliner: "대규모 PPO 셀프플레이로 도타2 프로팀에 도전",
  link: null
});

window.AITL.register({
  id: "alphastar-2019", sector: "rl_games", also_in: [], type: "model", tier: "minor",
  year: 2019, date: "2019-01", evolves_from: [],
  title_en: "AlphaStar",
  name_ko: "AlphaStar",
  oneliner: "리그 학습으로 스타크래프트 II 그랜드마스터 달성",
  link: null
});

window.AITL.register({
  id: "muzero-2019", sector: "rl_games", also_in: [], type: "paper", tier: "major",
  year: 2019, date: "2019-11", evolves_from: ["alphazero-2017"],
  title_en: "Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model",
  name_ko: "MuZero",
  oneliner: "규칙도 모른 채 학습한 내부 모델로 계획을 수행",
  link: { kind: "arxiv", label: "arXiv:1911.08265", url: "https://arxiv.org/abs/1911.08265" }
});

window.AITL.register({
  id: "decision-transformer-2021", sector: "rl_games", also_in: [], type: "paper", tier: "minor",
  year: 2021, date: "2021-06", evolves_from: ["transformer-2017"],
  title_en: "Decision Transformer: Reinforcement Learning via Sequence Modeling",
  name_ko: "Decision Transformer",
  oneliner: "강화학습을 목표 조건부 시퀀스 예측 문제로 재정의",
  link: { kind: "arxiv", label: "arXiv:2106.01345", url: "https://arxiv.org/abs/2106.01345" }
});

window.AITL.register({
  id: "dreamerv3-2023", sector: "rl_games", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-01", evolves_from: ["muzero-2019"],
  title_en: "Mastering Diverse Domains through World Models",
  name_ko: "DreamerV3",
  oneliner: "월드 모델 상상 학습으로 다양한 도메인을 한 설정으로",
  link: { kind: "arxiv", label: "arXiv:2301.04104", url: "https://arxiv.org/abs/2301.04104" }
});
