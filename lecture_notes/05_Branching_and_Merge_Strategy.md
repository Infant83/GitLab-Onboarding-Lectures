# 05. 2단계 시작: 브랜치 전략, `switch`, `checkout`, `fork` 이해하기

## 이 장의 목표

- 팀 협업에서 왜 기본 브랜치에 바로 작업하면 안 되는지 이해한다.
- `branch`, `switch`, `checkout`, `origin/main`, tracking branch 개념을 실습으로 익힌다.
- 공유 저장소 모델과 `fork` 기반 모델의 차이를 설명할 수 있다.
- `merge`와 `rebase`를 언제 어떤 기준으로 선택할지 교육용 운영 원칙을 정한다.

## 선행 개념

- 개인 단계의 `clone -> add -> commit -> push` 흐름을 이해했다.
- README, changelog, tag 같은 기본 기록 관리 습관을 익혔다.

## 왜 협업부터는 전략이 달라지는가?

혼자 할 때는 `main`에서 직접 작업해도 큰 사고가 적다. 하지만 여러 사람이 동시에 작업하면 아래 문제가 바로 생긴다.

- 같은 파일을 서로 덮어씀
- 어느 변경이 어느 목적이었는지 흐려짐
- 검토 전 코드가 기본 브랜치에 섞여 들어감
- 되돌리기와 책임 추적이 어려워짐

그래서 협업에서는 기본적으로 `main`을 보호하고, 작업은 별도 브랜치에서 진행한다.

## 이 장의 핵심 개념

### 브랜치는 무엇인가?

- 브랜치는 프로젝트 복사본이 아니다.
- 특정 commit을 가리키는 가벼운 포인터다.
- 그래서 기능별, 버그별, 실험별로 브랜치를 빠르게 만들고 버릴 수 있다.

### `switch` 와 `checkout` 은 어떻게 다른가?

- `git switch`는 브랜치 이동과 생성에 초점을 둔 비교적 새로운 명령이다.
- `git checkout`은 오래된 다목적 명령으로 브랜치 전환과 파일 복원까지 모두 수행했다.
- 이 교육에서는 입문자의 혼란을 줄이기 위해 기본적으로 `switch`를 사용하고, 기존 자료나 실무에서 자주 보이는 `checkout`을 함께 읽을 수 있도록 설명한다.

## 실습 팀 구성

- 개발자 A: 추천 문구 개선 담당
- 개발자 B: 스타일 개선 담당
- 리뷰어: 화면/코드/설명 검토
- 승인자 또는 Maintainer: merge 전략 및 정책 판단

