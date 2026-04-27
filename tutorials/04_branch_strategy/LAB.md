# CH04 Tutorial Lab

## 목적

branch 전략, tracking branch, merge / rebase 비교를 실습하기 위해 신규 파일을 추가한다. 이 장에서는 `기존 파일을 병렬로 수정`하는 것과 `새 기능용 파일을 별도 branch에서 추가`하는 것을 함께 본다.

## 이번 장에서 새로 추가하는 파일

- `docs/branch-planning.md`
- `src/feature-flags.json`

## 이전 챕터에서 이어받는 파일

- `docs/tutorial-guide.md`
- `docs/process.md`
- `src/permissions.js`
- `tests/report-policy.test.js`

## 권장 실습 시나리오

1. `feature/branch-playbook` branch에서 `docs/branch-planning.md`를 추가한다.
2. 다른 branch에서 `src/feature-flags.json`을 추가한다.
3. 두 branch를 각각 merge와 rebase로 sync한다.
4. 오래된 branch가 main과 멀어졌을 때 어떤 비용이 생기는지 비교한다.

## 강의 연결 포인트

- `src/feature-flags.json`은 CH07 smoke check와 CH08 capstone 기능 플래그 판단에 사용한다.
- `docs/branch-planning.md`는 CH05 MR 설명 범위와 CH08 운영 규칙 초안의 재료가 된다.
