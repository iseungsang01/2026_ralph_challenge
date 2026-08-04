# PRD — AI 발전 흐름 by Sector

이 문서는 normative하다. 루프는 이 문서와 `specs/POLICY.md`를 매 이터레이션 정독하고 따른다.
충돌 시 우선순위: POLICY > PRD > IMPLEMENTATION_PLAN.

## 1. 목표

2012(AlexNet)→2026 AI 발전사를 **9개 기술 섹터별 시계열 flow chart(계보도)** 로 한눈에 보여주고,
노드를 클릭하면 **입문/중급/심화 3단계 수준별 상세 해설**로 깊이 들어갈 수 있는
오프라인 단일 정적 사이트를 만든다.

- 독자가 flow chart를 "직접 보다가 아 이런 아이디어를 써볼 수 있겠다"라고 느끼도록,
  버전 계보(DINOv1→v2→v3 등)의 병렬/직렬 분기를 시각적으로 드러낸다.
- 겉(사이드바 + flow chart)은 깔끔하게, 깊은 내용은 상세 페이지에서만 보인다.

### 비목표 (Non-goals)

검색 기능, 다국어 토글, 애니메이션 라이브러리, 백엔드, 웹 접근(fetch), 외부 JS/CSS/폰트 라이브러리,
이미지 파일(인라인 SVG 제외). 전부 만들지 않는다.

## 2. 섹터 레지스트리 (고정 — 루프가 변경 금지)

`data/meta.js`에 아래 9개를 이 순서(order)와 id로 등록한다. color는 섹터 액센트(연한 톤 계열로 루프가 선택하되 섹터 간 구분이 명확해야 함).

| order | id | name_ko | name_en |
|---|---|---|---|
| 1 | `nlp_llm` | 자연어 처리·LLM | NLP & LLMs |
| 2 | `vision` | 컴퓨터 비전 | Computer Vision |
| 3 | `generative` | 생성 모델 | Generative Models |
| 4 | `rl_games` | 강화학습·게임 AI | RL & Game AI |
| 5 | `multimodal` | 멀티모달 | Multimodal |
| 6 | `speech_audio` | 음성·오디오 | Speech & Audio |
| 7 | `robotics` | 로보틱스 | Robotics |
| 8 | `code_agents` | 코드 생성·에이전트 | Code & Agents |
| 9 | `ai4science` | AI for Science | AI for Science |

## 3. 노드(항목) 스키마 (normative — validate.js가 강제)

각 섹터 데이터 파일(`data/sectors/<sectorId>.js`)은 노드마다 `window.AITL.register({...})`를 한 번 호출한다.

```js
{
  id: "dino-v2-2023",            // kebab-case, 전역 유일, 해시 라우팅에 사용
  sector: "vision",              // 소유 섹터 (상세 페이지는 여기 1곳)
  also_in: [],                   // 공동 노출 섹터 (없으면 [])
  type: "paper",                 // "paper" | "model" | "product"
  tier: "major",                 // "major"(패러다임 전환) | "minor"(증분 개선)
  year: 2023,
  date: "2023-04",               // "YYYY" 또는 "YYYY-MM" (월 불확실하면 YYYY만, POLICY §13)
  evolves_from: ["dino-v1-2021"],// 직접 계승 엣지 최대 2개, 루트면 [] (POLICY §4~§8)
  title_en: "DINOv2: Learning Robust Visual Features without Supervision",
  name_ko: "DINOv2",
  oneliner: "…",                 // 순수 텍스트 ≤60자, flow chart 노드 카드/툴팁용
  link: { kind: "arxiv", label: "arXiv:2304.07193",
          url: "https://arxiv.org/abs/2304.07193" },   // 또는 kind:"report"|"blog", 또는 null
  detail: {                      // Phase 2 골격 단계에서는 detail 필드 자체를 생략
    tldr: "…",                   // 한 줄 핵심, 20~120자
    levels: {
      intro: `…`,                // §4 참조. 수식·그리스 문자 금지
      mid:   `…`,
      deep:  `…`
    },
    impact: `…`,                 // 레벨 공통 (영향/의의)
    uncertainty: []              // ⚠ 노트 문자열 배열, 확신하면 []
  }
}
```

