# GitLab Onboarding Learning Audit Log

검토일: 2026-05-24

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
- 로컬 실습 명령은 Windows PowerShell 기준으로 통일했다.

## Loop 4. 명령 UI와 Windows 실습 기준

- `cat <<EOF`, `printf`, `cp`, `mkdir -p`처럼 Unix shell을 전제한 로컬 명령을 제거했다.
- 파일을 쓰는 명령은 `Set-Content`, 이어 붙이는 명령은 `Add-Content`, 복사는 `Copy-Item`, 폴더 생성은 `New-Item -ItemType Directory -Force`로 정리했다.
- 여러 줄 파일 본문은 명령 목록에 쪼개서 노출하지 않고, 선택한 명령의 오른쪽 미리보기에서만 확인하도록 바꿨다.
- CH07의 Pages job은 GitLab runner 안에서도 shell 의존이 줄어들도록 Python 한 줄 명령으로 `public` 폴더를 만든다.

## 남은 운영 메모

- Required approval은 GitLab tier와 project 설정에 따라 달라진다. 수업에서는 approval rule이 켜진 팀 운영을 기준으로 설명한다.
- 실제 수업 전에는 교육용 GitLab project에서 CH08 capstone을 한 번 실행해 runner와 branch rule을 확인한다.
