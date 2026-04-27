# 03. 1단계 실습: 혼자 개발할 때의 일일 Git 작업 흐름

## 이 장의 목표

- 로컬 수정부터 commit, push까지의 일일 작업 루틴을 익힌다.
- `status`, `diff`, `add`, `commit`, `show`, `log`를 연결된 흐름으로 이해한다.
- `fetch`, `pull`, `stash`가 언제 필요한지 실제 상황으로 배운다.
- 초보자가 가장 자주 하는 실수인 "확인 없이 commit"과 "생각 없이 pull"을 피하는 습관을 만든다.

## 선행 개념

- [02_Getting_Started.md](./02_Getting_Started.md)를 따라 프로젝트 생성, clone, 첫 commit, 첫 push를 마쳤다.
- 현재 로컬 저장소와 GitLab 원격 저장소가 연결되어 있다.

## 오늘의 실습 목표

이미 만든 `오늘의 팀 간식 추천기`를 조금 더 개선한다.

- 추천 문구를 더 친절하게 바꾼다.
- 추천 목록을 1개 더 추가한다.
- 작업 중 급한 다른 일을 처리해야 하는 상황에서 `stash`를 써 본다.
- 마지막에 원격과 동기화 상태를 다시 확인한다.

## 일일 작업 루틴의 기본 순서

이 장에서 반복해서 익힐 루틴은 아래다.

```text
작업 시작 전 동기화 확인
-> 파일 수정
-> 상태 확인
-> 차이 확인
-> staging
-> commit
-> commit 내용 재확인
-> push
```

명령어로 보면 보통 아래 순서다.

```bash
git fetch origin
git status
git diff
git add <file>
git commit -m "message"
git show --stat HEAD
git push
```

## 실습 1. 작업 시작 전 원격 상태 확인

```bash
git fetch origin
git status
git log --oneline --decorate --graph --all -n 8
```

### 왜 `pull`부터 하지 않나?

초보자는 먼저 `fetch`로 원격 변경을 가져오고, 지금 내 브랜치와 원격 브랜치가 어떤 관계인지 확인하는 습관이 중요하다. `pull`은 편하지만 내부적으로 `fetch + merge`가 함께 일어나므로, 아직 상태 판단이 익숙하지 않은 단계에서는 한 번 나눠서 보는 편이 안전하다.

### 여기서 확인할 질문

- 내 브랜치가 `origin/main`과 같은 위치에 있는가?
- 내가 아직 push하지 않은 commit이 있는가?
- 원격에만 있고 내 로컬에는 아직 없는 commit이 있는가?

## 실습 2. 문구 수정

`index.html` 또는 `app.js`에서 추천 안내 문구를 아래처럼 조금 더 친절하게 바꾼다.

예시:

- 기존: `버튼을 눌러 오늘의 간식을 받아 보세요.`
- 수정: `회의 전 에너지가 필요하다면 버튼을 눌러 오늘의 간식을 확인하세요.`

수정 후 바로 아래 명령을 실행한다.

```bash
git status
git diff
```

### 해석 포인트

- `status`는 어떤 파일이 수정되었는지 알려 준다.
- `diff`는 정확히 어떤 문장이 바뀌었는지 보여 준다.

이 두 개를 보고 "지금 내가 바꾸려고 한 내용만 들어 있는가?"를 먼저 판단해야 한다.

## 실습 3. 추천 데이터 추가

`app.js`의 `snacks` 배열에 항목 하나를 더 추가한다.

예시:

```javascript
{ name: "바나나", reason: "빠르게 먹고 바로 다시 집중하기 좋습니다." }
```

추가 후 다시 확인한다.

```bash
git status
git diff
```

## 실습 4. 로컬 실행 결과 검증

- 브라우저에서 페이지를 새로고침한다.
- 버튼을 여러 번 눌러 새 항목이 실제로 나오는지 본다.
- 문구가 어색하지 않은지 확인한다.

### 왜 이 검증이 중요한가?

- Git은 변경 이력을 남겨 준다.
- 하지만 잘못된 변경 이력을 자동으로 막아 주지는 않는다.
- 즉, commit 전 검증은 여전히 사람 책임이다.

## 실습 5. staging 전에 바뀐 내용을 정리해서 보기

```bash
git diff
```

변경이 여러 파일에 섞여 있다면 아래처럼 "이번 commit에 같이 들어가도 되는 변경인가?"를 생각한다.

- 같은 목적의 수정인가?
- 나중에 되돌릴 때 하나로 묶여도 괜찮은가?
- 리뷰어가 봤을 때 하나의 변경으로 설명 가능한가?

## 실습 6. `add` 와 `commit`

```bash
git add index.html app.js
git status
git diff --cached
git commit -m "Improve snack copy and add banana option"
```

### 각 명령의 역할