- detail 내 HTML 문자열 허용 태그: `p, ol, ul, li, table, thead, tbody, tr, th, td, b, i, em, strong, code, sub, sup, br, a` (POLICY §18, §20, §26)
- **major 분량 하한**(태그 제거 후 글자 수): intro≥400, mid≥600, deep≥1000(그리고 `<p>`/`<li>` 단계 ≥4), impact≥200
- **minor 분량 하한**: intro/mid/deep 각 ≥200, impact≥100. 내용은 "전 버전 대비 무엇을·왜·어떻게 바꿨나" 중심 (POLICY §21)

## 4. 수준별 콘텐츠 정의

상세 페이지에는 `[입문 | 중급 | 심화]` 토글이 있고, 각 레벨은 **독립적으로 읽혀도 완결**되어야 한다 (POLICY §19).

| 레벨 | 독자 페르소나 | 규칙 |
|---|---|---|
| **입문 (intro)** | 비전공 대학생. AI 뉴스는 보지만 코드는 모름 | 비유 중심. 수식·그리스 문자 금지. 모든 비유 뒤에 "비유↔실제 대응" 명시 (POLICY §18) |
| **중급 (mid)** | CS 학부생. 선형대수·확률 기초는 앎 | 개념적 메커니즘. 용어는 정의하고 사용. 수식 없이 연산의 의미를 설명 |
| **심화 (deep)** | 대학원 세미나 발표 수준 | 실제 메커니즘 step-by-step. 필수 수식 1~3개(Unicode+`<sub>/<sup>`), 기호는 첫 사용 시 정의 (POLICY §20) |

### 가독성 규칙 (POLICY §26 — validator가 강제)

문장에 정보를 욱여넣은 벽글은 결함이다. 정보 구조를 시각적으로 드러낸다.

- `<p>` 하나는 태그 제거 후 **320자 이하**. 넘치면 문단을 나누거나 표·목록으로 옮긴다.
- 한 문단에 줄표(—) 삽입구 2회 이상 금지. 정의는 별도 문장이나 표로 뺀다.
- major의 mid에는 `<table>`/`<ul>`/`<ol>` 구조 요소가 **최소 1개** 필요하다.
- 다음은 산문 대신 **표가 기본**이다: 비유↔실제 대응(intro), A/B 대비(CBOW vs Skip-gram 등),
  셋 이상의 나열, deep의 수식 기호 정의.
- 표 스타일은 css가 담당한다. 태그에 속성(class 포함)을 붙이지 않는다.

### 골드 스탠다드 예시 1 — major 노드 (트랜스포머)

아래는 품질 기준점이다. 실제 항목은 이 예시의 **완성도와 밀도 이상**이어야 한다 (분량은 하한만 넘기면 됨).

```js
window.AITL.register({
  id: "transformer-2017", sector: "nlp_llm", also_in: [],
  type: "paper", tier: "major", year: 2017, date: "2017-06",
  evolves_from: ["attention-2014"],
  title_en: "Attention Is All You Need",
  name_ko: "트랜스포머(Transformer)",
  oneliner: "순환 없이 어텐션만으로 시퀀스를 병렬 처리하는 아키텍처",
  link: { kind: "arxiv", label: "arXiv:1706.03762", url: "https://arxiv.org/abs/1706.03762" },
  detail: {
    tldr: "단어들이 서로를 직접 참조하는 어텐션만으로 문장을 처리해, RNN의 순차 처리 한계를 없앤 아키텍처다.",
    levels: {
      intro: `<p>이전까지의 언어 모델(RNN 계열)은 문장을 <b>말 전하기 게임</b>처럼 처리했다. 첫 단어의 정보가 두 번째, 세 번째 단어를 거쳐 릴레이로 전달되는데, 문장이 길어질수록 앞의 정보가 점점 흐려진다. 또 반드시 앞 단어를 처리해야 다음 단어로 넘어갈 수 있어 속도도 느렸다.</p>
