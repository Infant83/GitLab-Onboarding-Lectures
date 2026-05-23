# GitLab Onboarding Interactive Pages 구상안

작성일: 2026-05-23

## 1. 목표

현재 `GitLab-Onboarding-Lectures`는 8개 챕터 강의노트, PDF/PPTX, 로컬 실습 자산을 이미 갖고 있다. 다음 단계는 이 자료를 `autodidact`처럼 한 페이지씩 들어가서 직접 조작하며 배우는 GitHub Pages 기반 인터랙티브 강의로 바꾸는 것이다.

목표는 단순한 웹 매뉴얼이 아니다.

- 학습자가 `Owner`, `Maintainer`, `Developer`, `Reporter`, `Guest` 권한 차이를 상황 속에서 체험한다.
- `Reviewer`는 GitLab의 기본 접근 권한이 아니라 MR 안에서 맡는 리뷰 책임이라는 점을 명확히 분리한다.
- 각 챕터는 `개념 -> 시뮬레이터 -> 역할별 액션 -> 실습 저장소 과제 -> 체크포인트` 흐름을 가진다.
- 강의자는 오프라인 8시간 교육에서도 같은 페이지를 진행판으로 사용할 수 있다.
- 학습자는 교육 후에도 사내 GitLab 운영 플레이북으로 다시 열어볼 수 있다.

## 2. 참고 사이트에서 가져올 패턴

참고: <https://joonan-lab.github.io/autodidact/>

`autodidact`의 좋은 점은 홈에서 큰 트랙을 보여주고, 각 주제 페이지에서는 텍스트보다 조작 가능한 학습 장치를 앞에 둔다는 점이다. 예를 들어 개별 페이지는 타임라인, 선택기, 슬라이더, 검색 가능한 카탈로그, deep-dive 섹션을 한 페이지 안에 묶는다.

GitLab 강의에 적용하면 다음과 같다.

| autodidact 패턴 | GitLab 강의 변환 |
| --- | --- |
| 트랙 카드 | CH01~CH08 챕터 카드 |
| 논문/모델 카탈로그 | 명령어, GitLab 화면, 권한, 운영 규칙 카탈로그 |
| 타임라인 | issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback 흐름 |
| 슬라이더/선택기 | 역할, branch protection, approval rule, pipeline 상태 선택기 |
| deep-dive | protected branch, CODEOWNERS, self-managed runner, rollback 판단 |
| 검색 가능한 표 | "이 상황에서 누가 무엇을 할 수 있나" 권한 매트릭스 |

## 3. 핵심 설계 원칙

1. 권한은 표로 끝내지 말고, 항상 "버튼이 눌리는가/막히는가"로 보여준다.
2. `Reviewer`는 접근 권한이 아니라 MR 책임이다. 예: Developer도 reviewer가 될 수 있지만, protected branch merge 권한은 별도다.
3. 모든 실습은 `권한`, `상태`, `행동`, `결과`, `다음 액션`으로 모델링한다.
4. GitLab Free/Premium/Ultimate, self-managed 설정 차이는 "운영자 노트"로 분리한다.
5. 기존 `tutorials/` 자산은 유지하고, 웹 페이지가 이를 호출하거나 복사 가능한 실습 단계로 보여준다.

## 3.1 디자인 컨셉 확정

디자인의 기준은 <https://infant83.github.io/>의 시각 언어를 따른다. 단, 배치와 정보 구조는 GitLab 교육에 맞게 별도로 최적화한다.

가져올 것:

- 따뜻한 paper-tone 배경
- 짙은 녹색 계열의 본문/액센트
- 옅은 warm beige surface
- 얇고 차분한 라인
- 큰 제목과 조용한 본문 대비
- `Newsreader` 계열의 display 감각과 `Work Sans` 계열의 실무형 UI 감각
- sticky header, pill button, tag chip, timeline, section rhythm

그대로 복제하지 않을 것:

- 개인 프로필 페이지식 hero 구성
- 포트폴리오용 biography timeline
- 한 화면에 설명 카드가 많은 구조
- 페이지 섹션 안에 또 카드가 들어가는 중첩 카드 구조

GitLab 교육 페이지에서는 `infant83.github.io`의 색감과 타이포그래피를 유지하되, 첫 화면부터 학습자가 `역할 선택`, `챕터 선택`, `실습 시작`을 할 수 있어야 한다.

### Design Tokens

