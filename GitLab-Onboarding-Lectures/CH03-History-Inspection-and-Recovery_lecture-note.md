# CH03. History Inspection and Recovery

## 이 장의 목적

협업에서 실수는 피할 수 없다. 중요한 것은 `빨리 발견하고`, `정확히 원인을 찾고`, `안전하게 복구하는 것`이다. 이 장은 `diff`, `log`, `show`, `stash`, `tag`, `bisect`, `revert`, `reset`을 묶어서 “진단과 복구 도구 상자”로 가르친다.

## 1시간 운영안

- 0:00~0:15 이력 읽기와 문제 진단 루틴
- 0:15~0:30 `log`, `show`, `diff`, `stash`
- 0:30~0:45 `tag`, `revert`, `reset`
- 0:45~0:55 `bisect`
- 0:55~1:00 역할별 복구 판단 정리

## 학습 목표

- 최근 변경 이력을 읽고 설명할 수 있다.
- 특정 커밋의 내용을 `show`로 검토할 수 있다.
- 임시 작업을 `stash`로 안전하게 옮길 수 있다.
- 공유 이력 복구에서 `revert`가 왜 기본인지 설명할 수 있다.
- `bisect`로 회귀가 들어온 지점을 좁히는 기본 흐름을 안다.

## 튜토리얼 자산과 준비 파일

이 장의 로컬 실습은 `tutorials/CH03-History-Inspection-and-Recovery/LAB.md`와 `tutorials/CH03-History-Inspection-and-Recovery/assets/`를 기준으로 진행한다. 슬라이드 생성 시에는 tutorial 자산을 따로 업로드하지 않고, 아래 파일 이름과 역할을 이 강의 노트 설명으로만 해석한다.

이번 장에서 새로 추가하는 파일:

- `tutorials/CH03-History-Inspection-and-Recovery/assets/docs/release-notes-draft.md`
- `tutorials/CH03-History-Inspection-and-Recovery/assets/tests/role-policy.test.js`

이전 장에서 계속 쓰는 파일:

- `src/permissions.js`
- `docs/tutorial-guide.md`
- `notes.txt`

실행 예시:

