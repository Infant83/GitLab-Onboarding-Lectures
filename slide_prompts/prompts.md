# Master Execution Prompt

당신은 Git / GitLab / CI/CD 실무 교육용 슬라이드를 실제로 작성하는 슬라이드 생성 에이전트다.

당신의 임무는 업로드된 chapter lecture note, README, alignment audit, 그리고 chapter execution prompt를 바탕으로
해당 챕터의 실제 슬라이드 초안을 markdown으로 생성하는 것이다.

이 작업은 “슬라이드 작성 지침”을 만드는 것이 아니라,
실제로 강의에 사용할 수 있는 슬라이드 문안 초안을 생성하는 작업이다.

---

## 1. 입력

입력으로는 다음이 주어진다고 가정한다.

- Master Execution Prompt
- 특정 Chapter Execution Prompt 1개
- 해당 챕터 lecture note 파일
- `README.md`
- `tutorial_alignment_audit.md`

---

## 2. 최우선 목표

반드시 아래 목표를 만족하라.

1. 슬라이드는 교육용이어야 한다.
2. 각 슬라이드는 실제 강의에서 그대로 말할 수 있는 수준의 문장과 구조를 가져야 한다.
3. 각 슬라이드는 한 페이지당 중심 메시지 1개를 유지해야 한다.
4. 각 슬라이드는 앞뒤 슬라이드와 자연스럽게 연결되어야 한다.
5. 텍스트는 교육 이해를 돕는 수준까지 충분히 허용하되,
   unrelated detail 때문에 중심 메시지가 흐려지면 안 된다.
6. 명령어는 교육상 필요하면 충분히 넣을 수 있지만,
   단순 나열이 아니라 언제 쓰는지 / 무엇을 확인하는지 / 어떤 실수를 막는지가 드러나야 한다.
7. 각 챕터는 standalone하게 읽혀야 하지만,
   이전 챕터와 다음 챕터의 handoff 상태도 보여줘야 한다.

---

## 3. 리서치 및 검증 원칙

- 업로드된 lecture note를 1차 기준으로 사용하라.
- chapter note의 목적, 자산명, 실습 순서, 시작 상태, 종료 상태를 보존하라.
- Git / GitLab / CI/CD 개념 중 사실 검증이 필요한 항목은 공식 Git 문서와 공식 GitLab 문서를 우선 검증 대상으로 삼아라.
- GitLab SaaS와 self-managed 차이가 있는 경우, 본문보다 발표자 노트에서 분리하라.
- 특정 팀 정책을 절대적 정답처럼 단정하지 마라.
- default branch를 항상 `main`으로 가정하지 마라.

---

## 4. 슬라이드 작성 원칙

- 한 슬라이드에 메시지는 1개만 둔다.
- “정의 나열”보다 “왜 중요한가 / 언제 쓰는가 / 어떤 실수를 막는가”를 우선한다.
- 개념 설명 슬라이드는 표, 2열 비교, 상태 전이 diagram을 우선한다.
- 실습 슬라이드는 명령어 + 관찰 포인트 + 실패 시그널을 함께 보여준다.
- 실패 시나리오는 예외가 아니라 교육의 일부로 다룬다.
- Owner / Maintainer / Developer의 시선 차이가 필요한 슬라이드는 반드시 분리해서 드러낸다.
- Git과 GitLab을 한 층위에서 섞어 설명하지 마라.
- 로컬 상태 / 원격 상태 / GitLab 정책 상태가 다를 수 있으면 분리해서 설명하라.

---

## 5. 출력 형식

반드시 아래 형식으로만 출력하라.

# [Chapter Title]

## Slide 1. [슬라이드 제목]

### 핵심 메시지
[한 문장]

### 슬라이드 본문
- [실제 슬라이드에 들어갈 bullet 1]
- [실제 슬라이드에 들어갈 bullet 2]
- [실제 슬라이드에 들어갈 bullet 3]
- [필요 시 bullet 4~6]

### 시각화 / 레이아웃
- [권장 레이아웃]
- [들어갈 도식, 표, 비교 구조, 코드 블록 등]

### 발표자 노트
[120~220단어 수준의 실제 강의용 설명]

### 실습 / 토론 / 질문
- [실습 지시 또는 토론 질문 1~2개]

### 다음 슬라이드 연결
[다음 슬라이드로 넘어가는 문장]

---

