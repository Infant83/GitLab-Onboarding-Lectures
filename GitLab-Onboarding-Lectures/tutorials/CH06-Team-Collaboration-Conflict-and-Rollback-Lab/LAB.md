# CH06 Tutorial Lab

## 목적

이 장에서는 기존 저장소 파일을 직접 충돌시키지 않고, variant 텍스트를 제공해 충돌을 현실적으로 재현한다. 두 개발자가 같은 의미 영역을 서로 다르게 바꾸도록 설계했다.

## 이번 장에서 새로 추가하는 파일

- `variants/process-a-rewrite.md`
- `variants/process-b-rewrite.md`
- `variants/page-a.html`
- `variants/page-b.html`

## 이전 챕터에서 이어받는 파일

- `docs/process.md`
- `public/index.html`
- `.gitlab/merge_request_templates/standard.md`
- `docs/review-checklist.md`

## 권장 실습 시나리오

1. Developer A는 `process-a-rewrite.md`, `page-a.html`을 참고해 기존 파일을 수정한다.
2. Developer B는 `process-b-rewrite.md`, `page-b.html`을 참고해 같은 구간을 다르게 수정한다.
3. A의 MR을 먼저 merge하고, B가 나중에 sync하면서 conflict를 맞는다.
4. conflict 해결 후 meaning conflict를 다시 점검하고, 필요하면 revert한다.

## 적용 규칙

- `process-a-rewrite.md`, `process-b-rewrite.md`는 `docs/process.md` 전체 대체본으로 사용해도 되도록 작성되어 있다.
- 핵심 충돌 지점은 2단계 문장이다. 1, 3, 4단계 구조는 유지해야 한다.
- CH07의 `scripts/smoke_check.py`는 `docs/process.md`에 1~4단계가 남아 있다고 가정하므로, conflict 해결 후에도 단계 번호를 지우지 않는다.

## 강의 연결 포인트

- CH05의 MR template과 review checklist를 실제로 써 보게 하는 장이다.
- CH07에서 이 충돌 해결 결과를 pipeline으로 검증한다.
