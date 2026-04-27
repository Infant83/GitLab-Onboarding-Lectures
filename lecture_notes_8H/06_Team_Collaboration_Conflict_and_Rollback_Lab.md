# CH06. Team Collaboration, Conflict, and Rollback Lab

## 이 장의 목적

이 장은 교육의 중심 랩이다. 조별로 역할을 나누고, 같은 파일을 병렬 수정하고, MR을 열고, 리뷰를 받고, approval을 받고, conflict를 해결하고, merge 후 문제를 발견하면 revert까지 수행한다. “Git을 아는 것”이 아니라 “팀이 함께 GitLab으로 일하는 것”을 몸으로 익히는 시간이 이 장이다.

## 1시간 운영안

- 0:00~0:10 역할 분담과 시나리오 소개
- 0:10~0:25 병렬 작업 및 MR 생성
- 0:25~0:40 conflict 발생과 해결
- 0:40~0:50 merge 후 문제 발견과 rollback
- 0:50~1:00 retrospective

## 권장 조 구성

- Owner 역할 1명
- Maintainer 역할 1명
- Developer A 1명
- Developer B 1명

강사가 여유가 있으면:

- 참관용 Guest 계정 추가

## 학습 목표

- 역할별로 GitLab 협업 흐름을 수행할 수 있다.
- conflict가 왜 생기는지 설명할 수 있다.
- `merge --abort`, `rebase --abort`, `revert`를 적절히 사용할 수 있다.
- 리뷰, 승인, 병합, rollback 책임이 누구에게 있는지 구분할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장은 [06_conflict_rollback/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\LAB.md) 와 함께 진행한다.

이번 장에서 참고하는 변형 문구:

- [process-a-rewrite.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\variants\process-a-rewrite.md)
- [process-b-rewrite.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\variants\process-b-rewrite.md)
- [app-a.txt](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\variants\app-a.txt)
- [app-b.txt](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\variants\app-b.txt)

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH05까지 진행한 저장소와 GitLab 프로젝트가 그대로 유지된 상태
  - `docs/process.md`, `src/app.txt`, MR 템플릿, review checklist가 이미 있는 상태
- 강의 노트만으로 진행하는 순서:
  - `Stage 1 -> Stage 2 -> Stage 3 -> Stage 4 -> Stage 5 -> Stage 6 -> Stage 7 -> Stage 8` 순서로 끊지 않고 수행한다
  - 이 장은 본문 자체가 실행 절차다. [06_conflict_rollback/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\LAB.md)는 강사 진행표로만 본다
- 이 장에서 반드시 눈으로 확인할 것:
  - conflict marker 세 줄이 각자 무엇을 뜻하는지
  - `merge --abort`와 `rebase --abort`의 복귀 지점 차이
  - “충돌은 해결됐지만 의미는 틀린” 상태가 왜 남는지
  - `revert`가 공유 이력을 보존하면서 복구하는 방식
- 이 장 종료 상태:
  - 최소 1회 이상 실제 conflict를 해결하고, 1회 이상 abort를 수행한다
  - conflict 해결 전후 diff, staged diff, MR 설명 갱신까지 완료한다
  - CH07에서 이 merge 결과를 pipeline 관점으로 검증할 수 있는 상태가 된다

## CH05와 CH06의 연결

CH05에서 MR과 approval 규칙을 배웠다면, CH06은 그 규칙이 실제 충돌 상황에서 어떻게 작동하는지 몸으로 확인하는 장이다.

- CH05는 정책과 절차
- CH06은 그 절차가 압박 상황에서 어떻게 적용되는지

즉, conflict와 rollback은 Git의 예외 상황이 아니라 협업의 정상적인 일부로 가르쳐야 한다.

## 역할별 체크포인트

### Owner

- merge 허용 시점과 rollback 허용 시점을 결정할 수 있는가
- 운영 리스크가 큰 변경을 approval 단계에서 식별할 수 있는가

### Maintainer

- 충돌을 예방하기 위한 작업 분해와 merge 순서를 설계할 수 있는가
- conflict 해결 후 재검토 포인트를 제시할 수 있는가

### Developer

- branch 생성, commit, push, MR, conflict 해결, revert 흐름을 직접 수행할 수 있는가

## 시나리오 개요

프로젝트에는 `docs/process.md`와 `src/app.txt`가 있다. 두 명의 개발자가 같은 문단을 다르게 수정한다. Developer A의 MR은 먼저 정상 merge된다. Developer B는 나중에 MR을 열면서 conflict를 맞는다. 해결 후 merge하지만, 그 결과 문서 문맥이 깨져 `revert`를 수행한다.

세부 설정:

