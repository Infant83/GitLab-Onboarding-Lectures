# 01. 왜 Git / GitLab 교육을 `개인 개발 -> 팀 협업 -> CI/CD` 순서로 배우는가?

## 이 장의 목표

- 이 교육이 왜 기능 설명서가 아니라 `실제 업무 흐름 실습`으로 설계되었는지 이해한다.
- 왜 `개인 개발`, `팀 협업`, `CI/CD`를 분리해서 배우는지 설명할 수 있다.
- 이후 장들에서 어떤 명령어와 어떤 협업 상황을 다루게 되는지 큰 그림을 잡는다.
- 조별 실습을 어떤 역할 구조와 어떤 운영 규칙으로 진행할지 합의한다.

## 선행 개념

이 장은 Git이나 GitLab을 깊이 알지 못해도 읽을 수 있다. 다만 아래 단어는 미리 익숙해지면 좋다.

- `repository`: 프로젝트 파일과 변경 이력을 함께 보관하는 저장소
- `commit`: 특정 시점의 변경 묶음
- `branch`: 다른 작업 흐름을 안전하게 분리하는 라인
- `remote`: GitLab 같은 원격 저장소
- `merge request`: 내 브랜치의 변경을 기본 브랜치에 반영해 달라고 요청하는 협업 단위
- `pipeline`: push 또는 MR을 계기로 자동 실행되는 검증 절차

## 이 장의 핵심 결론

이 교육은 Git 명령어 사전이 아니다. 작은 웹 프로젝트를 직접 만들고, 혼자 고치고, 팀으로 충돌을 겪고, MR을 올리고, 승인 받고, 마지막에 자동화까지 연결하면서 Git과 GitLab을 `작업 시스템`으로 이해하도록 설계했다.

핵심 순서는 아래와 같다.

1. 개인 개발
- 먼저 혼자 저장소를 다룰 수 있어야 한다.
- `status`, `add`, `commit`, `push`가 무엇을 바꾸는지 몸으로 익힌다.

2. 팀 협업
- 다음으로 같은 저장소를 여러 사람이 안전하게 다루는 법을 배운다.
- `branch`, `merge request`, `review`, `approval`, `conflict`, `revert`를 실제로 경험한다.

3. CI/CD
- 마지막으로 사람이 반복하던 확인을 파이프라인으로 넘긴다.
- `코드 작성 -> 리뷰 -> 승인 -> 검증 -> 반영` 흐름이 자동화와 어떻게 연결되는지 본다.

이 순서를 바꾸면 초보자는 금방 흔들린다. `push`가 무엇을 의미하는지 모르는 상태에서 MR이나 pipeline부터 배우면 개별 기능은 보이지만 전체 작업 흐름은 보이지 않는다.

## 이 교육 설계의 공식 문서 기준

이번 재구성은 감각적인 설명이 아니라 Git과 GitLab의 공식 문서가 설명하는 구조를 교육 흐름으로 다시 묶는 방식으로 만든다.

### Git 관점

- Git은 프로젝트의 변경 이력을 기록하는 분산 버전 관리 시스템이다.
- Git의 핵심 작업 공간은 `working tree`, `staging area`, `repository history`로 나뉜다.
- 브랜치는 무거운 복사본이 아니라 특정 commit을 가리키는 가벼운 포인터다.
- `clone`은 원격 저장소를 복사하고, 일반적으로 기본 remote 이름을 `origin`으로 설정한다.
- `pull`은 보통 `fetch` 뒤 `merge`를 수행하는 동작으로 이해하는 것이 안전하다.

### GitLab 관점

- GitLab은 단순 코드 저장소가 아니라 source code management, merge request, review, approval, CI/CD를 한 흐름으로 연결하는 플랫폼이다.
- 프로젝트 역할은 권한 계층을 가진다. 실습에서 주로 볼 역할은 `Guest`, `Developer`, `Maintainer`, `Owner`다.
- 보호 브랜치와 승인 정책은 "누가 push 할 수 있는가"와 "누가 merge 할 수 있는가"를 분리해서 관리하게 해 준다.
- pipeline은 `.gitlab-ci.yml`을 기준으로 push, branch, merge request 같은 이벤트에 반응해 자동 실행된다.

