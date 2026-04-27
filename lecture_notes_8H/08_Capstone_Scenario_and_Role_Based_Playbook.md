# CH08. Capstone Scenario and Role-Based Playbook

## 이 장의 목적

마지막 장은 모든 것을 하나로 묶는 장이다. issue를 받고, 브랜치를 만들고, commit하고, MR을 열고, review와 approval을 거쳐 merge하고, pipeline 결과를 보고, 문제가 생기면 rollback까지 수행한다. 그리고 마지막에는 Owner, Maintainer, Developer가 같은 사건을 서로 다른 언어로 정리한다.

## 1시간 운영안

- 0:00~0:10 capstone 브리핑
- 0:10~0:35 end-to-end 팀 실습
- 0:35~0:45 사고 주입과 대응
- 0:45~0:55 역할별 회고
- 0:55~1:00 현업 적용 액션 정리

## capstone 목표

- 기술 흐름과 운영 흐름을 한 번에 연결한다
- 역할별 책임 문장을 말할 수 있게 만든다
- 교육 내용을 현업 규칙 초안으로 바꾼다

## 튜토리얼 자산과 준비 파일

이 장은 [08_capstone/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\LAB.md) 와 함께 진행한다.

이번 장에서 새로 추가하는 파일:

- [issues/ISSUE-101-sample-action.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\assets\issues\ISSUE-101-sample-action.md)
- [src/sample-action.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\assets\src\sample-action.js)
- [tests/sample-action.test.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\assets\tests\sample-action.test.js)
- [docs/release-decision-log.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\assets\docs\release-decision-log.md)

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH01~CH07의 모든 자산과 규칙이 같은 저장소에 누적된 상태
  - feature flag, permissions, MR template, CODEOWNERS, CI 파일이 이미 준비된 상태
- 강의 노트만으로 진행하는 순서:
  - `단계별 흐름`을 처음부터 끝까지 그대로 수행한다
  - 실행 중 의사결정은 `역할별 플레이북`과 `사고 발생 시 역할별 즉시 행동`을 기준으로 한다
  - [08_capstone/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\LAB.md)는 팀 진행자가 타임라인을 점검할 때만 본다
- 이 장에서 반드시 눈으로 확인할 것:
  - issue 내용이 branch 이름, commit 범위, MR 설명으로 어떻게 이어지는지
  - sample action 기능이 `permissions`, `feature-flags`, test, pipeline과 어떻게 연결되는지
  - merge 이후 사고가 나면 hotfix와 revert 중 무엇을 먼저 선택해야 하는지
- 이 장 종료 상태:
  - issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback 흐름을 한 번에 수행했다
  - `docs/release-decision-log.md`에 역할별 판단과 회고가 남아 있다
  - 팀 규칙 초안으로 옮길 수 있는 운영 문장을 확보했다

## 앞선 7개 장과 어떻게 연결되는가

- CH01에서 로컬/원격/권한의 기준을 잡았다
- CH02에서 기본 작업 루프를 익혔다
- CH03에서 이력 읽기와 복구를 배웠다
- CH04에서 branch와 sync 전략을 정했다
- CH05에서 MR, approval, protected branch를 다뤘다
- CH06에서 conflict와 rollback을 실제로 수행했다
- CH07에서 pipeline과 deploy readiness를 읽었다

CH08은 이 7개 장을 “한 번에 끊김 없이 수행하는 운영 시나리오”로 묶는 장이다.

## 시나리오

새 기능 요청이 들어왔다고 가정한다.

- 기능: 샘플 동작 버튼 추가
- 조건: role에 따라 버튼 노출 다름
- 요구사항: UI 변경, API 연결, 테스트, MR, approval, pipeline success
- 사고 주입: merge 후 잘못된 권한 노출 발견

추가 제약:

- main direct push 금지
- 최소 1명 reviewer, 1명 approver 필요
- pipeline success 없이는 merge 금지
- rollback은 Owner 승인 후 수행

## 팀 역할