- `docs/process.md`에는 공용 절차 1~4단계가 적혀 있다
- Developer A는 2단계 설명을 더 상세히 적는다
- Developer B는 같은 2단계를 다른 용어로 바꾼다
- 둘 다 요구사항 일부는 맞지만 합쳐 놓으면 문맥이 꼬이도록 의도한다

교육 포인트:

- conflict는 “같은 파일을 만져서”가 아니라 “같은 의미 영역을 서로 다른 기준으로 수정해서” 생긴다
- 줄 충돌과 의미 충돌은 다를 수 있다

## Stage 1. branch 생성

Developer A:

```bash
git switch main
git pull
git switch -c feature/process-a
```

Developer B:

```bash
git switch main
git pull
git switch -c feature/process-b
```

## Stage 2. 동일 구간 수정

두 명 모두 `docs/process.md`의 같은 문단을 수정한다.

규칙:

- 같은 줄 또는 인접 맥락을 수정해야 conflict 가능성이 높아진다
- 서로 다른 문단만 수정하면 conflict가 안 날 수 있다

실습 지시:

- Developer A는 `process-a-rewrite.md`의 문장을 `docs/process.md` 2단계에 반영한다
- Developer B는 `process-b-rewrite.md`의 문장을 같은 위치에 반영한다
- `src/app.txt`도 `app-a.txt`, `app-b.txt` 중 각자 다른 문구로 수정한다

이유:

- 단순 문장 차이가 아니라 운영 정책이 충돌하도록 만들어야 review와 rollback 판단까지 연결된다

## Stage 3. Developer A의 MR

```bash
git status
git add docs/process.md
git add src/app.txt
git commit -m "docs: clarify shared process"
git push -u origin feature/process-a
```

GitLab UI에서 MR 생성:

- reviewer: Maintainer
- approver: Owner

Maintainer는 아래를 본다.

- 요구사항과 문장이 맞는가
- 리뷰 포인트가 적혔는가
- 불필요한 파일이 섞이지 않았는가

Owner는 아래를 본다.

- main 반영 위험이 낮은가
- protected branch 정책을 지켰는가
- merge 시점이 적절한가

승인 후 merge한다.

## Stage 4. Developer B의 MR과 conflict

Developer B는 자신의 브랜치를 최신 main으로 업데이트하지 않은 상태에서 진행한다.

```bash
git status
git add docs/process.md
git add src/app.txt
git commit -m "docs: adjust shared process wording"
git push -u origin feature/process-b
```

MR을 열면 예상 상황:

- GitLab이 conflict 경고를 표시
- merge 버튼이 비활성화되거나 해결을 요구

## Stage 5. conflict 분석

