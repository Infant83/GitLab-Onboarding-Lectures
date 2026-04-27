# CH04. Branch Strategy and Sync Decisions

## 이 장의 목적

협업이 꼬이는 가장 큰 이유는 명령어를 몰라서보다 `어떤 브랜치 전략을 쓸지`, `언제 merge하고 언제 rebase할지`, `shared repository와 fork 중 무엇이 맞는지`를 합의하지 못해서다. 이 장은 명령어보다 운영 판단을 먼저 세우고, 그 판단을 Git 명령으로 어떻게 구현하는지 보여준다.

## 1시간 운영안

- 0:00~0:15 브랜치와 추적 관계 개념
- 0:15~0:30 `branch`, `switch`, `checkout`
- 0:30~0:45 `merge`, `rebase`, `fork`
- 0:45~0:55 두 가지 동기화 실습
- 0:55~1:00 운영 규칙 정리

## 학습 목표

- 브랜치를 커밋을 가리키는 참조로 설명할 수 있다.
- `branch`, `switch`, `checkout` 차이를 구분할 수 있다.
- `merge`와 `rebase`의 차이를 이력 관점과 운영 관점에서 설명할 수 있다.
- shared repository 모델과 fork 모델의 장단점을 설명할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장의 로컬 실습은 `tutorials/CH04-Branch-Strategy-and-Sync-Decisions/LAB.md`와 `tutorials/CH04-Branch-Strategy-and-Sync-Decisions/assets/`를 기준으로 진행한다. 슬라이드 생성 시에는 tutorial 원본 파일을 따로 업로드하지 않고, 이 강의 노트에 정리된 branch 전략과 예시 파일 역할만 사용한다.

이번 장에서 새로 추가하는 파일:

- `tutorials/CH04-Branch-Strategy-and-Sync-Decisions/assets/docs/branch-planning.md`
- `tutorials/CH04-Branch-Strategy-and-Sync-Decisions/assets/src/feature-flags.json`

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH03까지의 이력이 정리되어 있고, 현재 기본 브랜치 상태를 `log --graph`로 읽을 수 있는 상태
  - `src/feature-flags.json`은 branch 전략과 feature 반영 범위를 설명하는 새 기준 파일이 된다
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - 같은 변경을 `merge`와 `rebase` 두 방식으로 각각 동기화해 이력 차이를 비교한다
  - `tutorials/CH04-Branch-Strategy-and-Sync-Decisions/LAB.md`는 팀 실습 순서를 빠르게 확인할 때만 본다
- 이 장에서 반드시 눈으로 확인할 것:
  - `branch -vv`에서 tracking branch가 어떻게 표시되는지
  - `switch`와 `checkout`이 작업 브랜치 이동과 detached HEAD에서 어떻게 다르게 느껴지는지
  - `merge` 결과 이력과 `rebase` 결과 이력의 모양 차이
- 이 장 종료 상태:
  - feature branch를 스스로 만들고, 기준 브랜치와 비교해 동기화 방법을 선택할 수 있다
  - `docs/branch-planning.md`, `src/feature-flags.json`가 저장소에 반영되어 있다
  - CH05에서 실제 GitLab MR을 열 때 어떤 브랜치와 설명 범위를 써야 하는지 정리된 상태가 된다

## CH03와 CH04의 연결

CH03에서 이력을 읽고 복구하는 법을 배웠다면, CH04는 애초에 이력이 덜 꼬이도록 branch와 sync 전략을 설계하는 장이다.

- CH03은 “꼬인 뒤에 읽는 법”
- CH04는 “덜 꼬이게 일하는 법”

즉, branch 전략은 미학이 아니라 복구 비용과 review 비용을 줄이는 운영 설계다.

## 역할별 체크포인트

### Owner

- 어떤 브랜치만 보호하고 어떤 브랜치는 자유롭게 둘지 결정할 수 있는가
- merge 정책과 rollback 비용의 관계를 설명할 수 있는가

### Maintainer

- 기능을 feature branch 단위로 적절히 나눌 수 있는가
- 동시에 여러 작업이 들어갈 때 merge 순서를 설계할 수 있는가

### Developer

- `switch -c`로 브랜치를 안전하게 시작하는가
- 동기화 전에 `fetch -> 비교 -> 판단` 루틴을 지키는가

## 브랜치를 어떻게 이해할까

- 브랜치는 폴더 복사가 아니다
- 특정 commit을 가리키는 움직이는 포인터다
- 그래서 가볍고 많이 만들어도 된다

예시:

```bash
git branch
git switch -c feature/user-profile
```

실무 해설:

- 브랜치는 싸다. 그래서 작업 분해를 branch 단위로 가져가야 review와 rollback이 쉬워진다.
- 반대로 branch 수명이 너무 길면 main과 멀어져 conflict 비용이 커진다.
- 좋은 branch는 “짧고, 목적이 분명하고, merge 기준이 명확한 branch”다.