초기 CSS 토큰은 아래 값을 기준으로 한다.

```css
:root {
  --bg: #f3efe6;
  --bg-deep: #ece6da;
  --surface: rgba(255, 252, 247, 0.76);
  --surface-strong: #fbf9f4;
  --line: rgba(50, 69, 60, 0.16);
  --line-strong: rgba(37, 55, 48, 0.26);
  --text: #21312b;
  --muted: #5e6f68;
  --accent: #314b42;
  --accent-soft: #dbe4db;
  --accent-warm: #9c7d5d;
  --shadow: 0 22px 60px rgba(29, 43, 37, 0.08);
}
```

폰트는 다음 순서를 권장한다.

```css
body {
  font-family: "Work Sans", "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
}

h1,
h2,
.display-copy,
.chapter-number {
  font-family: "Newsreader", "Noto Serif KR", Georgia, serif;
}
```

한국어 본문은 `Work Sans`만으로는 어색해질 수 있으므로 `Pretendard` 또는 시스템 한글 폰트를 fallback으로 둔다. 큰 숫자, chapter number, 짧은 영문 label에는 `Newsreader`를 적극 사용한다.

### Layout Adaptation

홈 페이지는 개인 프로필형 hero가 아니라 교육용 command center로 간다.

권장 첫 화면:

```text
[Sticky Header]
GitLab Onboarding Interactive | Chapters | Role Lab | Instructor | Audit

[Main Stage]
GitLab Onboarding Interactive
역할을 바꿔가며 배우는 Git/GitLab 협업 실습

[Role Switcher]
Guest / Reporter / Developer / Reviewer / Maintainer / Owner

[Primary Panels]
1. 오늘의 역할
2. 바로 시작할 챕터
3. 막히는 액션 실험실

[Chapter Rail]
CH01 CH02 CH03 CH04 CH05 CH06 CH07 CH08
```

챕터 페이지는 다음 리듬을 따른다.

```text
Chapter Header
Role Switcher
Scenario Board
Interactive Lab
Guided Steps
Role-specific Checklist
Audit Notes
Download / Instructor Notes
```

즉, 색감은 `infant83.github.io`, 경험 구조는 GitLab 실습실이다.

## 4. 저장소 운영 방식

별도 GitHub 저장소는 만들지 않는다.

현재 로컬 git root는 `C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual`이고, remote는 이미 `https://github.com/Infant83/GitLab-Onboarding-Lectures.git`로 연결되어 있다. 따라서 Pages용 정적 사이트는 repo root의 `public`에 두고, 현재 repo에서 그대로 push하면 된다.

권장 구조:

```text
public/
├─ index.html
├─ assets/
│  ├─ styles.css
│  └─ app.js
├─ data/
│  ├─ chapters.json
│  ├─ roles.json
│  └─ scenarios.json
└─ audits/
   └─ AUDIT_GATES.md

GitLab-Onboarding-Lectures/
├─ CH01-...
├─ tutorials/
└─ ...
```

GitHub Pages는 GitHub Actions 배포를 사용한다. repo root의 `public`만 artifact로 올리면 강의 원본과 배포 산출물을 분리해서 관리할 수 있다.

repo root에 다음 workflow를 둔다.

```text
.github/workflows/pages.yml
```

이 workflow가 repo root의 `public` 폴더만 Pages artifact로 업로드한다.

## 5. 기술 선택

### MVP

`autodidact`와 비슷하게 정적 HTML/CSS/JS로 시작한다.

- 장점: GitHub Pages 배포가 단순하다.
- 장점: 회사망이나 교육장 PC에서도 빌드 의존성이 거의 없다.
- 장점: 챕터별 `index.html`을 독립적으로 고칠 수 있다.
- 단점: 인터랙션이 많아지면 공통 컴포넌트 관리가 불편해진다.

### 확장형

MVP 이후 Vite + React + TypeScript로 옮긴다.

- 권한 엔진, 시나리오 엔진, 퀴즈 엔진을 재사용하기 좋다.
- 학습 진행률을 `localStorage`로 저장하기 쉽다.
- Playwright로 시나리오 검증을 자동화하기 좋다.

권장 순서는 `정적 MVP -> 공통 JS 모듈화 -> 필요 시 React 전환`이다.

## 6. Pages 구조 초안