<p>트랜스포머(Transformer)의 아이디어는 릴레이를 없애고 <b>모든 단어가 한 회의실에 모여 서로 직접 대화</b>하게 하는 것이다. 각 단어는 "나와 관련 있는 단어 누구야?"라고 질문을 던지고, 다른 모든 단어의 명찰을 훑어본 뒤, 관련이 깊은 단어의 이야기를 더 집중해서 듣는다. 예컨대 "그 동물은 길을 건너지 못했다. 그것은 너무 피곤했다"에서 '그것'은 회의실 안의 '동물'에게 집중하게 된다.</p>
<p>비유를 실제와 대응시키면 이렇다.</p>
<table>
<thead><tr><th>비유</th><th>실제</th></tr></thead>
<tbody>
<tr><td>단어가 던지는 질문</td><td>쿼리(query)</td></tr>
<tr><td>각 단어의 명찰</td><td>키(key)</td></tr>
<tr><td>단어가 실제로 들려주는 이야기</td><td>밸류(value)</td></tr>
<tr><td>얼마나 집중해서 듣는가</td><td>어텐션 가중치(attention weight)</td></tr>
</tbody>
</table>
<p>모두가 동시에 대화하므로 순서를 기다릴 필요가 없어, 릴레이 방식보다 훨씬 빠르게(병렬로) 학습할 수 있다. 이 단순한 구조 변경이 이후 GPT, BERT 등 거의 모든 현대 AI의 뼈대가 됐다.</p>`,
      mid: `<p>핵심은 셀프 어텐션(self-attention)이다. 문장의 각 토큰(token)을 벡터로 표현한 뒤, 토큰마다 세 가지 벡터 — 쿼리(Q), 키(K), 밸류(V) — 를 서로 다른 학습된 행렬로 만들어낸다. 어떤 토큰의 출력은 <b>자기 쿼리와 모든 토큰의 키 사이 유사도를 잰 다음, 그 유사도를 가중치로 밸류들을 가중 평균</b>한 것이다. 즉 각 토큰이 문맥 전체에서 필요한 정보를 끌어와 자신의 표현을 갱신한다.</p>
<p>이 구조가 RNN 대비 갖는 이점은 두 가지다. 첫째, 임의의 두 토큰이 항상 1단계 만에 연결되므로 장거리 의존성(long-range dependency)이 소실되지 않는다. 둘째, 토큰 간 순차 의존이 없어 시퀀스 전체를 병렬로 계산할 수 있고, GPU 활용 효율이 급격히 오른다.</p>
<p>보완 장치가 두 개 있다.</p>
<ul>
<li><b>위치 인코딩(positional encoding)</b>: 어텐션 자체는 순서를 모르는 집합 연산이므로, 위치 정보를 담은 벡터를 입력에 더해준다.</li>
<li><b>멀티헤드 어텐션(multi-head attention)</b>: 유사도를 한 가지 기준으로만 재면 표현력이 부족하므로, Q/K/V를 여러 벌 만들어 서로 다른 관점(문법 관계, 지시 관계 등)으로 동시에 어텐션한다.</li>
</ul>
<p>여기에 토큰별 피드포워드 네트워크(feed-forward network), 잔차 연결(residual connection), 층 정규화(layer normalization)를 쌓아 인코더-디코더 구조를 완성한다.</p>`,
      deep: `<p>한 층의 셀프 어텐션 연산을 단계별로 따라가면 다음과 같다. 입력은 토큰 임베딩 행렬 X (n×d<sub>model</sub>, n=토큰 수)이고, 위치 인코딩을 더한 상태다.</p>
