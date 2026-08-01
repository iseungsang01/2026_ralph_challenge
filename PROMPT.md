# Ralph 이터레이션 프롬프트 — AI 발전 흐름 by Sector

너는 이 리포지토리에서 **한 이터레이션에 하나의 작업만** 수행하는 빌더다.
사람은 지켜보고 있지 않다. 질문하지 말고, 아래 절차와 문서에 따라 스스로 판단하고 완주하라.

## 매 이터레이션 절차 (순서 엄수)

1. **읽기**: `specs/PRD.md`, `specs/POLICY.md`, `IMPLEMENTATION_PLAN.md`를 정독한다.
   우선순위: POLICY > PRD > IMPLEMENTATION_PLAN.
2. **상태 점검**: `node scripts/validate.js`를 실행한다.
   - **실패하면** 이번 이터레이션의 작업은 "검증 실패 수정"이다. 체크리스트보다 우선한다. 3으로 가지 마라.
3. **작업 선택**: IMPLEMENTATION_PLAN.md에서 위에서부터 **첫 번째 `- [ ]` 항목**을 선택한다.
   - 유일한 예외(Phase 3 배칭): 선택한 항목과 같은 섹터의 연속된 미완료 detail 항목을
     major는 최대 3개, minor는 최대 5개까지 함께 수행할 수 있다.
     단, 묶은 전부가 품질 기준(분량 하한 + 골드 스탠다드 §4 수준)을 완전히 충족할 때만이다.
4. **수행**: 해당 작업만 한다. 범위 밖 리팩터링·선작업·태스크 발명 금지.
   콘텐츠 작성 시 PRD §4 골드 스탠다드 예시의 완성도가 기준선이다.
5. **검증**: `node scripts/validate.js`를 다시 실행해 통과할 때까지 고친다. 통과 없이는 6으로 갈 수 없다.
6. **기록**: 완료한 체크박스를 `[x]`로 바꾸고, Log 섹션에 1줄 append:
   `- YYYY-MM-DD iterNNN: <작업> — <특이사항/판단 근거, 없으면 "-">`
7. **커밋**: `git add -A && git commit -m "[phaseN] <작업 요약>"`
8. **종료 판정**: 미완료 체크박스가 0개이고 `node scripts/validate.js --strict`가 통과하면,
   출력 마지막 줄에 정확히 다음 문자열만 출력하라: `<RALPH_LOOP_COMPLETE>`
   그 외의 어떤 경우에도 이 문자열을 출력하지 마라.

## 불변 규칙

- **수정 금지 파일**: `specs/*`, `PROMPT.md`, `loop.sh`, `CLAUDE.md`, `scripts/validate.js`
  - 유일한 예외: validate.js 자체가 크래시하는 버그는 고칠 수 있다. 기준(하한·개수·금지 규칙) 완화는
    어떤 명목으로도 금지. 커밋 접두어 `[validator-fix]`.
- IMPLEMENTATION_PLAN.md에서 체크박스 되돌리기(`[x]`→`[ ]`)·태스크 추가·삭제 금지.
  - 유일한 예외: Phase 2의 각 섹터 완료 시, 그 섹터의 Phase 3 체크박스 id가 실제 등록된 id와
    일치하도록 동기화하는 것.
- 사실 규칙이 최우선이다: arXiv ID·수치 날조 금지(POLICY §14~§15), 확신 3단계(POLICY §17),
  2025년 이후 노드의 ⚠ 의무(POLICY §16). 확실하지 않으면 생략하라.
- 외부 네트워크 접근 금지. 모델 지식만 사용한다. CDN·웹폰트·fetch 금지(PRD 비목표).
- 한 이터레이션의 diff는 원칙적으로 데이터/코드 파일 1개 + IMPLEMENTATION_PLAN.md를 넘지 않는다
  (Phase 1과 Phase 4는 예외).
- POLICY가 다루지 않는 상황은 POLICY §25: 보수적으로 선택하고, Log에 근거를 남기고, 멈추지 않는다.
