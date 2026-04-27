# CH05 학습 노트

## 장 제목

CH05. GitLab Project Structure, Permissions, and MR

## Source of Truth

- 강의 노트: `../../GitLab-Onboarding-Lectures/CH05-GitLab-Project-Structure-Permissions-and-MR_lecture-note.md`
- 실습 가이드: `../../GitLab-Onboarding-Lectures/tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/LAB.md`
- 실습 자산: `../../GitLab-Onboarding-Lectures/tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/assets/`

## 사용할 repository

- 실제 Git 실습 repo: `../CH01/tutorial-collaboration-lab`
- CH05는 CH04까지 만든 같은 repository 위에서 이어서 진행한다.

## 시작 상태

- 현재 branch: `main`
- CH05 실습 시작 commit: `c6e369a chore: remove lecture notes from tutorial repo`
- `GitLab-LectureNotes`와 `087f9c8 lecturenotes: added`는 사용자의 별도 정리 노트였고, 현재 `c6e369a`에서 제거되어 CH05 실습 범위에서 제외한다.
- 내용 기준으로는 CH04 종료 산출물인 `c503dfc feat: add tutorial feature flags` 위에 정리 commit만 추가된 상태다.
- 실습 branch는 현재 `main`의 `c6e369a`를 기준으로 만들어 CH05 변경만 분리한다.
- 이전 CH04 핵심 산출물:
  - `docs/branch-planning.md`
  - `src/feature-flags.json`
  - `feature/branch-playbook`
  - `feature/feature-flags`

## 오늘의 핵심 질문

- GitLab에서 `Owner`, `Maintainer`, `Developer`, `Guest`는 무엇이 다른가?
- protected branch는 왜 direct push를 막는가?
- MR description은 왜 단순 설명문이 아니라 운영 문서인가?
- reviewer와 approver는 같은 개념인가?
- `CODEOWNERS`는 review 흐름에 어떤 영향을 주는가?
- Wiki 문서와 repository 안의 `docs/` 문서는 어떻게 나누는가?

## 오늘 추가할 파일

- `.gitlab/merge_request_templates/standard.md`
- `CODEOWNERS`
- `docs/review-checklist.md`

## CH05 진행 원칙

- main에 직접 push하지 않고 feature branch에서 MR 흐름을 연습한다.
- GitLab UI에서 MR template, reviewer, approval, protected branch 상태를 눈으로 확인한다.
- local Git 명령 결과와 GitLab UI evidence가 맞는지 확인한 뒤 다음 단계로 넘어간다.

## 실습 전 개념 요약

- `protected branch`는 중요한 branch를 우발적 push와 무검토 merge에서 보호한다.
- `MR`은 코드 반영 요청이면서 변경 의도, 테스트 근거, 배포 영향을 남기는 기록이다.
- `reviewer`는 변경 내용을 검토하는 사람이고, `approver`는 조직 규칙상 merge 허용 여부를 승인하는 사람이다.
- `CODEOWNERS`는 특정 경로나 파일에 대해 누가 리뷰 책임을 가져야 하는지 저장소 안에 남기는 표준이다.
- Wiki는 운영 runbook, FAQ, 팀 가이드처럼 코드와 느슨하게 연결된 문서에 적합하다.
- repository의 `docs/`는 코드 변경과 함께 review되어야 하는 문서에 적합하다.

## 실습 1 결과: CH05 작업 branch 생성

- 생성 branch: `feature/mr-standards`
- 시작 commit: `c6e369a chore: remove lecture notes from tutorial repo`
- 현재 상태: working tree clean
- 아직 remote tracking branch는 없다.
- 확인한 핵심:
  - CH05 변경은 `main`에 직접 넣지 않고 feature branch에서 준비한다.
  - 이 branch의 목적은 MR template, `CODEOWNERS`, review checklist를 한 묶음의 MR로 제출하는 것이다.

## 실습 2 결과: MR 표준 파일 추가 commit