<ol>
<li><b>선형 사영:</b> 학습 행렬 W<sub>Q</sub>, W<sub>K</sub>, W<sub>V</sub>로 Q=XW<sub>Q</sub>, K=XW<sub>K</sub>, V=XW<sub>V</sub>를 만든다. 각 헤드에서 Q, K는 d<sub>k</sub>차원, V는 d<sub>v</sub>차원이다.</li>
<li><b>유사도 행렬:</b> QK<sup>T</sup> (n×n)의 (i,j) 성분은 토큰 i의 쿼리와 토큰 j의 키의 내적, 즉 "i가 j를 얼마나 참조할지"의 원점수다.</li>
<li><b>스케일링:</b> d<sub>k</sub>가 크면 내적의 분산이 커져 softmax가 한 점에 몰리고 기울기가 소실된다. 이를 막으려 √d<sub>k</sub>로 나눈다.</li>
<li><b>softmax:</b> 행별로 softmax를 취해 각 행이 합 1인 확률 분포, 즉 어텐션 가중치가 된다. 최종식은 Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>)V.</li>
<li><b>가중합:</b> 가중치로 V를 가중 평균해 각 토큰의 새 표현을 얻는다. 멀티헤드에서는 이 연산을 h개 헤드에서 병렬 수행하고 결과를 이어붙여(concat) W<sub>O</sub>로 다시 사영한다.</li>
<li><b>블록 완성:</b> 어텐션 출력에 잔차 연결과 층 정규화를 적용하고, 위치별 FFN(두 개의 선형 변환과 비선형 활성)을 거쳐 다시 잔차+정규화한다. 이 블록을 N층 쌓는다.</li>
</ol>
<p>디코더에는 두 가지가 추가된다. 미래 토큰을 못 보게 유사도 행렬의 상삼각을 -∞로 채우는 마스크드 어텐션(masked attention), 그리고 디코더의 Q가 인코더 출력의 K/V를 참조하는 교차 어텐션(cross-attention)이다. 위치 인코딩은 원논문에서는 주파수를 달리한 사인·코사인 함수를 사용했다.</p>
<p>계산 복잡도는 시퀀스 길이 n에 대해 O(n²·d)로 RNN의 O(n·d²)와 대비되는데, n이 길어질수록 어텐션의 n² 비용이 병목이 되며 이는 이후 효율적 어텐션 연구의 출발점이 된다.</p>`
    },
    impact: `<p>트랜스포머는 발표 후 수년 만에 NLP를 넘어 사실상 모든 분야의 표준 아키텍처가 됐다. GPT 계열(디코더만 사용)과 BERT(인코더만 사용)가 직접적 후손이고, 비전의 ViT, 음성의 Whisper, 단백질 구조 예측의 AlphaFold2까지 같은 뼈대를 공유한다. "병렬화 가능한 범용 시퀀스 처리기"라는 성질이 대규모 사전학습(pre-training) 시대를 여는 하드웨어적 전제 조건이 됐다는 점이 가장 큰 의의다.</p>`,
    uncertainty: []
  }
});
```

### 골드 스탠다드 예시 2 — minor 노드 (GPT-2)

minor 노드는 "전 버전 대비 변경점" 중심으로 컴팩트하게 쓴다. 전 버전 내용의 재설명은 금지하고 링크로 대신한다 (POLICY §21).

```js
window.AITL.register({
  id: "gpt2-2019", sector: "nlp_llm", also_in: [],
  type: "paper", tier: "minor", year: 2019, date: "2019-02",
  evolves_from: ["gpt1-2018"],
  title_en: "Language Models are Unsupervised Multitask Learners",
  name_ko: "GPT-2",
  oneliner: "규모를 키운 언어 모델이 배운 적 없는 과제를 zero-shot으로 수행",
  link: { kind: "blog", label: "OpenAI: Better Language Models",
          url: "https://openai.com/research/better-language-models" },
  detail: {
    tldr: "GPT-1의 구조를 거의 그대로 두고 모델·데이터 규모만 크게 키웠더니, 과제별 학습 없이도 요약·번역 같은 과제가 어느 정도 수행됐다.",
    levels: {
      intro: `<p><a href="#/item/gpt1-2018">GPT-1</a>에서 달라진 것은 본질적으로 <b>크기</b>다. 책을 열 배쯤 많이 읽은 사람이, 요약하는 법을 따로 배운 적이 없는데도 긴 글을 요약해내는 것과 비슷한 일이 일어났다.</p>
<p>비유의 대응은 이렇다. "많이 읽기"는 훨씬 큰 웹 텍스트로 다음 단어 예측을 학습한 것이다. "따로 배운 적 없는 요약"은 zero-shot 수행에 해당한다. 과제 전용 추가 학습(fine-tuning) 없이 지시만으로 과제를 해낸다는 뜻이다. 모델이 위험할 수 있다는 이유로 단계적으로 공개되어 논쟁을 일으킨 것으로도 유명하다.</p>`,
      mid: `<p>아키텍처는 GPT-1과 같은 디코더 전용 트랜스포머이고, 층 정규화 위치 이동 같은 소폭 조정만 있었다. 실질적 변경점은 세 가지다.</p>
