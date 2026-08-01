// code_agents — 코드 생성·에이전트 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "codex-2021", sector: "code_agents", also_in: [], type: "paper", tier: "major",
  year: 2021, date: "2021-07", evolves_from: ["gpt3-2020"],
  title_en: "Evaluating Large Language Models Trained on Code",
  name_ko: "Codex",
  oneliner: "코드로 미세조정한 GPT가 함수 구현 문제를 풀다",
  link: { kind: "arxiv", label: "arXiv:2107.03374", url: "https://arxiv.org/abs/2107.03374" }
});

window.AITL.register({
  id: "copilot-2021", sector: "code_agents", also_in: [], type: "product", tier: "minor",
  year: 2021, date: "2021-06", evolves_from: ["codex-2021"],
  title_en: "GitHub Copilot",
  name_ko: "GitHub Copilot",
  oneliner: "에디터 안 AI 짝 프로그래머의 대중화",
  link: null
});

window.AITL.register({
  id: "alphacode-2022", sector: "code_agents", also_in: [], type: "paper", tier: "minor",
  year: 2022, date: "2022-02", evolves_from: [],
  title_en: "Competition-Level Code Generation with AlphaCode",
  name_ko: "AlphaCode",
  oneliner: "대량 생성·필터링으로 경쟁 프로그래밍 중위권 달성",
  link: { kind: "arxiv", label: "arXiv:2203.07814", url: "https://arxiv.org/abs/2203.07814" }
});

window.AITL.register({
  id: "react-2022", sector: "code_agents", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-10", evolves_from: ["gpt3-2020"],
  title_en: "ReAct: Synergizing Reasoning and Acting in Language Models",
  name_ko: "ReAct",
  oneliner: "추론과 행동을 교차하는 LLM 에이전트의 기본 패턴",
  link: { kind: "arxiv", label: "arXiv:2210.03629", url: "https://arxiv.org/abs/2210.03629" }
});

window.AITL.register({
  id: "toolformer-2023", sector: "code_agents", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-02", evolves_from: ["react-2022"],
  title_en: "Toolformer: Language Models Can Teach Themselves to Use Tools",
  name_ko: "Toolformer",
  oneliner: "모델 스스로 API 호출 시점을 학습하는 도구 사용",
  link: { kind: "arxiv", label: "arXiv:2302.04761", url: "https://arxiv.org/abs/2302.04761" }
});

window.AITL.register({
  id: "voyager-2023", sector: "code_agents", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-05", evolves_from: ["gpt4-2023"],
  title_en: "Voyager: An Open-Ended Embodied Agent with Large Language Models",
  name_ko: "Voyager",
  oneliner: "스킬 라이브러리를 쌓으며 마인크래프트를 평생 학습",
  link: { kind: "arxiv", label: "arXiv:2305.16291", url: "https://arxiv.org/abs/2305.16291" }
});

window.AITL.register({
  id: "swe-bench-2023", sector: "code_agents", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-10", evolves_from: [],
  title_en: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
  name_ko: "SWE-bench",
  oneliner: "실제 깃허브 이슈 해결로 코딩 AI를 평가하는 벤치마크",
  link: { kind: "arxiv", label: "arXiv:2310.06770", url: "https://arxiv.org/abs/2310.06770" }
});

window.AITL.register({
  id: "swe-agent-2024", sector: "code_agents", also_in: [], type: "paper", tier: "major",
  year: 2024, date: "2024-05", evolves_from: ["react-2022", "swe-bench-2023"],
  title_en: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
  name_ko: "SWE-agent",
  oneliner: "에이전트 전용 인터페이스로 자율 소프트웨어 수리",
  link: { kind: "arxiv", label: "arXiv:2405.15793", url: "https://arxiv.org/abs/2405.15793" }
});

window.AITL.register({
  id: "cursor-2023", sector: "code_agents", also_in: [], type: "product", tier: "minor",
  year: 2023, date: "2023", evolves_from: ["copilot-2021"],
  title_en: "Cursor",
  name_ko: "Cursor",
  oneliner: "AI를 1급 시민으로 설계한 코드 에디터",
  link: null
});

window.AITL.register({
  id: "devin-2024", sector: "code_agents", also_in: [], type: "product", tier: "minor",
  year: 2024, date: "2024-03", evolves_from: [],
  title_en: "Devin",
  name_ko: "Devin",
  oneliner: "이슈부터 배포까지 수행을 표방한 자율 SW 엔지니어",
  link: null
});
