# CH02. Local Workflow and Core Commands

## 이 장의 목적

이 장은 가장 많이 쓰는 Git 루프를 몸에 익히는 장이다. 초보자는 보통 `add`, `commit`, `push`, `pull`을 단순 암기로 외운다. 이 장에서는 각 명령이 어느 공간을 바꾸는지, 어떤 출력이 정상이고 어떤 출력이 위험 신호인지, 언제 바로 다음 명령으로 넘어가면 안 되는지까지 학습한다.

## 1시간 운영안

- 0:00~0:10 상태 변화 구조 복습
- 0:10~0:30 first commit cycle 실습
- 0:30~0:40 `fetch`와 `pull` 차이 실습
- 0:40~0:50 실패 사례 주입
- 0:50~1:00 역할별 해석과 정리

## 학습 목표

- `clone`, `status`, `add`, `commit`, `push`, `fetch`, `pull`을 실제로 사용할 수 있다.
- working tree, staging area, local history, remote repository가 어떻게 바뀌는지 설명할 수 있다.
- `push` 실패와 `pull` 전 검증 루틴을 이해할 수 있다.
- 작은 커밋 단위, 명확한 메시지, push 전 검증 습관을 실무 규칙으로 가져갈 수 있다.

## 튜토리얼 자산과 준비 파일

이 장은 [02_local_workflow/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\02_local_workflow\LAB.md) 와 함께 진행한다.

이번 장에서 새로 추가하는 파일:

- [notes.txt](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\02_local_workflow\assets\notes.txt)
- [docs/tutorial-guide.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\02_local_workflow\assets\docs\tutorial-guide.md)

이전 장에서 그대로 이어 쓰는 파일:

- `README.md`
- `docs/process.md`
- `src/app.txt`
- `src/permissions.js`

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH01에서 만든 저장소가 로컬에 있고 기본 브랜치가 원격과 연결된 상태
  - working tree는 가능한 한 clean 상태에서 시작한다
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - 막히는 지점은 아래 failure scenario를 바로 참고한다
  - [02_local_workflow/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\02_local_workflow\LAB.md)는 강사용 빠른 체크용이다
- 이 장에서 반드시 눈으로 확인할 것:
  - `status`와 `diff` 출력 차이
  - `diff --staged`와 `show --stat HEAD`가 확인하는 범위 차이
  - `push` 전 `branch -vv`, `fetch origin`으로 upstream 상태를 읽는 습관
- 이 장 종료 상태:
  - `notes.txt`와 `docs/tutorial-guide.md`가 저장소에 반영되어 있다
  - 잘못 `add`한 파일을 `restore --staged`로 되돌릴 수 있다
  - `fetch -> 비교 -> pull 여부 판단` 루틴을 말로 설명할 수 있다
  - CH03에서 이 장의 커밋을 `log`, `show`, `revert`, `bisect` 대상으로 사용할 수 있다

## 역할별 체크포인트

### Owner

- 개발자가 왜 바로 `pull`하지 말고 `fetch -> 비교`를 먼저 해야 하는지 설명할 수 있는가
- 작은 커밋과 명확한 MR 단위가 왜 복구 비용을 줄이는지 이해하는가

### Maintainer

- 하나의 작업을 커밋과 MR로 어떻게 쪼개야 리뷰가 쉬워지는지 설명할 수 있는가
- push 전 검증 루틴을 팀 규칙으로 만들 수 있는가

### Developer

- 파일 수정 후 바로 commit하지 않고 `status -> diff -> add -> commit` 순서를 지키는가
- `push` 전에 현재 브랜치와 원격 추적 상태를 확인하는가

## 핵심 관계도

```text
clone
  -> status
  -> edit files
  -> status
  -> diff
  -> add
  -> status
  -> commit
  -> log / show
  -> push
```

동기화가 끼는 경우는 아래처럼 본다.

```text
fetch
  -> branch -vv
  -> log --graph --all
  -> merge or rebase or no-op
  -> push
```

## 명령어별 상태 변화 해설

### `git status`

- working tree와 staging area의 현재 상태를 보여준다
- 히스토리를 바꾸지 않는다
- 가장 먼저 실행해야 하는 기본 진단 명령이다

### `git add`

- working tree의 일부 또는 전체 변경을 staging area에 올린다
- 파일을 “저장”하는 것이 아니라 다음 commit 후보를 확정하는 행위다
- `git add .`는 편하지만 의도하지 않은 파일이 섞이기 쉽다

### `git commit`

- staging area 내용을 local history에 기록한다
- 원격은 아직 바뀌지 않는다
- 커밋 단위가 크면 review와 rollback 비용이 동시에 커진다

### `git push`

- local history를 원격으로 보낸다
- 권한, upstream, 원격 선행 커밋 여부에 따라 실패할 수 있다
- 실패했다고 바로 force push를 떠올리면 안 된다

