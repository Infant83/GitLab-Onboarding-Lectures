# 07. 2단계 실습: Conflict 해결, `merge --abort`, `rebase --abort`, `revert`

## 이 장의 목표

- conflict가 왜 생기는지 상태 변화 관점에서 설명할 수 있다.
- conflict marker를 읽고 직접 해결할 수 있다.
- `merge` 충돌과 `rebase` 충돌의 차이를 이해한다.
- 공유 브랜치 복구에서 왜 `revert`가 중요한지 실습으로 익힌다.

## 선행 개념

- feature branch와 MR 흐름을 이해했다.
- 팀별 역할이 정해져 있고 MR을 한 번 이상 생성해 봤다.

## conflict를 어떻게 이해해야 하나?

Conflict는 Git이 "둘 다 바뀌었는데 어느 쪽이 정답인지 자동으로 결정할 수 없다"고 알려 주는 상태다. 즉, 실패라기보다 자동 합치기가 멈춘 지점이다.

대표 원인은 아래와 같다.

- 같은 파일의 같은 줄 또는 인접한 줄을 서로 다르게 수정
- 한쪽은 삭제, 다른 쪽은 수정
- 장기간 브랜치를 갱신하지 않아 기반이 많이 벌어짐

## 실습 시나리오

개발자 A와 개발자 B가 둘 다 `app.js`의 추천 이유 문장을 바꾼다.

1. 개발자 A가 먼저 MR을 merge한다.
2. 개발자 B가 늦게 `main` 변경을 가져오려 한다.
3. Git이 자동 합치기를 못 해서 conflict가 발생한다.

## 실습 1. 충돌 상황 만들기

개발자 B 브랜치에서 아래 흐름을 실행한다.

```bash
git fetch origin
git switch feature/snack-style-update
git merge origin/main
```

또는 비교 학습용으로 아래를 시도할 수 있다.

```bash
git fetch origin
git rebase origin/main
```

### 기대 결과

- 자동 merge 또는 rebase가 멈춘다.
- `git status` 에서 충돌 파일이 보인다.

## 실습 2. 상태 확인

```bash
git status
```

### 해석 포인트

- 어떤 파일이 충돌 중인지
- merge 중인지 rebase 중인지
- 다음 행동이 `git add`인지, `--abort`인지

## 실습 3. conflict marker 읽기

충돌 파일을 열면 보통 아래 같은 표시가 보인다.

```text
<<<<<<< HEAD
현재 브랜치 내용
=======
가져오려는 브랜치 내용
>>>>>>> origin/main
```

### 의미

- `<<<<<<< HEAD`: 현재 작업 브랜치 쪽 내용
- `=======`: 경계
- `>>>>>>> origin/main`: 합치려는 반대편 내용

### 해결 원칙

- 둘 중 하나만 살릴지
- 둘을 조합할지
- 완전히 새 문장으로 다시 쓸지

를 사람이 판단해야 한다.

## 실습 4. 충돌 해결 후 마무리

충돌 마커를 제거하고 원하는 최종 문구로 정리한 뒤 아래를 실행한다.

### merge 충돌인 경우

```bash
git add app.js
git commit -m "Resolve conflict with main on snack reason copy"
```

### rebase 충돌인 경우

```bash
git add app.js
git rebase --continue
```

### 항상 해야 할 것

- 브라우저에서 다시 테스트
- `git diff` 또는 `git show`로 최종 결과 확인

## 실습 5. 충돌 해결을 취소하고 싶을 때

아직 해결을 마치지 않았고 처음부터 다시 보고 싶다면 중단할 수 있다.

### merge 중단

```bash
git merge --abort
```

### rebase 중단

```bash
git rebase --abort
```

### 왜 중요한가?

- 초보자는 충돌이 나면 파일을 더 망가뜨리기 쉽다.
- 무리하게 이어가지 말고, 중단 후 다시 시도하는 판단이 필요하다.

## `merge` conflict와 `rebase` conflict는 무엇이 다른가?

### 공통점

- 둘 다 사람이 최종 내용을 판단해야 한다.
- 충돌 파일을 직접 열어 해결해야 한다.

### 차이점