<ul>
<li>파라미터를 최대 15억 개 규모로 확대</li>
<li>품질 필터링된 대규모 웹 문서 데이터셋(WebText) 구축</li>
<li>평가 방식의 전환: 과제를 별도 헤드로 학습하는 대신 "TL;DR:" 같은 텍스트 프롬프트로 지시하고, 언어 모델의 이어쓰기만으로 답을 얻는 zero-shot 평가를 전면에 세웠다</li>
</ul>
<p>"언어 모델을 충분히 키우면 다목적 학습기가 된다"는 프레임이 이 논문의 핵심 주장이다.</p>`,
      deep: `<p>기술적 변경점은 다음과 같다.</p>
<ol>
<li>층 정규화(layer normalization)를 각 서브블록 출력 뒤가 아니라 입력 앞으로 옮기고(pre-LN 방향), 마지막 블록 뒤에 추가 정규화를 두어 깊은 층에서의 학습 안정성을 높였다.</li>
<li>컨텍스트 길이를 512에서 1024 토큰으로 확장하고, 바이트 수준 BPE(byte pair encoding) 어휘를 사용해 임의 텍스트를 손실 없이 다뤘다.</li>
<li>잔차 경로 가중치를 층 수에 따라 1/√N으로 스케일링해 초기화했다.</li>
</ol>
<p>평가에서는 언어 모델링 벤치마크 다수에서 별도 미세조정 없이 당시 최고 성능을 얻었다. 요약·번역·질의응답을 프롬프트만으로 유도해, "과제 = 조건부 텍스트 생성"이라는 이후 GPT-3 in-context learning의 전신이 되는 관점을 제시했다.</p>`
    },
    impact: `<p>"구조 혁신 없이 규모 확대만으로 새 능력이 나타난다"는 관찰은 이후 스케일링 법칙 연구와 GPT-3의 직접적 근거가 됐다. 단계적 공개 결정은 AI 공개 정책 논쟁의 초기 사례로 남았다.</p>`,
    uncertainty: []
  }
});
```

## 5. 섹터별 계보 시드 리스트 (normative)

아래 목록이 **만들 노드의 전체 집합**이다. 루프는 노드를 추가·삭제하지 않는다
(사실관계상 심각한 오류를 발견한 경우만 POLICY §25에 따라 보수적으로 조정하고 Log에 기록).
`date`(월)는 루프가 지식 범위에서 확실할 때만 채운다. ghost는 다른 섹터 노드 참조를 뜻한다(POLICY §6).

### 5.1 nlp_llm (17개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| word2vec-2013 | Word2Vec | 2013 | major | paper | [] |
| seq2seq-2014 | Seq2Seq | 2014 | major | paper | [] |
| attention-2014 | 어텐션 (Bahdanau) | 2014 | major | paper | seq2seq-2014 |
| transformer-2017 | 트랜스포머 | 2017 | major | paper | attention-2014 |
| gpt1-2018 | GPT-1 | 2018 | major | paper | transformer-2017 |
| bert-2018 | BERT | 2018 | major | paper | transformer-2017 |
| gpt2-2019 | GPT-2 | 2019 | minor | paper | gpt1-2018 |
| t5-2019 | T5 | 2019 | minor | paper | bert-2018 |
| gpt3-2020 | GPT-3 | 2020 | major | paper | gpt2-2019 |
| scaling-laws-2020 | 스케일링 법칙 | 2020 | minor | paper | [] |
| chinchilla-2022 | Chinchilla | 2022 | minor | paper | scaling-laws-2020 |
| instructgpt-2022 | InstructGPT (RLHF) | 2022 | major | paper | gpt3-2020 |
| chatgpt-2022 | ChatGPT | 2022 | major | product | instructgpt-2022 |
| llama-2023 | LLaMA | 2023 | major | paper | chinchilla-2022 |
| gpt4-2023 | GPT-4 | 2023 | major | model | chatgpt-2022 |
| o1-2024 | OpenAI o1 (추론 모델) | 2024 | major | model | gpt4-2023 |
| deepseek-r1-2025 | DeepSeek-R1 | 2025 | minor | paper | o1-2024 |

