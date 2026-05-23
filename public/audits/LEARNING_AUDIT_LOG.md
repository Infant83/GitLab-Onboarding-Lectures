# GitLab Onboarding Learning Audit Log

검토일: 2026-05-23

## Loop 1. 학습 흐름과 문체

- 첫 화면을 "권한 표"보다 "같은 이슈를 역할별로 넘겨받는 수업"으로 다시 잡았다.
- `현재 역할`, `판단 장면`, `실습 챕터`, `핵심 정리`처럼 화면 제목을 한국어 흐름으로 맞췄다.
- 챕터 카드는 노트/PDF 링크가 아니라 상세 실습 페이지로 들어가도록 유지했다.

## Loop 2. GitLab 현실성

- Reviewer를 GitLab 접근 role이 아니라 MR 안의 검토 책임으로 설명했다.
- 실습 정책을 `main protected`, `Allowed to merge = Maintainers`, `Allowed to push and merge = No one`, required approval과 successful pipeline 가정으로 명시했다.
- Owner는 모든 MR의 상시 승인자가 아니라 visibility, 권한 완화, emergency bypass 같은 예외와 정책 판단에 개입한다고 정리했다.

## Loop 3. 실습 가능성

- 팀 릴레이 UI를 추가해 issue, branch, review, pipeline, merge, rollback 단계에서 현재 역할이 해야 할 일을 바꾸어 보여준다.
- 권한 실험 결과에 확인 위치, 다음 담당, 조건을 추가했다.
- CH01의 bootstrap 예외, CH07 deploy stage, CH08 lecture asset 복사 경로를 실제 실행 가능한 흐름으로 보완했다.
- PowerShell 학습자가 막히기 쉬운 `printf`, `cat`, `cp`, `mkdir -p` 명령에는 대체 실행 방식을 함께 설명했다.

## 남은 운영 메모

- Required approval은 GitLab tier와 project 설정에 따라 달라진다. 수업에서는 approval rule이 켜진 팀 운영을 기준으로 설명한다.
- 실제 수업 전에는 교육용 GitLab project에서 CH08 capstone을 한 번 실행해 runner와 branch rule을 확인한다.