- Owner: merge 최종 승인, rollback 승인
- Maintainer: 작업 분해, 리뷰 포인트 정의, 배포 readiness 판단
- Developer A: UI 및 branch 작업
- Developer B: 테스트 및 리뷰 반영

## 단계별 흐름

### 1. issue 정리

정리 항목:

- 목적
- 범위
- 제외 범위
- 테스트 포인트
- 배포 영향

추가 항목:

- 권한 영향
- rollback 기준
- feature flag 또는 비활성화 가능 여부

### 2. branch 생성

```bash
git switch main
git pull
git switch -c feature/sample-action
```

### 3. 개발 및 commit

```bash
git status
git add .
git commit -m "feat: add sample action visibility"
git push -u origin feature/sample-action
```

실전 보강:

```bash
git diff
git diff --staged
git show --stat HEAD
```

강조:

- `git add .`를 바로 치기 전에 반드시 `diff`로 범위를 확인한다
- sample action 기능과 unrelated 파일이 섞이면 capstone의 평가가 떨어진다

### 4. MR 생성

MR에는 아래를 반드시 적는다.

- 목적
- 변경 범위
- 테스트 결과
- 리뷰 포인트
- 배포 영향

추가 요구:

- role별 노출 기준
- rollback 방법
- 관련 screenshot 또는 로그

### 5. 리뷰와 승인

Maintainer:

- 요구사항 충족 여부
- 범위 통제
- 테스트 누락 여부

Owner:

- 운영 영향
- rollback 가능성
- merge 허용 시점

### 6. pipeline 확인

- success / failed / pending
- artifact
- 로그

판단 질문:

- 이 pipeline은 MR 최신 commit 기준인가
- 실패했다면 코드 수정이 필요한가, 인프라 확인이 먼저인가
- success여도 권한 노출 시나리오를 실제로 검증했는가

### 7. merge

- protected branch 정책 준수
- approval 완료 확인
- merge 후 main 기준 이력과 pipeline 확인

### 8. 사고 주입

상황:

- 권한 없는 사용자에게 샘플 동작 버튼이 노출됨

즉시 질문:

1. 지금 필요한 것은 hotfix인가 revert인가
2. 배포 중지 여부는 누가 판단하는가
3. 먼저 할 일은 로그 확인인가, 즉시 복구인가

### 9. rollback

기본 복구:

```bash
git log --oneline
git revert <commit-sha>
git push origin main
```

추가 판단:

- hotfix branch가 더 빠른가
- 이미 사용자 영향이 발생했는가
- revert 후 어떤 테스트와 커뮤니케이션이 필요한가

### 10. 회고

- 어떤 규칙이 있었으면 사고를 줄일 수 있었는가
- MR 설명과 리뷰 포인트는 충분했는가
- pipeline이 잡아줬어야 하는데 못 잡은 부분은 무엇인가

## 역할별 플레이북

### Owner 플레이북

- merge는 기술 완료가 아니라 운영 허가라는 관점으로 본다
- protected branch와 approval rule을 저장소별로 다르게 설계한다
- rollback 기준을 미리 문서화한다
- 장애 시 blame보다 복구 우선, 복구 후 회고 원칙을 지킨다

### Maintainer 플레이북

- 기능을 branch / MR / 테스트 단위로 분해한다
- 리뷰 포인트와 승인 기준을 문장으로 남긴다
- merge 순서를 조정해 충돌 가능성을 낮춘다
- pipeline 실패를 일정 리스크로 다룬다

### Developer 플레이북

- `status`, `branch -vv`, `log`, `show`를 습관처럼 사용한다
- conflict를 두려워하지 말고 marker와 이력을 보고 해결한다
- 공유 브랜치에서는 `revert`, 개인 정리에서는 `reset` 원칙을 구분한다
- MR은 코드만이 아니라 의도와 검증 범위까지 제출한다

## 사고 발생 시 역할별 즉시 행동

### Owner

- 영향 범위와 rollback 여부를 먼저 결정한다
- blame보다 서비스 안정화와 기준점 회복을 우선한다

