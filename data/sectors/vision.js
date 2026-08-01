// vision — 컴퓨터 비전 섹터 데이터 (Phase 2 골격, detail은 Phase 3에서)

window.AITL.register({
  id: "alexnet-2012", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2012, date: "2012", evolves_from: [],
  title_en: "ImageNet Classification with Deep Convolutional Neural Networks",
  name_ko: "AlexNet",
  oneliner: "GPU로 학습한 심층 CNN이 이미지 인식 대회를 압도",
  link: null,
  detail: {
    tldr: "GPU로 학습한 8층 합성곱 신경망이 ImageNet 대회에서 기존 방식을 큰 격차로 이기며 딥러닝 시대를 열었다.",
    levels: {
      intro: `<p>2012년 이전의 이미지 인식은 사람이 만든 규칙에 크게 의존했다. 연구자가 "모서리, 색 분포, 질감 같은 특징을 이렇게 뽑아라"라고 손으로 설계한 뒤, 그 특징을 분류기에 넣는 방식이었다. 마치 요리사가 재료 손질법을 일일이 레시피로 적어주는 것과 같다. 비유에서 손질 레시피는 실제로 사람이 설계한 특징 추출기(hand-crafted feature)에 해당한다.</p>
<p>AlexNet의 접근은 달랐다. 특징을 뽑는 법 자체를 기계가 데이터에서 스스로 배우게 했다. 수백만 장의 사진과 정답 라벨을 주고, 여러 층으로 쌓인 인공 신경망이 "고양이를 알아보려면 어떤 무늬와 모양에 주목해야 하는가"를 시행착오로 익히게 한 것이다. 비유하자면 레시피를 주는 대신 수많은 완성 요리와 재료를 보여주고 손질법을 스스로 터득하게 한 셈인데, 비유에서 완성 요리와 재료는 실제로 라벨이 달린 대규모 이미지 데이터(ImageNet)에, 스스로 터득하는 과정은 실제로 오차를 줄이는 방향으로 신경망 가중치를 조정하는 학습(역전파)에 해당한다.</p>
<p>이런 아이디어 자체는 오래전부터 있었지만, 그동안은 계산량과 데이터가 부족해 깊은 신경망을 제대로 학습시킬 수 없었다. AlexNet은 게임용 그래픽 카드(GPU) 두 장으로 병렬 계산을 돌리고, 대규모 데이터셋 ImageNet을 활용해 이 벽을 넘었다. 그 결과 2012년 이미지 인식 대회(ILSVRC)에서 2위와 큰 격차로 우승했고, 컴퓨터 비전 연구 전체가 딥러닝으로 방향을 트는 결정적 계기가 됐다.</p>`,
      mid: `<p>AlexNet은 합성곱 신경망(CNN, convolutional neural network)이다. 합성곱 층은 작은 필터(filter)를 이미지 전체에 밀며 적용해, 위치에 상관없이 같은 패턴(모서리, 질감 등)을 감지한다. 층을 쌓을수록 앞 층의 단순 패턴이 조합되어 눈·바퀴·얼굴 같은 복잡한 개념으로 추상화된다. 이 구조는 1990년대 LeNet에서 이미 제안됐지만, AlexNet은 이를 당시 기준 매우 큰 규모(합성곱 5층 + 완전연결 3층, 약 6천만 파라미터)로 키워 대규모 데이터에 적용했다는 점이 다르다.</p>
<p>규모를 키우면 두 가지 문제가 생긴다. 첫째는 계산량이다. AlexNet은 GPU 2장에 모델을 나눠 싣고 병렬로 학습해 이를 해결했다. 둘째는 과적합(overfitting) — 훈련 데이터만 외우고 새 데이터에 약해지는 현상 — 이다. 이를 막기 위해 이미지를 자르고 뒤집어 데이터를 부풀리는 데이터 증강(data augmentation), 그리고 학습 중 뉴런 일부를 무작위로 꺼서 특정 뉴런에 의존하지 못하게 하는 드롭아웃(dropout)을 사용했다.</p>
<p>활성 함수로는 당시 표준이던 시그모이드(sigmoid)나 tanh 대신 ReLU(rectified linear unit)를 썼다. ReLU는 입력이 양수면 그대로, 음수면 0을 내보내는 단순한 함수인데, 깊은 층에서도 기울기가 잘 살아 있어 학습이 몇 배 빨라진다. 이 조합 — 큰 CNN + GPU + 대규모 데이터 + ReLU + 드롭아웃 — 으로 ImageNet 분류 오류율을 기존 대비 크게 낮추며, "데이터와 계산을 늘리면 학습된 특징이 사람이 설계한 특징을 이긴다"는 것을 처음으로 대규모로 입증했다.</p>`,
      deep: `<p>구조를 순서대로 따라가면 다음과 같다. 입력은 224×224 크기의 RGB 이미지다.</p>
<ol>
<li><b>합성곱 1층:</b> 11×11 크기의 큰 필터를 보폭(stride) 4로 적용해 해상도를 빠르게 줄이면서 저수준 패턴(방향성 모서리, 색 대비)을 추출한다. 각 합성곱 출력에는 ReLU를 적용한다. ReLU는 f(x)=max(0,x)로, x는 뉴런의 입력 합이다. 포화 구간이 없어 기울기 소실이 완화되고, 논문은 tanh 대비 학습 수렴이 수 배 빨랐다고 보고한다.</li>
<li><b>합성곱 2~5층:</b> 5×5, 3×3 필터로 점차 추상적인 특징을 쌓는다. 중간에 최대 풀링(max pooling)으로 공간 크기를 줄이는데, 풀링 창을 보폭보다 크게 잡는 중첩 풀링(overlapping pooling)을 써 과적합을 소폭 줄였다. 1·2층 뒤에는 국소 응답 정규화(local response normalization)를 두어 이웃 채널 간 활성 경쟁을 유도했다(이 기법은 이후 배치 정규화 등장으로 사실상 폐기된다).</li>
<li><b>완전연결 3층:</b> 특징 맵을 펼쳐 4096차원 완전연결 층 두 개를 거친 뒤, 1000개 클래스에 대한 softmax로 확률을 출력한다. 파라미터 대부분이 이 완전연결 층에 몰려 있어 과적합 위험이 가장 크므로, 여기에 드롭아웃을 확률 0.5로 적용했다. 드롭아웃은 학습 시 각 뉴런 출력을 확률 p로 0으로 만드는 것으로, 뉴런 간 공적응(co-adaptation)을 깨는 일종의 암묵적 앙상블로 해석된다.</li>
<li><b>2-GPU 분산:</b> 당시 GPU 메모리(3GB)에 모델이 다 들어가지 않아, 채널을 반씩 나눠 GPU 두 장에 올리고 특정 층에서만 GPU 간 통신을 허용하는 모델 병렬화를 썼다. 이는 메모리 제약이 낳은 공학적 타협이지만, 대규모 학습에서 하드웨어 제약과 아키텍처 설계가 얽힌다는 이후 반복될 패턴의 초기 사례다.</li>
<li><b>학습:</b> 모멘텀 SGD(stochastic gradient descent)로 학습하되, 검증 오류가 정체될 때 학습률을 10분의 1로 낮추는 스케줄을 썼다. 데이터 증강으로는 256×256 이미지에서 224×224 무작위 크롭과 좌우 반전, 그리고 RGB 채널의 주성분 방향으로 색을 흔드는 PCA 색 증강을 사용했다. 테스트 시에는 여러 크롭의 예측을 평균했다.</li>
</ol>
<p>결과적으로 ILSVRC-2012에서 top-5 오류율을 2위(전통적 특징 기반 방법)보다 약 10%p 낮은 수준으로 끌어내렸다. 개별 요소(CNN, ReLU, GPU 학습, 드롭아웃)는 모두 선행 연구가 있었으나, 이들을 대규모 데이터 위에서 결합해 압도적 격차를 실증한 것이 이 논문의 기여다. 학습된 1층 필터가 가보(Gabor) 유사 모서리 검출기와 색 블롭으로 수렴한다는 시각화는, 손으로 설계하던 특징이 데이터로부터 재발견될 수 있음을 보여준 상징적 결과였다.</p>`
    },
    impact: `<p>AlexNet은 컴퓨터 비전을 넘어 AI 전체의 분수령이다. 이후 수년간 비전 연구는 사실상 "더 깊고 더 나은 CNN 만들기"로 재편됐고, <a href="#/item/vgg-2014">VGG</a>, <a href="#/item/googlenet-2014">GoogLeNet</a>, <a href="#/item/resnet-2015">ResNet</a>이 그 직계 후손이다. 학습된 특징을 다른 과제에 이식하는 전이 학습(transfer learning)이 표준이 되어 <a href="#/item/rcnn-2013">R-CNN</a> 같은 검출 연구의 토대가 됐다. 산업적으로는 GPU가 AI 인프라의 중심이 되는 흐름의 출발점이었고, "데이터 × 계산 × 신경망 규모"라는 조합의 힘을 입증해 이후 대규모 사전학습 시대의 원형이 됐다.</p>`,
    uncertainty: []
  }
});

