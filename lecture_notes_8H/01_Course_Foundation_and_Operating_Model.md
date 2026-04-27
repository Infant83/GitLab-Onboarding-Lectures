# CH01. Course Foundation and Operating Model

## 이 장의 목적

이 장은 모든 뒤 실습의 기준을 맞추는 장이다. Git 명령어를 바로 치기 전에 먼저 `무엇을 관리하는 도구인지`, `로컬과 원격이 어떻게 나뉘는지`, `Owner / Maintainer / Developer가 왜 같은 저장소를 다르게 보는지`를 정리한다. 이 장이 약하면 뒤에서 `pull`이 왜 위험한지, `revert`가 왜 협업에서 안전한지, `protected branch`가 왜 필요한지 설명이 무너진다.

## 1시간 운영안

- 0:00~0:10 교육 목적과 역할 설명
- 0:10~0:25 Git / GitLab 구조 설명
- 0:25~0:40 환경 점검 실습
- 0:40~0:55 권한과 운영 모델 토론
- 0:55~1:00 체크리스트와 다음 장 연결

## 오늘의 핵심 질문

1. Git은 무엇을 관리하는가?
2. GitLab은 Git 위에 무엇을 더하는가?
3. Owner, Maintainer, Developer는 왜 같은 변경을 다르게 판단하는가?
4. 로컬 저장소와 원격 저장소는 언제 같고 언제 달라지는가?

## 학습 목표

- `repository`, `origin`, `main`, `HEAD`, `working tree`, `staging area`, `commit history`를 설명할 수 있다.
- Git과 GitLab의 역할 차이를 구분할 수 있다.
- shared repository 모델과 role-based collaboration 모델을 이해할 수 있다.
- 내 환경의 인증 방식과 권한 수준을 확인할 수 있다.

## 튜토리얼 자산과 시작점

이 장은 [01_foundation/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\LAB.md) 와 함께 진행한다. 실제 seed repo 자산은 [seed_repo](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo) 에 있다.

이번 장에서 확인할 핵심 파일:

- [README.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo\README.md)
- [src/permissions.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo\src\permissions.js)
- [src/app.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo\src\app.js)
- [docs/process.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo\docs\process.md)
- [tests/permissions.test.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\seed_repo\tests\permissions.test.js)