### 5.2 vision (14개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| alexnet-2012 | AlexNet | 2012 | major | paper | [] |
| rcnn-2013 | R-CNN | 2013 | major | paper | alexnet-2012 |
| vgg-2014 | VGG | 2014 | minor | paper | alexnet-2012 |
| googlenet-2014 | GoogLeNet | 2014 | minor | paper | alexnet-2012 |
| resnet-2015 | ResNet | 2015 | major | paper | vgg-2014 |
| faster-rcnn-2015 | Faster R-CNN | 2015 | minor | paper | rcnn-2013 |
| yolo-2015 | YOLO | 2015 | major | paper | faster-rcnn-2015 |
| unet-2015 | U-Net | 2015 | major | paper | [] |
| vit-2020 | ViT | 2020 | major | paper | transformer-2017 (ghost) |
| dino-v1-2021 | DINO | 2021 | major | paper | vit-2020 |
| dino-v2-2023 | DINOv2 | 2023 | minor | paper | dino-v1-2021 |
| sam-2023 | SAM | 2023 | major | paper | vit-2020 |
| sam2-2024 | SAM 2 | 2024 | minor | paper | sam-2023 |
| dino-v3-2025 | DINOv3 | 2025 | minor | paper | dino-v2-2023 |

### 5.3 generative (12개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| vae-2013 | VAE | 2013 | major | paper | [] |
| gan-2014 | GAN | 2014 | major | paper | [] |
| dcgan-2015 | DCGAN | 2015 | minor | paper | gan-2014 |
| pix2pix-2016 | Pix2Pix | 2016 | minor | paper | gan-2014 |
| stylegan-2018 | StyleGAN | 2018 | major | paper | dcgan-2015 |
| ddpm-2020 | DDPM (확산 모델) | 2020 | major | paper | [] |
| nerf-2020 | NeRF | 2020 | major | paper | [] |
| dalle-2021 | DALL·E | 2021 | major | paper | vae-2013, gpt3-2020 (ghost) |
| dalle2-2022 | DALL·E 2 | 2022 | minor | paper | dalle-2021, ddpm-2020 |
| stable-diffusion-2022 | Stable Diffusion | 2022 | major | paper | ddpm-2020 |
| gaussian-splatting-2023 | 3D Gaussian Splatting | 2023 | major | paper | nerf-2020 |
| sora-2024 | Sora | 2024 | major | product | stable-diffusion-2022 |

### 5.4 rl_games (11개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| dqn-2013 | DQN | 2013 | major | paper | [] |
| a3c-2016 | A3C | 2016 | minor | paper | dqn-2013 |
| alphago-2016 | AlphaGo | 2016 | major | model | dqn-2013 |
| ppo-2017 | PPO | 2017 | major | paper | a3c-2016 |
| alphago-zero-2017 | AlphaGo Zero | 2017 | minor | paper | alphago-2016 |
| alphazero-2017 | AlphaZero | 2017 | minor | paper | alphago-zero-2017 |
| openai-five-2018 | OpenAI Five | 2018 | minor | model | ppo-2017 |
| alphastar-2019 | AlphaStar | 2019 | minor | model | [] |
| muzero-2019 | MuZero | 2019 | major | paper | alphazero-2017 |
| decision-transformer-2021 | Decision Transformer | 2021 | minor | paper | transformer-2017 (ghost) |
| dreamerv3-2023 | DreamerV3 | 2023 | minor | paper | muzero-2019 |

### 5.5 multimodal (9개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| show-and-tell-2015 | Show and Tell | 2015 | minor | paper | seq2seq-2014 (ghost) |
| clip-2021 | CLIP | 2021 | major | paper | vit-2020 (ghost) |
| flamingo-2022 | Flamingo | 2022 | major | paper | clip-2021 |
| blip2-2023 | BLIP-2 | 2023 | minor | paper | clip-2021 |
| llava-2023 | LLaVA | 2023 | major | paper | clip-2021, llama-2023 (ghost) |
| gpt4v-2023 | GPT-4V | 2023 | minor | model | gpt4-2023 (ghost) |
| gemini-2023 | Gemini | 2023 | major | model | [] |
| gpt4o-2024 | GPT-4o | 2024 | major | model | gpt4v-2023 |
| imagebind-2023 | ImageBind | 2023 | minor | paper | clip-2021 |