```text
public/
├─ index.html
├─ assets/
│  ├─ styles.css
│  ├─ app.js
│  ├─ permissions.js
│  ├─ scenarios.js
│  └─ diagrams/
├─ data/
│  ├─ roles.json
│  ├─ actions.json
│  ├─ chapters.json
│  └─ scenarios/
│     ├─ ch05-mr-permissions.json
│     ├─ ch06-conflict-review.json
│     └─ ch08-capstone-release.json
├─ chapters/
│  ├─ ch01-foundation/
│  │  └─ index.html
│  ├─ ch02-local-workflow/
│  │  └─ index.html
│  ├─ ch03-history-recovery/
│  │  └─ index.html
│  ├─ ch04-branch-strategy/
│  │  └─ index.html
│  ├─ ch05-permissions-mr/
│  │  └─ index.html
│  ├─ ch06-conflict-rollback/
│  │  └─ index.html
│  ├─ ch07-cicd-operations/
│  │  └─ index.html
│  └─ ch08-capstone/
│     └─ index.html
├─ labs/
│  ├─ ch01-seed-repo.zip
│  ├─ ch05-mr-template.zip
│  └─ ch08-capstone.zip
├─ instructor/
│  ├─ runbook.md
│  └─ facilitation-notes.md
└─ README.md
```

현재 저장소의 자산은 다음처럼 매핑한다.

| 현재 자산 | 새 사이트에서의 역할 |
| --- | --- |
| `CH??_*_lecture-note.md` | 챕터 본문과 deep-dive 원고 |
| `CH??_*.pdf` | 다운로드용 강의 슬라이드 |
| `tutorials/CH??.../LAB.md` | 실습 단계 원본 |
| `tutorials/CH??.../assets/` | 챕터별 실습 zip/복사 코드 |
| `tutorial_continuity_audit_2026-04-11.md` | 강사용 검증 메모 |

## 7. 홈 페이지 구성

홈은 설명형 랜딩 페이지보다 학습 지도여야 한다.

첫 화면 구성:

- 제목: `GitLab Onboarding Interactive`
- 부제: `역할을 바꿔가며 배우는 Git/GitLab 협업 실습`
- 진행 카드: CH01~CH08
- 역할 선택 패널: `Guest`, `Reporter`, `Developer`, `Maintainer`, `Owner`, `Reviewer`
- 오늘의 실습 모드: `개인 실습`, `2인 페어`, `4인 팀`, `강사용 진행`

홈에서 역할을 선택하면 챕터 카드의 설명이 바뀐다.

예:

- Developer 선택: "feature branch 작성, MR 생성, pipeline 확인, reviewer 피드백 반영"
- Maintainer 선택: "protected branch merge, approval rule 운영, CI/CD setting 확인"
- Owner 선택: "멤버 권한, visibility, project deletion 위험, compliance setting"
- Guest 선택: "private project에서 repository 접근 제한, issue/comment 중심 참여"
- Reviewer 선택: "MR diff 읽기, comment/suggestion, approve/request changes, thread resolve"

## 8. 공통 인터랙션 컴포넌트

### 8.1 Role Switcher

페이지 상단에 역할 토글을 둔다.

```text
[Guest] [Reporter] [Developer] [Maintainer] [Owner] [Reviewer]
```

역할을 바꾸면 아래 요소가 동시에 갱신된다.

- 가능한 액션
- 막히는 액션
- 권장 행동양식
- 실습 명령어/화면 안내
- 토론 질문

### 8.2 Permission Matrix Console

"내가 이 버튼을 누르면 어떻게 되는가"를 시뮬레이션한다.

입력:

- 역할
- 프로젝트 visibility
- branch 보호 여부
- approval rule 존재 여부
- CODEOWNERS 매칭 여부
- pipeline 상태

출력:

- `허용`, `차단`, `조건부 허용`
- 차단 이유
- 다음 액션
- 누가 처리해야 하는지

예:

```text
Role: Developer
Action: push to main
Branch: protected
Result: blocked
Next: feature branch로 push하고 MR 생성
Escalate to: Maintainer
```

### 8.3 MR Lifecycle Board

MR 상태를 칸반처럼 보여준다.

```text
Draft -> Ready -> Review -> Changes requested -> Approved -> Pipeline passed -> Mergeable -> Merged
```

각 상태에서 역할별 할 일이 바뀐다.

### 8.4 Review Simulator

학습자가 reviewer가 되어 diff를 읽고 코멘트를 고른다.