## Slide 2. [슬라이드 제목]
[동일 형식 반복]

---

## Chapter Closing
- 오늘의 산출물
- 종료 체크리스트
- 다음 장 handoff 문장

---

## 6. 품질 제약

- 슬라이드 본문은 발표 슬라이드답게 읽혀야 한다.
- 발표자 노트는 본문을 보강해야지, 본문을 대신하면 안 된다.
- 슬라이드 본문과 발표자 노트는 중복을 최소화하되 메시지는 일치해야 한다.
- 실습 슬라이드에서는 실제 파일명, 브랜치명, 명령어를 lecture note 기준으로 유지하라.
- chapter note의 자산명은 임의로 바꾸지 마라.
- `pull`, `reset --hard`, `force push`를 초보자 기본 행동처럼 제시하지 마라.
- pipeline success를 deploy-ready와 동일시하지 마라.
- rollback을 실패의 흔적으로 숨기지 마라.
- 실제 강의자가 그대로 사용할 수 있을 정도로 구체적으로 써라.
- “이 슬라이드에서는 …” 같은 메타 설명문을 슬라이드 본문에 넣지 마라.
- 결과물은 “프롬프트 설명”이 아니라 “실제 슬라이드 초안”이어야 한다.

---

## 7. 스타일

- 한국어로 작성하라.
- 명령어, 파일명, 브랜치명, 설정 키는 원문 그대로 유지하라.
- 필요 시 코드 블록을 사용하라.
- 초보자도 따라올 수 있어야 하지만, 실무 판단 기준은 약하게 만들지 마라.
- 텍스트를 줄이기 위해 의미를 희생하지 마라.
- 한 페이지에 설명이 조금 길어져도 교육적으로 필요하면 허용하라.
- 단, 슬라이드가 “문서 페이지”처럼 보일 정도로 과도하게 장문으로 만들지는 마라.

---

## 8. 최종 지시

지금부터 주어진 Chapter Execution Prompt를 기준으로
해당 챕터의 실제 슬라이드 초안을 생성하라.

설명하지 말고,
반드시 위 출력 형식대로
슬라이드 본문 + 시각화 지시 + 발표자 노트 + 실습/토론 + 연결 문장까지 포함해 완성된 결과를 출력하라.
```

---

````markdown
# CH01 Execution Prompt

업로드된 `01_Course_Foundation_and_Operating_Model.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH01 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Course Foundation and Operating Model
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: 뒤 7개 장의 기준 좌표를 잡는다
- 핵심 축: Git vs GitLab, 로컬 vs 원격, 권한 vs 책임, 시작 전 진단 습관
- 핵심 자산:
  - `tutorial-collaboration-lab`
  - `README.md`
  - `src/permissions.js`
  - `src/app.js`
  - `docs/process.md`
  - `tests/permissions.test.js`

## 반드시 반영할 학습 메시지
- Git은 상태 전이와 이력 관리 도구다.
- GitLab은 협업 통제와 감사의 운영 레이어다.
- 권한은 실력보다 책임에 가깝다.
- 모든 실습은 `내 위치 확인 -> 의도 확인 -> 명령 실행 -> 결과 검증` 순서로 수행한다.
- CH01이 약하면 뒤 장에서 `pull`, `revert`, `protected branch`, `pipeline` 설명이 무너진다.

## 반드시 반영할 실습 구조
- 시작 상태:
  - 아직 로컬 저장소가 없거나 GitLab에 빈 프로젝트만 있는 상태
- 이 장에서 확인할 것:
  - `origin` URL
  - 기본 브랜치 이름
  - `HEAD`
  - direct push 허용 여부
  - protected branch 여부
- 종료 상태:
  - 로컬 저장소가 만들어지고 기본 브랜치가 원격과 연결됨
  - CH02에서 `notes.txt`, `docs/tutorial-guide.md`를 추가할 준비 완료

## 슬라이드 구성
1. 왜 CH01이 전체 8시간의 기준점인가
2. 8시간 전체 흐름과 역할별 렌즈
3. Git vs GitLab
4. Working Tree / Staging / Local Repo / Remote Repo
5. 필수 용어: repository, origin, default branch, HEAD
6. 초보자의 대표 오해 5가지
7. 기본 진단 명령 6개
8. Shared Repository vs Fork
9. Owner / Maintainer / Developer / Guest를 책임으로 읽기
10. 실습: 환경 점검과 clone 직후 확인
11. 브라우저에서 권한/정책 확인 + CH02 handoff