```powershell
Copy-Item .\tutorials\CH03-History-Inspection-and-Recovery\assets\docs\release-notes-draft.md .\docs\
Copy-Item .\tutorials\CH03-History-Inspection-and-Recovery\assets\tests\role-policy.test.js .\tests\
git add docs/release-notes-draft.md tests/role-policy.test.js
git commit -m "test: add role policy history fixtures"
```

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH02까지의 커밋이 쌓여 있고, `notes.txt`와 `docs/tutorial-guide.md`가 이미 저장소에 존재한다
  - `src/permissions.js`는 이후 회귀 분석 대상이 되는 핵심 파일이다
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4 -> 실습 5 -> 실습 6` 순서로 진행한다
  - `revert`와 `reset`은 반드시 결과 차이를 직접 비교한 뒤 넘어간다
  - `tutorials/CH03-History-Inspection-and-Recovery/LAB.md`는 단계 요약본으로만 쓴다
- 이 장에서 반드시 눈으로 확인할 것:
  - `log`가 보여 주는 이력과 `show`가 보여 주는 실제 변경 차이
  - `stash list`가 쌓이는 방식과 `stash pop` 후 working tree 변화
  - `tag`가 릴리즈 지점을 고정하는 방식
  - `bisect`가 잘못된 커밋 구간을 어떻게 반씩 줄이는지
- 이 장 종료 상태:
  - `docs/release-notes-draft.md`와 `tests/role-policy.test.js`가 저장소에 반영되어 있다
  - 하나의 복구 경로로 `revert`, 개인 정리용 경로로 `reset`을 구분해서 설명할 수 있다
  - CH04에서 branch 전략을 잡을 때 어떤 커밋을 기준점으로 삼을지 판단할 수 있다

## CH02와 CH03의 연결

CH02가 “정상적인 변경을 만드는 루프”였다면, CH03은 “이미 생긴 변경을 읽고 해석하고 복구하는 루프”다. 좋은 커밋 습관이 왜 중요한지는 이 장에서 바로 드러난다.

- 커밋이 작을수록 `show`와 `revert`가 쉬워진다.
- 브랜치가 정리되어 있을수록 `log --graph`가 읽힌다.
- 임시 작업을 commit, stash, branch 중 무엇으로 남길지 판단해야 나중에 복구가 쉬워진다.

즉, CH02에서 대충 만든 커밋은 CH03에서 비싼 복구 비용으로 돌아온다.

## 역할별 체크포인트

### Owner

- 협업 브랜치에서 왜 `reset --hard`보다 `revert`를 우선해야 하는지 설명할 수 있는가
- 장애 대응에서 “복구 우선”과 “원인 분석 우선”의 균형을 잡을 수 있는가

### Maintainer

- 회귀가 생긴 커밋 구간을 좁히는 방법을 알고 있는가
- 복구 커밋과 후속 수정 커밋을 어떻게 일정에 반영할지 설명할 수 있는가

### Developer

- `log`, `show`, `diff`, `stash`, `revert`를 직접 사용할 수 있는가
- 문제를 발견했을 때 바로 감으로 수정하지 않고 이력을 먼저 보는가

## 진단 기본 루틴

문제가 생기면 아래 순서를 기본으로 한다.

```bash
git status
git branch -vv
git log --oneline --decorate --graph -n 15
git show --stat HEAD
git fetch origin
```

이 루틴으로 먼저 답해야 하는 질문:

1. 지금 어느 브랜치에 있는가
2. working tree는 깨끗한가
3. 마지막 커밋은 무엇을 바꿨는가
4. 원격이 앞서 있는가
5. 문제는 코드, 권한, 이력, 파이프라인 중 어디에 있는가

## 복구 판단 트리

문제를 발견했을 때는 “무슨 명령을 칠까”보다 “지금 어느 상태인가”부터 답한다.

1. 아직 commit 전인가
2. commit은 했지만 push 전인가
3. 이미 shared branch에 공유했는가
4. 지금 보존해야 할 작업 흔적이 있는가
5. 즉시 복구가 우선인가, 원인 추적이 우선인가

판단 원칙:

- commit 전 수정 복구는 `restore` 또는 stash
- push 전 개인 정리는 `reset` 가능
- push 후 공유 이력 복구는 `revert` 우선
- 회귀 시점 탐색은 `bisect`
- “방금 어디 있었는지” 추적이 필요하면 `reflog`도 검토

## 실무에서 자주 쓰는 진단 명령 조합

```bash
git log --oneline --decorate --graph --all -n 20
git show --stat HEAD
git diff origin/main...HEAD
git reflog -n 10
```

언제 쓰는가:

- 내 브랜치가 main에서 얼마나 벗어났는지 볼 때
- 방금 한 reset, rebase, checkout 이동 흔적을 확인할 때
- 되돌리고 싶은 지점을 찾을 때

강조:

- `reflog`는 실전 복구에서 자주 도움이 된다
- 문서 초반에는 `log`와 `show`를 먼저 익히고, `reflog`는 “길을 잃었을 때 보는 이동 기록”으로 설명하면 이해가 빠르다

## `diff`, `log`, `show`를 어떻게 다르게 쓸까

### `git diff`

- 아직 commit되지 않은 줄 차이를 본다
- 무엇이 바뀌었는지 세부 비교에 적합하다

### `git log`

- 전체 흐름을 본다
- 언제 어느 브랜치에서 어떤 커밋이 이어졌는지 본다

### `git show`

- 특정 커밋 하나를 상세하게 본다
- `HEAD`, 태그, SHA 모두 대상으로 쓸 수 있다

예시:

```bash
git diff
git log --oneline --decorate --graph -n 10
git show HEAD
git show v1.0.0 --stat
```

## 실습 1. 최근 이력 읽기

```bash
git log --oneline --decorate --graph --all -n 20
```

말로 설명해야 하는 것:

- 내 브랜치와 main이 어디서 갈라졌는가
- merge commit이 있는가
- 최근 변경이 feature인지 fix인지 docs인지

확장 명령:

```bash
git log --oneline --decorate --graph --all --author="<name>" -n 20
```

Maintainer 관점:

- 누가 어떤 유형의 변경을 언제 올렸는지 추적할 수 있다

## 실습 2. 특정 커밋 검토

```bash
git show HEAD
git show <commit-sha> --stat
```

질문:

- 이 커밋은 어떤 파일을 건드렸는가
- 변경 규모가 적절한가
- 롤백 단위로 보기 좋은가

## 실습 3. `stash` 사용

상황:

- 작업 중인데 급히 다른 브랜치로 이동해야 한다

```bash
git status
git stash push -m "wip before hotfix"
git stash list
git stash show -p stash@{0}
git stash pop
```

주의:

- stash는 임시 보관함이다
- 장기 저장 수단이 아니다
- 여러 개가 쌓이면 헷갈리므로 메시지를 붙인다

추가 실습:

```bash
git stash branch recover-wip stash@{0}
```

의미:

- 오래된 stash를 다시 작업 branch로 살리고 싶을 때 유용하다
- “stash를 쌓아 두고 잊는 습관”보다 branch로 환원하는 습관이 더 실무적이다

## 실습 4. 릴리즈 포인트 고정

```bash
git tag v0.1.0
git show v0.1.0 --stat
git push origin v0.1.0
```

의미:

- 특정 시점의 commit에 이름표를 붙인다
- 배포, 교육 기준 버전, 데모 포인트를 고정하기 좋다

Owner 관점:

- release point를 태그로 관리하면 rollback 기준점이 더 선명해진다

## 실습 5. `revert`와 `reset` 비교

### 공유된 이력에서 기본 복구

```bash
git log --oneline
git revert <commit-sha>
```

장점:

- 이력이 남는다
- 누가 무엇을 취소했는지 추적 가능하다
- 협업 브랜치에 안전하다

### 개인 로컬 이력 정리

```bash
git reset --hard HEAD~1
```

주의:

- push 전 개인 브랜치에서는 쓸 수 있다
- 이미 공유된 브랜치에서 쓰면 다른 사람의 기준점을 깨뜨릴 수 있다

보강:

```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