- 좋은 코멘트: 문제 위치, 이유, 제안, 테스트 기준이 있다.
- 나쁜 코멘트: "수정 필요", "왜 이렇게 했나요?"처럼 모호하다.
- suggestion comment를 선택하면 patch가 적용된 것처럼 보여준다.

### 8.5 Protected Branch Lab

설정을 바꾸면 결과가 바뀌는 미니 실험실.

- `Allowed to merge`: Maintainers / Developers + Maintainers / No one
- `Allowed to push`: No one / Maintainers / Developers + Maintainers
- `Require Code Owner approval`: on/off
- `Pipelines must succeed`: on/off

### 8.6 Pipeline Failure Triage

CI 로그 조각을 보여주고 누가 무엇을 해야 하는지 고르게 한다.

- Developer: 실패 로그 확인, commit 수정, MR 업데이트
- Reviewer: 실패가 리뷰 판단에 미치는 영향 확인
- Maintainer: runner/variable/protected branch 문제인지 확인
- Owner: project setting, protected variable, runner 정책 확인

## 9. 챕터별 페이지 구상

### CH01. Course Foundation and Operating Model

핵심 질문: GitLab 협업에서 왜 역할과 흐름이 중요한가?

인터랙션:

- 저장소 지도: working tree, staging area, local repo, origin, GitLab project
- 역할 카드: Guest/Reporter/Developer/Maintainer/Owner/Reviewer
- 첫 진단: "나는 오늘 어떤 역할로 실습하는가?"
- 인증 선택기: HTTPS/PAT/SSH/SSO

실습:

- 환경 점검 체크리스트
- seed repo 준비
- 권한별 첫 행동 비교

### CH02. Local Workflow and Core Commands

핵심 질문: 내 변경은 어디에 있고, 언제 원격으로 올라가는가?

인터랙션:

- Git 상태 머신: modified -> staged -> committed -> pushed
- 명령어 선택기: `status`, `add`, `commit`, `push`, `fetch`, `pull`
- "다음 명령어 고르기" 퀴즈

실습:

- clone -> edit -> add -> commit -> push
- 잘못 staged한 파일 되돌리기
- push 전 diff/log 검토

### CH03. History Inspection and Recovery

핵심 질문: 문제가 생겼을 때 이력을 어떻게 읽고 안전하게 되돌리는가?

인터랙션:

- commit graph 조작기
- `reset`, `restore`, `revert`, `stash`, `bisect` 비교
- "협업 중 어떤 복구가 안전한가" 판단 퀴즈

실습:

- bug commit 찾기
- revert로 공개 이력 복구
- stash로 작업 중단 후 복귀

### CH04. Branch Strategy and Sync Decisions

핵심 질문: branch를 어떻게 나누고, merge/rebase를 언제 선택하는가?

인터랙션:

- branch graph simulator
- shared repo vs fork workflow 비교
- non-fast-forward 상황 선택기

실습:

- feature branch 생성
- 원격이 앞선 상황에서 fetch -> compare -> merge/rebase
- rebase 후 force push 위험 토론

### CH05. Project Structure, Permissions, and MR

핵심 질문: 누가 MR을 만들고, 누가 승인하고, 누가 merge할 수 있는가?

인터랙션:

- 권한 매트릭스 콘솔
- MR lifecycle board
- CODEOWNERS path matching simulator
- Reviewer vs Approver vs Maintainer 구분 카드

실습:

- MR template 작성
- CODEOWNERS 추가
- protected branch push 실패 원인 분석
- approval 부족 시나리오 해결

### CH06. Team Collaboration, Conflict, and Rollback Lab

핵심 질문: 충돌이 났을 때 팀은 어떤 순서로 판단하고 복구하는가?

인터랙션:

- conflict marker 해석기
- reviewer comment thread simulator
- merge/rebase abort decision tree
- revert vs hotfix 선택기

실습:

- 동일 파일 병렬 수정
- conflict 해결
- 리뷰 코멘트 반영
- merge 후 문제 발견 시 rollback 판단

### CH07. CI/CD Quality Gates and Self-Managed Operations

핵심 질문: pipeline은 merge 판단에 어떤 품질 게이트를 제공하는가?

인터랙션:

- `.gitlab-ci.yml` stage/job 지도
- pipeline 상태 시뮬레이터
- runner pending 원인 선택기
- protected variable 접근 시뮬레이터