## CH01에서 특히 강하게 써야 하는 포인트
- `commit != GitLab 반영`
- `origin != main`
- `pull`은 단순 다운로드가 아님
- direct push는 실력 과시가 아니라 운영 정책의 문제
- GitLab roles는 기술 숙련도보다 운영 책임 배분의 관점으로 설명
- SSH/HTTPS 차이, 기본 브랜치 차이, self-managed 차이는 발표자 노트에서 분리

## 실습 슬라이드에 반드시 포함할 명령어
```bash
git --version
git config --global user.name
git config --global user.email
git clone <repo-url>
git status
git branch -vv
git remote -v
git rev-parse --abbrev-ref HEAD
git symbolic-ref refs/remotes/origin/HEAD
git log --oneline --decorate -n 5
````

## 출력 시 주의

* CH01은 오리엔테이션처럼 보이되, 실제로는 뒤 챕터 해석 프레임을 만드는 장으로 써라.
* 텍스트를 너무 줄이지 마라. 교육 목적상 설명 문장과 비교 문장은 충분히 넣어라.
* 다만 각 슬라이드의 중심 메시지는 분명히 유지하라.
* Slide 10과 11은 실제 hands-on 시작 장면처럼 구체적으로 써라.
* 마지막 슬라이드에서는 반드시 CH02로 자연스럽게 연결하라.

지금 바로 CH01 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH02 Execution Prompt

업로드된 `02_Local_Workflow_and_Core_Commands.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH02 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Local Workflow and Core Commands
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: `status -> diff -> add -> commit -> show -> push` 기본 루프를 몸에 익힌다
- 핵심 축: 상태 변화, staging 의미, fetch/pull 차이, push 전 검증 습관
- 핵심 자산:
  - `notes.txt`
  - `docs/tutorial-guide.md`
  - `README.md`
  - `docs/process.md`
  - `src/app.txt`
  - `src/permissions.js`

## 반드시 반영할 학습 메시지
- Git 루프는 암기가 아니라 상태 전이다.
- staging은 임시 저장이 아니라 커밋 후보 설계 공간이다.
- `fetch`는 안전한 확인이고 `pull`은 자동 동기화다.
- push 전에 검증하는 습관이 협업 사고를 줄인다.
- 좋은 커밋 습관이 CH03의 복구 비용을 줄인다.

## 반드시 반영할 시작/종료 상태
- 시작 상태:
  - CH01에서 clone된 저장소가 있고 기본 브랜치가 원격과 연결된 상태
- 새로 추가되는 파일:
  - `notes.txt`
  - `docs/tutorial-guide.md`
- 종료 상태:
  - 두 파일이 저장소에 반영되어 있음
  - `restore --staged`를 설명할 수 있음
  - `fetch -> 비교 -> pull 여부 판단` 루틴을 말할 수 있음

## 슬라이드 구성
1. Git 루프는 상태 전이로 봐야 한다
2. 전체 작업 루프: clone -> status -> edit -> diff -> add -> commit -> show -> push
3. `status`, `diff`, `diff --staged` 비교
4. `git add`의 진짜 의미
5. 좋은 commit의 기준
6. `push`와 upstream
7. `fetch` vs `pull`
8. 실습: first commit cycle
9. 잘못 staging했을 때: `restore --staged`와 `.gitignore`
10. push 직전 검증 루틴
11. 대표 실패 시나리오
12. 장 정리 + CH03 handoff

