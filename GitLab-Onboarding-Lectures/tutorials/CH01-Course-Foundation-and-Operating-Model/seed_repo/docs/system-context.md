# System Context

## 목적

이 저장소는 특정 업무 도메인 없이 Git / GitLab 협업을 실습하기 위한 교육용 프로젝트다.

## 현재 구성

- `src/permissions.py`: 역할별 sample action visibility 규칙
- `public/index.html`: 브라우저로 바로 확인할 수 있는 간단한 화면
- `docs/process.md`: 조별 conflict 실습에 사용할 공용 절차
- `tests/test_permissions.py`: 최소 권한 테스트

## 이후 확장 예정

- branch 전략 실습용 feature flag 문서
- MR template, CODEOWNERS
- `.gitlab-ci.yml`, Python 기반 문서/smoke script
- capstone용 Python sample action 구현 파일