실습 저장소 이름은 `tutorial-collaboration-lab` 기준으로 통일한다.

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - 아직 로컬 저장소가 없거나, GitLab에 빈 프로젝트만 만들어 둔 상태
  - Git 설치, 인증 방식, GitLab 접속 권한만 확인된 상태
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3`을 순서대로 수행한다
  - 위 순서만 따라도 된다. [01_foundation/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\LAB.md)는 강사용 체크리스트로 본다
- 이 장에서 반드시 눈으로 확인할 것:
  - `origin` URL
  - 기본 브랜치 이름
  - `HEAD`가 무엇을 가리키는지
  - `main` direct push 가능 여부와 protected branch 여부
- 이 장 종료 상태:
  - `tutorial-collaboration-lab` 로컬 저장소가 만들어지고 `main` 또는 기본 브랜치가 원격과 연결되어 있다
  - `README.md`, `docs/process.md`, `src/app.js`, `src/app.txt`, `tests/permissions.test.js`가 로컬에 준비되어 있다
  - CH02에서 같은 저장소 위에 `notes.txt`, `docs/tutorial-guide.md`를 추가할 준비가 끝난다

## 8H 전체 흐름에서 이 장의 위치

이 장은 뒤 7개 장의 기준 좌표를 잡는다.

- CH02에서는 `working tree -> staging area -> commit -> push` 상태 변화를 실제로 수행한다.
- CH03에서는 지금 상태가 왜 이렇게 되었는지 `log`, `show`, `diff`, `revert`로 추적한다.
- CH04에서는 같은 변경을 여러 사람이 동시에 만질 때 branch 전략과 sync 판단을 배운다.
- CH05에서는 GitLab 권한, MR, approval이 왜 Git 명령 위에 추가로 필요한지 본다.
- CH06에서는 실제 conflict와 rollback을 조별로 수행한다.
- CH07에서는 merge 이후 pipeline과 quality gate를 읽는다.
- CH08에서는 issue부터 rollback까지 전 과정을 한 번에 연결한다.

즉, 이 장에서 로컬과 원격, 권한과 책임, 브랜치와 이력의 기준을 정확히 잡지 못하면 뒤 장에서 명령어를 따라 쳐도 이해가 이어지지 않는다.

## 역할별 체크포인트

### Owner

- 왜 protected branch와 approval rule이 필요한지 설명할 수 있는가
- rollback을 누가 어떤 기준으로 승인해야 하는지 말할 수 있는가
- 팀 교육 목표를 `속도`, `품질`, `복구 가능성`으로 번역할 수 있는가

### Maintainer

- 업무를 feature branch와 MR 단위로 분해할 수 있는가
- merge 순서가 일정과 품질에 어떤 영향을 주는지 설명할 수 있는가
- 충돌을 개인 실수가 아니라 작업 조정 문제로 볼 수 있는가

### Developer

- 로컬 상태와 원격 상태의 차이를 말할 수 있는가
- `status`를 보기 전에 현재 브랜치를 먼저 확인하는 습관이 있는가
- 작업 전후에 어떤 명령으로 상태를 검증해야 하는지 알고 있는가

## Git과 GitLab을 구분하자

### Git

- 파일 변경 이력을 기록하는 분산 버전 관리 시스템
- 로컬에서 커밋, 브랜치, 병합, 복구를 수행한다
- 네트워크가 없어도 로컬 이력과 비교가 가능하다

### GitLab

- Git 저장소를 팀이 함께 운영하도록 돕는 협업 플랫폼
- 권한, MR, 리뷰, 승인, 이슈, 파이프라인, 아티팩트, 배포 흐름을 제공한다
- Git 저장소 그 자체가 아니라 Git을 팀 단위로 안전하게 쓰게 하는 운영 레이어다

## 구조를 그림으로 이해하기

```text
원격 저장소 GitLab (origin)
        ^
        | push / fetch / pull
        v
로컬 저장소 (.git, commit history)
        ^
        | commit
        v
staging area
        ^
        | add
        v