## 반드시 포함할 명령어 세트
```bash
git status
git diff
git diff --staged
git add <file>
git add .
git commit -m "docs: add training note"
git log --oneline --decorate -n 5
git show --stat HEAD
git push
git push -u origin <branch>
git fetch origin
git pull
git restore --staged <file>
git branch -vv
````

## 실패 시나리오 슬라이드에 반드시 반영할 것

* `non-fast-forward`
* `Your local changes would be overwritten`
* wrong branch push
* “좋은 메시지는 나쁜 diff를 구해주지 못한다”는 문장
* `force push`를 기본 해법처럼 보이지 않게 작성

## 실습 슬라이드 작성 지시

* `notes.txt`, `docs/tutorial-guide.md`를 실제로 추가하는 흐름을 써라.
* 단계별로 “무엇을 눈으로 확인해야 하는가”를 반드시 넣어라.
* `status`와 `diff`를 함께 봐야 하는 이유를 드러내라.
* `git add .`는 교육상 위험 포인트로 표시하라.

## 출력 시 주의

* CH02는 가장 기본적인 장이지만 가장 많이 쓰는 실무 습관을 만드는 장으로 써라.
* 초보자가 따라칠 수 있게 충분히 자세히 쓰되, 한 슬라이드에 메시지는 1개만 유지하라.
* 마지막 슬라이드는 CH03의 `log`, `show`, `revert`, `bisect`와 연결되게 마무리하라.

지금 바로 CH02 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH03 Execution Prompt

업로드된 `03_History_Inspection_and_Recovery.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH03 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: History Inspection and Recovery
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: 진단과 복구 도구 상자를 갖게 한다
- 핵심 축: `log`, `show`, `diff`, `stash`, `tag`, `revert`, `reset`, `bisect`, `reflog`
- 핵심 자산:
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`
  - `src/permissions.js`
  - `docs/tutorial-guide.md`
  - `notes.txt`

## 반드시 반영할 학습 메시지
- 실수는 정상이고 복구 능력이 실력이다.
- 문제를 보면 파일부터 고치지 말고 상태부터 확정한다.
- shared history에서는 `revert`가 기본이고 `reset`은 개인 로컬 정리에 가깝다.
- 좋은 커밋 품질이 좋은 복구를 만든다.

## 반드시 반영할 시작/종료 상태
- 시작 상태:
  - CH02까지의 커밋이 쌓여 있고 `notes.txt`, `docs/tutorial-guide.md`가 이미 존재
- 새로 추가되는 파일:
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`
- 종료 상태:
  - `revert`와 `reset` 차이를 설명할 수 있음
  - `bisect`와 `reflog`의 역할을 말할 수 있음
  - CH04에서 기준점이 되는 이력을 읽을 수 있음

## 슬라이드 구성
1. 실수는 정상, 복구 능력이 실력이다
2. 기본 진단 루틴
3. `diff`, `log`, `show`를 목적별로 구분하기
4. `log --graph`로 흐름 읽기
5. `stash`: 임시 보관이지만 장기 저장소는 아님
6. `tag`: 기준점 고정하기
7. `revert` vs `reset`
8. `reset --soft / --mixed / --hard`
9. `bisect`: 회귀를 반으로 줄여 찾기
10. `reflog`와 detached HEAD
11. 실패 시나리오 decision matrix
12. 장 정리 + CH04 handoff

## 반드시 포함할 명령어 세트
```bash
git status
git branch -vv
git log --oneline --decorate --graph --all -n 20
git show HEAD
git show <sha> --stat
git diff
git stash push -m "wip before hotfix"
git stash list
git stash show -p stash@{0}
git stash pop
git stash branch recover-wip stash@{0}
git tag v0.1.0
git push origin v0.1.0
git revert <sha>
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git bisect start
git bisect good <sha>
git bisect bad
git bisect reset
git reflog -n 20
git switch -c investigate-detached-head
````

## 반드시 강조할 비교 포인트

* `diff`는 아직 commit되지 않은 차이
* `log`는 흐름
* `show`는 특정 커밋
* `revert`는 shared history 보존
* `reset`은 기준점 재작성
* `reflog`는 로컬 이동 이력이지 shared recovery 대체재가 아님

## 출력 시 주의

* CH03는 “문제 생긴 뒤 무슨 명령을 치나”보다 “지금 어떤 상태인가”를 먼저 묻는 장으로 써라.
* `reset --hard`는 강력하지만 마지막 수단으로 가르쳐라.
* `src/permissions.js`와 `tests/role-policy.test.js` 회귀 예시를 bisect에 연결하라.
* 마지막 슬라이드는 CH04의 branch 전략과 “덜 꼬이게 일하는 법”으로 연결하라.

지금 바로 CH03 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH04 Execution Prompt

업로드된 `04_Branch_Strategy_and_Sync_Decisions.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH04 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Branch Strategy and Sync Decisions
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: branch 전략과 sync 판단을 명령어보다 먼저 이해시킨다
- 핵심 축: branch의 본질, switch/checkout, tracking, merge vs rebase, shared repo vs fork
- 핵심 자산:
  - `docs/branch-planning.md`
  - `src/feature-flags.json`

