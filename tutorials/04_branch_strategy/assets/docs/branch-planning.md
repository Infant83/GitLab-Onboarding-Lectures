# Branch Planning Memo

## Branch Naming

- feature/sample-action
- fix/tutorial-copy
- docs/process-clarification
- hotfix/action-permission

## Working Rules

- branch는 목적 하나만 담는다.
- branch 수명은 가능한 짧게 유지한다.
- merge 전에 `fetch -> branch -vv -> log --graph`를 확인한다.
- shared branch에서는 force push를 기본 전략으로 삼지 않는다.

## Review Notes

- MR 하나에 unrelated change가 섞이면 branch를 다시 나눈다.