차이:

- `--soft`: commit만 취소하고 staging은 유지
- `--mixed`: commit과 staging을 취소하고 working tree는 유지
- `--hard`: working tree까지 되돌림

강조:

- 교육에서는 `--hard`를 “강력하지만 마지막 수단”으로 가르친다
- 초보자는 `soft`, `mixed`, `hard`의 차이를 실제 파일 상태와 연결해서 이해해야 한다

## 실습 6. `bisect`로 회귀 찾기

상황:

- “어제는 됐는데 오늘은 안 된다”
- 어느 커밋부터 깨졌는지 모른다

튜토리얼 기준 회귀 예시:

- `src/permissions.js`에서 `SAMPLE_ACTION_ROLES`에 `"Developer"`를 잘못 추가한다
- `tests/role-policy.test.js` 또는 `tests/permissions.test.js`가 실패하기 시작한다
- 이때 `git bisect`로 문제 commit을 좁힌다

기본 흐름:

```bash
git bisect start
git bisect bad
git bisect good <known-good-commit>
```

중간 커밋마다 테스트 후:

```bash
git bisect good
git bisect bad
```

종료:

```bash
git bisect reset
```

교육 포인트:

- bisect는 마법이 아니라 이분 탐색이다
- 커밋 품질이 좋을수록 원인 찾기가 빨라진다

## failure scenario 1. 잘못된 파일을 망가뜨렸다