Developer B는 로컬에서 먼저 진단한다.

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
```

질문:

- main에는 무엇이 먼저 들어갔는가
- 내 브랜치는 어느 commit 기준인가
- merge가 맞는가, rebase가 맞는가

교육 기본 전략:

- 초보자 공통 랩에서는 merge 방식으로 conflict를 먼저 경험한다

```bash
git merge origin/main
```

분석 체크리스트:

- 내가 해결해야 하는 것은 줄 충돌인가, 요구사항 충돌인가
- 상대 변경과 내 변경 중 어느 쪽이 최신 정책을 반영하는가
- conflict를 해결하면 추가 테스트가 무엇이 필요한가
- MR description도 업데이트해야 하는가

## Stage 6. conflict 해결

충돌이 나면:

```bash
git status
```

충돌 파일을 열어 marker를 읽는다.

```text
<<<<<<< HEAD
내 브랜치의 내용
=======
main에 먼저 들어간 내용
>>>>>>> origin/main
```

원칙:

- 어느 한쪽을 무조건 살리는 게 아니라 최종 요구사항에 맞는 문장으로 다시 쓴다
- Maintainer는 요구사항 기준을 말해 준다
- Owner는 운영 영향 기준을 말해 준다

추가 실습:

- 해결 전 `git diff`
- 해결 후 `git diff --staged`
- merge commit 직전 `git show --stat HEAD`

실수 방지:

- marker만 지우고 문장 검토를 안 하면 의미 충돌이 남는다
- 해결 후 테스트를 생략하면 “conflict는 없어졌지만 기능은 깨진” 상태가 된다
- 해결 후 MR 설명을 갱신하지 않으면 reviewer가 최종 의도를 놓친다

해결 후:

```bash
git add docs/process.md
git commit -m "merge: resolve conflict in process guide"
git push
```

## Stage 7. merge / rebase abort 비교

충돌이 너무 복잡하면 일단 중단할 수 있다.

```bash
git merge --abort
```

rebase였다면:

```bash
git rebase --abort
```

메시지:

- abort는 실패가 아니다
- 판단을 보류하고 안전 상태로 돌아가는 명령이다

## Stage 8. merge 후 문제 발견

merge된 뒤 문맥이 이상하거나 운영상 문제가 보인다고 가정한다.

안전 복구:

```bash
git log --oneline
git revert <commit-sha>
git push origin main
```

이 방식을 기본으로 쓰는 이유:

- 이력이 남는다
- 협업 기준점이 유지된다
- 감사와 회고가 가능하다

추가 판단:

- 문서 오타 수준이면 follow-up fix가 더 적합할 수 있다
- 권한 정책, 고객 노출, 배포 장애처럼 운영 영향이 있으면 revert가 우선일 수 있다
- Owner는 “지금 바로 되돌릴지”와 “hotfix로 고칠지”를 명확히 구분해야 한다

## 왜 `reset --hard`를 기본으로 쓰지 않는가

```bash
git reset --hard HEAD~1
```

이 명령은:

- 개인 로컬 정리에는 유용할 수 있다
- 공유 브랜치에서는 기준점을 바꿔 다른 사람의 이력을 혼란스럽게 만든다

Owner 메시지:

- 협업 사고 대응에서는 `revert`가 기본이고 `reset`은 예외다

## conflict가 자주 나는 진짜 원인

- 같은 파일을 오래된 branch에서 동시에 수정한다
- 기능 분해가 거칠어 unrelated change가 한 MR에 섞인다
- MR이 오래 열려 있어 main과 차이가 커진다
- 텍스트는 합쳐졌지만 요구사항 해석이 다르다

Maintainer 메시지:

- conflict는 개인 역량 부족보다 작업 분해와 merge 순서 설계의 문제인 경우가 많다

## retrospective 질문

### Owner

- 어느 시점에 merge를 멈췄어야 했는가
- rollback 승인 기준은 무엇이었는가

### Maintainer

- 충돌을 줄이려면 작업 분해를 어떻게 바꿔야 했는가
- 리뷰 포인트를 미리 더 잘 적을 수 있었는가

### Developer

- conflict 해결 전에 어떤 로그와 diff를 더 봤어야 했는가
- merge와 rebase 중 어느 방식이 더 이해하기 쉬웠는가

## failure scenario 확장

### 시나리오 1. 리뷰 코멘트를 반영했는데 MR 설명은 그대로다

문제:

- 리뷰 이력과 최종 의도가 어긋난다

조치:

- MR description도 함께 갱신한다

### 시나리오 2. conflict는 해결했는데 테스트를 안 했다

문제:

- 줄 충돌은 없어도 의미 충돌은 남아 있을 수 있다

조치:

- 해결 후 최소 실행 검증 필수

### 시나리오 3. approver가 merge를 눌렀지만 pipeline을 안 봤다

문제:

- 승인과 반영이 기술 검증보다 앞섰다

조치:

- approval checklist에 pipeline 상태를 포함한다

### 시나리오 4. conflict는 해결했는데 반대편 변경 의도를 잘못 이해했다

문제:

- 줄은 합쳤지만 운영 정책은 잘못 반영했다

조치:

- 상대 MR 설명, 리뷰 코멘트, 관련 이슈까지 함께 읽는다
- conflict 해결은 텍스트 편집이 아니라 요구사항 재결정이라는 점을 기억한다

## 사람들이 많이 실수하는 포인트

- conflict를 “Git이 이상하게 합치지 못한 상태” 정도로만 본다
- marker를 지우는 것만으로 해결했다고 생각한다
- revert를 실패로 여기고 숨기려 한다
- merge abort를 사용할 타이밍을 놓친다
- rollback 후 후속 action item을 남기지 않는다

## 오늘의 산출물

- 조별 MR 2건
- conflict 해결 기록 1건
- revert 기록 1건
- 역할별 retrospective 메모

## 종료 체크리스트

- 조별로 MR -> review -> approval -> conflict -> merge -> revert를 완주했다
- conflict marker를 읽고 해결할 수 있다
- `merge --abort`, `rebase --abort`, `revert` 차이를 설명할 수 있다
- Owner, Maintainer, Developer가 각자 무엇을 판단해야 하는지 설명할 수 있다

## 공식 참고 자료

- Git merge:
  - https://git-scm.com/docs/git-merge
- Git rebase:
  - https://git-scm.com/docs/git-rebase
- Git revert:
  - https://git-scm.com/docs/git-revert
- GitLab merge requests:
  - https://docs.gitlab.com/user/project/merge_requests/

## 다음 장

[07_CICD_Quality_Gates_and_Self_Managed_Operations.md](./07_CICD_Quality_Gates_and_Self_Managed_Operations.md) 에서 merge 이후 파이프라인과 self-managed GitLab 운영 관점을 연결한다.
