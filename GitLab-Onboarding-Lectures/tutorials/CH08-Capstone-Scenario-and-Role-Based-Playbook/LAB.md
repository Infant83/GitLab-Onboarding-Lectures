# CH08 Tutorial Lab

## 목적

이 장에서는 지금까지 만든 저장소와 운영 자산을 모두 엮어 capstone feature를 구현한다. 새 이슈 문서, 구현 파일, 테스트, 결정 로그를 추가하고, 나머지는 기존 파일을 수정해 완성한다.

## 이번 장에서 새로 추가하는 파일

- `issues/ISSUE-101-sample-action.md`
- `src/sample-action.js`
- `tests/sample-action.test.js`
- `docs/release-decision-log.md`

## 이전 챕터에서 이어받는 파일

- `src/app.js`
- `src/permissions.js`
- `src/feature-flags.json`
- `.gitlab/merge_request_templates/standard.md`
- `.gitlab-ci.yml`
- `docs/review-checklist.md`

## 권장 실습 시나리오

1. `ISSUE-101-sample-action.md`를 기준으로 branch를 만든다.
2. `src/sample-action.js`와 `tests/sample-action.test.js`를 추가한다.
3. 기존 `src/app.js`와 `src/feature-flags.json`을 수정해 기능을 연결한다.
4. MR template에 rollback 기준과 role visibility를 적는다.
5. pipeline 통과 후 merge하고, 의도적인 policy bug를 넣어 revert 또는 hotfix 판단을 토론한다.
6. OpenProject를 쓰는 팀이라면 branch 이름과 MR description에 work package reference를 어떻게 넣을지 추가로 설계한다.

## 강의 연결 포인트

- CH01~CH07의 모든 파일과 운영 규칙을 실제 기능 반영 흐름으로 묶는 장이다.
- `docs/release-decision-log.md`는 capstone 회고와 운영 규칙 초안의 기반이 된다.
- OpenProject variant는 요구사항, MR, pipeline traceability를 운영 관점에서 설명하는 보조 시나리오다.