### 아직 commit 전

```bash
git diff
git restore <file>
```

### commit 후지만 아직 push 전

```bash
git reset --soft HEAD~1
```

### 이미 공유 후

```bash
git revert <commit-sha>
```

## failure scenario 2. stash를 너무 많이 쌓았다

진단:

```bash
git stash list
git stash show -p stash@{1}
```

정리:

```bash
git stash drop stash@{1}
```

규칙:

- stash는 1~2개 정도만 유지하는 습관이 좋다
- 장기 작업은 branch로 관리한다

추가 위험:

- `stash pop` 중 conflict가 날 수 있다
- 이때는 panic하지 말고 일반 conflict처럼 파일을 열어 marker를 해결한다
- 너무 오래된 stash는 적용 기준 branch가 달라져 conflict 가능성이 높다

## failure scenario 3. HEAD가 분리됐다

상황:

- `git checkout <commit-sha>` 후 수정했다

복귀:

```bash
git switch main
```

그 상태를 살리고 싶으면:

```bash
git switch -c investigate-detached-head
```

## failure scenario 4. reset한 뒤 어디로 갔는지 모르겠다

진단:

```bash
git reflog -n 20
```

활용:

- “조금 전 HEAD가 어디였는지”를 찾는다
- 실수로 checkout, reset, rebase한 흔적을 되짚는다

실무 메시지:

- `reflog`는 협업 복구를 대신해 주는 명령이 아니라, 내 로컬 이동 이력을 추적하는 안전망이다
- shared branch 복구는 여전히 `revert`와 운영 절차가 중심이다

## 사람들이 많이 실수하는 포인트

- 문제를 보자마자 파일부터 고친다
- `show` 없이 `reset --hard`를 먼저 친다
- stash를 임시 브랜치 대신 장기 보관함처럼 쓴다
- tag를 release 이름표가 아니라 그냥 임의 메모처럼 쓴다
- `bisect` 중간에 다른 작업을 섞는다

## 실전에서 특히 많이 쓰는 것

- `git show --stat HEAD`
- `git log --oneline --decorate --graph --all -n 20`
- `git diff origin/main...HEAD`
- `git revert <sha>`
- `git reflog -n 10`

## 역할별 복구 판단

### Owner 판단 질문

- 지금 필요한 것은 즉시 복구인가, 원인 분석인가
- 공유 브랜치 이력을 보존해야 하는가
- rollback 후 재배포 기준은 무엇인가

### Maintainer 판단 질문

- 문제 범위가 문서, 코드, 파이프라인, 권한 중 어디인가
- revert 후 후속 작업을 어떤 순서로 분해할 것인가
- 회귀를 막기 위한 검증 절차를 무엇으로 추가할 것인가

### Developer 판단 질문

- 지금 working tree를 버려도 되는가
- stash가 맞는가, branch가 맞는가, commit이 맞는가
- reset을 써도 되는 개인 로컬 상태인가

## 오늘의 산출물

- 최근 이력 설명 기록
- tag 하나
- stash 사용 기록
- revert 또는 reset 비교 실습 결과
- bisect 흐름 메모

## 종료 체크리스트

- `log`, `show`, `diff`를 목적에 따라 구분해 쓸 수 있다
- `stash`, `tag`, `revert`, `reset`, `bisect`를 설명할 수 있다
- 공유 이력에서는 왜 `revert`가 기본인지 이해했다
- 장애 상황에서 먼저 볼 명령 5개를 안다

## 공식 참고 자료

- Git show:
  - https://git-scm.com/docs/git-show
- Git rebase:
  - https://git-scm.com/docs/git-rebase
- Git bisect:
  - https://git-scm.com/docs/git-bisect
- Git revert:
  - https://git-scm.com/docs/git-revert

## 다음 장

`CH04 lecture note` 에서 브랜치 전략과 merge / rebase / fork 같은 협업 의사결정을 다룬다.