### `git fetch`

- 원격 추적 브랜치만 업데이트한다
- working tree와 local branch는 그대로 둔다
- 안전하게 현재 차이를 파악하는 첫 단계다

### `git pull`

- 보통 `fetch + merge`다
- 현재 상태를 모르면 예상치 못한 merge commit이나 충돌을 맞을 수 있다
- 초보자에게는 “최신화 버튼”이 아니라 “자동 동기화 명령”으로 가르친다

## 실무에서 자주 쓰는 명령 조합

### 작업 시작 루틴

```bash
git status
git branch -vv
git fetch origin
git log --oneline --decorate --graph --all -n 15
```

언제 쓰는가:

- 작업 시작 전
- 하루 만에 다시 저장소에 돌아왔을 때
- 다른 사람이 main을 많이 움직였을 가능성이 있을 때

### commit 직전 루틴

```bash
git status
git diff
git diff --staged
```

언제 쓰는가:

- staging 전후에 내 변경 범위를 검토할 때
- 한 커밋에 너무 많은 파일이 섞였는지 확인할 때

### push 직전 루틴

```bash
git status
git branch -vv
git show --stat HEAD
git fetch origin
```

언제 쓰는가:

- upstream과의 차이를 마지막으로 확인할 때
- 잘못된 브랜치 push를 방지할 때

## 실습 1. first commit cycle

### 준비

- CH01에서 clone한 저장소
- 수정 가능한 예제 파일 하나

파일 추가 예시:

```powershell
Copy-Item ..\tutorials\02_local_workflow\assets\notes.txt .\
Copy-Item ..\tutorials\02_local_workflow\assets\docs\tutorial-guide.md .\docs\
```

### 단계 1. 현재 상태 확인

```bash
git status
git branch -vv
```

읽어야 할 것:

- 현재 브랜치 이름
- working tree가 clean인지
- upstream이 설정되어 있는지

### 단계 2. 파일 수정

예시:

```bash
echo "training note" >> notes.txt
```

다시 확인:

```bash
git status
git diff
```

포인트:

- `status`는 바뀐 파일 목록을 본다
- `diff`는 실제 줄 차이를 본다
- 둘 중 하나만 보면 안 된다

### 단계 3. staging

```bash
git add notes.txt
git status
git diff --staged
```

정상 상태:

- `Changes to be committed` 아래에 `notes.txt`

오해 금지:

- `add`는 저장이 아니라 다음 커밋 후보 등록이다
- staging 후에도 로컬 히스토리는 아직 바뀌지 않았다
- `git add .`는 빠르지만 교육 초반에는 파일 단위 `git add <file>`로 의도를 분명히 하는 편이 좋다

### 단계 4. commit

```bash
git commit -m "docs: add training note"
git log --oneline --decorate -n 5
git show --stat HEAD
```

포인트:

- `commit` 이후 local history가 바뀐다
- `show`로 방금 만든 커밋이 진짜 의도한 내용인지 검증한다
- 한 commit에 unrelated change가 섞였으면 CH03에서 `reset --soft`나 추가 commit으로 정리한다

### 단계 5. push

```bash
git push
```

upstream이 없으면:

```bash
git push -u origin <branch-name>
```

설명:

- `-u`는 앞으로 이 브랜치가 어떤 원격 브랜치를 추적할지 연결한다
- 이후에는 같은 브랜치에서 `git push`만으로 충분해질 수 있다

## 실습 2. 잘못 add했을 때 되돌리기

상황:

- `config.local.json` 같은 파일을 실수로 staging했다

명령:

```bash
git status
git restore --staged config.local.json
git status
```

설명:

- working tree의 수정은 유지된다
- staging에서만 제거된다

팀 규칙 포인트:

- 비밀값, 로컬 설정, 임시 로그는 add 전에 `.gitignore`로 막는 것이 더 좋다

## 실습 3. push 전 검증 루틴

아래 4개 명령은 push 직전 기본 루틴으로 훈련한다.

```bash
git status
git log --oneline --decorate -n 3
git show --stat HEAD
git branch -vv
```

이 루틴으로 확인하는 것:

- 내가 의도한 파일만 포함되었는가
- 커밋 메시지가 읽히는가
- 현재 브랜치가 맞는가
- upstream이 어디인가

## 실습 4. `fetch`와 `pull` 차이

### 상황 만들기

- 다른 사람이 같은 브랜치 또는 main을 먼저 업데이트했다고 가정한다