실습:

- pipeline 실패 유도
- 로그에서 실패 지점 찾기
- artifact/test report 확인
- self-managed runner 운영 체크

### CH08. Capstone Scenario and Role-Based Playbook

핵심 질문: 실제 팀 운영에서 각 역할은 언제 개입해야 하는가?

인터랙션:

- end-to-end release board
- role handoff simulator
- incident timeline builder
- final policy builder

실습:

- issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback
- 역할별 보고서 작성
- 우리 팀 GitLab 운영 규칙 초안 작성

## 10. 역할별 학습 모델

### Guest

배워야 할 것:

- private/internal project에서 repository 접근이 제한될 수 있다.
- issue/comment 중심으로 참여한다.
- 코드 변경을 직접 push하거나 MR로 올리는 역할은 아니다.

인터랙션:

- "왜 repository 탭이 안 보이는가?"
- "이 사람이 필요한 최소 권한은 Guest인가 Reporter인가?"

### Reporter

배워야 할 것:

- 코드는 읽을 수 있지만 push 권한은 없다.
- 외부 협력자나 QA/PM에게 적합할 수 있다.
- fork workflow에서는 upstream에 Reporter로 두고 fork에서 작업하게 할 수 있다.

인터랙션:

- "Reporter가 MR을 만들 수 있는 조건은?"
- "읽기 권한과 쓰기 권한의 경계"

### Developer

배워야 할 것:

- non-protected branch에 push하고 MR을 만든다.
- pipeline을 실행/확인하고 리뷰 피드백을 반영한다.
- protected branch merge는 기본적으로 Maintainer 영역이다.

인터랙션:

- "main에 push하려다 막힌 이유"
- "MR이 mergeable이 아닌 이유 찾기"

### Reviewer

배워야 할 것:

- Reviewer는 접근 권한이 아니라 MR에서 맡는 책임이다.
- 좋은 리뷰는 차단이 아니라 품질 높은 merge를 돕는 일이다.
- approve와 comment, suggestion, request change를 구분한다.

인터랙션:

- 좋은 리뷰 코멘트 고르기
- diff에서 위험 지점 찾기
- 승인 전 확인해야 할 테스트/rollback 기준 찾기

### Maintainer

배워야 할 것:

- protected branch, MR, approval, CI/CD setting을 운영한다.
- 기본 protected branch flow에서 merge 권한을 갖는다.
- Developer가 막혔을 때 권한을 열어주는 사람이 아니라 정책을 지키며 흐름을 설계하는 사람이다.

인터랙션:

- approval rule 설정
- protected branch merge/push 권한 조정
- runner/pipeline 운영 문제 판단

### Owner

배워야 할 것:

- project/group의 최종 통제권을 가진다.
- 삭제, visibility, 멤버 권한, 보안/컴플라이언스 정책을 다룬다.
- 너무 많은 Owner는 운영 리스크다.

인터랙션:

- "이 사람에게 Owner를 줘도 되는가?"
- "프로젝트 visibility 변경의 영향"
- "삭제/transfer 위험 경고"

## 11. 데이터 모델 초안

`roles.json`

```json
[
  {
    "id": "developer",
    "label": "Developer",
    "can": [
      "push_non_protected_branch",
      "create_merge_request",
      "run_pipeline"
    ],
    "cannot": [
      "manage_project_settings",
      "merge_protected_branch_by_default"
    ],
    "habit": "feature branch에서 작업하고 MR로 리뷰를 요청한다."
  }
]
```

`actions.json`

```json
[
  {
    "id": "push_to_protected_main",
    "label": "protected main에 push",
    "requires": {
      "branchProtected": true,
      "allowedToPush": ["maintainer", "owner"]
    },
    "blockedMessage": "이 branch는 보호되어 있다. feature branch로 push하고 MR을 생성한다."
  }
]
```

`scenario.json`

```json
{
  "id": "ch05-protected-branch-push",
  "chapter": "ch05",
  "title": "Developer가 main에 직접 push하려 한다",
  "initialState": {
    "role": "developer",
    "branch": "main",
    "branchProtected": true,
    "pipelineStatus": "not_started"
  },
  "steps": [
    {
      "prompt": "다음 행동으로 가장 적절한 것은?",
      "choices": [
        {
          "label": "feature branch를 만들고 push한다",
          "result": "correct"
        },
        {
          "label": "Maintainer에게 main push 권한을 열어 달라고 한다",
          "result": "risky"
        }
      ]
    }
  ]
}
```