즉, 이번 교육의 3단계 구조는 Git과 GitLab의 실제 모델을 학습 난이도에 맞게 나눈 것이다.

## 왜 먼저 개인 개발을 배우는가?

팀 협업은 결국 개인 작업의 합이다. 아래 질문에 답하지 못하면 협업 기능을 제대로 이해하기 어렵다.

- 내 로컬 파일과 Git 저장소는 어떻게 다른가?
- 아직 commit 하지 않은 변경은 어디에 있는가?
- `add`와 `commit`은 각각 무엇을 바꾸는가?
- `push`를 하기 전에 무엇을 확인해야 하는가?
- 되돌리고 싶을 때 무엇을 근거로 판단해야 하는가?

그래서 1단계에서는 일부러 혼자 작업한다. 목적은 기능을 많이 만드는 것이 아니라 `안전하게 바꾸는 법`을 익히는 것이다.

### 1단계에서 익히는 핵심 명령

```bash
git clone <repository-url>
git status
git add <file>
git commit -m "message"
git log --oneline --decorate --graph
git show <commit>
git push origin main
```

### 1단계에서 몸에 익혀야 하는 질문

- 지금 변경은 아직 파일 수정 상태인가, staging 상태인가, commit 된 상태인가?
- 이 commit 메시지를 다른 사람이 읽어도 이해할 수 있는가?
- push 하기 전에 브라우저 또는 실행 화면에서 결과를 확인했는가?
- 한 commit에 너무 많은 변경을 묶지는 않았는가?

## 왜 그다음에 팀 협업을 배우는가?

Git이 개인의 변경 이력 관리 도구라면, GitLab은 그 변경을 팀이 검토하고 승인하고 통제하는 흐름을 만든다. 초보자가 여기서 가장 헷갈리는 지점은 `내 작업 완료`와 `팀 반영 완료`가 다르다는 것이다.

실무에서는 보통 아래 흐름을 거친다.

1. 기능 브랜치를 만든다.
2. 작업 후 원격 브랜치에 push 한다.
3. merge request를 만든다.
4. 리뷰어가 코멘트를 남긴다.
5. 수정자가 후속 commit으로 반영한다.
6. 승인자가 merge 가능 여부를 판단한다.
7. 기본 브랜치에 반영한다.

즉, 협업 단계의 핵심은 `코드를 작성하는 것`보다 `코드를 설명하고 검증받고 반영하는 것`이다.

### 2단계에서 익히는 핵심 명령

```bash
git switch -c feature/snack-copy-update
git status
git add .
git commit -m "Update snack recommendation copy"
git push -u origin feature/snack-copy-update
git fetch origin
git merge origin/main
git rebase origin/main
git diff
git log --oneline --decorate --graph --all
```

이 교육에서는 초보자의 사고 과정을 분명하게 만들기 위해, 동기화의 기본 설명을 `git fetch -> 상태 확인 -> merge 또는 rebase 판단` 순서로 가르친다. `git pull`도 다루지만, 초반에는 "가져오기와 합치기"를 한 번에 감추지 않고 나눠서 이해하게 하는 쪽이 안전하다.

### 2단계에서 직접 겪어야 하는 협업 상황

- 같은 파일을 두 명이 동시에 수정
- 리뷰 코멘트로 인해 추가 수정 commit 발생
- `main`이 먼저 바뀌어 내 브랜치가 뒤처짐
- merge 직전에 conflict 발생
- 잘못 merge 된 변경을 `revert`로 복구

## 왜 CI/CD는 마지막에 배우는가?

자동화는 사람을 없애는 것이 아니라, 사람이 매번 반복하던 확인을 표준화하는 것이다. 그런데 무엇을 자동화해야 하는지 알려면 먼저 사람이 어떤 기준으로 검토하는지 알아야 한다.

예를 들어 아래는 자동화 이전에 반드시 사람이 이해해야 하는 판단들이다.

- 이 변경이 요구사항에 맞는가?
- 기능이 실제로 동작하는가?
- merge 해도 안전한가?
- 충돌을 잘 해결했는가?
- 잘못 반영되었을 때 복구 경로가 있는가?

이 기준이 서야 pipeline의 의미가 생긴다. 그래서 3단계는 `검토 기준이 이미 생긴 뒤`에 들어간다.