### 5.6 speech_audio (9개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| deep-speech-2014 | Deep Speech | 2014 | major | paper | [] |
| wavenet-2016 | WaveNet | 2016 | major | paper | [] |
| tacotron2-2017 | Tacotron 2 | 2017 | minor | paper | wavenet-2016 |
| wav2vec2-2020 | wav2vec 2.0 | 2020 | major | paper | transformer-2017 (ghost) |
| hubert-2021 | HuBERT | 2021 | minor | paper | wav2vec2-2020 |
| whisper-2022 | Whisper | 2022 | major | paper | transformer-2017 (ghost) |
| vall-e-2023 | VALL-E | 2023 | minor | paper | [] |
| musicgen-2023 | MusicGen | 2023 | minor | paper | [] |
| moshi-2024 | Moshi | 2024 | minor | paper | [] |

### 5.7 robotics (10개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| visuomotor-2015 | End-to-End Visuomotor | 2015 | major | paper | [] |
| domain-randomization-2017 | Domain Randomization | 2017 | minor | paper | [] |
| dactyl-2019 | Dactyl (루빅스 큐브 손) | 2019 | minor | model | ppo-2017 (ghost), domain-randomization-2017 |
| saycan-2022 | SayCan | 2022 | major | paper | gpt3-2020 (ghost) |
| rt1-2022 | RT-1 | 2022 | major | paper | transformer-2017 (ghost) |
| rt2-2023 | RT-2 | 2023 | major | paper | rt1-2022 |
| diffusion-policy-2023 | Diffusion Policy | 2023 | major | paper | ddpm-2020 (ghost) |
| act-aloha-2023 | ACT / ALOHA | 2023 | minor | paper | transformer-2017 (ghost) |
| openvla-2024 | OpenVLA | 2024 | minor | paper | rt2-2023 |
| pi0-2024 | π0 | 2024 | minor | paper | diffusion-policy-2023 |

### 5.8 code_agents (10개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| codex-2021 | Codex | 2021 | major | paper | gpt3-2020 (ghost) |
| copilot-2021 | GitHub Copilot | 2021 | minor | product | codex-2021 |
| alphacode-2022 | AlphaCode | 2022 | minor | paper | [] |
| react-2022 | ReAct | 2022 | major | paper | gpt3-2020 (ghost) |
| toolformer-2023 | Toolformer | 2023 | minor | paper | react-2022 |
| voyager-2023 | Voyager | 2023 | minor | paper | gpt4-2023 (ghost) |
| swe-bench-2023 | SWE-bench | 2023 | minor | paper | [] |
| swe-agent-2024 | SWE-agent | 2024 | major | paper | react-2022, swe-bench-2023 |
| cursor-2024 | Cursor | 2024 | minor | product | copilot-2021 |
| devin-2024 | Devin | 2024 | minor | product | [] |

### 5.9 ai4science (9개)

| id | name_ko | year | tier | type | evolves_from |
|---|---|---|---|---|---|
| alphafold1-2018 | AlphaFold | 2018 | minor | model | [] |
| alphafold2-2021 | AlphaFold2 | 2021 | major | paper | alphafold1-2018, transformer-2017 (ghost) |
| alphatensor-2022 | AlphaTensor | 2022 | minor | paper | alphazero-2017 (ghost) |
| esm2-2022 | ESM-2 | 2022 | minor | paper | bert-2018 (ghost) |
| graphcast-2023 | GraphCast | 2023 | major | paper | [] |
| gnome-2023 | GNoME | 2023 | minor | paper | [] |
| funsearch-2023 | FunSearch | 2023 | minor | paper | [] |
| alphageometry-2024 | AlphaGeometry | 2024 | minor | paper | [] |
| alphafold3-2024 | AlphaFold 3 | 2024 | minor | paper | alphafold2-2021 |

**합계: 101개 노드** (major 40 / minor 61 수준). 프리퀄(2012 이전 배경: 퍼셉트론, 역전파, LSTM, ImageNet 데이터셋, GPU 학습)은
노드가 아니라 메인 화면의 정적 블록으로 처리한다 (POLICY §12).

## 6. UI 명세 — 공통