- `merge`는 두 이력을 유지하면서 합친다.
- `rebase`는 내 commit을 새 기반 위로 다시 적용한다.
- rebase 중에는 commit 하나하나를 다시 적용하다가 멈출 수 있다.

교육 초반에는 `merge` 충돌이 더 이해하기 쉬우므로 기본 사례로 먼저 다룬다.

## 실습 6. 잘못 반영된 변경 되돌리기

이번에는 이미 `main`에 잘못된 문구가 들어갔다고 가정한다. 공유 브랜치에서는 아래 흐름을 우선 고려한다.

```bash
git log --oneline --decorate -n 10
git revert <bad-commit-sha>
git push origin main
```

### 왜 `revert`를 먼저 가르치나?

- 기존 이력을 지우지 않는다.
- "이 commit을 왜 되돌렸는지"가 기록으로 남는다.
- 팀이 이미 받아간 공유 이력과 충돌을 줄인다.

### maintainer 실습 확장

merge commit 자체를 되돌리는 경우에는 maintainer가 merge commit 구조를 확인한 뒤 별도 전략을 정해야 한다. 입문자는 먼저 일반 commit `revert`를 확실히 익히는 것이 좋다.

## 왜 `reset --hard`를 공유 브랜치에서 조심해야 하나?

`reset --hard`는 매우 강력하다. 로컬에서 개인 실험 브랜치를 정리할 때는 쓸 수 있지만, 이미 공유된 이력이나 팀이 참조하는 브랜치에서는 큰 혼란을 만들 수 있다.

이 교육의 기본 원칙은 아래다.

- working tree 오타 복구: `restore`
- 공유 브랜치 commit 복구: `revert`
- 강한 이력 이동: maintainer 판단 하에 제한적으로 사용

## conflict를 줄이는 현실적인 방법

- 오래된 브랜치를 오래 끌지 않는다.
- 같은 파일의 같은 부분을 여러 명이 동시에 건드릴 때는 미리 역할을 나눈다.
- 자주 `fetch` 해서 기본 브랜치와 차이를 확인한다.
- MR을 너무 크게 만들지 않는다.
- 리뷰가 오래 끌리면 `main` 반영 시점 차이가 커진다.

## 리뷰어와 승인자는 conflict 장면에서 무엇을 보나?

### 리뷰어

- 최종 해결 결과가 의도대로 동작하는지
- 양쪽 변경 중 중요한 내용이 빠지지 않았는지

### 승인자 또는 Maintainer

- 해결 후 pipeline이 통과했는지
- merge 시점에 다시 충돌 위험이 없는지
- 공유 브랜치 복구 방식이 안전한지

## 자주 발생하는 오류와 조치

### 충돌 마커를 파일에 남긴 채 commit함

조치:

- 파일에서 `<<<<<<<`, `=======`, `>>>>>>>`가 남아 있는지 검색
- 브라우저 또는 실행 테스트로 재검증

### 해결은 했는데 문법 오류가 생김

조치:

- 충돌 해결 후에는 반드시 실행 확인
- 필요하면 `git diff`로 불필요한 삭제가 없는지 확인

### conflict가 무서워서 무조건 상대 변경만 덮어씀

조치:

- 어느 요구사항이 현재 기준인지 먼저 판단
- 작성자 둘과 리뷰어가 함께 최종 문구를 확정

## 결과 확인 체크리스트

- conflict가 발생하는 원인을 설명할 수 있다.
- `git status`로 merge/rebase 충돌 상태를 읽을 수 있다.
- conflict marker를 직접 해석하고 제거할 수 있다.
- `merge --abort`, `rebase --abort`를 알고 있다.
- `revert`를 공유 브랜치 복구의 기본 선택지로 이해한다.

## 공식 참고 자료

- Git docs, git-merge:
  - https://git-scm.com/docs/git-merge
- Git docs, git-rebase:
  - https://git-scm.com/docs/git-rebase
- Git docs, git-revert:
  - https://git-scm.com/docs/git-revert

## 다음 장

[08_Project_Planning_and_Orchestration.md](./08_Project_Planning_and_Orchestration.md)에서는 충돌을 무조건 기술 문제로만 보지 않고, 사전에 작업을 어떻게 나누고 순서를 어떻게 잡아야 줄일 수 있는지 운영 관점으로 다룬다.