### 3단계에서 익히는 핵심 명령과 파일

```bash
git switch -c chore/add-ci-pipeline
git add .gitlab-ci.yml
git commit -m "Add basic GitLab CI pipeline"
git push -u origin chore/add-ci-pipeline
```

여기서 중요한 것은 명령 자체보다 아래 관계를 이해하는 것이다.

- `push`가 일어나면 GitLab이 pipeline 실행 조건을 평가한다.
- merge request가 열려 있으면 MR 맥락의 검증이 추가될 수 있다.
- pipeline 결과는 사람의 리뷰를 대체하는 것이 아니라 merge 판단 근거를 보강한다.

## 이번 교육의 대표 예제

전체 교육은 `오늘의 팀 간식 추천기`라는 작은 정적 웹 프로젝트를 기준으로 진행한다.

### 왜 이 예제를 쓰는가?

- HTML, CSS, JavaScript만으로 시작할 수 있어 진입 장벽이 낮다.
- 버튼 클릭 결과가 바로 보여서 변경 결과를 빠르게 검증할 수 있다.
- 문구, 데이터, 스타일, 레이아웃, 스크립트 로직을 따로 나눌 수 있어 협업 분업이 쉽다.
- 일부러 같은 파일을 건드리게 만들어 conflict를 교육적으로 설계할 수 있다.
- 마지막에 GitLab Pages 또는 사내 정적 배포 시나리오로 확장하기 쉽다.

### 이 프로젝트에서 단계별로 달라지는 점

| 단계 | 학습 초점 | 실제 작업 | 핵심 결과물 |
| --- | --- | --- | --- |
| 1단계 | 혼자 안전하게 변경하기 | 파일 수정, 상태 확인, commit, push | 로컬 저장소와 원격 저장소 연결 |
| 2단계 | 팀으로 충돌 없이 반영하기 | branch, MR, review, approval, conflict 해결 | merge request 기반 협업 흐름 |
| 3단계 | 검증과 반영 자동화하기 | `.gitlab-ci.yml`, pipeline 해석, 배포 연결 | 검증이 포함된 변경 반영 체계 |

## 조별 실습 운영 방식

이 교육은 개인 학습뿐 아니라 조별 실습이 가능해야 한다. 기본적으로 3인 1조를 권장한다.

### 교육용 역할 분담

| 교육 역할 | 핵심 책임 | GitLab 권한과의 관계 |
| --- | --- | --- |
| 개발자 A | 기능 구현, branch 생성, MR 생성 | 일반적으로 `Developer` 이상 |
| 리뷰어 | 코드/화면/설명 검토, 코멘트 남김 | 실습 환경에 따라 `Developer` 또는 `Maintainer` |
| 승인자 | merge 가능 여부 판단, 정책 확인 | 보통 `Maintainer` 이상 |

### 확장 역할

- `Developer B`: 병렬 수정과 conflict 유발 시나리오 담당
- `Owner`: 프로젝트 생성, 멤버 추가, 보호 브랜치 정책 관리
- `Guest`: 읽기 중심 역할. 직접 push 또는 merge가 막히는 사례 설명용

### GitLab 역할을 어떻게 이해해야 하는가?

실습에서는 주로 네 가지 역할을 반복해서 본다.

- `Guest`: 프로젝트를 보고 이슈나 문서를 참고하는 역할에 가깝다.
- `Developer`: 브랜치를 만들고 코드를 push 하고 merge request를 여는 실무 주체다.
- `Maintainer`: 보호 브랜치, 승인, merge, 프로젝트 운영 정책과 더 가까운 역할이다.
- `Owner`: 프로젝트 또는 그룹의 최상위 관리 권한을 가진다.

정확한 세부 권한은 GitLab 버전과 정책에 따라 달라질 수 있으므로, 이후 역할 장에서 실습 환경 기준으로 다시 정리한다. 다만 입문자는 먼저 `작성 권한`, `검토 권한`, `반영 권한`, `정책 관리 권한`을 분리해서 이해하는 것이 중요하다.

## 이 교육에서 일부러 설계하는 실전 시나리오

이번 재건은 "잘 될 때만 보여 주는" 교육이 아니라, 실무에서 실제로 자주 겪는 상황을 의도적으로 포함한다.

