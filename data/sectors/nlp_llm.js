// nlp_llm — 자연어 처리·LLM 섹터 데이터
// Phase 1: 골드 스탠다드 2건(transformer-2017, gpt2-2019) + 참조 무결성을 위한 골격 2건
// (attention-2014, gpt1-2018). 나머지는 Phase 2에서 골격, Phase 3에서 상세를 채운다.

window.AITL.register({
  id: "attention-2014", sector: "nlp_llm", also_in: [],
  type: "paper", tier: "major", year: 2014, date: "2014-09",
  evolves_from: ["seq2seq-2014"],
  title_en: "Neural Machine Translation by Jointly Learning to Align and Translate",
  name_ko: "어텐션(Bahdanau Attention)",
  oneliner: "번역 시 소스 문장에서 필요한 부분을 골라 보는 정렬 메커니즘",
  link: { kind: "arxiv", label: "arXiv:1409.0473", url: "https://arxiv.org/abs/1409.0473" }
});

window.AITL.register({
  id: "seq2seq-2014", sector: "nlp_llm", also_in: [],
  type: "paper", tier: "major", year: 2014, date: "2014-09",
  evolves_from: [],
  title_en: "Sequence to Sequence Learning with Neural Networks",
  name_ko: "Seq2Seq",
  oneliner: "인코더-디코더 구조로 가변 길이 시퀀스를 변환하는 프레임워크",
  link: { kind: "arxiv", label: "arXiv:1409.3215", url: "https://arxiv.org/abs/1409.3215" }
});

window.AITL.register({
  id: "gpt1-2018", sector: "nlp_llm", also_in: [],
  type: "paper", tier: "major", year: 2018, date: "2018-06",
  evolves_from: ["transformer-2017"],
  title_en: "Improving Language Understanding by Generative Pre-Training",
  name_ko: "GPT-1",
  oneliner: "생성적 사전학습 후 미세조정하는 디코더 전용 트랜스포머",
  link: null
});

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
<p>비유를 실제와 대응시키면 이렇다. 단어가 던지는 질문이 쿼리(query), 각 단어의 명찰이 키(key), 단어가 실제로 들려주는 이야기가 밸류(value)에 해당한다. "얼마나 집중해서 듣는가"가 어텐션 가중치(attention weight)다. 모두가 동시에 대화하므로 순서를 기다릴 필요가 없어, 릴레이 방식보다 훨씬 빠르게(병렬로) 학습할 수 있다. 이 단순한 구조 변경이 이후 GPT, BERT 등 거의 모든 현대 AI의 뼈대가 됐다.</p>`,
      mid: `<p>핵심은 셀프 어텐션(self-attention)이다. 문장의 각 토큰(token)을 벡터로 표현한 뒤, 토큰마다 세 가지 벡터 — 쿼리(Q), 키(K), 밸류(V) — 를 서로 다른 학습된 행렬로 만들어낸다. 어떤 토큰의 출력은 <b>자기 쿼리와 모든 토큰의 키 사이 유사도를 잰 다음, 그 유사도를 가중치로 밸류들을 가중 평균</b>한 것이다. 즉 각 토큰이 문맥 전체에서 필요한 정보를 끌어와 자신의 표현을 갱신한다.</p>
<p>이 구조가 RNN 대비 갖는 이점은 두 가지다. 첫째, 임의의 두 토큰이 항상 1단계 만에 연결되므로 장거리 의존성(long-range dependency)이 소실되지 않는다. 둘째, 토큰 간 순차 의존이 없어 시퀀스 전체를 병렬로 계산할 수 있고, GPU 활용 효율이 급격히 오른다.</p>
<p>보완 장치가 두 개 있다. (1) 어텐션 자체는 순서를 모르는 집합 연산이므로, 위치 정보를 담은 위치 인코딩(positional encoding)을 입력에 더해준다. (2) 유사도를 한 가지 기준으로만 재면 표현력이 부족하므로, Q/K/V를 여러 벌 만들어 서로 다른 관점(문법 관계, 지시 관계 등)으로 동시에 어텐션하는 멀티헤드 어텐션(multi-head attention)을 쓴다. 여기에 토큰별 피드포워드 네트워크(feed-forward network), 잔차 연결(residual connection), 층 정규화(layer normalization)를 쌓아 인코더-디코더 구조를 완성한다.</p>`,
      deep: `<p>한 층의 셀프 어텐션 연산을 단계별로 따라가면 다음과 같다. 입력은 토큰 임베딩 행렬 X (n×d<sub>model</sub>, n=토큰 수)이고, 위치 인코딩을 더한 상태다.</p>
