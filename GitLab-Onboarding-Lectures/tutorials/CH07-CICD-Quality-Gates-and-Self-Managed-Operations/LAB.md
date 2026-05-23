# CH07 Tutorial Lab

## 목적

이 장에서는 기존 저장소에 CI/CD 품질 게이트를 추가한다. 새 파일은 `.gitlab-ci.yml`, build script, smoke script, 추가 테스트 파일이다.

## 이번 장에서 새로 추가하는 파일

- `.gitlab-ci.yml`
- `scripts/check_docs.py`
- `scripts/smoke_check.py`
- `tests/test_role_visibility.py`

## 이전 챕터에서 이어받는 파일

- `public/index.html`
- `src/permissions.py`
- `docs/feature-flags.md`
- `docs/process.md`
- `tests/test_role_policy.py`

## 권장 실습 시나리오

1. `.gitlab-ci.yml`을 추가하고 MR pipeline을 실행한다.
2. 로컬에서 `python -m unittest discover -s tests`, `python scripts/check_docs.py`, `python scripts/smoke_check.py`를 먼저 돌린다.
3. `docs/feature-flags.md`나 `docs/process.md`를 일부러 잘못 수정해 smoke 실패를 만든다.
4. pipeline 로그에서 첫 유의미 에러를 찾는다.
5. 확장 예제로 `dist/` 또는 `public/`을 GitLab Pages에 게시한다고 가정하고, `pages` job이 어떤 artifact와 경로를 요구하는지 토론한다.
6. OpenProject를 쓴다고 가정하고, 어떤 GitLab 이벤트를 webhook으로 보내고 어떤 정보는 feed 구독으로 충분한지 분류한다.

## 검증 전제

- CH06을 거친 저장소라면 `docs/process.md`는 여전히 1~4단계 번호 구조를 유지해야 한다.
- 이 장의 `scripts/smoke_check.py`는 단계 번호 보존 여부와 핵심 정책 문구 존재 여부를 함께 본다.
- 따라서 CH06 conflict를 해결할 때는 정책 문장만 선택하는 것이 아니라 문서 구조까지 보존해야 한다.

## 강의 연결 포인트

- CH08 capstone에서는 이 CI를 merge gate로 사용한다.
- self-managed GitLab에서는 image, runner tag, variable 정책만 환경에 맞게 조정하면 된다.
- GitLab Pages 운영 예시는 정적 문서 배포와 self-managed publish path 이해에 사용한다.
- webhook / OpenProject 연동 예시는 pipeline 상태를 외부 운영 시스템과 연결하는 사고 연습에 사용한다.
