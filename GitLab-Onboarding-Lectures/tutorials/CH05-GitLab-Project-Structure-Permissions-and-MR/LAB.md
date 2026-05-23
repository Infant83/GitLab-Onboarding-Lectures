# CH05 Tutorial Lab

## 목적

이 장에서는 GitLab MR 운영에 필요한 템플릿과 기준 파일을 추가한다. 앞 장까지 만든 코드와 문서를 바탕으로 review 가능한 저장소 형태를 만든다.

## 이번 장에서 새로 추가하는 파일

- `.gitlab/merge_request_templates/standard.md`
- `CODEOWNERS`
- `docs/review-checklist.md`

## 이전 챕터에서 이어받는 파일

- `docs/branch-planning.md`
- `docs/tutorial-guide.md`
- `docs/feature-flags.md`
- `tests/test_role_policy.py`

## 권장 실습 시나리오

1. MR template을 추가하고 새 branch에서 push한다.
2. CODEOWNERS를 추가해 어떤 경로를 누가 리뷰해야 하는지 토론한다.
3. `docs/review-checklist.md`를 기준으로 MR 설명을 작성한다.
4. protected branch와 approval rule이 있다면 어떤 역할이 막히는지 확인한다.
5. GitLab Wiki가 활성화되어 있다면 `home`, `_sidebar`, `release-runbook`에 어떤 문서를 둘지 설계한다.

## 강의 연결 포인트

- CH06에서는 이 장의 template과 checklist를 실제 conflict MR에 적용한다.
- CH08 capstone에서는 이 template을 그대로 사용해 최종 MR을 작성한다.
- Wiki 운영 예시는 코드 저장소 문서와 운영 문서의 역할 분리를 이해하는 데 사용한다.