- 작업 branch: `feature/mr-standards`
- commit: `956fb92 docs: add MR standards and review checklist`
- 추가 파일:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`
- 변경 범위 확인:
  - `git diff --name-status main...HEAD` 결과 위 세 파일만 추가됨
- 확인한 핵심:
  - MR은 unrelated file이 섞이지 않도록 범위를 작게 유지해야 한다.
  - `git add .`보다 필요한 파일을 명시적으로 staging하는 습관이 안전하다.

## 실습 3 결과: feature branch push

- 실행 명령: `git push -u origin feature/mr-standards`
- remote branch: `origin/feature/mr-standards`
- tracking 상태:
  - `feature/mr-standards -> origin/feature/mr-standards`
- GitLab MR 생성 URL:
  - `https://gitlab.com/Infant83/tutorial-collaboration-lab/-/merge_requests/new?merge_request%5Bsource_branch%5D=feature%2Fmr-standards`
- 현재 local 상태:
  - working tree clean
  - branch is up to date with `origin/feature/mr-standards`
- 확인한 핵심:
  - `push -u`는 local branch와 remote branch의 tracking 관계를 만든다.
  - GitLab은 pushed feature branch를 보고 MR 생성 링크를 제안한다.

## 실습 3.5: MR 생성 전 `CODEOWNERS` 설명

`CODEOWNERS`는 저장소 안에서 "어떤 파일이나 경로를 누가 책임지고 봐야 하는가"를 선언하는 파일이다. GitLab은 MR에서 변경된 파일이 `CODEOWNERS` 규칙과 맞을 때, 해당 owner를 reviewer 또는 approval 흐름과 연결할 수 있다.

이번 실습에서 추가한 `CODEOWNERS`는 다음 의미를 가진다.

```text
# Docs and operating policy
/docs/ @maintainers

# Permissions and feature gates
/src/permissions.js @owners @maintainers
/src/feature-flags.json @owners @maintainers

# Tests and CI
/tests/ @developers @maintainers
/.gitlab-ci.yml @maintainers
```

- `/docs/ @maintainers`
  - `docs/` 아래 문서는 운영 정책과 문서 표준에 가까우므로 maintainer가 봐야 한다는 뜻이다.
- `/src/permissions.js @owners @maintainers`
  - 권한 로직은 위험도가 높으므로 owner 또는 maintainer가 review 책임을 가진다는 뜻이다.
- `/src/feature-flags.json @owners @maintainers`
  - feature flag는 배포와 사용자 영향이 있을 수 있으므로 owner 또는 maintainer가 본다는 뜻이다.
- `/tests/ @developers @maintainers`
  - 테스트는 developer와 maintainer가 함께 볼 수 있다는 뜻이다.
- `/.gitlab-ci.yml @maintainers`
  - CI 설정은 merge 품질 조건과 연결되므로 maintainer가 책임진다는 뜻이다.

주의할 점:

- `@maintainers`, `@owners`, `@developers`는 교육용 placeholder일 수 있다.
- GitLab에서 실제로 작동하려면 실제 user 또는 group handle이어야 한다.
- 예를 들어 개인 프로젝트에서는 `@Infant83`처럼 실제 계정을 쓰거나, 그룹 프로젝트에서는 `@group-name/team-name` 같은 실제 group을 써야 한다.
- 모든 파일에 기본 maintainer를 적용하려면 파일 맨 위에 `* @maintainers` 같은 기본 규칙을 둘 수 있다. 단, 이 역시 실제 GitLab group이어야 한다.

핵심:

- `CODEOWNERS`는 단순 문서가 아니라 review 책임을 저장소 안에 남기는 운영 규칙이다.
- 다만 `CODEOWNERS`만 있다고 항상 merge가 막히는 것은 아니다.
- required approval로 강제하려면 GitLab의 approval rule, protected branch 설정과 함께 연결되어야 한다.

## 실습 3.6: protected branch와 approval rule 설정 방법

### protected branch 설정

목적:

- `main`에 직접 push되는 것을 막는다.
- 반드시 MR을 거쳐 merge되도록 만든다.
- 누가 merge할 수 있고, 누가 push할 수 있는지 branch 단위로 정한다.

GitLab UI 경로:

```text
Project
-> Settings
-> Repository
-> Branch rules
-> Add branch rule 또는 main branch의 View details
```

권장 설정:

```text
Branch name or pattern: main
Allowed to merge: Maintainers
Allowed to push and merge: No one
Require approval from code owners: enabled, 가능할 때
Allowed to force push: disabled
```

해석:

- `Allowed to merge: Maintainers`
  - Maintainer 이상만 MR을 최종 merge할 수 있다.
