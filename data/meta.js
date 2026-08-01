// 섹터 레지스트리 + 노드 등록 부트스트랩 (PRD §2)
window.AITL = {
  sectors: [
    { id: "nlp_llm",      name_ko: "자연어 처리·LLM",    name_en: "NLP & LLMs",        color: "#3b6fd4", order: 1 },
    { id: "vision",       name_ko: "컴퓨터 비전",        name_en: "Computer Vision",   color: "#2a9d8f", order: 2 },
    { id: "generative",   name_ko: "생성 모델",          name_en: "Generative Models", color: "#c2559a", order: 3 },
    { id: "rl_games",     name_ko: "강화학습·게임 AI",   name_en: "RL & Game AI",      color: "#d97b29", order: 4 },
    { id: "multimodal",   name_ko: "멀티모달",           name_en: "Multimodal",        color: "#7b52c9", order: 5 },
    { id: "speech_audio", name_ko: "음성·오디오",        name_en: "Speech & Audio",    color: "#c9445a", order: 6 },
    { id: "robotics",     name_ko: "로보틱스",           name_en: "Robotics",          color: "#5a7d2a", order: 7 },
    { id: "code_agents",  name_ko: "코드 생성·에이전트", name_en: "Code & Agents",     color: "#2278a8", order: 8 },
    { id: "ai4science",   name_ko: "AI for Science",     name_en: "AI for Science",    color: "#8a6d3b", order: 9 }
  ],
  items: [],
  register(item) { this.items.push(item); }
};
