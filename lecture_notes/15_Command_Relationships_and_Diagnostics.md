# 15. 명령어 관계도와 상태 변화별 의사결정 가이드

## 이 장의 목표

- Git 명령어를 개별 암기 대상이 아니라 상태 변화 제어 도구로 이해한다.
- `working tree -> staging area -> local repository -> remote repository` 흐름 위에서 명령어 관계를 설명할 수 있다.
- `pull`, `fetch`, `merge`, `rebase`, `revert`, `reset`, `stash`, `switch`, `checkout`를 언제 써야 하는지 판단할 수 있다.
- 실습 중 자주 만나는 오류 메시지를 보고 다음 조치를 선택할 수 있다.

## 먼저 보는 전체 구조

Git 실습은 대부분 아래 네 공간 사이를 오가는 일이다.

1. Working tree: 실제 파일을 수정하는 공간
2. Staging area: 다음 커밋에 담을 변경을 고르는 공간
3. Local repository: 커밋 이력이 쌓이는 로컬 `.git`
4. Remote repository: GitLab 원격 저장소

핵심 흐름은 아래처럼 이해한다.

```text
clone -> status -> add -> commit -> push
                \-> diff / show / log 로 점검

fetch -> 상태 비교 -> merge 또는 rebase 판단 -> push

문제 발생 시:
status -> branch -vv -> log -> show -> fetch -> 조치 선택
```

## 명령어 관계도

### 시작과 연결

```bash
git clone <repo-url>
git remote -v
git branch -vv
```

- `clone`은 원격 저장소를 로컬로 복제하고 보통 `origin` 원격을 자동 등록한다.
- 기본 브랜치가 `main`인지 `master`인지 먼저 확인한다.
- `branch -vv`는 현재 브랜치가 어느 원격 브랜치를 추적하는지 보여준다.

### 변경 확인과 선별

```bash
git status
git diff
git add <file>
git restore --staged <file>
```

- `status`는 지금 상태를 여는 첫 번째 문이다.
- `diff`는 무엇이 바뀌었는지 실제 줄 단위로 확인한다.
- `add`는 "변경을 저장"하는 명령이 아니라 "다음 커밋에 포함할 변경을 선택"하는 명령이다.
- staging을 잘못했으면 `restore --staged`로 다시 뺀다.

### 이력 기록

```bash
git commit -m "feat: add login validation"
git log --oneline --decorate --graph -n 15
git show HEAD
```

- `commit`은 작업 백업이 아니라 의미 있는 단위의 변경 기록이다.
- `log`는 여러 커밋의 흐름을 본다.
- `show`는 특정 커밋 하나의 상세 내용을 본다.

### 브랜치 이동과 작업 분리

```bash
git branch
git switch -c feature/login-form
git switch main
git checkout <commit-sha>
git checkout -b hotfix/login-redirect
```

- `switch`는 브랜치 이동과 생성에 집중된 안전한 명령이다.
- `checkout`은 브랜치 이동도 가능하지만 commit, file checkout까지 함께 다뤄서 초보자에게 혼동을 줄 수 있다.
- 교육에서는 브랜치 이동은 `switch`, 특정 commit 확인이나 구버전 확인은 `checkout`으로 구분해 설명한다.

## 명령어별 상태 변화 표

| 명령어 | 언제 쓰는가 | Working tree | Staging area | Local history | Remote |
| --- | --- | --- | --- | --- | --- |
| `clone` | 저장소를 처음 가져올 때 | 생성 | 생성 | 복제 | 읽기 |
| `status` | 현재 상태 확인 | 조회 | 조회 | 조회 | 영향 없음 |
| `add` | 커밋 포함 대상을 고를 때 | 유지 | 변경 | 영향 없음 | 영향 없음 |
| `commit` | 로컬 이력 기록 시 | 유지 | 비워짐 | 새 커밋 생성 | 영향 없음 |
| `push` | 로컬 커밋을 원격에 올릴 때 | 영향 없음 | 영향 없음 | 유지 | 갱신 |
| `fetch` | 원격 최신 상태만 받을 때 | 영향 없음 | 영향 없음 | 원격 추적 정보 갱신 | 읽기 |
| `pull` | 원격 변경을 현재 브랜치에 반영할 때 | 바뀔 수 있음 | 바뀔 수 있음 | merge 또는 rebase 발생 | 읽기 |
| `merge` | 다른 브랜치 이력을 합칠 때 | 바뀔 수 있음 | 바뀔 수 있음 | merge commit 가능 | 영향 없음 |
| `rebase` | 커밋 기반을 재배열할 때 | 바뀔 수 있음 | 바뀔 수 있음 | SHA 재작성 | 영향 없음 |
| `stash` | 미완성 작업을 임시 보관할 때 | 비워짐 | 비워짐 | stash stack 생성 | 영향 없음 |
| `revert` | 공유된 커밋을 안전하게 취소할 때 | 유지 | 유지 | 취소 커밋 추가 | 이후 push 필요 |
| `tag` | 특정 릴리즈 지점을 고정할 때 | 영향 없음 | 영향 없음 | 태그 참조 생성 | push 시 공유 가능 |
| `bisect` | 버그 유입 시점을 찾을 때 | checkout 반복 | 상태에 따라 변동 | 이력 탐색 | 영향 없음 |

## 자주 같이 등장하는 명령어 묶음

### 묶음 1. 개인 작업 시작

```bash
git clone <repo-url>
cd <repo>
git status
git branch -vv
```

### 묶음 2. 기능 개발 기본 루프