### 시나리오 A. 개인 개발자의 안전한 첫 push

- 빈 프로젝트를 만든다.
- 로컬에서 HTML/CSS/JS 뼈대를 만든다.
- `status -> add -> commit -> push` 순서를 몸에 익힌다.
- commit 메시지와 실제 결과 화면을 함께 확인한다.

### 시나리오 B. 리뷰 가능한 변경 만들기

- 기능 브랜치를 만든다.
- 간식 추천 문구를 바꾼다.
- 변경 목적, 변경 범위, 확인 방법을 MR 본문에 적는다.
- 리뷰 코멘트를 받은 뒤 후속 commit으로 반영한다.

### 시나리오 C. 의도적 conflict 발생과 해결

- 두 명이 같은 파일의 같은 줄 근처를 수정한다.
- 먼저 merge 된 변경 때문에 다른 브랜치에서 충돌이 발생한다.
- conflict marker를 읽고 어느 내용을 살릴지 판단한다.
- 수정 후 다시 테스트하고 commit 한 뒤 MR을 갱신한다.

### 시나리오 D. 잘못 merge 된 변경 복구

- 실수로 잘못된 문구나 스크립트 변경이 `main`에 반영된다.
- `reset --hard`가 아니라 `revert` 중심으로 안전하게 복구한다.
- 왜 공유 브랜치에서는 이력 보존이 중요한지 확인한다.

### 시나리오 E. 반복 검증의 자동화

- 사람이 매번 보던 기본 점검을 `.gitlab-ci.yml`로 옮긴다.
- merge request에서 pipeline 결과를 확인한다.
- "코드 작성 -> 리뷰 -> 승인 -> 검증 -> merge"가 하나의 운영 흐름이 됨을 확인한다.

## 단계별로 어떤 명령어 관계를 배우는가?

초보자가 가장 많이 실수하는 이유는 명령어를 개별 기능으로만 외우기 때문이다. 이번 교육에서는 명령어를 아래 관계로 묶어서 이해한다.

### 묶음 1. 상태 확인과 기록

```bash
git status
git add <file>
git commit -m "message"
git log --oneline
git show <commit>
```

- `status`는 현재 위치를 알려 준다.
- `add`는 다음 commit에 넣을 변경을 고른다.
- `commit`은 선택한 변경을 이력으로 남긴다.
- `log`와 `show`는 남긴 이력을 읽고 검증하게 해 준다.

### 묶음 2. 로컬과 원격의 동기화

```bash
git clone <url>
git remote -v
git fetch origin
git pull origin main
git push origin main
```

- `clone`은 출발점이다.
- `remote -v`는 어디와 연결되었는지 보여 준다.
- `fetch`는 원격 변경을 가져오되 바로 합치지 않는다.
- `pull`은 가져오고 합치는 흐름이다. 입문 단계에서는 내부적으로 `fetch + merge`에 가깝게 이해하면 좋다.
- `push`는 내 commit을 원격에 반영한다.

### 묶음 3. 협업과 분기

```bash
git branch
git switch -c feature/<name>
git checkout <branch>
git merge <branch-or-commit>
git rebase origin/main
git stash
```

- `branch`, `switch`, `checkout`은 어느 작업 라인에서 일하는지 관리한다.
- `merge`와 `rebase`는 분리된 작업을 다시 정렬하는 방법이다.
- `stash`는 아직 commit 하고 싶지 않은 임시 변경을 잠시 치우는 도구다.

### 묶음 4. 추적과 복구

```bash
git diff
git tag
git bisect
git restore <file>
git revert <commit>
```

- `diff`는 무엇이 달라졌는지 본다.
- `tag`는 중요한 시점을 이름 붙여 남긴다.
- `bisect`는 언제 문제가 들어왔는지 추적한다.
- `restore`와 `revert`는 되돌리기 계열이지만 적용 대상과 안전성이 다르다.

## 교육 기본 원칙

이 교육에서는 아래 운영 원칙을 계속 반복한다.

- 작은 변경을 자주 기록한다.
- 결과를 확인한 뒤 commit 한다.
- push 전에 로컬 검증을 먼저 한다.
- merge는 "내가 끝났다"가 아니라 "팀 기준으로 검증이 끝났다"일 때 한다.
- 공유 브랜치 문제는 가능한 한 이력을 남기는 방식으로 복구한다.
- conflict는 실패가 아니라 협업 중 상태 불일치를 해소하는 과정으로 본다.