- `Allowed to push and merge: No one`
  - 누구도 `main`에 직접 push하지 못하게 한다.
  - 모든 변경은 MR을 거치게 된다.
- `Require approval from code owners`
  - MR이 `CODEOWNERS`에 걸리는 파일을 바꾸면 해당 code owner approval을 요구한다.

주의:

- GitLab 문서 기준으로 direct push를 막으려면 `Allowed to push and merge`를 명시적으로 `No one`으로 설정해야 한다.
- `Allowed to push and merge`를 허용하면 MR을 건너뛰는 direct push가 가능할 수 있고, 이 경우 MR 기반 Code Owner approval도 우회될 수 있다.

### approval rule 설정

목적:

- MR이 merge되기 전에 최소 몇 명의 승인을 받아야 하는지 정한다.
- 특정 사용자나 group이 approver가 되도록 정한다.
- reviewer 지정과 달리, approval rule은 merge 가능 여부에 영향을 줄 수 있다.

GitLab UI 경로:

```text
Project
-> Settings
-> Merge requests
-> Merge request approvals
-> Approval rules
-> Add approval rule
```

예시 설정:

```text
Rule name: Maintainer approval
Target branch: main 또는 All protected branches
Approvals required: 1
Approvers: Maintainer 역할 사용자 또는 실제 maintainer group
```

해석:

- `Approvals required: 1`
  - merge 전에 최소 1명 approval이 필요하다.
- `Approvers`
  - 실제 GitLab user 또는 group이어야 한다.
- `Target branch`
  - `main` 또는 protected branch에만 적용하도록 제한할 수 있다.

주의:

- GitLab.com에서 project approval rules와 Code Owners 기능은 플랜에 따라 보이지 않을 수 있다.
- approval rule이 보이지 않으면 현재 project plan 또는 권한에서 지원되지 않는 것일 수 있다.
- `CODEOWNERS` approval을 강제하려면 target branch가 protected branch이고, Code Owner approval이 enabled 상태여야 한다.

### 이번 튜토리얼에 맞는 판단

현재 개인 실습 프로젝트에서는 다음 두 단계만 확인해도 충분하다.

```text
1. Settings -> Repository -> Branch rules에서 main 보호 상태 확인
2. Settings -> Merge requests에서 Approval rules 또는 Merge request approvals 항목이 보이는지 확인
```

보이면 실습용으로:

```text
Allowed to merge: Maintainers
Allowed to push and merge: No one
Approvals required: 1
```

보이지 않으면:

```text
현재 GitLab plan 또는 project 설정에서는 approval rule 강제가 제한됨
```

으로 기록하고 넘어간다.

## 실습 4 결과: GitLab MR 생성

- MR URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab/-/merge_requests/1`
- MR 상태: Open
- source branch: `feature/mr-standards`
- target branch: `main`
- GitLab UI 관찰:
  - `Looks like there's no pipeline here.` 메시지가 보임
  - `Ready to merge` 상태가 보임
- 해석:
  - 현재 repository에는 아직 `.gitlab-ci.yml` pipeline 정의가 없으므로 pipeline이 없는 것은 정상이다.
  - pipeline gate는 CH07에서 다룰 예정이다.
  - `Ready to merge`는 GitLab 정책상 현재 blocking condition이 없다는 뜻이지, reviewer 판단이 끝났다는 뜻은 아니다.

## 실습 5 결과: MR review 화면 점검

- Commits tab:
  - `956fb92 docs: add MR standards and review checklist`
- Changes tab:
  - `.gitlab/merge_request_templates/standard.md`
  - `docs/review-checklist.md`
  - `CODEOWNERS`
- diff summary:
  - 3 files
  - `+63 -0`
- Reviewer / approval:
  - reviewer 없음
  - required approval 없음
- Pipeline:
  - 없음
- Comment:
  - review evidence comment 작성 완료
- 확인한 핵심:
  - MR의 변경 범위가 CH05 목적에 맞게 세 파일로 제한되어 있다.
  - 현재 프로젝트에는 approval rule과 pipeline gate가 없으므로 merge가 막히지 않는다.
  - reviewer가 없다는 것은 GitLab 정책이 느슨하다는 신호일 수 있다. 실무에서는 변경 위험도에 따라 reviewer 또는 approval rule을 지정하는 편이 안전하다.