```bash
git switch -c feature/navbar
git status
git add .
git commit -m "feat: add navbar"
git push -u origin feature/navbar
```

### 묶음 3. 원격 동기화 점검

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 15
```

- `fetch` 후 상태를 보고 `merge`할지 `rebase`할지 결정한다.
- `pull`을 바로 치는 습관보다 안전하다.

### 묶음 4. 충돌 해결 전 기본 점검

```bash
git status
git diff
git log --oneline --graph --decorate -n 10
git show HEAD
```

### 묶음 5. 릴리즈와 추적

```bash
git tag v1.0.0
git show v1.0.0
git push origin v1.0.0
```

### 묶음 6. 회귀 원인 추적

```bash
git bisect start
git bisect bad
git bisect good <known-good-sha>
git bisect reset
```

## `pull`, `fetch`, `merge`, `rebase`를 어떻게 구분할까

### `fetch`

- 원격 변경을 "가져오기만" 한다.
- working tree를 바로 섞지 않는다.
- 교육용 기본 습관은 `fetch -> 확인 -> merge/rebase 판단`이다.

### `pull`

- 기본적으로 `fetch + merge`다.
- 설정에 따라 `rebase`가 붙을 수 있다.
- 현재 작업 상태를 제대로 모르면 의도치 않은 merge commit이나 conflict가 생길 수 있다.

### `merge`

- 두 이력을 합친다.
- 공동 브랜치 상황에서 이력 보존이 명확하다.
- 교육 초반 기본 전략으로 설명하기 좋다.

### `rebase`

- 내 커밋 기반을 새 기준 위로 다시 올린다.
- 히스토리가 직선적으로 보여 읽기 쉬울 수 있다.
- 이미 공유된 커밋에 무분별하게 쓰면 팀 혼란을 만든다.

## `switch`와 `checkout`을 어떻게 구분할까

### `switch`

- 브랜치 이동과 생성 전용
- 초보자에게 안전하고 의도가 분명하다

```bash
git switch main
git switch -c feature/search
```

### `checkout`

- 브랜치 이동
- 특정 commit 열람
- 파일 복원

```bash
git checkout <commit-sha>
git checkout -b hotfix/login
```

- 교육에서는 `switch`를 기본, `checkout`은 레거시/특수 상황 이해용으로 배치한다.

## 오류 메시지별 대응 표

### 1. `fatal: not a git repository`

원인:
- 저장소 루트가 아닌 곳에서 명령 실행

조치:

```bash
pwd
ls
cd <repo-root>
git status
```

### 2. `pathspec 'main' did not match any file(s) known to git`

원인:
- 브랜치 이름 오기
- 아직 `fetch`하지 않아 로컬이 모름

조치:

```bash
git fetch origin
git branch -a
git switch main
```

### 3. `non-fast-forward`

원인:
- 원격 브랜치가 로컬보다 앞섬

조치:

```bash
git fetch origin
git log --oneline --decorate --graph --all -n 15
```

그 다음 아래 중 하나를 선택한다.

- 공동 브랜치면 `merge`
- 개인 feature branch 정리면 `rebase`

### 4. `Your local changes would be overwritten by merge`

원인:
- 아직 commit 또는 stash하지 않은 변경이 있음

조치:

```bash
git status
git stash push -m "wip before sync"
git pull
git stash pop
```

또는 작은 단위라면 먼저 commit한다.

### 5. `detached HEAD`

원인:
- 브랜치가 아니라 특정 commit을 checkout함

조치:

```bash
git switch main
```

그 상태에서 작업을 이어가야 한다면:

```bash
git switch -c investigate-detached-head
```

## 실습 시나리오

### 실습 A. 명령어 관계를 몸으로 익히기

```bash
git clone <repo-url>
cd <repo>
git switch -c practice/command-map
echo "hello" > practice.txt
git status
git add practice.txt
git commit -m "docs: add practice file"
git push -u origin practice/command-map
```

학습 포인트:

- 어느 시점에 파일이 untracked인지
- 어느 시점에 staged인지
- 어느 시점에 local commit이 되는지
- 어느 시점에 GitLab에 보이는지

### 실습 B. `fetch -> 판단 -> merge/rebase`

```bash
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
```

질문:

- 원격이 앞선가, 로컬이 앞선가?
- 지금 `pull`을 바로 쳐도 되는가?
- merge가 나은가, rebase가 나은가?

## 결과 확인 체크리스트

- 명령어를 상태 변화 관점으로 설명할 수 있다.
- `clone -> status -> add -> commit -> push` 흐름을 직접 수행할 수 있다.
- `fetch`, `pull`, `merge`, `rebase` 차이를 말로 설명할 수 있다.
- `switch`와 `checkout` 차이를 알고 있다.
- 오류 메시지를 보면 다음 점검 명령을 떠올릴 수 있다.

## 공식 참고 자료

- Git docs, git-clone:
  - https://git-scm.com/docs/git-clone
- Git docs, git-switch:
  - https://git-scm.com/docs/git-switch
- Git docs, git-stash:
  - https://git-scm.com/docs/git-stash
- Git docs, git-show:
  - https://git-scm.com/docs/git-show
- Git docs, git-bisect:
  - https://git-scm.com/docs/git-bisect

## 다음 장

[16_Group_Workshop_MR_Approval_Conflict_Lab.md](./16_Group_Workshop_MR_Approval_Conflict_Lab.md)에서는 팀장, PL, Developer가 역할을 나눠 실제 MR, 승인, conflict, rollback까지 수행하는 조별 실습 시나리오를 다룬다.