## 반드시 반영할 학습 메시지
- 협업이 꼬이는 가장 큰 이유는 전략 부재다.
- branch는 폴더 복사가 아니라 움직이는 포인터다.
- sync는 기술 가능성보다 협업 맥락이 선택 기준이다.
- branch 전략은 복구 비용과 review 비용을 줄이는 운영 설계다.

## 시작/종료 상태
- 시작 상태:
  - CH03까지의 이력이 정리되어 있고 `log --graph`를 읽을 수 있는 상태
- 새로 추가되는 파일:
  - `docs/branch-planning.md`
  - `src/feature-flags.json`
- 종료 상태:
  - feature branch를 만들고 동기화 방식을 선택할 수 있음
  - CH05에서 MR을 열 브랜치와 범위를 정리한 상태

## 슬라이드 구성
1. 전략이 먼저다
2. 브랜치는 포인터다
3. `switch`와 `checkout`
4. Tracking branch와 upstream
5. branch naming과 수명 관리
6. Shared Repository와 Fork
7. `merge` vs `rebase`
8. 동기화 의사결정 매트릭스
9. 실습: 병렬 작업과 merge/rebase 비교
10. 대표 실패 시나리오
11. 장 정리 + CH05 handoff

## 반드시 포함할 명령어 세트
```bash
git branch
git branch -vv
git switch main
git switch -c feature/user-profile
git checkout <commit-sha>
git checkout -b hotfix/login
git push -u origin feature/user-profile
git fetch origin
git merge origin/main
git rebase origin/main
````

## 반드시 반영할 판단 포인트

* `origin/main`과 `main`은 다르다
* upstream이 없으면 push/pull 판단이 모호해진다
* 개인 feature branch와 shared branch는 rebase 허용성이 다르다
* protected branch, force push 금지 정책은 기술 가능성과 별개로 선택을 제한한다
* 오래된 branch는 conflict와 stale review를 만든다

## 실습 슬라이드 작성 지시

* `feature/a`, `feature/b` 병렬 작업 예시를 반드시 넣어라.
* `docs/branch-planning.md`, `src/feature-flags.json`를 실습 자산으로 명시하라.
* merge 결과 graph와 rebase 결과 graph를 시각적으로 비교하게 하라.

## 출력 시 주의

* CH04는 명령어 장이 아니라 운영 의사결정 장으로 보이게 써라.
* rebase는 비교 대상으로 가르치되, 초보자 공통 기본 전략은 merge 쪽이 더 안전하다는 메시지를 유지하라.
* 마지막 슬라이드는 “이 브랜치를 누가 어떤 규칙으로 반영할 것인가”라는 질문으로 CH05에 연결하라.

지금 바로 CH04 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH05 Execution Prompt

업로드된 `05_GitLab_Project_Structure_Permissions_and_MR.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH05 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: GitLab Project Structure, Permissions, and MR
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: GitLab을 웹 저장소가 아니라 협업 운영 시스템으로 이해시킨다
- 핵심 축: roles, protected branches, approvals, MR lifecycle, CODEOWNERS
- 핵심 자산:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`

## 반드시 반영할 학습 메시지
- Git skill과 GitLab 운영 능력은 다르다.
- protected branch는 사람을 못 믿어서가 아니라 운영 사고를 줄이기 위해 필요하다.
- approval은 기록 가능한 검토 강제 장치다.
- MR description은 review와 rollback을 돕는 운영 문서다.

## 시작/종료 상태
- 시작 상태:
  - CH04의 feature branch와 branch 계획이 이미 존재
- 새로 추가되는 파일:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`
- 종료 상태:
  - 권한 부족, 승인 부족, pipeline 부족, conflict 부족(=없음) 문제가 각각 어떻게 다른지 설명 가능
  - CH06 conflict lab에 바로 진입할 준비 완료

## 슬라이드 구성
1. Git skill과 GitLab 운영은 다르다
2. GitLab 프로젝트 구조에서 실제로 볼 것
3. Role Matrix: Guest / Developer / Maintainer / Owner
4. Protected Branch
5. Approval Rule
6. MR Lifecycle
7. 좋은 MR의 기준
8. CODEOWNERS와 Review Checklist
9. Reviewer vs Approver
10. 실습: MR 생성과 direct push 거절 경험
11. merge 버튼이 안 보일 때 troubleshooting
12. 장 정리 + CH06 handoff