## 5분 킥오프 실습

아직 본격 코딩을 시작하지 않더라도, 이 장에서 팀 단위로 아래 활동을 해 두면 이후 실습이 훨씬 안정적이다.

### 활동 1. 역할 카드 나누기

팀별로 아래 역할을 미리 정한다.

- 개발자 A
- 리뷰어
- 승인자

시간이 허용되면 추가로 아래를 둔다.

- 개발자 B
- Owner 역할 시연 담당

### 활동 2. 흐름도 말로 설명하기

팀원이 돌아가며 아래 문장을 설명한다.

- "내 로컬에서 수정한 파일은 바로 GitLab에 반영되지 않는다."
- "브랜치를 만든다고 프로젝트를 복사하는 것은 아니다."
- "merge request는 코드 묶음이 아니라 설명 가능한 변경 요청이다."
- "pipeline은 merge 전 검증 근거를 자동으로 남긴다."

### 활동 3. 실패를 미리 예상하기

각 팀은 아래 질문에 짧게 답한다.

- 같은 파일을 동시에 고치면 어떤 문제가 생길까?
- 누가 merge 할 수 있어야 안전할까?
- commit 메시지가 모호하면 나중에 무엇이 힘들까?
- 자동화가 없으면 사람이 반복해서 무엇을 확인해야 할까?

## 이 장을 마치면 답할 수 있어야 하는 질문

- 왜 Git 교육을 곧바로 MR이나 pipeline부터 시작하면 안 되는가?
- 왜 `개인 개발 -> 협업 -> 자동화` 순서가 가장 자연스러운가?
- 이 교육에서 어떤 프로젝트와 어떤 역할 구조로 실습하는가?
- 각 단계에서 어떤 종류의 명령어와 어떤 종류의 실패를 배우는가?

## 체크리스트

아래 항목에 스스로 `예`라고 답할 수 있으면 다음 장으로 넘어간다.

- Git과 GitLab의 차이를 아주 거칠게라도 설명할 수 있다.
- `commit`, `branch`, `merge request`, `pipeline`이 각각 어느 단계의 주인공인지 구분할 수 있다.
- 팀 실습에서 누가 개발자, 리뷰어, 승인자인지 정했다.
- 이후 장에서 무엇을 직접 실습하게 될지 큰 흐름을 이해했다.

## 자주 나오는 오해

### "Git을 배우면 GitLab도 자동으로 다 알게 된다"

아니다. Git은 버전 관리 시스템이고, GitLab은 협업과 검토와 자동화까지 포함하는 플랫폼이다. Git을 알아야 GitLab을 이해하기 쉽지만, 둘은 같은 것이 아니다.

### "branch는 프로젝트 복사본이다"

아니다. Git branch는 가벼운 포인터다. 그래서 브랜치를 많이 써도 협업이 가능하다.

### "merge request는 코드만 보면 된다"

아니다. MR은 코드, 설명, 검증 방법, 리뷰 맥락이 함께 있어야 한다.

### "CI/CD를 먼저 붙이면 더 현대적인 교육이다"

아니다. 자동화는 기본 흐름과 검토 기준이 있어야 의미가 있다. 기준 없이 자동화부터 배우면 왜 실패했고 무엇을 믿어야 하는지 판단하기 어려워진다.

## 공식 참고 자료

- Git Book, `Getting Started` 및 `Git Basics`:
  - https://git-scm.com/book/en/v2
- Git Book, `Branches in a Nutshell`:
  - https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
- Git Book, `Working with Remotes`:
  - https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes
- GitLab Docs, 역할과 권한:
  - https://docs.gitlab.com/user/permissions/
- GitLab Docs, Merge Request 생성:
  - https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html
- GitLab Docs, CI/CD 및 pipeline 개념:
  - https://docs.gitlab.com/ci/

## 다음 장

[02_Getting_Started.md](./02_Getting_Started.md)에서는 실제 연습용 프로젝트를 만들고, 로컬 저장소와 GitLab 원격 저장소를 연결하는 첫 실습을 시작한다.