### 먼저 `fetch`

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 15
```

해석:

- 원격 추적 브랜치는 갱신된다
- working tree는 바로 섞이지 않는다

### 그 다음 `pull`

```bash
git pull
```

이 장에서 강조할 것:

- `pull`은 대체로 `fetch + merge`
- 자동 동기화가 생기므로 현재 상태를 모르고 쓰면 놀라기 쉽다
- 팀 기본 전략이 `pull --rebase`인지 plain `pull`인지 저장소 규칙을 반드시 확인한다

## failure scenario 1. `non-fast-forward`

에러 예시:

```text
! [rejected] main -> main (non-fast-forward)
error: failed to push some refs
```

뜻:

- 원격 브랜치가 내 로컬보다 앞서 있다
- 내 커밋을 그냥 얹으면 이력이 어긋난다

조치 루틴:

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
```

그 다음 판단:

- 내가 개인 feature branch라면 rebase 가능
- 공동 브랜치나 초보자 교육에서는 merge가 더 안전
- main에 직접 push하려다 이 에러가 났다면 먼저 “왜 direct push를 하려 했는가”부터 점검한다

## failure scenario 2. `Your local changes would be overwritten`

상황:

- pull 또는 merge 전에 commit되지 않은 로컬 수정이 있다

조치 1:

```bash
git stash push -m "wip before pull"
git pull
git stash pop
```

조치 2:

```bash
git add <needed-files>
git commit -m "wip: save local progress before sync"
git pull
```

판단 기준:

- 짧은 임시 보관이면 stash
- 의미 있는 중간 상태면 branch 또는 commit

## failure scenario 3. 잘못된 브랜치에 push했다

상황:

- `feature/sample-action`에 올려야 할 커밋을 실수로 `main`이나 다른 feature branch에 push했다

즉시 해야 할 일:

```bash
git branch -vv
git log --oneline --decorate -n 5
```

판단:

- 아직 merge되지 않았고 개인 브랜치라면 정리 여지가 있다
- shared branch 또는 protected branch면 CH03, CH05 기준으로 revert와 운영 절차를 우선 검토한다

## failure scenario 4. 커밋 메시지는 좋은데 커밋 범위가 나쁘다

문제:

- 메시지는 `docs: clarify tutorial steps`인데 실제로는 unrelated docs 수정, local config, formatting noise가 같이 들어감

실무 메시지:

- 좋은 메시지는 나쁜 커밋 범위를 구해주지 못한다
- review와 rollback은 메시지보다 실제 diff 단위에 좌우된다

## 사람들이 많이 실수하는 포인트

- `status`만 보고 `diff`를 생략한다
- `git add .`로 너무 많은 파일을 staging한다
- upstream 없이 `push`해서 에러를 보고서야 현재 브랜치를 확인한다
- `pull`을 최신화 버튼처럼 누른다
- `main`에서 바로 commit한 뒤 뒤늦게 branch를 만들려 한다
- IDE가 만든 파일이나 로그 파일을 함께 commit한다

## 실전에서 특히 많이 쓰는 것

- `git diff --staged`
- `git branch -vv`
- `git show --stat HEAD`
- `git fetch origin`
- `git restore --staged <file>`

이 5개는 초보자부터 숙련자까지 자주 쓰는 기본 안전장치다.

## 좋은 커밋 메시지 기준

나쁜 예:

- `fix`
- `update`
- `changes`

좋은 예:

- `docs: clarify tutorial steps`
- `feat: add chart filter option`
- `fix: correct login redirect path`

Maintainer 관점:

- 커밋 메시지가 읽히면 MR 리뷰가 쉬워진다
- 변경의 경계를 커밋 메시지로 추적할 수 있다

## 실습 체크 질문

1. `add`를 하기 전과 후에 무엇이 달라졌는가
2. `commit` 후 GitLab에 바로 보이는가
3. `push`는 로컬의 무엇을 원격에 반영하는가
4. 왜 `fetch`는 안전하고 `pull`은 더 조심해야 하는가

## 오늘의 산출물

- 개인 브랜치에서 만든 첫 커밋
- push 전 검증 루틴 기록
- `non-fast-forward` 또는 stash 시나리오 수행 결과

## 종료 체크리스트

- `clone -> status -> diff -> add -> commit -> show -> push`를 수행할 수 있다
- `fetch`와 `pull` 차이를 설명할 수 있다
- push 전에 꼭 확인할 네 가지를 안다
- add 실수와 pull 전 충돌 위험을 줄이는 습관을 만들었다

## 공식 참고 자료

- Git status:
  - https://git-scm.com/docs/git-status
- Git show:
  - https://git-scm.com/docs/git-show
- Git switch:
  - https://git-scm.com/docs/git-switch
- Git push:
  - https://git-scm.com/docs/git-push

## 다음 장

[03_History_Inspection_and_Recovery.md](./03_History_Inspection_and_Recovery.md) 에서 이력을 읽고, 실수와 회귀를 추적하고, 안전하게 되돌리는 방법을 다룬다.