<ol>
<li><b>선형 사영:</b> 학습 행렬 W<sub>Q</sub>, W<sub>K</sub>, W<sub>V</sub>로 Q=XW<sub>Q</sub>, K=XW<sub>K</sub>, V=XW<sub>V</sub>를 만든다. 각 헤드에서 Q, K는 d<sub>k</sub>차원, V는 d<sub>v</sub>차원이다.</li>
<li><b>유사도 행렬:</b> QK<sup>T</sup> (n×n)의 (i,j) 성분은 토큰 i의 쿼리와 토큰 j의 키의 내적, 즉 "i가 j를 얼마나 참조할지"의 원점수다.</li>
<li><b>스케일링:</b> d<sub>k</sub>가 크면 내적의 분산이 커져 softmax가 한 점에 몰리고 기울기가 소실된다. 이를 막으려 √d<sub>k</sub>로 나눈다.</li>
<li><b>softmax:</b> 행별로 softmax를 취해 각 행이 합 1인 확률 분포, 즉 어텐션 가중치가 된다. 최종식은 Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>)V.</li>
<li><b>가중합:</b> 가중치로 V를 가중 평균해 각 토큰의 새 표현을 얻는다. 멀티헤드에서는 이 연산을 h개 헤드에서 병렬 수행하고 결과를 이어붙여(concat) W<sub>O</sub>로 다시 사영한다.</li>
<li><b>블록 완성:</b> 어텐션 출력에 잔차 연결과 층 정규화를 적용하고, 위치별 FFN(두 개의 선형 변환과 비선형 활성)을 거쳐 다시 잔차+정규화한다. 이 블록을 N층 쌓는다.</li>
</ol>
<p>디코더에는 두 가지가 추가된다. 미래 토큰을 못 보게 유사도 행렬의 상삼각을 -∞로 채우는 마스크드 어텐션(masked attention), 그리고 디코더의 Q가 인코더 출력의 K/V를 참조하는 교차 어텐션(cross-attention)이다. 학습 시에는 정답 시퀀스를 통째로 넣고 마스크로 미래만 가리므로(teacher forcing) 전체 위치를 병렬로 학습할 수 있고, 추론 시에만 토큰을 하나씩 생성한다.</p>
<p>위치 인코딩은 원논문에서는 주파수를 달리한 사인·코사인 함수 — PE(pos,2i)=sin(pos/10000<sup>2i/d</sup>), 홀수 차원은 cos — 를 사용했다. 서로 다른 위치의 인코딩이 선형 변환으로 상대 위치를 표현할 수 있다는 성질을 노린 선택이며, 이후 연구들은 학습형·상대형 위치 표현으로 대체해 갔다. 계산 복잡도는 시퀀스 길이 n에 대해 O(n²·d)로 RNN의 O(n·d²)와 대비되는데, 한 층 안의 연산이 전부 행렬곱이라 GPU에 극도로 유리한 대신 n이 길어질수록 어텐션의 n² 비용이 병목이 되며, 이는 이후 효율적 어텐션과 긴 컨텍스트 연구의 출발점이 된다.</p>`
    },
    impact: `<p>트랜스포머는 발표 후 수년 만에 NLP를 넘어 사실상 모든 분야의 표준 아키텍처가 됐다. GPT 계열(디코더만 사용)과 BERT(인코더만 사용)가 직접적 후손이고, 비전의 ViT, 음성의 Whisper, 단백질 구조 예측의 AlphaFold2까지 같은 뼈대를 공유한다. "병렬화 가능한 범용 시퀀스 처리기"라는 성질이 대규모 사전학습(pre-training) 시대를 여는 하드웨어적 전제 조건이 됐다는 점이 가장 큰 의의다.</p>`,
    uncertainty: []
  }
});

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
      intro: `<p><a href="#/item/gpt1-2018">GPT-1</a>에서 달라진 것은 본질적으로 <b>크기</b>다. 책을 열 배쯤 많이 읽은 사람이, 요약하는 법을 따로 배운 적이 없는데도 긴 글을 요약해내는 것과 비슷한 일이 일어났다. 비유의 대응은 이렇다. "많이 읽기"는 훨씬 큰 웹 텍스트로 다음 단어 예측을 학습한 것이고, "따로 배운 적 없는 요약"이 zero-shot 수행 — 과제 전용 추가 학습(fine-tuning) 없이 지시만으로 과제를 해내는 것 — 에 해당한다. 모델이 위험할 수 있다는 이유로 단계적으로 공개되어 논쟁을 일으킨 것으로도 유명하다.</p>`,
      mid: `<p>아키텍처는 GPT-1과 같은 디코더 전용 트랜스포머이고, 층 정규화 위치 이동 같은 소폭 조정만 있었다. 실질적 변경점은 (1) 파라미터를 최대 15억 개 규모로 확대, (2) 품질 필터링된 대규모 웹 문서 데이터셋(WebText) 구축, (3) 평가 방식의 전환이다. 과제를 별도 헤드로 학습하는 대신 "TL;DR:" 같은 텍스트 프롬프트로 과제를 지시하고 언어 모델의 이어쓰기만으로 답을 얻는 zero-shot 평가를 전면에 세웠다. "언어 모델을 충분히 키우면 다목적 학습기가 된다"는 프레임이 이 논문의 핵심 주장이다.</p>`,
      deep: `<p>기술적 변경점은 다음과 같다. (1) 층 정규화(layer normalization)를 각 서브블록 출력 뒤가 아니라 입력 앞으로 옮기고(pre-LN 방향) 마지막 블록 뒤에 추가 정규화를 두어 깊은 층에서의 학습 안정성을 높였다. (2) 컨텍스트 길이를 512에서 1024 토큰으로 확장하고 바이트 수준 BPE(byte pair encoding) 어휘를 사용해 임의 텍스트를 손실 없이 다뤘다. (3) 잔차 경로 가중치를 층 수에 따라 1/√N으로 스케일링해 초기화했다. 평가에서는 언어 모델링 벤치마크 다수에서 별도 미세조정 없이 당시 최고 성능을 얻었고, 요약·번역·질의응답을 프롬프트만으로 유도해 "과제 = 조건부 텍스트 생성"이라는 이후 GPT-3 in-context learning의 전신이 되는 관점을 제시했다.</p>`
    },
    impact: `<p>"구조 혁신 없이 규모 확대만으로 새 능력이 나타난다"는 관찰은 이후 스케일링 법칙 연구와 GPT-3의 직접적 근거가 됐다. 단계적 공개 결정은 AI 공개 정책 논쟁의 초기 사례로 남았다.</p>`,
    uncertainty: []
  }
});

// ---- Phase 2 골격 (detail은 Phase 3에서) ----

window.AITL.register({
  id: "word2vec-2013", sector: "nlp_llm", also_in: [], type: "paper", tier: "major",
  year: 2013, date: "2013-01", evolves_from: [],
  title_en: "Efficient Estimation of Word Representations in Vector Space",
  name_ko: "Word2Vec",
  oneliner: "단어를 의미 연산이 가능한 벡터로 학습하는 임베딩 기법",
  link: { kind: "arxiv", label: "arXiv:1301.3781", url: "https://arxiv.org/abs/1301.3781" }
});

window.AITL.register({
  id: "bert-2018", sector: "nlp_llm", also_in: [], type: "paper", tier: "major",
  year: 2018, date: "2018-10", evolves_from: ["transformer-2017"],
  title_en: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
  name_ko: "BERT",
  oneliner: "양방향 마스크 언어 모델 사전학습으로 이해 과제를 평정",
  link: { kind: "arxiv", label: "arXiv:1810.04805", url: "https://arxiv.org/abs/1810.04805" }
});

window.AITL.register({
  id: "t5-2019", sector: "nlp_llm", also_in: [], type: "paper", tier: "minor",
  year: 2019, date: "2019-10", evolves_from: ["bert-2018"],
  title_en: "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
  name_ko: "T5",
  oneliner: "모든 NLP 과제를 텍스트-투-텍스트 형식으로 통일",
  link: { kind: "arxiv", label: "arXiv:1910.10683", url: "https://arxiv.org/abs/1910.10683" }
});

window.AITL.register({
  id: "gpt3-2020", sector: "nlp_llm", also_in: [], type: "paper", tier: "major",
  year: 2020, date: "2020-05", evolves_from: ["gpt2-2019"],
  title_en: "Language Models are Few-Shot Learners",
  name_ko: "GPT-3",
  oneliner: "1750억 파라미터 규모에서 나타난 in-context 학습 능력",
  link: { kind: "arxiv", label: "arXiv:2005.14165", url: "https://arxiv.org/abs/2005.14165" }
});

window.AITL.register({
  id: "scaling-laws-2020", sector: "nlp_llm", also_in: [], type: "paper", tier: "minor",
  year: 2020, date: "2020-01", evolves_from: [],
  title_en: "Scaling Laws for Neural Language Models",
  name_ko: "스케일링 법칙(Scaling Laws)",
  oneliner: "성능이 모델·데이터·연산량의 거듭제곱 법칙을 따름을 규명",
  link: { kind: "arxiv", label: "arXiv:2001.08361", url: "https://arxiv.org/abs/2001.08361" }
});

window.AITL.register({
  id: "chinchilla-2022", sector: "nlp_llm", also_in: [], type: "paper", tier: "minor",
  year: 2022, date: "2022-03", evolves_from: ["scaling-laws-2020"],
  title_en: "Training Compute-Optimal Large Language Models",
  name_ko: "Chinchilla",
  oneliner: "같은 연산량이면 모델보다 데이터를 키워야 함을 입증",
  link: { kind: "arxiv", label: "arXiv:2203.15556", url: "https://arxiv.org/abs/2203.15556" }
});

window.AITL.register({
  id: "instructgpt-2022", sector: "nlp_llm", also_in: [], type: "paper", tier: "major",
  year: 2022, date: "2022-03", evolves_from: ["gpt3-2020"],
  title_en: "Training language models to follow instructions with human feedback",
  name_ko: "InstructGPT (RLHF)",
  oneliner: "인간 피드백 강화학습으로 언어 모델을 지시에 정렬",
  link: { kind: "arxiv", label: "arXiv:2203.02155", url: "https://arxiv.org/abs/2203.02155" }
});

window.AITL.register({
  id: "chatgpt-2022", sector: "nlp_llm", also_in: [], type: "product", tier: "major",
  year: 2022, date: "2022-11", evolves_from: ["instructgpt-2022"],
  title_en: "ChatGPT",
  name_ko: "ChatGPT",
  oneliner: "대화형 인터페이스로 LLM을 대중화한 서비스",
  link: null
});

window.AITL.register({
  id: "llama-2023", sector: "nlp_llm", also_in: [], type: "paper", tier: "major",
  year: 2023, date: "2023-02", evolves_from: ["chinchilla-2022"],
  title_en: "LLaMA: Open and Efficient Foundation Language Models",
  name_ko: "LLaMA",
  oneliner: "공개 가중치 고성능 LLM으로 오픈소스 생태계를 촉발",
  link: { kind: "arxiv", label: "arXiv:2302.13971", url: "https://arxiv.org/abs/2302.13971" }
});

window.AITL.register({
  id: "gpt4-2023", sector: "nlp_llm", also_in: [], type: "model", tier: "major",
  year: 2023, date: "2023-03", evolves_from: ["chatgpt-2022"],
  title_en: "GPT-4 Technical Report",
  name_ko: "GPT-4",
  oneliner: "전문가 시험 수준의 추론과 이미지 입력을 갖춘 LLM",
  link: { kind: "arxiv", label: "arXiv:2303.08774", url: "https://arxiv.org/abs/2303.08774" }
});

window.AITL.register({
  id: "o1-2024", sector: "nlp_llm", also_in: [], type: "model", tier: "major",
  year: 2024, date: "2024-09", evolves_from: ["gpt4-2023"],
  title_en: "OpenAI o1",
  name_ko: "OpenAI o1 (추론 모델)",
  oneliner: "답하기 전에 길게 생각하는 사고 사슬 강화학습 모델",
  link: null
});

window.AITL.register({
  id: "deepseek-r1-2025", sector: "nlp_llm", also_in: [], type: "paper", tier: "minor",
  year: 2025, date: "2025-01", evolves_from: ["o1-2024"],
  title_en: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
  name_ko: "DeepSeek-R1",
  oneliner: "공개된 추론 특화 모델과 그 강화학습 레시피",
  link: { kind: "arxiv", label: "arXiv:2501.12948", url: "https://arxiv.org/abs/2501.12948" }
});