## 12. 배포 방식

현재 repo 기준:

1. repo root의 `public`에 정적 사이트를 둔다.
2. `.github/workflows/pages.yml`에서 해당 폴더를 artifact로 업로드한다.
3. GitHub repo Settings -> Pages -> Source를 `GitHub Actions`로 둔다.
4. `main`에 push하면 Pages가 배포된다.
5. 예상 URL은 `https://infant83.github.io/GitLab-Onboarding-Lectures/`다.

추후 GitHub Actions로 다음을 자동화한다.

- 링크 체크
- JSON schema 검증
- Playwright smoke test
- 챕터 페이지 screenshot 비교

## 13. MVP 범위

처음부터 8개 챕터 전체를 완성하려고 하면 늘어진다. 1차 MVP는 다음 3개가 좋다.

1. 홈 페이지
2. CH05 권한/MR 인터랙티브
3. CH08 capstone release board

이유:

- 사용자가 말한 role-based learning 요구와 가장 직접적으로 맞는다.
- 기존 자료 중 CH05/CH08이 GitLab 권한, MR, 승인, 역할 플레이북을 이미 담고 있다.
- 홈 + CH05 + CH08만 있어도 전체 방향을 데모할 수 있다.

2차:

- CH02 local workflow state machine
- CH04 branch strategy simulator
- CH06 conflict/review simulator

3차:

- CH01, CH03, CH07 보강
- 강사용 runbook
- 진행률 저장
- 퀴즈/수료 체크리스트

## 14. 공식 문서 기준으로 반영할 주의점

GitLab 역할과 권한은 버전과 tier에 따라 달라질 수 있으므로, 페이지 하단에 "기준 문서 확인일"을 남긴다.

현재 반영할 핵심 기준:

- GitLab 공식 문서 기준, `Guest`, `Reporter`, `Developer`, `Maintainer`, `Owner` 외에도 최신 GitLab에는 `Planner`, `Security Manager` 같은 역할이 존재한다. 이 강의의 기본 학습 축은 기존 협업 핵심 역할로 두되, 확장 역할은 운영 노트로 분리한다.
- `Developer`는 non-protected branch push, MR 생성, CI/CD pipeline 실행을 할 수 있지만 project setting 관리는 못 한다.
- `Maintainer`는 branch, MR, CI/CD setting, project members를 관리하지만 project 삭제는 Owner 영역이다.
- protected branch flow에서 기본적으로 protected branch merge는 Maintainer 역할이 맡는다.
- GitLab Free의 MR approval은 optional 성격이고, required approval rule/Code Owners는 Premium/Ultimate 기능으로 다뤄야 한다.

공식 참고:

- <https://docs.gitlab.com/user/permissions/>
- <https://docs.gitlab.com/user/project/merge_requests/authorization_for_merge_requests/>
- <https://docs.gitlab.com/user/project/merge_requests/approvals/>
- <https://docs.gitlab.com/user/project/repository/branches/protected/>

## 15. Audit Gate 강화

완성도를 높이려면 "만들고 보기"가 아니라 챕터마다 통과해야 하는 audit gate를 둔다.

### 15.1 Content Audit

검사 항목:

- GitLab 역할/권한 설명이 공식 문서와 맞는가
- Free/Premium/Ultimate 차이를 섞어 말하지 않았는가
- self-managed GitLab에서 달라질 수 있는 부분을 운영 노트로 분리했는가
- `Reviewer`를 access role처럼 설명하지 않았는가
- `Maintainer`, `Owner` 권한을 과도하게 단순화하지 않았는가

산출물:

- `audits/content-audit.md`
- 챕터별 `source_checked_at` 날짜
- 공식 문서 링크

### 15.2 Scenario Audit

검사 항목:

- 각 시나리오가 `role`, `state`, `action`, `result`, `next_action`을 가진다
- 허용/차단 결과가 일관된다
- 차단 결과가 나왔을 때 다음 행동이 구체적이다
- "권한을 올려 달라"가 기본 답이 되지 않는다
- 실습자가 위험한 명령을 따라 하지 않도록 경고가 있다

산출물:

- `audits/scenario-audit.md`
- JSON schema validation
- role/action snapshot table

### 15.3 Interaction Audit

검사 항목:

