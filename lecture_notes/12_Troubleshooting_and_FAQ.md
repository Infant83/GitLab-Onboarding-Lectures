# 12. 전 단계 공통: 자주 막히는 문제 해결과 진단 루틴

## 이 장의 목표

- Git / GitLab 실습에서 자주 발생하는 문제를 증상별로 진단한다.
- `status`, `diff`, `log`, `show`, `fetch`를 문제 분석의 기본 도구로 사용할 수 있다.
- 필요 시 `bisect`로 어떤 commit부터 문제가 생겼는지 추적하는 방법을 이해한다.
- "막히면 어디부터 볼 것인가"라는 공통 루틴을 만든다.

## 가장 먼저 기억할 진단 순서

문제가 생기면 아래 순서를 습관처럼 적용한다.

1. 지금 어느 브랜치에 있는가?
2. working tree는 깨끗한가?
3. 최근 commit 이력은 어떤가?
4. 원격과 로컬 차이는 무엇인가?
5. MR, pipeline, 권한 상태는 어떤가?

기본 명령은 아래 다섯 개를 먼저 본다.

```bash
git status
git branch -vv
git log --oneline --decorate --graph -n 10
git show --stat HEAD
git fetch origin
```

## 증상 1. `push`가 안 됩니다

### 가능 원인

- 인증 실패
- 원격 URL 문제
- 보호 브랜치 direct push 금지
- 원격이 앞서가서 non-fast-forward 거절

### 확인 명령

```bash
git remote -v
git branch -vv
git fetch origin
git log --oneline --decorate --graph --all -n 10
```

### 기본 조치

- URL과 권한을 확인
- 기본 브랜치 정책 확인
- 원격이 앞선 경우 상태를 먼저 보고 필요한 방식으로 동기화

## 증상 2. `pull` 후 예상치 못한 결과가 생겼습니다

### 가능 원인

- 현재 브랜치를 잘못 인식
- 자동 merge가 일어났음
- 작업 중이던 변경과 섞였음

### 기본 조치

- 다음부터는 `fetch -> 상태 확인 -> pull 또는 merge/rebase 판단` 순서로 접근
- 진행 중인 작업이 있으면 `stash` 또는 commit 먼저 고려

## 증상 3. 브라우저에서는 화면이 안 바뀝니다

### 가능 원인

- 파일 저장 누락
- 브라우저 캐시
- JS 에러
- 배포 반영 지연

### 점검 항목

- 로컬 파일이 실제로 바뀌었는지 `diff` 확인
- 브라우저 새로고침 및 캐시 무효화
- script 경로와 element id 일치 여부 확인

## 증상 4. MR은 열었는데 merge가 안 됩니다

### 가능 원인

- 충돌
- 파이프라인 실패
- 필수 승인 부족
- 권한 부족

### 점검 항목

- MR 상태 배너
- pipeline 결과
- approvals 또는 reviewers 상태
- 보호 브랜치 정책

## 증상 5. conflict가 났는데 어느 쪽을 살려야 할지 모르겠습니다

### 기본 원칙

- "내 것 vs 상대 것"이 아니라 "현재 요구사항에 맞는 최종 결과"를 선택
- 필요하면 양쪽을 합쳐 새 내용으로 다시 쓴다
- 해결 후 반드시 실행 검증

### 먼저 볼 것

- MR 설명
- 최근 merge된 변경의 의도
- 리뷰 코멘트

## 증상 6. 실수로 파일을 망가뜨렸습니다

### 아직 commit 전이라면

```bash
git diff
git restore <file>
```

### 이미 commit 후 공유 브랜치에 반영됐다면

```bash
git log --oneline
git revert <commit-sha>
```

## 증상 7. 어느 commit부터 버그가 들어왔는지 모르겠습니다

이때 `bisect`를 개념적으로라도 알아두면 좋다.

### 기본 흐름

```bash
git bisect start
git bisect bad
git bisect good <known-good-commit>
```

그 다음 Git이 중간 지점을 체크아웃하면, 해당 시점에서 프로그램을 테스트한 뒤 아래 중 하나를 입력한다.

```bash
git bisect good
git bisect bad
```

끝나면 아래로 종료한다.

```bash
git bisect reset
```

### 언제 유용한가?

- "어제는 됐는데 오늘은 안 된다" 수준을 넘어서
- 어느 시점에서 회귀가 들어왔는지 이력으로 좁히고 싶을 때

## 증상 8. stash한 작업이 헷갈립니다

```bash
git stash list
git stash show -p stash@{0}
git stash pop
```

### 원칙

- stash는 임시 보관함이다.
- 장기 보관용 이력 대체 수단이 아니다.
- 이름 있는 메시지를 붙이는 습관이 좋다.

## 증상 9. `show` 와 `log`를 어떻게 써야 할지 모르겠습니다

### `log`

- 이력의 전체 흐름을 볼 때
- 어떤 commit들이 이어졌는지 파악할 때

### `show`

- 특정 commit 하나의 실제 변경 내용을 볼 때
- 태그, HEAD, 특정 SHA의 세부 차이를 검토할 때

예시:

```bash
git log --oneline --decorate --graph -n 10
git show HEAD
git show v0.1.0 --stat
```

## 공통 점검 문장

아래 네 문장을 말로 설명할 수 있으면 대부분의 문제 진단이 빨라진다.

- "나는 지금 어느 브랜치에 있다."
- "내 working tree는 깨끗하다 / 깨끗하지 않다."
- "원격과 로컬 중 어느 쪽이 앞서 있는지 알고 있다."
- "지금 문제는 코드, 권한, 파이프라인, 배포 중 어디에서 생기는지 추정할 수 있다."

## 결과 확인 체크리스트

- 문제 발생 시 기본 진단 순서를 알고 있다.
- `status`, `branch -vv`, `log`, `show`, `fetch`를 먼저 본다.
- `push`, `pull`, conflict, MR, pipeline 문제를 구분할 수 있다.
- `bisect`의 목적과 기본 흐름을 설명할 수 있다.

## 공식 참고 자료

- Git docs, git-bisect:
  - https://git-scm.com/docs/git-bisect
- Git docs, git-show:
  - https://git-scm.com/docs/git-show
- GitLab Docs, CI/CD:
  - https://docs.gitlab.com/ci/

## 다음 장

[13_Internal_GitLab_Environment_Adaptation.md](./13_Internal_GitLab_Environment_Adaptation.md)에서는 이 교육 자료를 사내 self-managed GitLab 환경에 맞게 바꿀 때 무엇을 점검해야 하는지 정리한다.