window.AITL.register({
  id: "rcnn-2013", sector: "vision", also_in: [], type: "paper", tier: "major",
  year: 2013, date: "2013-11", evolves_from: ["alexnet-2012"],
  title_en: "Rich feature hierarchies for accurate object detection and semantic segmentation",
  name_ko: "R-CNN",
  oneliner: "CNN 특징을 객체 검출에 도입해 검출 성능을 도약",
  link: { kind: "arxiv", label: "arXiv:1311.2524", url: "https://arxiv.org/abs/1311.2524" },
  detail: {
    tldr: "이미지에서 후보 영역을 뽑아 각 영역을 CNN으로 분류하는 2단계 설계로, 객체 검출 성능을 단숨에 끌어올렸다.",
    levels: {
      intro: `<p>이미지 분류는 "이 사진이 무엇인가"에 답하지만, 객체 검출(object detection)은 "무엇이 어디에 있는가"까지 답해야 한다. 사진 한 장에 개, 자전거, 사람이 함께 있으면 각각의 위치를 상자로 표시하고 이름을 붙여야 하는 것이다. 2012년 AlexNet이 분류에서 큰 성공을 거두자, 자연스러운 질문이 나왔다. 그 강력한 인식 능력을 검출에도 쓸 수 없을까?</p>
<p>R-CNN의 답은 두 단계 전략이다. 먼저 "여기 뭔가 있을 것 같다" 싶은 후보 영역을 이미지에서 2천 개쯤 뽑는다. 그다음 각 후보 영역을 잘라내 CNN에 넣고 "이건 개다 / 이건 배경이다"를 판별한다. 보물찾기에 비유하면, 넓은 운동장을 무작정 파는 대신 금속 탐지기가 반응한 지점들만 골라 그 자리를 정밀하게 파보는 것이다. 비유에서 금속 탐지기가 반응한 지점은 실제로 색·질감의 연속성으로 뽑은 후보 영역(region proposal)에 해당하고, 정밀하게 파보는 일은 실제로 각 영역을 CNN으로 분류하는 과정에 해당한다.</p>
<p>또 하나 중요한 기여는 전이 학습이다. 검출용 라벨 데이터는 분류용보다 훨씬 적었는데, R-CNN은 ImageNet 분류로 미리 학습해 둔 CNN을 가져와 검출 데이터로 조금만 더 다듬는(fine-tuning) 방식으로 데이터 부족을 넘었다. 이 방법으로 당시 검출 벤치마크 성능을 큰 폭으로 끌어올렸고, "큰 데이터로 사전학습 후 작은 데이터로 미세조정"이라는 오늘날 표준 패턴의 초기 성공 사례가 됐다.</p>`,
      mid: `<p>R-CNN 파이프라인은 세 부분으로 이루어진다. (1) 영역 제안: 선택적 탐색(selective search)이라는 비학습 알고리즘으로, 색·질감이 비슷한 픽셀 덩어리를 병합해 가며 객체가 있을 법한 후보 상자를 이미지당 약 2천 개 생성한다. (2) 특징 추출: 각 후보 상자를 잘라 고정 크기(227×227)로 변형한 뒤 CNN(AlexNet 구조)에 통과시켜 특징 벡터를 얻는다. (3) 분류·보정: 클래스별 SVM(support vector machine)이 특징 벡터를 보고 객체 여부를 판정하고, 별도의 회귀 모델이 상자 좌표를 정밀하게 보정(bounding box regression)한다.</p>
<p>핵심 통찰은 검출 문제를 "영역 단위 분류 문제"로 환원한 것이다. 위치 추정이라는 어려운 문제를 후보 생성기에 맡기고, CNN은 잘하는 일(분류)만 하게 했다. 여기에 ImageNet 사전학습 → 검출 데이터 미세조정이라는 전이 학습을 결합해, 라벨이 부족한 과제에서도 CNN 특징의 위력을 끌어냈다. PASCAL VOC 벤치마크에서 기존 최고 방식 대비 평균 정밀도(mAP)를 큰 폭으로 개선했다.</p>
<p>한계도 명확했다. 후보 2천 개를 각각 CNN에 통과시키므로 이미지 한 장 처리에 수십 초가 걸렸고, 학습도 CNN·SVM·상자 회귀를 따로따로 훈련하는 다단계 절차였다. 이 비효율을 없애는 것이 이후 Fast R-CNN과 <a href="#/item/faster-rcnn-2015">Faster R-CNN</a>의 과제가 된다.</p>`,
      deep: `<p>파이프라인을 단계별로 짚으면 다음과 같다.</p>
<ol>
<li><b>영역 제안:</b> 선택적 탐색은 그래프 기반 초기 분할로 작은 조각들을 만든 뒤, 색 히스토그램·질감·크기 유사도로 인접 조각을 계층적으로 병합하며 각 병합 단계의 외접 상자를 후보로 수집한다. 학습이 필요 없고 재현율(recall)이 높은 대신, 후보의 정밀도는 낮아 대부분이 배경이다.</li>
<li><b>워핑과 특징 추출:</b> 각 후보를 주변 여백 약간과 함께 227×227로 비등방 워핑(warping)해 CNN에 넣는다. CNN은 ImageNet 1000-클래스 분류로 사전학습한 뒤, 검출 클래스(N개)+배경의 (N+1)-way softmax로 교체해 미세조정한다. 미세조정 시 정답 상자와의 IoU(intersection over union, 두 상자의 교집합 넓이를 합집합 넓이로 나눈 값) ≥ 0.5인 후보를 양성으로 삼는다.</li>
<li><b>SVM 분류:</b> 미세조정된 CNN의 특징(fc7 벡터)으로 클래스별 이진 SVM을 학습한다. 이때는 정답 상자만 양성, IoU &lt; 0.3인 후보를 음성으로 하는 더 엄격한 기준을 쓰고, 배경 후보가 압도적으로 많으므로 어려운 음성 예제를 골라 재학습하는 hard negative mining을 적용한다. softmax 대신 SVM을 쓴 것은 당시 실험적으로 성능이 더 좋았기 때문이다.</li>
<li><b>상자 회귀:</b> 후보 상자 P에서 정답 상자 G로 가는 변환(중심 이동 dx, dy와 폭·높이의 로그 스케일 변화 dw, dh)을 CNN 특징의 선형 회귀로 예측해 위치를 보정한다. 이 파라미터화는 이후 검출기들이 그대로 물려받는다.</li>
<li><b>후처리:</b> 클래스별로 비최대 억제(NMS, non-maximum suppression)를 적용해, 점수가 높은 상자와 많이 겹치는(IoU가 임계값 이상) 중복 상자를 제거한다.</li>
</ol>
<p>결과는 PASCAL VOC 2010 기준 mAP 53.7%로, DPM 등 기존 최고 방식(약 33~40% 수준)을 크게 앞섰다. 분석 실험도 영향력이 컸다. 미세조정 없이 사전학습 특징만 써도 기존 방식을 이긴다는 것, 미세조정이 특히 검출 특화 표현을 만들어 준다는 것을 절제 실험(ablation)으로 보였고, 이는 전이 학습의 유효성에 대한 초기의 체계적 증거가 됐다. 반면 후보마다 CNN 순전파를 반복하는 구조적 중복, 3단계 분리 학습, 특징 디스크 캐싱 등 공학적 부담이 커서, 공유 특징 맵 위에서 영역별 풀링을 하는 SPPnet·Fast R-CNN 계열 개선을 곧바로 촉발했다.</p>`
    },
    impact: `<p>R-CNN은 "CNN 특징 + 영역 제안"이라는 2단계 검출 패러다임을 확립했고, Fast R-CNN, <a href="#/item/faster-rcnn-2015">Faster R-CNN</a>, Mask R-CNN으로 이어지는 계보의 뿌리가 됐다. IoU 기반 양성/음성 배정, 상자 회귀 파라미터화, NMS 후처리 같은 설계 요소는 이후 검출기의 공용 어휘로 남았다. 더 넓게는 "대규모 분류 사전학습 → 소규모 과제 미세조정" 전이 학습이 비전 전반의 표준 방법론으로 자리 잡는 데 결정적 실증을 제공했다. 한편 이 방식의 느린 속도는 검출을 단일 신경망으로 통합하려는 <a href="#/item/yolo-2015">YOLO</a> 계열 1단계 검출기 연구를 자극했다.</p>`,
    uncertainty: []
  }
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