- `git add`: 이번 commit에 넣을 변경을 고른다.
- `git diff --cached`: staging된 내용만 미리 본다.
- `git commit`: 선택된 내용을 이력으로 남긴다.

### commit 후 점검

```bash
git log --oneline --decorate --graph -n 5
git show --stat HEAD
```

`show --stat`은 지금 막 만든 commit이 내가 의도한 범위인지 빠르게 검토할 때 매우 유용하다.

## 실습 7. 작업 도중 급한 요청이 들어왔을 때 `stash`

실무에서는 수정 중인 상태에서 갑자기 다른 브랜치나 다른 파일을 확인해야 하는 경우가 많다. 아직 commit하고 싶지 않은 변경이 있다면 `stash`가 유용하다.

### 연습 절차

1. `styles.css`에서 버튼 색이나 여백을 임시로 조금 바꾼다.
2. 아직 commit하지 않는다.
3. 아래 명령을 실행한다.

```bash
git status
git stash push -m "WIP: button spacing experiment"
git status
git stash list
```

### 기대 결과

- stash 전에는 수정 파일이 보인다.
- stash 후에는 working tree가 깨끗해진다.
- `stash list`에서 방금 저장한 항목이 보인다.

### 다시 복원하기

```bash
git stash pop
git status
```

### 주의할 점

- `stash`는 영구 백업이 아니다.
- 오래 묵힌 stash는 잊기 쉽다.
- 협업 브랜치의 정식 이력 대체용으로 쓰면 안 된다.

## 실습 8. 원격에 반영하기

```bash
git push origin main
```

push 후 GitLab UI에서 아래를 확인한다.

- 최신 commit 메시지
- 변경 파일 목록
- 코드 diff

## `fetch` 와 `pull` 은 어떻게 다르게 써야 하나?

### `fetch`

```bash
git fetch origin
```

- 원격 변경만 가져온다.
- 내 현재 브랜치를 바로 바꾸지 않는다.
- 초보자가 상태를 판단하기 가장 좋은 출발점이다.

### `pull`

```bash
git pull --ff-only origin main
```

- 보통 `fetch + merge` 흐름이다.
- 이 교육에서는 개인 단계에서 `--ff-only`를 권장한다.
- 이유는 예상치 못한 merge commit을 만들지 않게 하기 위해서다.

## 자주 발생하는 실수와 조치

### 실수 1. 저장하지 않은 상태로 commit하려고 함

조치:

- 편집기 저장 여부 확인
- `git diff`로 실제 변경이 잡히는지 다시 확인

### 실수 2. 너무 많은 파일을 한 commit에 넣음

조치:

- `git status`
- `git diff --cached`
- 필요하면 `git restore --staged <file>`로 staging 해제 후 다시 묶기

### 실수 3. 원격에 새 변경이 있는데 무작정 `pull`

조치:

```bash
git fetch origin
git log --oneline --decorate --graph --all -n 10
```

- 먼저 상태를 본다.
- 개인 단계에서는 가능하면 fast-forward만 허용되는 방식으로 당겨온다.

### 실수 4. stash를 해 두고 잊어버림

조치:

```bash
git stash list
git stash show -p stash@{0}
```

- stash 목록을 확인
- 어떤 변경이 들어 있는지 패치로 확인

## 이 장에서 꼭 이해해야 하는 명령어 관계

```text
git status
-> git diff
-> git add
-> git diff --cached
-> git commit
-> git show
-> git push
```

그리고 작업 시작 시에는 아래 두 개를 습관처럼 사용한다.

```bash
git fetch origin
git status
```

## 팀 협업 관점에서 이 장이 중요한 이유

협업이 시작되면 다른 사람이 내 commit을 읽고, 내 변경을 merge request로 검토한다. 즉, 개인 단계에서 아래가 안 되면 협업도 무너진다.

- commit 범위를 작게 나누기
- commit 메시지를 설명 가능하게 쓰기
- push 전 로컬 검증하기
- 원격과 내 로컬의 차이를 먼저 파악하기

## 결과 확인 체크리스트

- `fetch`, `status`, `diff`로 작업 시작 상태를 확인했다.
- 문구 수정과 데이터 추가를 했다.
- 브라우저에서 결과를 검증했다.
- `add`, `commit`, `show`, `log`를 사용했다.
- `stash push`, `stash list`, `stash pop`을 실습했다.
- push 후 GitLab에서 최신 commit을 확인했다.

## 공식 참고 자료

- Git Book, Recording Changes to the Repository:
  - https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
- Git Book, Viewing the Commit History:
  - https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
- Git docs, git-stash:
  - https://git-scm.com/docs/git-stash

## 다음 장

[04_Collaboration_Fundamentals.md](./04_Collaboration_Fundamentals.md)에서는 혼자 작업하더라도 나중에 협업과 유지보수가 가능하도록 `README`, `CHANGELOG`, `tag`, `restore` 같은 기록 관리 습관을 붙인다.