## `switch`와 `checkout`

### `switch`

- 브랜치 이동과 생성에 집중한다
- 교육에서는 기본 이동 명령으로 사용한다

```bash
git switch main
git switch -c feature/sample-action
```

### `checkout`

- 브랜치 이동도 하고 특정 commit 열람도 한다
- 강력하지만 초보자에게는 다기능이라 혼동된다

```bash
git checkout <commit-sha>
git checkout -b hotfix/login
```

교육 규칙:

- 브랜치 이동은 `switch`
- 특정 commit 보기나 레거시 문서 해석은 `checkout`

## tracking branch 이해

```bash
git branch -vv
```

이 출력으로 확인하는 것:

- 현재 브랜치가 어느 원격 브랜치를 추적하는가
- 원격보다 앞섰는가 뒤졌는가

upstream 설정:

```bash
git push -u origin feature/user-profile
```

자주 묻는 질문:

- 왜 `branch -vv`를 자주 보라고 하는가
  - 지금 branch가 원격보다 앞섰는지 뒤졌는지 바로 보이기 때문이다.
- 왜 upstream 없이 작업하면 불편한가
  - `push`, `pull`, sync 판단이 모두 모호해진다.
- 왜 `origin/main`과 `main`을 구분해야 하는가
  - 전자는 원격 추적 참조이고, 후자는 내 로컬 branch다.

## shared repository와 fork

### shared repository 모델

- 같은 저장소에 팀원들이 함께 접근
- feature branch -> MR -> main merge
- 사내 저장소, 제품팀, 내부 협업에 적합

### fork 모델

- 각자가 원본 저장소의 사본을 가짐
- 원본에 직접 push하지 않고 MR 또는 PR로 기여
- 오픈소스나 외부 기여에 적합

사내 실무 질문:

- fork를 막아야 하는가
- 외부 협력사는 어느 모델을 써야 하는가
- 민감 저장소에서 direct write를 누가 가져야 하는가

## merge와 rebase를 운영 관점에서 비교

### merge

- 두 이력을 합친다
- merge commit이 생길 수 있다
- 공동 이력 보존이 명확하다
- 초보자 교육과 팀 협업에서는 기본 전략으로 두기 좋다

```bash
git fetch origin
git switch feature/sample-action
git merge origin/main
```

### rebase

- 내 커밋을 새 기준 위에 다시 올린다
- 이력이 더 직선적으로 보인다
- commit SHA가 바뀐다
- 이미 공유된 브랜치에서 무분별하게 쓰면 혼란을 만든다

```bash
git fetch origin
git switch feature/sample-action
git rebase origin/main
```

## branch naming과 수명 관리

추천 예시:

- `feature/sample-action`
- `fix/login-timeout`
- `docs/tutorial-guide.md`
- `hotfix/payment-null-check`

원칙:

- 무엇을 위한 branch인지 이름만 보고 알아야 한다
- 너무 긴 branch 수명은 conflict와 stale review를 만든다
- 하나의 branch에 여러 unrelated 목표를 넣지 않는다

Maintainer 관점:

- branch 이름은 일정 단위와 review 단위를 반영해야 한다
- “기능 하나, 목적 하나, MR 하나” 원칙이 유지될수록 병목이 줄어든다

## decision matrix

### merge가 더 적합한 경우

- 공동 브랜치 흐름을 보존하고 싶다
- 초보자 교육 중이다
- force push를 피하고 싶다
- conflict 해결 과정을 팀이 함께 확인해야 한다

### rebase가 더 적합한 경우

- 개인 feature branch를 정리 중이다
- 아직 다른 사람과 공유하지 않았다
- linear history를 유지하고 싶다

### rebase를 조심해야 하는 경우

- 이미 리뷰 중인 브랜치다
- 다른 사람이 같은 브랜치를 기준으로 작업한다
- 보호 브랜치 정책상 force push가 금지되어 있다

## 실습 1. 브랜치 생성과 병렬 작업

```bash
git switch main
git pull
git switch -c feature/a
```

다른 사람 또는 다른 터미널:

```bash
git switch main
git pull
git switch -c feature/b
```

같은 파일의 다른 영역을 수정한다.

튜토리얼 실행 예시:

```powershell
Copy-Item .\tutorials\CH04-Branch-Strategy-and-Sync-Decisions\assets\docs\branch-planning.md .\docs\
Copy-Item .\tutorials\CH04-Branch-Strategy-and-Sync-Decisions\assets\src\feature-flags.json .\src\
git add docs/branch-planning.md src/feature-flags.json
git commit -m "docs: add branch planning memo"
```

학습 포인트:

- 병렬 작업 자체는 conflict가 아니다
- 나중에 합치는 과정에서 겹치면 conflict가 된다