working tree
```

이 네 공간을 이해하지 못하면 아래 오해가 생긴다.

- `add`가 저장이라고 오해한다
- `commit`이 GitLab 반영이라고 오해한다
- `push` 없이 원격에 반영됐다고 착각한다
- `pull`이 단순 다운로드라고 생각한다

## 저장소에서 자주 나오는 용어

### repository

- `.git`을 포함한 작업 단위다
- 로컬 저장소와 원격 저장소 둘 다 repository라고 부른다

### origin

- 보통 최초 clone한 원격을 가리키는 기본 이름이다
- 특별한 마법 이름이 아니라 그냥 remote의 별칭이다

### main

- 기본 브랜치 이름으로 자주 쓰인다
- 일부 저장소는 `master`, `develop`, `trunk`를 쓸 수 있으므로 무조건 가정하지 않는다

### HEAD

- 현재 내가 바라보고 있는 commit 또는 branch를 가리키는 참조다
- detached HEAD가 되면 브랜치가 아니라 특정 commit을 직접 보고 있는 상태다

## 초보자가 자주 오해하는 문장과 바로잡기

- “`commit`했으니 GitLab에도 올라갔다.”
  - 아니다. `commit`은 로컬 이력을 바꾼다. GitLab 반영은 `push` 이후다.
- “`pull`은 안전한 최신화 명령이다.”
  - 아니다. 현재 상태를 모른 채 `pull`하면 자동 merge가 일어나 이력이 갑자기 바뀔 수 있다.
- “`origin`은 main 브랜치를 뜻한다.”
  - 아니다. `origin`은 원격 저장소의 별칭이고, `main`은 그 안의 브랜치 이름일 뿐이다.
- “내가 코드를 잘 아니까 direct push 권한이 있으면 좋다.”
  - 협업에서 권한은 실력보다 운영 책임과 감사 가능성을 기준으로 설계한다.
- “GitLab에서 보이는 branch만 잘 보면 된다.”
  - 실제 문제는 로컬 상태, 원격 상태, 추적 관계, 권한 정책이 함께 엮여 생긴다.

## 실무에서 가장 자주 쓰는 기본 확인 명령

아래 6개는 교육 전체에서 반복해서 등장하는 기본 진단 세트다.

```bash
git status
git branch -vv
git remote -v
git rev-parse --abbrev-ref HEAD
git symbolic-ref refs/remotes/origin/HEAD
git log --oneline --decorate -n 5
```

이 명령들로 확인하는 것:

- 지금 어느 브랜치인가
- 그 브랜치는 어느 upstream을 추적하는가
- 기본 원격은 무엇인가
- 원격 기본 브랜치는 무엇인가
- 방금 어떤 커밋들이 있었는가

강조:

- `status`만 보고 판단하지 않는다
- 브랜치 이름, upstream, 마지막 커밋까지 같이 본다
- 사내 환경에서는 `origin/HEAD -> origin/main`인지 반드시 확인한다

## 협업 운영 모델

### shared repository 모델

- 같은 팀이 하나의 저장소에 접근한다
- developer는 feature branch를 만들고 MR로 main에 반영한다
- 사내 GitLab 교육은 이 모델을 기본으로 삼는다

### fork 모델

- 각자가 원본 저장소의 사본을 가진다
- 오픈소스나 외부 기여 모델에서 흔하다
- 사내에서는 보안, 권한, 저장소 정책 때문에 금지되거나 제한될 수 있다

## 실습 1. 내 환경 점검

터미널에서 아래를 실행한다.

```bash
git --version
git config --global user.name
git config --global user.email
```

확인 포인트:

- Git이 설치되어 있는가
- 커밋 작성자 정보가 올바른가
- 교육용 계정과 개인 계정이 섞이지 않는가

실패 시나리오:

- `git: command not found` 또는 유사 오류
- 사용자 이름과 이메일이 비어 있음

조치:

```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
```

## 실습 2. 저장소 clone 후 구조 확인

```bash
git clone <repo-url>
cd <repo-name>
git status
git branch -vv
git remote -v
```

설명해야 하는 질문:

1. 현재 브랜치는 무엇인가
2. 추적 중인 원격 브랜치는 무엇인가
3. `origin`은 어디를 가리키는가
4. working tree가 깨끗한가

예상 결과:

- `On branch main` 또는 저장소의 기본 브랜치명
- `Your branch is up to date with 'origin/main'`
- remote URL이 SSH 또는 HTTPS로 보임

튜토리얼 실행 예시:

```powershell
Copy-Item ..\tutorials\01_foundation\seed_repo\* . -Recurse
git status
git add README.md .gitignore package.json
git add public src docs tests
git commit -m "ch01: initialize tutorial collaboration seed"
git push -u origin main
```

실행 후 확인:

- `src/permissions.js`가 `Owner`, `Maintainer`만 샘플 동작을 사용할 수 있게 정의하는가
- `docs/process.md`가 4단계 공용 절차 문서로 들어갔는가
- `tests/permissions.test.js`가 최소 권한 기준을 설명하는가

실전 질문:

- 왜 `git clone` 직후 바로 `git pull`하지 않는가
- 왜 `remote -v`를 먼저 보고 SSH/HTTPS를 확인하는가
- 왜 Owner가 “기본 브랜치명을 문서에 박아 두지 말라”고 하는가

실전 해설:

- clone 직후는 보통 최신 상태다. 바로 `pull`하는 습관은 상태 확인 없이 자동 동기화를 누르는 습관을 만든다.
- SSH/HTTPS는 이후 push 실패 원인을 가르는 핵심 단서다.
- 사내 저장소는 `main`이 아닐 수 있다. 교육 자료에 브랜치명을 고정 상수처럼 쓰면 실제 현업 적응이 느려진다.

## 실습 3. 브라우저에서 권한 모델 확인

GitLab UI에서 아래를 직접 확인한다.

- 현재 내 역할이 `Owner`, `Maintainer`, `Developer`, `Guest` 중 무엇인지
- protected branch가 설정되어 있는지
- MR approval rule이 있는지
- direct push가 허용되는지

질문:

- Owner가 `Maintainer`보다 더 봐야 할 항목은 무엇인가
- Developer가 직접 `main`에 push하지 못하는 이유는 무엇인가
- Guest가 프로젝트를 보게 하는 목적은 무엇인가

## 사내 환경에서 꼭 확인할 것

- 인증 방식이 SSH인지 HTTPS인지
- SSO, LDAP, PAT, deploy token 중 무엇을 쓰는지
- 기본 브랜치 이름이 `main`인지 다른지
- runner가 있는지
- fork가 허용되는지

추가 확인:

- MR merge 권한이 누구에게 있는지
- protected branch 예외 규칙이 있는지
- emergency hotfix 시 direct push 예외가 존재하는지
- service account나 bot 계정이 파이프라인을 실행하는지
- 내부 보안 정책상 개인 access token 사용이 허용되는지

## 실패 사례

### 사례 1. clone은 됐는데 push가 안 된다

원인:

- 읽기 전용 권한만 있음
- 기본 인증은 되었지만 쓰기 권한은 없음

이 장의 판단:

- 아직 명령어 문제가 아니라 권한 문제일 수 있다
- `Developer` 이상인지 먼저 본다

### 사례 2. 브랜치 이름을 `main`이라고 가정했는데 없다

원인:

- 저장소 기본 브랜치가 `master`, `develop`, 또는 커스텀 이름

조치:

```bash
git branch -a
git symbolic-ref refs/remotes/origin/HEAD
```

### 사례 3. SSH는 되는데 HTTPS push는 실패한다

원인:

- 저장소 URL은 HTTPS인데 인증은 SSH 기준으로만 세팅함
- PAT 또는 SSO 재인증이 필요한 환경

조치:

- `git remote -v`로 현재 URL 방식을 확인한다
- 사내 정책에 맞는 방식으로 remote를 다시 설정한다
- 인증 실패를 명령어 오타로 오해하지 않는다

### 사례 4. 권한은 있는데 merge는 안 된다

원인:

- Developer는 push와 MR 생성은 가능하지만 merge 권한이 없을 수 있음
- approval 또는 pipeline 정책이 merge를 막고 있음

메시지:

- “push 가능”과 “main 반영 가능”은 다르다
- CH05에서 이 차이를 MR과 approval 정책으로 자세히 다룬다

## 현업에서 특히 강조할 문장

- Git은 파일 저장 도구가 아니라 상태 전이 기록 도구다.
- GitLab은 코드 업로드 사이트가 아니라 협업 통제와 감사의 운영 레이어다.
- 권한 문제를 명령어 문제로 오해하면 해결이 늦어진다.
- 모든 실습은 `내 위치 확인 -> 의도 확인 -> 명령 실행 -> 결과 검증` 순서로 진행한다.

## 이 장의 산출물

- 교육 저장소를 clone한 로컬 작업 디렉터리
- 내 Git 작성자 정보 확인 결과
- 현재 역할과 권한을 적은 메모
- `origin`, `main`, `HEAD`, `working tree`, `staging area`를 말로 설명한 기록

## 종료 체크리스트

- Git과 GitLab 차이를 설명할 수 있다
- 로컬 저장소와 원격 저장소 구조를 설명할 수 있다
- 내 인증 방식과 권한 수준을 말할 수 있다
- 다음 장에서 `clone -> add -> commit -> push` 흐름을 왜 배우는지 이해했다

## 공식 참고 자료

- Git documentation:
  - https://git-scm.com/docs
- Git clone:
  - https://git-scm.com/docs/git-clone
- GitLab roles and permissions:
  - https://docs.gitlab.com/user/permissions/

## 다음 장

[02_Local_Workflow_and_Core_Commands.md](./02_Local_Workflow_and_Core_Commands.md) 에서 실제로 파일을 수정하고, staging과 commit을 만들고, 원격에 반영하는 기본 루프를 완주한다.
