// multimodal — 멀티모달 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "show-and-tell-2014", sector: "multimodal", also_in: [], type: "paper", tier: "minor",
  year: 2014, date: "2014-11", evolves_from: ["seq2seq-2014"],
  title_en: "Show and Tell: A Neural Image Caption Generator",
  name_ko: "Show and Tell",
  oneliner: "CNN 인코더와 RNN 디코더로 이미지 캡션을 생성",
  link: { kind: "arxiv", label: "arXiv:1411.4555", url: "https://arxiv.org/abs/1411.4555" }
});

window.AITL.register({
  id: "clip-2021", sector: "multimodal", also_in: ["vision"], type: "paper", tier: "major",
  year: 2021, date: "2021-03", evolves_from: ["vit-2020"],
  title_en: "Learning Transferable Visual Models From Natural Language Supervision",
  name_ko: "CLIP",
  oneliner: "이미지-텍스트 쌍의 대조 학습으로 개방형 인식을 실현",
  link: { kind: "arxiv", label: "arXiv:2103.00020", url: "https://arxiv.org/abs/2103.00020" }
});

window.AITL.register({
  id: "flamingo-2022", sector: "multimodal", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-04", evolves_from: ["clip-2021"],
  title_en: "Flamingo: a Visual Language Model for Few-Shot Learning",
  name_ko: "Flamingo",
  oneliner: "고정 LLM에 시각 입력을 잇는 few-shot 시각 언어 모델",
  link: { kind: "arxiv", label: "arXiv:2204.14198", url: "https://arxiv.org/abs/2204.14198" }
});

window.AITL.register({
  id: "blip2-2023", sector: "multimodal", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-01", evolves_from: ["clip-2021"],
  title_en: "BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models",
  name_ko: "BLIP-2",
  oneliner: "Q-Former로 고정 인코더와 고정 LLM을 가볍게 연결",
  link: { kind: "arxiv", label: "arXiv:2301.12597", url: "https://arxiv.org/abs/2301.12597" }
});

window.AITL.register({
  id: "llava-2023", sector: "multimodal", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-04", evolves_from: ["clip-2021", "llama-2023"],
  title_en: "Visual Instruction Tuning",
  name_ko: "LLaVA",
  oneliner: "시각 지시 데이터로 공개 멀티모달 비서를 구축",
  link: { kind: "arxiv", label: "arXiv:2304.08485", url: "https://arxiv.org/abs/2304.08485" }
});

window.AITL.register({
  id: "imagebind-2023", sector: "multimodal", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-05", evolves_from: ["clip-2021"],
  title_en: "ImageBind: One Embedding Space To Bind Them All",
  name_ko: "ImageBind",
  oneliner: "이미지를 축으로 6개 모달리티를 한 임베딩 공간에 결합",
  link: { kind: "arxiv", label: "arXiv:2305.05665", url: "https://arxiv.org/abs/2305.05665" }
});

window.AITL.register({
  id: "gpt4v-2023", sector: "multimodal", also_in: [], type: "model", tier: "minor",
  year: 2023, date: "2023-09", evolves_from: ["gpt4-2023"],
  title_en: "GPT-4V(ision)",
  name_ko: "GPT-4V",
  oneliner: "GPT-4에 이미지 이해를 결합한 상용 멀티모달 배포",
  link: null
});

window.AITL.register({
  id: "gemini-2023", sector: "multimodal", also_in: [], type: "model", tier: "major",
  year: 2023, date: "2023-12", evolves_from: [],
  title_en: "Gemini: A Family of Highly Capable Multimodal Models",
  name_ko: "Gemini",
  oneliner: "처음부터 멀티모달로 사전학습된 네이티브 설계",
  link: { kind: "arxiv", label: "arXiv:2312.11805", url: "https://arxiv.org/abs/2312.11805" }
});

window.AITL.register({
  id: "gpt4o-2024", sector: "multimodal", also_in: [], type: "model", tier: "major",
  year: 2024, date: "2024-05", evolves_from: ["gpt4v-2023"],
  title_en: "GPT-4o",
  name_ko: "GPT-4o",
  oneliner: "텍스트·음성·이미지를 한 모델로 실시간 처리하는 옴니 모델",
  link: null
});