## 실습 2. merge 방식 동기화

feature/a에서 main을 먼저 업데이트했다고 가정한다.

feature/b에서:

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
git merge origin/main
```

관찰:

- merge commit이 생기는가
- 이력 그래프가 어떻게 달라지는가
- conflict가 났을 때 어떤 파일과 어떤 줄이 겹쳤는가

## 실습 3. rebase 방식 동기화

다른 새 브랜치에서 같은 상황을 다시 만든 뒤:

```bash
git fetch origin
git rebase origin/main
```

관찰:

- commit SHA가 바뀌는가
- 그래프가 더 직선적으로 보이는가
- 리뷰 중인 MR 링크나 코멘트 맥락이 흔들리지 않는가

## 실습 4. detached HEAD 체험

```bash
git log --oneline -n 5
git checkout <old-commit-sha>
git status
```

복귀:

```bash
git switch main
```

설명:

- 브랜치 없이 특정 과거 commit만 보고 있는 상태
- 조사에는 유용하지만 이 상태에서 무심코 작업하면 위험하다

## failure scenario 1. 잘못된 브랜치에서 작업했다

상황:

- `main`에서 바로 수정하고 commit까지 해버렸다

조치:

```bash
git switch -c hotfix/moved-work
git switch main
```

핵심:

- commit이 아직 공유되지 않았다면 브랜치를 나눠 살릴 수 있다

확장 상황:

- commit 전이라면 `git stash` 후 올바른 branch로 이동하는 선택지도 있다
- 이미 push한 뒤라면 CH05의 MR / 정책과 CH03의 revert 판단을 함께 봐야 한다

## failure scenario 2. rebase 후 push가 안 된다

원인:

- rebase로 commit SHA가 바뀌었다

가능한 조치:

```bash
git push --force-with-lease
```

단, 조건:

- 개인 feature branch
- 리뷰어와 Owner가 rebase를 이해하고 있음
- 보호 브랜치가 아님

교육 규칙:

- 초보자 공통 실습에서는 merge 전략을 기본으로 한다
- rebase는 비교 이해용으로 다룬다

## failure scenario 3. 오래된 feature branch가 main과 너무 멀어졌다

징후:

- `git log --graph --all`에서 내 branch가 한참 전 commit에서 갈라져 있다
- conflict가 여러 파일로 번진다
- MR diff가 커져 리뷰어가 맥락을 잃는다

조치:

- 더 자주 `fetch -> 비교 -> sync`
- 큰 작업은 여러 branch로 나눈다
- merge 순서를 Maintainer가 조정한다

## 사람들이 많이 실수하는 포인트

- branch 생성 없이 main에서 바로 시작한다
- `branch -vv`를 안 보고 upstream이 없는 branch에서 작업한다
- shared branch에서 rebase 후 force push를 가볍게 생각한다
- feature branch 수명을 너무 길게 가져간다
- fork 모델과 shared repository 모델의 정책 차이를 혼동한다

## 실전에서 특히 많이 쓰는 것

- `git switch -c <branch>`
- `git branch -vv`
- `git fetch origin`
- `git merge origin/main`
- `git rebase origin/main`

이 다섯 개를 언제 쓰는지 설명할 수 있으면 branch 전략의 절반은 이해한 것이다.

## 역할별 운영 규칙 예시

### Owner 규칙

- `main` direct push 금지
- feature branch는 자유롭게 생성 가능
- merge는 approval 후 only

### Maintainer 규칙

- 기능 단위를 1~3개 커밋으로 관리
- MR 설명에 변경 범위와 테스트 범위 필수
- 큰 기능은 여러 feature branch로 분해

### Developer 규칙

- `switch -c` 없이 작업 시작 금지
- `fetch` 없이 동기화 판단 금지
- 공유 브랜치에서 force push 금지

## 오늘의 산출물

- feature branch 2개
- merge 비교 결과 메모
- rebase 비교 결과 메모
- branch 운영 규칙 초안

## 종료 체크리스트

- `switch`, `checkout`, `branch -vv`를 설명할 수 있다
- `merge`와 `rebase`의 차이를 설명할 수 있다
- shared repository와 fork 모델 차이를 설명할 수 있다
- 언제 merge를 쓰고 언제 rebase를 피해야 하는지 안다

## 공식 참고 자료

- Git switch:
  - https://git-scm.com/docs/git-switch
- Git merge:
  - https://git-scm.com/docs/git-merge
- Git rebase:
  - https://git-scm.com/docs/git-rebase
- GitLab merge requests:
  - https://docs.gitlab.com/user/project/merge_requests/

## 다음 장

`CH05 lecture note` 에서 GitLab 역할, 보호 브랜치, MR, approval 흐름을 운영 관점으로 정리한다.
