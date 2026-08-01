# AI 발전 흐름 by Sector

2012→2026 AI 발전사를 9개 기술 섹터의 시계열 flow chart + 3단계 수준별 상세 해설로 보여주는
오프라인 정적 사이트. Ralph 루프(`loop.sh`)가 `PROMPT.md`를 반복 실행해 빌드한다.

## 파일 소유권

| 경로 | 소유자 | 루프의 권한 |
|---|---|---|
| `specs/PRD.md`, `specs/POLICY.md` | 사람 | **읽기 전용** |
| `PROMPT.md`, `loop.sh`, `CLAUDE.md` | 사람 | **읽기 전용** |
| `scripts/validate.js` | 사람 | 읽기 전용 (크래시 버그 수정만 예외, 기준 완화 금지, 커밋 접두어 `[validator-fix]`) |
| `IMPLEMENTATION_PLAN.md` | 공유 | 체크박스 [x] 처리, Log 1줄 append, Phase 2 완료 시 Phase 3 id 동기화만 |
| `index.html`, `css/`, `js/`, `data/`, `dist/`, `scripts/build_standalone.js` | 루프 | 자유 |

## 명령

```bash
node scripts/validate.js            # 품질 게이트 (체크박스 채우기 전 필수 통과)
node scripts/validate.js --strict   # 최종 게이트 (전 항목 detail + 개수 + 예산)
node scripts/build_standalone.js    # dist/index_standalone.html 생성 (Phase 4)
# 확인: index.html을 브라우저로 열기 (file:// 로 완전 동작해야 함)
```

## 절대 규칙

- 외부 리소스 금지: CDN, 웹폰트, MathJax, fetch() 전부 금지. `file://`에서 완전 동작.
- 출처 날조 금지: arXiv ID·수치가 불확실하면 생략한다 (POLICY §13~§17).
- 한국어 "~다"체, 용어는 첫 언급 시 한국어(English) 병기 (POLICY §22).
- 판단이 애매하면 POLICY §25 메타 규칙: 보수적으로 선택하고 Log에 기록하고 멈추지 않는다.
