// vision — 컴퓨터 비전 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "alexnet-2012", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2012, date: "2012", evolves_from: [],
  title_en: "ImageNet Classification with Deep Convolutional Neural Networks",
  name_ko: "AlexNet",
  oneliner: "GPU로 학습한 심층 CNN이 이미지 인식 대회를 압도",
  link: null
});

window.AITL.register({
  id: "rcnn-2013", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2013, date: "2013-11", evolves_from: ["alexnet-2012"],
  title_en: "Rich feature hierarchies for accurate object detection and semantic segmentation",
  name_ko: "R-CNN",
  oneliner: "CNN 특징을 객체 검출에 도입해 검출 성능을 도약",
  link: { kind: "arxiv", label: "arXiv:1311.2524", url: "https://arxiv.org/abs/1311.2524" }
});

window.AITL.register({
  id: "vgg-2014", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2014, date: "2014-09", evolves_from: ["alexnet-2012"],
  title_en: "Very Deep Convolutional Networks for Large-Scale Image Recognition",
  name_ko: "VGG",
  oneliner: "3×3 합성곱만 깊게 쌓는 단순·균일 설계의 힘",
  link: { kind: "arxiv", label: "arXiv:1409.1556", url: "https://arxiv.org/abs/1409.1556" }
});

window.AITL.register({
  id: "googlenet-2014", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2014, date: "2014-09", evolves_from: ["alexnet-2012"],
  title_en: "Going Deeper with Convolutions",
  name_ko: "GoogLeNet",
  oneliner: "인셉션 모듈로 연산 효율과 깊이를 동시에 확보",
  link: { kind: "arxiv", label: "arXiv:1409.4842", url: "https://arxiv.org/abs/1409.4842" }
});

window.AITL.register({
  id: "resnet-2015", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2015, date: "2015-12", evolves_from: ["vgg-2014"],
  title_en: "Deep Residual Learning for Image Recognition",
  name_ko: "ResNet",
  oneliner: "잔차 연결로 100층 이상의 초심층 학습을 가능하게 함",
  link: { kind: "arxiv", label: "arXiv:1512.03385", url: "https://arxiv.org/abs/1512.03385" }
});

window.AITL.register({
  id: "faster-rcnn-2015", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2015, date: "2015-06", evolves_from: ["rcnn-2013"],
  title_en: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks",
  name_ko: "Faster R-CNN",
  oneliner: "영역 제안까지 신경망으로 통합한 end-to-end 검출",
  link: { kind: "arxiv", label: "arXiv:1506.01497", url: "https://arxiv.org/abs/1506.01497" }
});

window.AITL.register({
  id: "yolo-2015", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2015, date: "2015-06", evolves_from: ["faster-rcnn-2015"],
  title_en: "You Only Look Once: Unified, Real-Time Object Detection",
  name_ko: "YOLO",
  oneliner: "검출을 단일 회귀 문제로 바꿔 실시간 처리를 실현",
  link: { kind: "arxiv", label: "arXiv:1506.02640", url: "https://arxiv.org/abs/1506.02640" }
});

window.AITL.register({
  id: "unet-2015", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2015, date: "2015-05", evolves_from: [],
  title_en: "U-Net: Convolutional Networks for Biomedical Image Segmentation",
  name_ko: "U-Net",
  oneliner: "수축-확장 대칭 구조로 정밀한 픽셀 단위 분할",
  link: { kind: "arxiv", label: "arXiv:1505.04597", url: "https://arxiv.org/abs/1505.04597" }
});

window.AITL.register({
  id: "vit-2020", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2020, date: "2020-10", evolves_from: ["transformer-2017"],
  title_en: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
  name_ko: "ViT",
  oneliner: "이미지를 패치 시퀀스로 보고 트랜스포머로 처리",
  link: { kind: "arxiv", label: "arXiv:2010.11929", url: "https://arxiv.org/abs/2010.11929" }
});

window.AITL.register({
  id: "dino-v1-2021", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2021, date: "2021-04", evolves_from: ["vit-2020"],
  title_en: "Emerging Properties in Self-Supervised Vision Transformers",
  name_ko: "DINO",
  oneliner: "라벨 없는 자기지도 학습에서 분할 특성이 창발",
  link: { kind: "arxiv", label: "arXiv:2104.14294", url: "https://arxiv.org/abs/2104.14294" }
});

window.AITL.register({
  id: "dino-v2-2023", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2023, date: "2023-04", evolves_from: ["dino-v1-2021"],
  title_en: "DINOv2: Learning Robust Visual Features without Supervision",
  name_ko: "DINOv2",
  oneliner: "데이터 큐레이션과 규모 확대로 범용 시각 특징 달성",
  link: { kind: "arxiv", label: "arXiv:2304.07193", url: "https://arxiv.org/abs/2304.07193" }
});

window.AITL.register({
  id: "sam-2023", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-04", evolves_from: ["vit-2020"],
  title_en: "Segment Anything",
  name_ko: "SAM",
  oneliner: "프롬프트로 무엇이든 분할하는 파운데이션 모델",
  link: { kind: "arxiv", label: "arXiv:2304.02643", url: "https://arxiv.org/abs/2304.02643" }
});

window.AITL.register({
  id: "sam2-2024", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2024, date: "2024-07", evolves_from: ["sam-2023"],
  title_en: "SAM 2: Segment Anything in Images and Videos",
  name_ko: "SAM 2",
  oneliner: "스트리밍 메모리로 분할을 비디오까지 확장",
  link: { kind: "arxiv", label: "arXiv:2408.00714", url: "https://arxiv.org/abs/2408.00714" }
});

window.AITL.register({
  id: "dino-v3-2025", sector: "vision", also_in: [], type: "paper", tier: "minor",
  year: 2025, date: "2025", evolves_from: ["dino-v2-2023"],
  title_en: "DINOv3",
  name_ko: "DINOv3",
  oneliner: "자기지도 시각 특징 계열의 규모 확장 후속판",
  link: null
});
