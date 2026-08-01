// robotics — 로보틱스 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "visuomotor-2015", sector: "robotics", also_in: [], type: "paper", tier: "major",
  year: 2015, date: "2015-04", evolves_from: [],
  title_en: "End-to-End Training of Deep Visuomotor Policies",
  name_ko: "End-to-End Visuomotor",
  oneliner: "카메라 픽셀에서 모터 토크까지 하나의 신경망으로 학습",
  link: { kind: "arxiv", label: "arXiv:1504.00702", url: "https://arxiv.org/abs/1504.00702" }
});

window.AITL.register({
  id: "domain-randomization-2017", sector: "robotics", also_in: [], type: "paper", tier: "minor",
  year: 2017, date: "2017-03", evolves_from: [],
  title_en: "Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World",
  name_ko: "Domain Randomization",
  oneliner: "시뮬레이션을 무작위로 흔들어 현실 전이 격차를 극복",
  link: { kind: "arxiv", label: "arXiv:1703.06907", url: "https://arxiv.org/abs/1703.06907" }
});

window.AITL.register({
  id: "dactyl-2019", sector: "robotics", also_in: [], type: "model", tier: "minor",
  year: 2019, date: "2019-10", evolves_from: ["ppo-2017", "domain-randomization-2017"],
  title_en: "Solving Rubik's Cube with a Robot Hand",
  name_ko: "Dactyl (루빅스 큐브 손)",
  oneliner: "자동 도메인 확장으로 로봇 손이 큐브를 조작",
  link: { kind: "arxiv", label: "arXiv:1910.07113", url: "https://arxiv.org/abs/1910.07113" }
});

window.AITL.register({
  id: "saycan-2022", sector: "robotics", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-04", evolves_from: ["gpt3-2020"],
  title_en: "Do As I Can, Not As I Say: Grounding Language in Robotic Affordances",
  name_ko: "SayCan",
  oneliner: "LLM의 계획 능력을 로봇의 실행 가능성과 접지",
  link: { kind: "arxiv", label: "arXiv:2204.01691", url: "https://arxiv.org/abs/2204.01691" }
});

window.AITL.register({
  id: "rt1-2022", sector: "robotics", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-12", evolves_from: ["transformer-2017"],
  title_en: "RT-1: Robotics Transformer for Real-World Control at Scale",
  name_ko: "RT-1",
  oneliner: "대규모 실로봇 데이터로 학습한 로보틱스 트랜스포머",
  link: { kind: "arxiv", label: "arXiv:2212.06817", url: "https://arxiv.org/abs/2212.06817" }
});

window.AITL.register({
  id: "rt2-2023", sector: "robotics", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-07", evolves_from: ["rt1-2022"],
  title_en: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control",
  name_ko: "RT-2",
  oneliner: "웹 지식을 가진 VLM을 행동 토큰으로 로봇 제어에 전이",
  link: { kind: "arxiv", label: "arXiv:2307.15818", url: "https://arxiv.org/abs/2307.15818" }
});

window.AITL.register({
  id: "diffusion-policy-2023", sector: "robotics", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-03", evolves_from: ["ddpm-2020"],
  title_en: "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion",
  name_ko: "Diffusion Policy",
  oneliner: "행동 시퀀스를 확산 모델로 생성하는 모방 학습",
  link: { kind: "arxiv", label: "arXiv:2303.04137", url: "https://arxiv.org/abs/2303.04137" }
});

window.AITL.register({
  id: "act-aloha-2023", sector: "robotics", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-04", evolves_from: ["transformer-2017"],
  title_en: "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware",
  name_ko: "ACT / ALOHA",
  oneliner: "저가 양팔 로봇과 행동 청크 트랜스포머로 정밀 조작",
  link: { kind: "arxiv", label: "arXiv:2304.13705", url: "https://arxiv.org/abs/2304.13705" }
});

window.AITL.register({
  id: "openvla-2024", sector: "robotics", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024-06", evolves_from: ["rt2-2023"],
  title_en: "OpenVLA: An Open-Source Vision-Language-Action Model",
  name_ko: "OpenVLA",
  oneliner: "공개 가중치 VLA로 로봇 파운데이션 모델을 대중화",
  link: { kind: "arxiv", label: "arXiv:2406.09246", url: "https://arxiv.org/abs/2406.09246" }
});

window.AITL.register({
  id: "pi0-2024", sector: "robotics", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024-10", evolves_from: ["diffusion-policy-2023"],
  title_en: "π0: A Vision-Language-Action Flow Model for General Robot Control",
  name_ko: "π0",
  oneliner: "플로 매칭으로 연속 행동을 내는 범용 VLA 모델",
  link: null
});
