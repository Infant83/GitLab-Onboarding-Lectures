# CH07 Tutorial Lab

## 목적

이 장에서는 기존 저장소에 CI/CD 품질 게이트를 추가한다. 새 파일은 `.gitlab-ci.yml`, build script, smoke script, 추가 테스트 파일이다.

## 이번 장에서 새로 추가하는 파일

- `.gitlab-ci.yml`
- `scripts/build-site.js`
- `scripts/smoke-check.js`
- `tests/role-visibility-smoke.test.js`

## 이전 챕터에서 이어받는 파일

- `public/index.html`
- `src/permissions.js`
- `src/feature-flags.json`
- `docs/process.md`
- `tests/role-policy.test.js`

## 권장 실습 시나리오

1. `.gitlab-ci.yml`을 추가하고 MR pipeline을 실행한다.
2. 로컬에서 `node --test`, `node scripts/build-site.js`, `node scripts/smoke-check.js`를 먼저 돌린다.
3. `src/feature-flags.json`나 `docs/process.md`를 일부러 잘못 수정해 smoke 실패를 만든다.
4. pipeline 로그에서 첫 유의미 에러를 찾는다.

## 강의 연결 포인트

- CH08 capstone에서는 이 CI를 merge gate로 사용한다.
- self-managed GitLab에서는 image, runner tag, variable 정책만 환경에 맞게 조정하면 된다.
