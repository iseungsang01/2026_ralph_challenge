// generative — 생성 모델 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "vae-2013", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2013, date: "2013-12", evolves_from: [],
  title_en: "Auto-Encoding Variational Bayes",
  name_ko: "VAE",
  oneliner: "잠재 변수의 확률 분포를 학습하는 생성형 오토인코더",
  link: { kind: "arxiv", label: "arXiv:1312.6114", url: "https://arxiv.org/abs/1312.6114" }
});

window.AITL.register({
  id: "gan-2014", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2014, date: "2014-06", evolves_from: [],
  title_en: "Generative Adversarial Networks",
  name_ko: "GAN",
  oneliner: "생성자와 판별자의 적대적 경쟁으로 실사 생성을 학습",
  link: { kind: "arxiv", label: "arXiv:1406.2661", url: "https://arxiv.org/abs/1406.2661" }
});

window.AITL.register({
  id: "dcgan-2015", sector: "generative", also_in: [], type: "paper", tier: "minor",
  year: 2015, date: "2015-11", evolves_from: ["gan-2014"],
  title_en: "Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks",
  name_ko: "DCGAN",
  oneliner: "합성곱 구조와 학습 안정화 레시피로 GAN을 실용화",
  link: { kind: "arxiv", label: "arXiv:1511.06434", url: "https://arxiv.org/abs/1511.06434" }
});

window.AITL.register({
  id: "pix2pix-2016", sector: "generative", also_in: [], type: "paper", tier: "minor",
  year: 2016, date: "2016-11", evolves_from: ["gan-2014"],
  title_en: "Image-to-Image Translation with Conditional Adversarial Networks",
  name_ko: "Pix2Pix",
  oneliner: "조건부 GAN으로 이미지 간 변환을 범용 프레임워크화",
  link: { kind: "arxiv", label: "arXiv:1611.07004", url: "https://arxiv.org/abs/1611.07004" }
});

window.AITL.register({
  id: "stylegan-2018", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2018, date: "2018-12", evolves_from: ["dcgan-2015"],
  title_en: "A Style-Based Generator Architecture for Generative Adversarial Networks",
  name_ko: "StyleGAN",
  oneliner: "스타일 주입 구조로 고해상도 얼굴 생성과 속성 제어",
  link: { kind: "arxiv", label: "arXiv:1812.04948", url: "https://arxiv.org/abs/1812.04948" }
});

window.AITL.register({
  id: "ddpm-2020", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2020, date: "2020-06", evolves_from: [],
  title_en: "Denoising Diffusion Probabilistic Models",
  name_ko: "DDPM (확산 모델)",
  oneliner: "노이즈를 점진적으로 걷어내며 생성하는 확산 모델의 정립",
  link: { kind: "arxiv", label: "arXiv:2006.11239", url: "https://arxiv.org/abs/2006.11239" }
});

window.AITL.register({
  id: "nerf-2020", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2020, date: "2020-03", evolves_from: [],
  title_en: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis",
  name_ko: "NeRF",
  oneliner: "신경망으로 3D 장면을 표현해 새로운 시점을 합성",
  link: { kind: "arxiv", label: "arXiv:2003.08934", url: "https://arxiv.org/abs/2003.08934" }
});

window.AITL.register({
  id: "dalle-2021", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2021, date: "2021-02", evolves_from: ["vae-2013", "gpt3-2020"],
  title_en: "Zero-Shot Text-to-Image Generation",
  name_ko: "DALL·E",
  oneliner: "텍스트에서 이미지를 생성하는 대규모 자기회귀 모델",
  link: { kind: "arxiv", label: "arXiv:2102.12092", url: "https://arxiv.org/abs/2102.12092" }
});

window.AITL.register({
  id: "dalle2-2022", sector: "generative", also_in: [], type: "paper", tier: "minor",
  year: 2022, date: "2022-04", evolves_from: ["dalle-2021", "ddpm-2020"],
  title_en: "Hierarchical Text-Conditional Image Generation with CLIP Latents",
  name_ko: "DALL·E 2",
  oneliner: "CLIP 잠재 공간과 확산 모델의 결합으로 품질 도약",
  link: { kind: "arxiv", label: "arXiv:2204.06125", url: "https://arxiv.org/abs/2204.06125" }
});

window.AITL.register({
  id: "stable-diffusion-2022", sector: "generative", also_in: [], type: "model", tier: "major",
  year: 2022, date: "2022-08", evolves_from: ["ddpm-2020"],
  title_en: "Stable Diffusion (Latent Diffusion Models)",
  name_ko: "Stable Diffusion",
  oneliner: "잠재 공간 확산으로 고품질 생성을 소비자 GPU에 개방",
  link: { kind: "arxiv", label: "arXiv:2112.10752", url: "https://arxiv.org/abs/2112.10752" }
});

window.AITL.register({
  id: "gaussian-splatting-2023", sector: "generative", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-08", evolves_from: ["nerf-2020"],
  title_en: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
  name_ko: "3D Gaussian Splatting",
  oneliner: "가우시안 점군 표현으로 radiance field를 실시간화",
  link: { kind: "arxiv", label: "arXiv:2308.04079", url: "https://arxiv.org/abs/2308.04079" }
});

window.AITL.register({
  id: "sora-2024", sector: "generative", also_in: [], type: "product", tier: "major",
  year: 2024, date: "2024-02", evolves_from: ["stable-diffusion-2022"],
  title_en: "Sora",
  name_ko: "Sora",
  oneliner: "확산 트랜스포머 기반의 장시간 고품질 비디오 생성",
  link: null
});