## 반드시 포함할 요소
- 역할별 책임
- protected branch의 목적
- approval 없는 저장소 / 1인 approval / 특정 role approval 비교 관점
- reviewer와 approver의 차이
- MR 본문에 들어가야 할 항목:
  - 목적
  - 변경 범위
  - 테스트
  - 리뷰 포인트
  - 배포 영향
  - rollback 기준
- MR template / CODEOWNERS / checklist의 연결

## 실습 슬라이드에 반드시 포함할 명령어 및 파일
```bash
git add .gitlab CODEOWNERS docs/review-checklist.md
git commit -m "docs: add MR standards and review checklist"
````

파일:

* `.gitlab/merge_request_templates/standard.md`
* `CODEOWNERS`
* `docs/review-checklist.md`

## failure / troubleshooting 슬라이드에 반드시 넣을 것

* 권한 부족
* approval 부족
* pipeline 실패
* conflict
* base branch stale
* “merge 가능”과 “merge해야 함”은 다르다

## 출력 시 주의

* CH05는 GitLab UI 기능 소개가 아니라 운영 통제 설계 장으로 보여야 한다.
* 작은 팀에서는 reviewer와 approver가 겹칠 수 있지만 개념적으로는 다르다는 점을 분명히 하라.
* direct push 거절은 Git 오류가 아니라 GitLab 정책 집행으로 해석하게 만들어라.
* 마지막 슬라이드는 CH06의 role play conflict lab로 긴장감 있게 연결하라.

지금 바로 CH05 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH06 Execution Prompt

업로드된 `06_Team_Collaboration_Conflict_and_Rollback_Lab.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH06 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Team Collaboration, Conflict, and Rollback Lab
- 권장 분량: 13 slides
- 강의 시간: 약 1시간
- 목적: 실제 conflict를 만들고 해결하고 revert까지 경험하게 한다
- 핵심 축: role play, conflict marker, abort, semantic conflict, revert
- 핵심 자산:
  - `docs/process.md`
  - `src/app.txt`
  - `process-a-rewrite.md`
  - `process-b-rewrite.md`
  - `app-a.txt`
  - `app-b.txt`

## 반드시 반영할 학습 메시지
- CH06은 명령어 장이 아니라 조별 역할극 기반 협업 실습이다.
- conflict는 실패가 아니라 정상적인 협업 이벤트다.
- marker를 지우는 것만으로 해결되지 않는다.
- shared history에서의 기본 복구는 revert다.

## 권장 조 구성
- Owner 1명
- Maintainer 1명
- Developer A 1명
- Developer B 1명
- 가능하면 Guest 참관 1명 추가

## 시작/종료 상태
- 시작 상태:
  - CH05까지의 저장소와 GitLab 프로젝트 유지
  - MR template, review checklist, `docs/process.md`, `src/app.txt` 이미 존재
- 종료 상태:
  - 최소 1회 실제 conflict 해결
  - 최소 1회 abort 경험
  - 최소 1회 revert 설명 또는 수행
  - CH07에서 pipeline 관점 검증 가능한 merge 상태 확보

## 슬라이드 구성
1. 이 장은 팀 협업 랩이다
2. 시나리오 맵: 어떤 파일이 왜 충돌하도록 설계되었는가
3. Stage 1~3: 병렬 작업 시작과 Developer A의 선행 MR
4. Developer B의 MR과 conflict 발생
5. 해결 전 진단
6. Conflict Marker 읽기
7. Conflict Resolution의 본질
8. 해결 후 검증
9. 너무 복잡하면 중단한다: abort
10. 의미 충돌
11. 공유 이력에서의 복구: revert
12. conflict가 자주 나는 진짜 원인과 예방
13. retrospective + CH07 handoff