- 해시 라우팅: `#/`(홈), `#/sector/<sectorId>`(flow chart), `#/item/<itemId>`(상세). 알 수 없는 해시 → 404 패널(홈 링크 포함). `hashchange` 리스너로 브라우저 앞/뒤로가기 완전 동작.
- 상세 페이지: 헤더(name_ko, title_en, 연도, 섹터 배지, tier 배지, 링크 버튼) + 레벨 토글 탭 `[입문|중급|심화]`(기본=중급, 선택은 localStorage에 기억) + tldr + 선택 레벨 본문 + impact + uncertainty(⚠ 각주 박스, 비었으면 미표시) + evolves_from/후속 노드 내비게이션("← 이전 계보 / 다음 계보 →") + "← flow chart로" 버튼.
- flow chart: x축=시간(연도 눈금), 노드=둥근 카드(name_ko+연도, tier에 따라 테두리 강조 차등), 엣지=`evolves_from` 기반 곡선 화살표. 레인 배정: 같은 계보는 같은 세로 레인 유지, 분기 시 새 레인. 노드 겹침 금지. ghost 노드(타 섹터 참조)는 점선 테두리+섹터명 표시, 클릭 시 해당 상세로 이동. `also_in` 노드는 "공동" 배지.
- 홈(`#/`): 프로젝트 제목, 짧은 소개, 프리퀄 블록(2012 이전 배경 최대 5개, 카드형 단문), 섹터 카드 9개(클릭 → flow chart).
- 시각 톤: 밝고 깔끔, 섹터별 액센트 컬러, 시스템 폰트 스택. 다크모드는 만들지 않는다(비목표).

## 7. UI 명세 — 데스크톱 (≥1024px)

- 좌측 고정 사이드바(너비 약 240px): 프로젝트 제목(홈 링크) + 섹터 9개 목록(액센트 컬러 도트 + name_ko + 항목 수 배지). 현재 섹터 하이라이트.
- 메인 영역: flow chart는 세로는 화면에 맞추고 가로 스크롤 허용. 노드 hover 시 oneliner 툴팁(단, hover 없이도 클릭만으로 모든 정보 접근 가능해야 함).
- 상세 페이지는 메인 영역 전체를 덮는 패널(최대 본문 폭 ~760px 중앙 정렬).

## 8. UI 명세 — 모바일 (<720px)

- 사이드바 → 상단 헤더의 햄버거 버튼으로 여는 드로어(drawer). 드로어 열림 시 배경 딤 처리, 바깥 탭으로 닫힘.
- flow chart: 가로 스크롤 유지하되 노드·글자 크기를 축소하지 않고 유지(가독성 우선), 세로 레인 간격 축소. 수평 스크롤은 flow chart 영역 안에서만 발생(페이지 전체의 수평 스크롤 금지).
- 터치 타깃(노드, 탭, 버튼) 최소 44×44px. hover 전용 인터랙션 금지 — 툴팁 정보는 상세 페이지에서 모두 확인 가능.
- 상세 페이지: 풀스크린, 상단 고정 바(← 뒤로 + 레벨 토글). 브라우저 back과 ← 버튼 모두 flow chart로 복귀. 수식·코드는 개별 요소에서 가로 스크롤 처리.
- 720px~1024px(태블릿): 데스크톱 레이아웃에서 사이드바 접힘 허용.

## 9. 수용 기준 (Acceptance Criteria)

1. `node scripts/validate.js --strict` 통과 (스키마·개수·분량·계보 무결성·예산 전부).
2. `index.html`을 `file://`로 열어: 홈 → 9개 섹터 각각 flow chart 렌더 → 임의 노드 상세 진입 → 3레벨 토글 → 뒤로가기, 전 과정이 콘솔 에러 0으로 동작.
3. 존재하지 않는 해시(`#/item/없는것`) → 404 패널.
4. 창 폭 375px(모바일)에서: 드로어 내비 동작, 페이지 수평 스크롤 없음(flow chart 내부 제외), 상세 페이지 가독.
5. 101개 노드 전부 상세 페이지 존재, major/minor 분량 하한 충족, 모든 비유에 대응 명시.
6. `dist/index_standalone.html` 단일 파일이 위 2~4를 동일하게 만족.
7. 사이트 전체 ≤2.5MB, 외부 네트워크 요청 0건.
