# 8H Curriculum Plan

## 재구성 원칙

- 현재 `lecture_notes/`의 16개 챕터를 유지 보수 가능한 `8개 대챕터`로 통합한다.
- 챕터 수만 줄이고, 각 챕터 안에는 더 많은 실습, 에러 대응, 팀 협업 시나리오를 넣는다.
- 각 챕터는 1시간 분량을 기본으로 하지만 `개념 15~20분 + guided lab 25~30분 + 팀 토론/정리 10~15분` 구조로 설계한다.
- 모든 챕터에서 `팀장`, `PL`, `Developer` 관점의 체크포인트를 병렬로 둔다.

## 16개 -> 8개 매핑

| 8H Chapter | 통합 대상 | 통합 이유 |
| --- | --- | --- |
| CH01 | `01`, `02`, `14` 일부 | 교육 목적, 저장소 구조, 환경 준비, 역할별 학습 목표를 첫 장에 묶음 |
| CH02 | `03`, `15` 일부 | 로컬 작업과 핵심 명령어 흐름을 한 장에서 상태 변화 중심으로 학습 |
| CH03 | `12`, `15`, `07` 일부 | 추적, 진단, 복구, revert/bisect/tag/stash를 같은 문제해결 축으로 통합 |
| CH04 | `04`, `05`, `08` 일부 | branch 전략, shared repo vs fork, merge/rebase 판단, 작업 분해를 협업 준비 단계로 묶음 |
| CH05 | `06`, `09`, `13` 일부 | GitLab 권한, 보호 브랜치, MR, approval, repository rules를 GitLab 운영 챕터로 통합 |
| CH06 | `07`, `16`, `06` 일부 | conflict, review feedback, approval, merge, revert를 조별 통합 랩으로 통합 |
| CH07 | `10`, `11`, `13`, `09` 일부 | CI/CD, 품질 게이트, runner, self-managed GitLab 제약을 운영 자동화 챕터로 통합 |
| CH08 | `08`, `14`, `16`, `12` 일부 | 종합 시나리오, 역할별 플레이북, 최종 점검, 사내 적용 액션을 마무리 챕터로 통합 |

## 8시간 운영안

| 시간 | 챕터 | 핵심 주제 | 실습 형태 |
| --- | --- | --- | --- |
| 1H | CH01 | Git/GitLab 교육 목표, 저장소 구조, 환경 점검 | 개인 환경 준비 + 인증/clone 점검 |
| 2H | CH02 | clone, status, add, commit, push, fetch, pull | 개인 hands-on |
| 3H | CH03 | log, show, diff, stash, restore, tag, bisect, revert | 개인 troubleshooting lab |
| 4H | CH04 | branch, switch, checkout, merge, rebase, fork, tracking branch | 2인 병렬 실습 |
| 5H | CH05 | GitLab roles, protected branch, MR, review, approval | 브라우저 기반 GitLab 협업 실습 |
| 6H | CH06 | conflict, merge/rebase 판단, abort, revert | 4인 조별 랩 |
| 7H | CH07 | `.gitlab-ci.yml`, pipeline, artifacts, runner, self-managed 운영 | 파이프라인 수정/실패/복구 실습 |
| 8H | CH08 | 종합 팀 시뮬레이션, 역할별 플레이북, 최종 체크리스트 | capstone workshop |

## 챕터별 추가 실습 제안

### CH01. Course Foundation and Operating Model

- 실습 1: `clone` 직후 `origin`, `main`, `HEAD`, `working tree`, `staging area` 위치를 말로 설명하기
- 실습 2: SSH / HTTPS / PAT / SSO 중 현재 환경 인증 방식을 식별하기
- 실습 3: GitLab project 화면에서 Owner / Maintainer / Developer / Guest 권한 차이 찾기

### CH02. Local Workflow and Core Commands