## 반드시 포함할 명령어 세트
```bash
git switch main
git pull
git switch -c feature/process-a
git switch -c feature/process-b
git status
git add docs/process.md
git add src/app.txt
git commit -m "docs: clarify shared process"
git push -u origin feature/process-a
git push -u origin feature/process-b
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
git merge origin/main
git diff
git diff --staged
git merge --abort
git rebase --abort
git revert <sha>
git push origin main
````

## 반드시 반영할 자산 흐름

* Developer A는 `process-a-rewrite.md`, `app-a.txt`를 반영
* Developer B는 `process-b-rewrite.md`, `app-b.txt`를 반영
* 같은 의미 영역을 다르게 수정해 semantic conflict 가능성을 남김

## 반드시 강조할 포인트

* 줄 충돌과 의미 충돌은 다르다
* `<<<<<<<`, `=======`, `>>>>>>>`는 양쪽 맥락을 읽는 표식이다
* 해결 후 `git diff`, `git diff --staged`, 테스트, MR description 업데이트가 필요하다
* `merge --abort` / `rebase --abort`는 실패가 아니라 안전 복귀다
* rollback은 `reset --hard`가 아니라 `revert` 중심으로 설명

## 출력 시 주의

* CH06은 hands-on 중심으로 써라.
* 슬라이드 본문에도 단계별 명령과 관찰 포인트를 충분히 넣어라.
* Developer / Maintainer / Owner가 각각 무엇을 판단하는지 분명히 드러내라.
* 마지막 슬라이드는 “사람 간 정합성”에서 “자동 검증과 운영 정합성”으로 넘어가며 CH07에 연결하라.

지금 바로 CH06 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH07 Execution Prompt

업로드된 `07_CICD_Quality_Gates_and_Self_Managed_Operations.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH07 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: CI/CD Quality Gates and Self-Managed Operations
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: merge 이후 pipeline, quality gate, self-managed 제약을 이해시킨다
- 핵심 축: `.gitlab-ci.yml`, stage/job/artifact, pipeline state, pending, runner/variable, deploy readiness
- 핵심 자산:
  - `.gitlab-ci.yml`
  - `scripts/build-site.js`
  - `scripts/smoke-check.js`
  - `tests/role-visibility-smoke.test.js`

## 반드시 반영할 학습 메시지
- merge는 끝이 아니라 운영 가능 상태의 시작이다.
- green pipeline은 필요조건이지 충분조건이 아니다.
- pending은 종종 코드보다 인프라 문제다.
- self-managed 환경에서는 GitLab 일반론만으로 설명되지 않는 제약이 많다.

## 시작/종료 상태
- 시작 상태:
  - CH06까지의 merge 또는 conflict 해결 결과가 저장소에 반영된 상태
- 새로 추가되는 파일:
  - `.gitlab-ci.yml`
  - `scripts/build-site.js`
  - `scripts/smoke-check.js`
  - `tests/role-visibility-smoke.test.js`
- 종료 상태:
  - test/build/artifact/pending 원인을 최소 1개 이상 설명 가능
  - CH08에서 pipeline 결과를 merge 기준과 연결해 해석 가능

## 슬라이드 구성
1. merge는 끝이 아니다
2. `.gitlab-ci.yml` 읽기
3. Stage / Job / Script / Artifact
4. Pipeline Status 해석
5. 로그 읽는 순서
6. 실습: 실패 주입
7. Artifact와 Report
8. Pending 분석
9. Self-Managed GitLab 추가 관점
10. Deploy Readiness Checklist
11. 장 정리 + CH08 handoff

## 반드시 포함할 구조 예시
```yaml
stages:
  - test
  - build

test_job:
  stage: test
  script:
    - node --test
    - node scripts/smoke-check.js

build_job:
  stage: build
  script:
    - node scripts/build-site.js
  artifacts:
    paths:
      - dist/
````

## 반드시 반영할 실습 포인트

* hands-on은 `test -> build` 두 단계로 진행
* deploy는 개념 설명만 하고 실제 hands-on은 build 산출물까지
* `role-visibility-smoke.test.js`와 `scripts/smoke-check.js`의 차이를 설명
* 실패 주입:

  * 없는 파일 참조
  * expected 값 변경
  * 스크립트 오타
  * `src/feature-flags.json` 키 변경
* pending 원인:

  * runner 없음
  * tag 불일치
  * protected runner 조건
  * variable 접근 제한
  * manual job 오해

## 반드시 포함할 자산명

* `.gitlab-ci.yml`
* `scripts/build-site.js`
* `scripts/smoke-check.js`
* `tests/role-visibility-smoke.test.js`

## 출력 시 주의

* CH07은 CI/CD 입문 장이 아니라 “merge 이후 운영 가능 상태를 읽는 장”으로 써라.
* status 색깔 나열로 끝내지 말고, 다음에 해야 할 질문을 반드시 붙여라.
* self-managed 제약은 발표자 노트에서 특히 분리해라.
* 마지막 슬라이드는 CH08의 issue -> branch -> MR -> pipeline -> rollback 종합 시나리오로 연결하라.

지금 바로 CH07 전체 슬라이드 초안을 생성하라.

````

---

```markdown
# CH08 Execution Prompt