### Maintainer

- 현재 어떤 branch와 commit이 문제인지 정리한다
- 어떤 검증이 누락됐는지 즉시 문장으로 기록한다

### Developer

- `status`, `branch -vv`, `log`, `show`로 현재 상태를 확정한다
- 즉흥 수정 전에 재현 조건과 영향을 기록한다

## 최종 평가 루브릭

### Owner 평가

- 권한, 승인, rollback 기준을 설명할 수 있는가
- 운영 위험을 기준으로 merge 허용 여부를 판단할 수 있는가

### Maintainer 평가

- 작업 분해와 merge 순서를 설명할 수 있는가
- review / approval / pipeline을 일정 통제와 연결할 수 있는가

### Developer 평가

- 기본 명령어와 복구 명령을 직접 수행할 수 있는가
- conflict와 MR 흐름을 독립적으로 진행할 수 있는가

가산점 기준:

- 잘못된 방향의 명령을 치지 않고 먼저 상태를 설명했다
- rollback과 hotfix를 구분해 제안했다
- MR 설명과 리뷰 포인트를 사고 후에도 업데이트했다

## 현업 전이 체크리스트

- 우리 팀 기본 브랜치와 보호 정책은 무엇인가
- MR 템플릿은 있는가
- approval rule은 명확한가
- self-managed GitLab runner 상태를 누가 관리하는가
- rollback 기준이 문서화되어 있는가
- 장애 시 커뮤니케이션 채널이 준비되어 있는가

추가 체크:

- 팀의 기본 sync 전략은 merge인가 rebase인가
- release tag를 누가 언제 찍는가
- self-managed runner 장애 시 우회 절차가 있는가
- tutorial 교육에서 이 8개 장 중 어떤 장을 필수로 돌릴 것인가

## 실습 확장 과제

- CODEOWNERS 도입 시 approval 흐름이 어떻게 바뀌는지 조사
- hotfix branch 운영 규칙 설계
- self-managed GitLab에서 fork 제한 정책 설계
- CI 단계에 smoke test 추가안 작성

## 사람들이 많이 실수하는 포인트

- capstone을 “명령어 실습 종합문제”로만 본다
- review와 approval을 통과 의례처럼 처리한다
- 사고 주입 후 곧바로 코드를 다시 고치려 한다
- rollback 이후 회고 문서화를 생략한다

## 마지막 강조

- 좋은 협업은 많은 명령어를 아는 것보다 상태를 정확히 설명하는 능력에서 시작한다
- 좋은 운영은 merge를 빠르게 하는 것보다 잘못 반영됐을 때 빠르게 복구하는 기준을 갖는 데서 완성된다

## 오늘의 산출물

- end-to-end capstone 수행 기록
- 역할별 회고 메모
- 팀 운영 규칙 초안
- 현업 전이 체크리스트

## 종료 체크리스트

- Git과 GitLab 협업 흐름을 처음부터 끝까지 설명할 수 있다
- Owner, Maintainer, Developer의 판단 기준을 분리해서 설명할 수 있다
- rollback과 회고까지 포함한 운영 흐름을 이해했다
- 교육 내용을 우리 팀 규칙으로 바꾸기 위한 다음 액션을 적었다

## 공식 참고 자료

- Git documentation:
  - https://git-scm.com/docs
- GitLab documentation:
  - https://docs.gitlab.com/
- GitLab merge requests:
  - https://docs.gitlab.com/user/project/merge_requests/
- GitLab CI/CD:
  - https://docs.gitlab.com/ci/

## 마지막 메모

이 교육의 목적은 더 많은 명령어를 외우게 하는 것이 아니다. 아래 세 문장을 실제 행동으로 옮길 수 있게 만드는 것이다.

- 나는 지금 어떤 상태에 있는지 안다.
- 팀은 내 변경을 어떤 절차로 검토하고 반영하는지 안다.
- 문제가 생겼을 때 어디서부터 안전하게 복구해야 하는지 안다.