## 실습 1. 항상 최신 `main`에서 출발하기

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git branch -vv
```

### 여기서 확인할 점

- 내가 정말 `main`에 있는가?
- 로컬 `main`이 `origin/main`과 같은가?
- 아직 push하지 않은 로컬 commit이 `main`에 남아 있지는 않은가?

## 실습 2. 기능 브랜치 만들기

개발자 A:

```bash
git switch -c feature/snack-copy-update
git push -u origin feature/snack-copy-update
```

개발자 B:

```bash
git switch -c feature/snack-style-update
git push -u origin feature/snack-style-update
```

### 브랜치 이름 규칙

- `feature/기능이름`
- `fix/문제이름`
- `chore/정리이름`
- `docs/문서이름`

### 좋은 브랜치 이름 예시

- `feature/snack-copy-update`
- `fix/random-button-bug`
- `docs/setup-guide`

### 나쁜 예시

- `test`
- `mine`
- `final-final`

## `branch`, `switch`, `checkout`의 관계

### 브랜치 목록 보기

```bash
git branch
git branch -vv
```

### 새 브랜치 생성과 이동

```bash
git switch -c feature/snack-copy-update
```

### 기존 브랜치로 이동

```bash
git switch main
```

### 기존 문서나 실무에서 자주 보는 표현

```bash
git checkout main
git checkout -b feature/snack-copy-update
```

이 교육의 원칙은 아래와 같다.

- 입문자 실습 문서는 `switch` 중심으로 쓴다.
- `checkout`은 읽을 수는 있어야 하므로 병행 설명한다.
- 파일 되돌리기는 `restore`, 브랜치 이동은 `switch`로 구분하는 편이 사고가 적다.

## 공유 저장소 모델과 `fork` 모델

### 1. 공유 저장소 모델

팀원이 같은 프로젝트에 직접 접근 권한을 가진다.

- 각자 feature branch를 만든다.
- 같은 원격 프로젝트에 push한다.
- merge request를 통해 `main`으로 반영한다.

이 교육의 기본 실습은 이 모델을 기준으로 한다.

### 2. `fork` 기반 모델

원본 팀 저장소에 직접 push하지 않고, 각자가 자신의 사본 저장소를 가진다.

- 원본 저장소를 fork한다.
- 자신의 fork를 로컬에 clone한다.
- 원본 저장소를 `upstream` remote로 추가한다.
- 최종적으로 upstream 프로젝트에 merge request를 만든다.

예시 명령:

```bash
git clone <my-fork-url>
cd today-snack-lab
git remote add upstream <team-project-url>
git remote -v
git fetch upstream
```

### 언제 fork 모델을 쓰나?

- 외부 기여자를 받을 때
- 원본 저장소에 직접 쓰기 권한을 제한하고 싶을 때
- 공개 프로젝트 운영에서 안전한 기여 흐름이 필요할 때

### 이 교육에서 어떻게 다루나?

- 사내 교육 또는 팀 실습은 공유 저장소 모델이 더 단순하다.
- 단, 협업 구조 이해를 위해 fork 모델도 반드시 설명한다.

## `origin/main` 과 tracking branch

아래 문장을 자연스럽게 읽을 수 있어야 한다.

- `main`은 내 로컬 브랜치다.
- `origin/main`은 원격의 기본 브랜치를 가리키는 원격 추적 참조다.
- `git push -u origin feature/snack-copy-update`는 내 로컬 브랜치와 원격 브랜치의 추적 관계를 만든다.

확인 명령:

```bash
git branch -vv
```

여기서 어떤 원격 브랜치를 추적하는지 볼 수 있다.

## `merge` 와 `rebase`를 어떻게 가르칠 것인가?

초보자에게 가장 중요한 것은 "둘 다 브랜치를 맞추는 방법이지만, 이력 모양과 위험이 다르다"는 점이다.

### `merge`

```bash
git fetch origin
git merge origin/main
```

- 두 줄기의 이력을 유지한 채 합친다.
- 충돌이 나면 merge 중간 상태에서 해결 후 commit한다.
- 교육 초기에는 이해하기 쉽다.

### `rebase`

```bash
git fetch origin
git rebase origin/main
```

- 내 commit들을 최신 `main` 위로 다시 올려 쌓는다.
- 히스토리가 더 직선적으로 보일 수 있다.
- 이미 여러 사람이 같이 쓰는 공개 브랜치에서는 조심해야 한다.

### 이 교육의 운영 원칙

- 개인 또는 아직 공유되지 않은 feature branch에서는 `rebase`를 실습해 볼 수 있다.
- 초보자 협업 실습에서는 충돌 해석을 선명하게 보여 주기 위해 `merge`를 기본 설명으로 두고, `rebase`는 비교 개념과 선택지로 설명한다.

## 실습 3. 브랜치별로 다른 작업 시작하기

개발자 A는 문구를 수정한다.

- `app.js` 추천 이유 문구 다듬기
- README의 기능 설명 보완

개발자 B는 스타일을 수정한다.

- 버튼 색과 여백 변경
- 카드 여백 또는 그림자 조정

둘 다 아래 흐름으로 작업한다.

```bash
git status
git add .
git commit -m "Describe your change clearly"
git push
```

## 팀 운영 규칙

이 장에서 아래 규칙을 반드시 합의한다.

- `main`에는 직접 기능 commit 하지 않는다.
- 작업은 항상 feature branch에서 한다.
- 브랜치는 최신 `main` 기준으로 생성한다.
- push 전에는 로컬 검증을 한다.
- merge 전에는 MR과 리뷰를 거친다.

## 자주 발생하는 실수와 조치

### 기본 브랜치에서 그대로 작업함

조치:

```bash
git status
git branch
```

- 현재 브랜치를 먼저 확인
- 아직 commit 전이면 바로 새 브랜치를 만들어 이동

```bash
git switch -c feature/meaningful-name
```

### 오래된 `main`에서 브랜치를 만듦

조치:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c feature/new-work
```

### `checkout` 과 `restore`를 혼동함

조치:

- 브랜치 이동은 `switch`
- 파일 되돌리기는 `restore`
- 기존 자료의 `checkout`은 상황을 읽고 둘 중 무엇인지 판단

### rebase를 공유 브랜치에 무리하게 적용함

조치:

- 이미 다른 사람과 공유한 브랜치면 재작성 위험을 먼저 검토
- 교육 단계에서는 maintainer 지시 없이 무리한 history rewrite를 하지 않음

## 결과 확인 체크리스트

- 최신 `main` 기준으로 feature branch를 만들었다.
- `branch -vv`로 tracking 상태를 확인했다.
- `switch`와 `checkout`의 차이를 설명할 수 있다.
- 공유 저장소 모델과 fork 모델의 차이를 설명할 수 있다.
- `merge`와 `rebase`의 차이를 한 문장으로 설명할 수 있다.
- 브랜치 운영 규칙을 팀과 합의했다.

## 공식 참고 자료

- Git Book, Branches in a Nutshell:
  - https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
- Git docs, git-switch:
  - https://git-scm.com/docs/git-switch
- Git docs, git-checkout:
  - https://git-scm.com/docs/git-checkout
- Git Book, Rebasing:
  - https://git-scm.com/book/en/v2/Git-Branching-Rebasing

## 다음 장

[06_Merge_Request_and_Code_Review.md](./06_Merge_Request_and_Code_Review.md)에서는 이제 실제로 feature branch의 변경을 GitLab에서 merge request로 올리고, 리뷰와 승인 흐름을 실습한다.