- 모든 버튼/토글/탭이 키보드로 조작된다
- role switcher가 상태를 실제로 바꾼다
- 모바일에서 텍스트가 겹치지 않는다
- 긴 한국어 버튼이 줄바꿈되어도 레이아웃이 깨지지 않는다
- canvas/SVG/diagram이 비어 보이지 않는다

산출물:

- Playwright desktop screenshot
- Playwright mobile screenshot
- console error log
- interaction smoke test 결과

### 15.4 Visual Audit

검사 항목:

- `infant83.github.io`의 색감, 여백, 선, 버튼 톤과 연결되어 보이는가
- GitLab 오렌지/보라색이 화면을 지배하지 않는가
- 카드가 중첩되어 답답해 보이지 않는가
- role/status 색이 의미를 잃지 않는가
- 교육용 UI가 포트폴리오 페이지처럼 느슨해지지 않는가

산출물:

- `audits/visual-audit.md`
- 주요 viewport screenshot
- color token diff

### 15.5 Editorial Audit

검사 항목:

- 번역체 표현을 제거했는가
- "AI가 쓴 설명문"처럼 추상적이고 매끈한 문장을 줄였는가
- 실제 강사가 말할 수 있는 한국어인가
- 버튼/패널 문구가 행동 중심인가
- "중요합니다", "제공합니다", "활용합니다" 같은 빈 동사를 반복하지 않는가
- GitLab 용어는 억지 번역하지 않고 자연스럽게 썼는가

권장 표현:

| 피할 표현 | 바꿀 표현 |
| --- | --- |
| 이 기능은 협업 효율성을 제공합니다 | 이 기능은 리뷰 전 변경 범위를 먼저 맞추게 해준다 |
| 사용자에게 다양한 옵션을 제공합니다 | 여기서는 merge, rebase 중 하나를 고른다 |
| 다음과 같은 액션을 수행합니다 | 다음 순서로 처리한다 |
| 권한 기반 워크플로우를 최적화합니다 | 누가 merge할 수 있고, 누가 막히는지 확인한다 |
| 변경 사항을 반영합니다 | 리뷰 코멘트를 고쳐 다시 push한다 |

산출물:

- `audits/editorial-audit.md`
- 금칙어/주의어 리스트
- 챕터별 최종 문체 점검 로그

## 16. 문체 기준

기본 문체는 한국어 `-습니다 / -합니다`를 쓰되, 웹 UI 문구는 짧고 행동 중심으로 쓴다.

강의 본문:

- "이 장에서는..."처럼 자연스럽게 시작한다.
- 긴 정의보다 "어떤 상황에서 막히는가"를 먼저 둔다.
- 한 문장에 개념을 두 개 이상 넣지 않는다.
- 영어 용어를 억지로 번역하지 않는다. `branch`, `MR`, `pipeline`, `runner`, `approval`, `protected branch`는 그대로 써도 된다.

UI 문구:

- `MR 만들기`
- `push가 막힌 이유 보기`
- `Maintainer로 다시 시도`
- `approval rule 켜기`
- `pipeline 실패 로그 열기`
- `rollback 판단하기`

피해야 할 톤:

- 과장된 홍보 문구
- AI 제품 소개서 같은 추상어
- 영문 직역 문장
- "학습자는 ~할 수 있습니다"가 반복되는 문장
- 기능 설명만 있고 다음 행동이 없는 문장

## 17. 다음 실행 제안

바로 구현한다면 순서는 다음이 좋다.

1. 현재 `GitLab-Onboarding-Lectures`에서 CH05/CH08 lecture note와 tutorial 자산을 읽어 `public/data/chapters.json`, `public/data/scenarios.json`으로 추출한다.
2. `public/index.html`, `public/assets/styles.css`, `public/assets/app.js`를 만든다.
3. 홈 + CH05 권한 콘솔 + CH08 release board를 먼저 구현한다.
4. `.github/workflows/pages.yml`을 추가한다.
5. GitHub repo Settings -> Pages에서 `GitHub Actions`를 선택한다.
6. 현재 repo에서 commit/push한다.
7. 실제 GitLab 테스트 프로젝트에서 Developer/Maintainer/Owner 권한별 화면을 확인해 시나리오 문구를 보정한다.

이렇게 가면 기존 강의 패키지는 보존되고, 같은 저장소 안의 `public/`이 "살아 있는 실습 지도"로 독립 운영될 수 있다.
