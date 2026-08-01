// speech_audio — 음성·오디오 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "deep-speech-2014", sector: "speech_audio", also_in: [], type: "paper", tier: "major",
  year: 2014, date: "2014-12", evolves_from: [],
  title_en: "Deep Speech: Scaling up end-to-end speech recognition",
  name_ko: "Deep Speech",
  oneliner: "파이프라인 없이 end-to-end로 음성을 텍스트로 변환",
  link: { kind: "arxiv", label: "arXiv:1412.5567", url: "https://arxiv.org/abs/1412.5567" }
});

window.AITL.register({
  id: "wavenet-2016", sector: "speech_audio", also_in: [], type: "paper", tier: "major",
  year: 2016, date: "2016-09", evolves_from: [],
  title_en: "WaveNet: A Generative Model for Raw Audio",
  name_ko: "WaveNet",
  oneliner: "파형을 샘플 단위로 직접 생성하는 자기회귀 모델",
  link: { kind: "arxiv", label: "arXiv:1609.03499", url: "https://arxiv.org/abs/1609.03499" }
});

window.AITL.register({
  id: "tacotron2-2017", sector: "speech_audio", also_in: [], type: "paper", tier: "minor",
  year: 2017, date: "2017-12", evolves_from: ["wavenet-2016"],
  title_en: "Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions",
  name_ko: "Tacotron 2",
  oneliner: "텍스트→멜 스펙트로그램→파형의 자연스러운 합성 체계",
  link: { kind: "arxiv", label: "arXiv:1712.05884", url: "https://arxiv.org/abs/1712.05884" }
});

window.AITL.register({
  id: "wav2vec2-2020", sector: "speech_audio", also_in: [], type: "paper", tier: "major",
  year: 2020, date: "2020-06", evolves_from: ["transformer-2017"],
  title_en: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations",
  name_ko: "wav2vec 2.0",
  oneliner: "라벨 없는 음성에서 표현을 자기지도 학습",
  link: { kind: "arxiv", label: "arXiv:2006.11477", url: "https://arxiv.org/abs/2006.11477" }
});

window.AITL.register({
  id: "hubert-2021", sector: "speech_audio", also_in: [], type: "paper", tier: "minor",
  year: 2021, date: "2021-06", evolves_from: ["wav2vec2-2020"],
  title_en: "HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units",
  name_ko: "HuBERT",
  oneliner: "클러스터 의사 라벨의 마스크 예측으로 음성 표현 학습",
  link: { kind: "arxiv", label: "arXiv:2106.07447", url: "https://arxiv.org/abs/2106.07447" }
});

window.AITL.register({
  id: "whisper-2022", sector: "speech_audio", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-09", evolves_from: ["transformer-2017"],
  title_en: "Robust Speech Recognition via Large-Scale Weak Supervision",
  name_ko: "Whisper",
  oneliner: "68만 시간 약지도 학습으로 강건한 다국어 인식 달성",
  link: { kind: "arxiv", label: "arXiv:2212.04356", url: "https://arxiv.org/abs/2212.04356" }
});

window.AITL.register({
  id: "vall-e-2023", sector: "speech_audio", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-01", evolves_from: [],
  title_en: "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers",
  name_ko: "VALL-E",
  oneliner: "3초 샘플로 목소리를 복제하는 코덱 언어 모델 TTS",
  link: { kind: "arxiv", label: "arXiv:2301.02111", url: "https://arxiv.org/abs/2301.02111" }
});

window.AITL.register({
  id: "musicgen-2023", sector: "speech_audio", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-06", evolves_from: [],
  title_en: "Simple and Controllable Music Generation",
  name_ko: "MusicGen",
  oneliner: "텍스트 조건 음악 생성을 단일 언어 모델로 단순화",
  link: { kind: "arxiv", label: "arXiv:2306.05284", url: "https://arxiv.org/abs/2306.05284" }
});

window.AITL.register({
  id: "moshi-2024", sector: "speech_audio", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024", evolves_from: [],
  title_en: "Moshi: a speech-text foundation model for real-time dialogue",
  name_ko: "Moshi",
  oneliner: "전이중(full-duplex) 실시간 음성 대화 파운데이션 모델",
  link: null
});