- 실습 1: `clone -> status -> add -> commit -> push` 완주
- 실습 2: 잘못 `add`한 파일을 `restore --staged`로 되돌리기
- 실습 3: `push` 전 `log`, `show`, `diff`로 커밋 내용 검증하기
- 실습 4: `non-fast-forward`를 일부러 만들고 `fetch -> 비교 -> 조치` 루틴 수행하기

### CH03. History Inspection and Recovery

- 실습 1: `git log --graph`로 브랜치 이력 읽기
- 실습 2: `git show`로 특정 커밋 변경 검토하기
- 실습 3: `stash push / list / show / pop` 사용
- 실습 4: `tag` 생성 및 release point 고정
- 실습 5: 교육용 샘플 버그를 `bisect`로 찾기
- 실습 6: `revert`와 `reset`의 차이를 실제 결과로 비교하기

### CH04. Branch Strategy and Sync Decisions

- 실습 1: `switch -c`로 feature branch 시작
- 실습 2: `merge` 방식과 `rebase` 방식으로 각각 동기화해 이력 차이 비교
- 실습 3: `checkout <commit>`으로 detached HEAD 체험 후 복귀
- 실습 4: shared repository와 fork model의 장단점을 팀별로 발표

### CH05. GitLab Project Structure, Permissions, and MR

- 실습 1: MR 템플릿 작성 및 리뷰 포인트 명시
- 실습 2: 권한 부족 계정으로 protected branch push 시도 후 실패 원인 분석
- 실습 3: approval rule 변경 전/후 merge 가능 조건 비교
- 실습 4: repo standard checklist로 커밋/브랜치/MR naming 점검

### CH06. Team Collaboration, Conflict, and Rollback Lab

- 실습 1: 4인 1조 역할 분담 후 동일 파일 병렬 수정
- 실습 2: conflict 발생 -> marker 해석 -> 수동 해결 -> 재검토
- 실습 3: `merge --abort`와 `rebase --abort` 비교
- 실습 4: merge 후 문제 발견 -> `revert`로 복구
- 실습 5: 리뷰 코멘트 2회 이상 반영하며 MR 업데이트

### CH07. CI/CD Quality Gates and Self-Managed Operations

- 실습 1: `.gitlab-ci.yml` 기본 stage/job 읽기
- 실습 2: 의도적으로 파이프라인 실패시키고 로그에서 실패 지점 찾기
- 실습 3: artifact와 test report 확인
- 실습 4: self-managed GitLab 환경에서 runner, secret, protected variable 차이 점검
- 실습 5: deploy readiness checklist 작성

### CH08. Capstone Scenario and Role-Based Playbook

- 실습 1: issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback 전체 흐름 수행
- 실습 2: 팀장 / PL / Developer 관점으로 같은 사건을 각각 보고서 형태로 정리
- 실습 3: 운영 사고 시나리오를 받아 root cause, impact, recovery plan 작성
- 실습 4: 팀별 최종 발표: 우리 팀 Git/GitLab 운영 규칙 제안

## 실제 작성 시 확장할 시나리오

- `main` 보호 브랜치에 direct push가 막히는 상황
- 원격이 앞서 있어 `push`가 거절되는 상황
- 로컬 수정이 남아 있어 `pull`이 막히는 상황
- MR은 열렸지만 approval 부족으로 merge가 막히는 상황
- 동일 파일 같은 문단을 서로 수정해 conflict가 나는 상황
- 잘못된 `reset --hard`를 쓰면 왜 협업에서 위험한지 비교하는 상황
- runner가 없는 self-managed GitLab이라 pipeline이 pending 상태로 머무는 상황
- fork가 금지된 사내 저장소에서 shared repository 모델만 허용되는 상황

## 작성 우선순위

1. CH02, CH04, CH05, CH06
2. CH03, CH07
3. CH01, CH08

이 우선순위를 택한 이유는 실제 교육에서 초반 실습 체감과 협업 사고 예방 효과가 가장 큰 장부터 완성하기 위해서다.
