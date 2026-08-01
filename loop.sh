#!/usr/bin/env bash
# Ralph 루프 러너 — PROMPT.md를 claude -p로 반복 실행한다.
# 사용:  ./loop.sh                     # 기본 (MAX_ITER=200)
#        MAX_ITER=10 ./loop.sh        # 이터레이션 수 제한
#        MODEL=claude-sonnet-5 ./loop.sh
#        PUSH_EVERY=5 ./loop.sh       # N 이터레이션마다 원격 푸시
set -uo pipefail
cd "$(dirname "$0")"

BRANCH="claude/ai-progress-by-sector-3tc6a7"
MAX_ITER="${MAX_ITER:-200}"
ITER_TIMEOUT="${ITER_TIMEOUT:-1800}"   # 이터레이션당 30분
PUSH_EVERY="${PUSH_EVERY:-0}"          # 0 = 푸시 안 함
SENTINEL="<RALPH_LOOP_COMPLETE>"
mkdir -p logs

if [ "$(git branch --show-current)" != "$BRANCH" ]; then
  echo "ERROR: 현재 브랜치가 $BRANCH 가 아니다. 중단." >&2
  exit 1
fi
command -v claude >/dev/null || { echo "ERROR: claude CLI 없음" >&2; exit 1; }
command -v node   >/dev/null || { echo "ERROR: node 없음" >&2; exit 1; }

stall=0
for i in $(seq 1 "$MAX_ITER"); do
  n=$(printf '%03d' "$i"); log="logs/iter_$n.log"
  before=$(git rev-parse HEAD)
  echo "=== iteration $n  $(date -Is) ==="

  timeout "$ITER_TIMEOUT" claude -p "$(cat PROMPT.md)" \
    --dangerously-skip-permissions \
    ${MODEL:+--model "$MODEL"} \
    >"$log" 2>&1
  rc=$?

  # 안전망: 이터레이션이 커밋 없이 남긴 변경을 회수
  git add -A
  git diff --cached --quiet || git commit -q -m "wip: auto-commit iter $n"

  remaining=$(grep -c '^\s*- \[ \]' IMPLEMENTATION_PLAN.md 2>/dev/null || echo '?')
  echo "    exit=$rc  remaining_tasks=$remaining  log=$log"

  # 종료: 센티널 AND 체크박스 0 AND strict 검증을 루프가 직접 재확인 (3중 확인)
  if grep -qF "$SENTINEL" "$log" \
     && [ "$remaining" = "0" ] \
     && node scripts/validate.js --strict >/dev/null 2>&1; then
    echo "COMPLETE: $i 이터레이션 만에 완료."
    [ "$PUSH_EVERY" -gt 0 ] && git push -u origin "$BRANCH"
    exit 0
  fi

  # 스톨 감지: 커밋이 3회 연속 없으면 중단
  if [ "$(git rev-parse HEAD)" = "$before" ]; then
    stall=$((stall + 1))
    if [ "$stall" -ge 3 ]; then
      echo "STALLED: 3회 연속 무진전. 마지막 로그: $log" >&2
      exit 2
    fi
  else
    stall=0
  fi

  if [ "$PUSH_EVERY" -gt 0 ] && [ $((i % PUSH_EVERY)) -eq 0 ]; then
    git push -u origin "$BRANCH" || echo "WARN: push 실패 (계속 진행)"
  fi
done

echo "MAX_ITER($MAX_ITER) 도달 — 미완료. remaining=$remaining" >&2
exit 3