## 실습 6 결과: reviewer 지정

- reviewer 지정 가능 여부: 가능
- 지정된 reviewer: `Hyun-Jung Kim`
- 확인한 핵심:
  - reviewer는 MR에서 변경 내용을 검토할 사람을 명시하는 필드다.
  - reviewer 지정과 required approval은 같은 개념이 아니다.
  - 현재 프로젝트에서는 reviewer를 지정해도 approval rule이나 pipeline gate가 없으면 merge 자체는 계속 가능할 수 있다.

## 실습 7 결과: MR merge

- MR 상태: merged
- GitLab merge 방식:
  - `1 commit and 1 merge commit will be added to main`
- source branch:
  - GitLab에서 `feature/mr-standards` remote branch 삭제됨
- merge commit:
  - `e1a14ea Merge branch 'feature/mr-standards' into 'main'`
- fetch 후 local 관찰:
  - `origin/main`은 `e1a14ea`를 가리킨다.
  - local `main`은 아직 `c6e369a`에 있어 `origin/main`보다 behind 상태다.
  - local `feature/mr-standards`는 upstream이 `gone`으로 표시된다.
- 확인한 핵심:
  - GitLab MR merge는 프로젝트 설정에 따라 merge commit을 만들 수 있다.
  - remote branch 삭제는 remote에만 적용된다. local branch는 사용자가 직접 정리해야 한다.
  - GitLab UI에서 merge한 뒤 local `main`은 `pull`로 갱신해야 한다.

## 실습 8 결과: local main 동기화

- 실행 명령:
  - `git switch main`
  - `git pull --ff-only`
- pull 결과:
  - local `main`이 `c6e369a`에서 `e1a14ea`로 fast-forward 됨
- 현재 상태:
  - `HEAD -> main`
  - `origin/main -> e1a14ea`
  - working tree clean
- local에 반영된 CH05 파일:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`
- 남은 정리 항목:
  - local `feature/mr-standards` branch는 아직 남아 있고 upstream은 `gone` 상태다.
- 확인한 핵심:
  - GitLab에서 만든 merge commit을 local에 반영하려면 `main`에서 pull해야 한다.
  - `pull --ff-only`는 local merge commit을 새로 만들지 않고, local `main`을 remote `main` 위치까지 앞으로 이동시킨다.

## 실습 9 결과: local feature branch 정리

- 실행 명령: `git branch -d feature/mr-standards`
- 결과:
  - local `feature/mr-standards` branch 삭제됨
- 현재 branch 상태:
  - `main -> e1a14ea`
  - `feature/branch-playbook -> a1eeb94`
  - `feature/feature-flags -> c503dfc`
- 현재 repository 상태:
  - `main` is up to date with `origin/main`
  - working tree clean
- 확인한 핵심:
  - remote source branch가 삭제되어도 local branch는 자동으로 삭제되지 않는다.
  - merge 완료 후 더 이상 필요 없는 local feature branch는 `git branch -d`로 정리한다.

## CH05 종료 질문 답변 정리

- `Reviewer`는 변경 내용을 살펴보고 comment를 남기는 검토자다.
- `Approver`는 조직 규칙상 해당 변경을 `main`에 반영해도 된다고 승인하는 사람 또는 역할이다.
- `Ready to merge`가 보여도 review가 끝나지 않았거나, 위험 요소, 장애 가능성, 테스트 근거, approval 조건을 충분히 확인하지 못했다면 바로 merge하면 안 된다.
- `CODEOWNERS`는 경로나 파일별 review 책임자를 저장소 안에 기록하기 위한 파일이다. 실제 approval gate로 쓰려면 GitLab user/group 및 approval rule과 연결되어야 한다.
- 이번 CH05에서 `Pipeline: none`은 아직 `.gitlab-ci.yml`이 없고 변경 범위가 문서/운영 표준 파일이었기 때문에 허용 가능한 상태로 보았다. CI quality gate는 CH07에서 다룬다.
- MR merge 후 local에서 `git pull --ff-only`를 한 이유는 GitLab에서 바뀐 `origin/main`의 merge commit을 local `main`에 반영하기 위해서다.
- `--ff-only`는 local `main`이 remote보다 단순히 뒤처진 경우에만 앞으로 이동시키며, local과 remote가 갈라져 있으면 merge commit을 만들지 않고 중단한다.