업로드된 `08_Capstone_Scenario_and_Role_Based_Playbook.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH08 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Capstone Scenario and Role-Based Playbook
- 권장 분량: 13 slides
- 강의 시간: 약 1시간
- 목적: issue부터 rollback까지 전 과정을 끊김 없이 수행하는 종합 시나리오를 만든다
- 핵심 축: issue -> branch -> commit -> MR -> review -> approval -> pipeline -> merge -> incident -> rollback -> retrospective
- 핵심 자산:
  - `issues/ISSUE-101-sample-action.md`
  - `src/sample-action.js`
  - `tests/sample-action.test.js`
  - `docs/release-decision-log.md`

## 반드시 반영할 학습 메시지
- CH08은 명령어 종합문제가 아니라 운영 시뮬레이션이다.
- 기능 완료, merge-ready, deploy-ready는 서로 다른 상태다.
- incident 순간에는 즉흥 수정이 아니라 판단 루틴이 먼저다.
- rollback 이후 문서화와 회고까지가 진짜 종료다.

## 시작/종료 상태
- 시작 상태:
  - CH01~CH07 자산이 같은 저장소에 누적된 상태
  - permissions, feature flags, MR template, CODEOWNERS, CI 파일이 이미 존재
- 새로 추가되는 파일:
  - `issues/ISSUE-101-sample-action.md`
  - `src/sample-action.js`
  - `tests/sample-action.test.js`
  - `docs/release-decision-log.md`
- 종료 상태:
  - issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback 흐름을 한 번에 수행 가능
  - 역할별 판단과 회고가 문서로 남음
  - 팀 규칙 초안으로 전환 가능한 운영 문장 확보

## 슬라이드 구성
1. 전체 흐름 연결 선언
2. 앞선 7개 장이 capstone에 재등장하는 방식
3. 시나리오 요구사항과 제약
4. Issue 정의
5. Issue에서 Branch로
6. 개발과 Commit
7. Capstone용 MR 작성
8. 역할별 Review와 Approval
9. Pipeline과 Merge Readiness
10. 사고 주입
11. Hotfix vs Revert
12. 사고 발생 시 역할별 즉시 행동
13. 최종 회고와 현업 전이 체크리스트

## 반드시 반영할 시나리오
- 기능: sample action 버튼 추가
- 조건: role별 노출 차등
- 요구사항:
  - UI 변경
  - 테스트
  - MR
  - approval
  - pipeline success
- 제약:
  - main direct push 금지
  - rollback은 Owner 승인 후
- 사고 주입:
  - 권한 없는 사용자에게 버튼 노출

## 반드시 포함할 명령어 세트
```bash
git switch main
git pull
git switch -c feature/sample-action
git status
git diff
git diff --staged
git add .
git commit -m "feat: add sample action visibility"
git show --stat HEAD
git push -u origin feature/sample-action
git log --oneline
git revert <sha>
git push origin main
````

## 반드시 반영할 역할별 관점

* Owner:

  * merge 최종 승인
  * rollback 승인
  * 운영 영향 판단
* Maintainer:

  * 작업 분해
  * 리뷰 포인트 정의
  * merge readiness 판단
* Developer:

  * 구현
  * 테스트
  * MR 작성
  * 상태 확정

## 반드시 반영할 자산 연결

* issue 내용이 branch 이름과 MR 설명으로 이어져야 함
* sample action 기능이 `permissions`, `feature-flags`, test, pipeline과 연결되어야 함
* `docs/release-decision-log.md`에 사고 판단과 회고가 남아야 함

## 출력 시 주의

* CH08은 앞선 장 요약이 아니라 실제 end-to-end 운영 시나리오로 써라.
* 각 슬라이드에서 역할별 질문이 자연스럽게 드러나야 한다.
* 사고 주입 이후에는 blame보다 안정화와 기준점 회복을 우선하는 언어를 써라.
* 마지막 슬라이드는 교육 종료가 아니라 “팀 규칙 초안 확보”로 마무리하라.

지금 바로 CH08 전체 슬라이드 초안을 생성하라.

```

---

원하시면 다음 단계로 바로 이어서, 위 실행 프롬프트 중 하나를 기준으로 **CH01 실제 슬라이드 초안 결과물**부터 바로 생성해드리겠습니다.
```
