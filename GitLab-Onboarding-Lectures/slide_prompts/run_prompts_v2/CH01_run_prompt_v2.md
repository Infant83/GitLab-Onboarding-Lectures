# CH01 Skywork Run Prompt v2

이번 작업은 `GitLab-Onboarding-Lectures` 8챕터 시리즈 중 `CH01` 단독 프레젠테이션 생성이다.

실행 방식:
- 반드시 `파워포인트` 작업 타입으로 실행하라.
- 반드시 `전문` 모드로 실행하라.
- broad rewrite나 marketing tone을 피하고, 교육용 dense tutorial deck으로 작성하라.
- 심층 리서치는 lecture note에 빈틈이 있는 경우에만 최소 범위로 사용하라. lecture note를 대체하지 마라.

업로드된 파일은 아래 두 개뿐이라고 가정하라.
- `CH01-Course-Foundation-and-Operating-Model_lecture-note.md`
- `LGD_Template.pptx`

템플릿 규칙:
- `LGD_Template.pptx`를 최신 기준 템플릿으로 일관되게 적용하라.
- 템플릿이 일부 파싱되지 않더라도 흰 배경, 좌측 정렬, corporate information layout, grid 기반 정리, box / table / flow 중심 구조를 유지하라.
- 템플릿 이름이나 장식만 남는 cover를 만들지 마라.

source-of-truth 규칙:
- 반드시 `@CH01-Course-Foundation-and-Operating-Model_lecture-note.md`를 참조 파일로 걸어 사용하라.
- `CH01-Course-Foundation-and-Operating-Model_lecture-note.md`를 source of truth로 사용하라.
- lecture note에 있는 개념, 명령어, 역할 구분, 실습 흐름, 오해 방지 문장, 운영 시나리오를 우선 반영하라.
- lecture note에 없는 새로운 주제는 임의로 확장하지 마라.
- 다른 챕터와의 연결은 이번 챕터가 8시간 시리즈의 일부라는 정도로만 보강하고, 실제 내용은 현재 챕터 lecture note를 우선한다.

출력 규칙:
- 슬라이드는 한국어로 작성하라.
- 발표용이면서 동시에 교재처럼 읽히도록 텍스트, 표, 도식, 코드블록의 밀도를 충분히 유지하라.
- 실제 검수는 `pptx`보다 `pdf` rendered result를 우선 기준으로 본다. 따라서 PDF에서 제목, 표, 흐름도가 읽기 좋게 정리되도록 하라.
- 명령어는 monospace 계열로 표현하고, 단순 나열이 아니라 `언제 쓰는가 / 무엇을 확인하는가 / 자주 하는 실수` 중 최소 두 가지를 함께 보여라.
- 역할이 필요한 페이지에서는 `Owner / Maintainer / Developer`를 분리해서 보여라.
- self-managed와 SaaS 차이는 필요한 경우 명확히 구분하라.

Page 1 공통 규칙:
- Page 1은 반드시 `chapter cover + introduction`이다.
- 별도 표지 슬라이드는 만들지 않는다.
- Page 1에는 반드시 아래를 포함하라.
  - 챕터의 실제 학습 주제를 드러내는 제목
  - 대표 이미지 또는 핵심 시각 요소
  - `발표자: [발표자명]`
  - `발표부서: [발표부서]`
  - `발표일자: 2026-04-11`
  - 이번 장 preview topic 3~4개
- `왜 CHxx이 중요한가` 같은 메타 제목보다 실제 학습 내용을 드러내는 제목을 사용하라.

금지 규칙:
- 어떤 페이지에도 아래 같은 미완성 placeholder를 남기지 마라.
  - `페이지 제목`
  - `Page title`
  - `헤드라인 / Headline`
  - `비교 항목`만 단독 제목으로 남기는 경우
  - `명령어`만 단독 제목으로 남기는 경우
  - 단독 숫자 `1` 같은 미완성 제목
  - 템플릿 이름만 보이는 cover
- 표의 column header는 써도 되지만, 슬라이드 메인 제목이 generic header가 되면 안 된다.
- 텍스트가 부족해 보이는 sparse layout을 만들지 마라.
- lecture note와 다른 파일명, 브랜치명, 명령어를 임의로 만들지 마라.

우선순위:
1. lecture note의 정확한 개념 / 명령어 / 자산명 / 역할 관계
2. 슬라이드 제목과 중심 메시지의 명확성
3. 정보 밀도와 교육 전달력
4. 챕터 간 연속성
5. 시각적 완성도

아래 page-level guide를 그대로 따라 실제 강의 슬라이드를 작성하라.

# CH01 Page-Level Prompt

이 문서는 `CH01-Course-Foundation-and-Operating-Model_lecture-note.md`를 source of truth로 사용하는 CH01 전용 page prompt다.

## 챕터 개요

- 챕터명: `Course Foundation and Operating Model`
- 권장 분량: `12 pages`
- 목적: 뒤 7개 장을 이해하기 위한 기준 좌표를 잡는다.
- 핵심 축:
  - Git vs GitLab
  - 로컬 vs 원격
  - 권한 vs 책임
  - CI/CD vs MLOps 구분
  - on-prem GitLab 차이
  - 시작 전 진단 습관
- 주요 자산:
  - `tutorial-collaboration-lab`
  - `README.md`
  - `src/permissions.js`
  - `src/app.js`
  - `docs/process.md`
  - `tests/permissions.test.js`

## CH01 고유 규칙

- Page 1은 cover + introduction으로 구성한다.
- CH01의 역할은 “코스 메타 소개”가 아니라 “Git과 GitLab 협업의 기준 좌표 소개”다.
- Git의 4공간 모델은 반드시 시각화한다.
- `origin`, `main`, `HEAD`, `repository`, `working tree`, `staging area`는 정확히 구분한다.
- `commit = GitLab 반영` 같은 오해를 분명히 깨는 문장을 넣는다.
- CI/CD와 MLOps는 한 페이지에서 구분하되, 코스 scope를 넘는 장황한 설명은 피한다.
- self-managed 차이는 개념 소개 수준으로 넣고, 세부 runner/Pages/webhook은 CH07로 넘긴다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `Git과 GitLab 협업의 기준 좌표`
- 페이지 목적: 챕터 커버와 학습 진입점 제공
- 핵심 takeaway: 이번 장은 Git 명령을 치기 전에 협업 좌표를 맞추는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 협업/버전관리 상징 시각 요소
  - 발표자명 placeholder
  - 발표부서 placeholder
  - 발표일자
  - preview topic 4개
    - Git과 GitLab의 차이
    - 4공간 모델
    - 역할과 권한
    - 환경 점검과 clone 준비
- 시각화 방식: cover hero image + 우측 preview topic + 하단 CH01 강조 미니맵
- 정보 밀도 가이드: cover라도 비어 보이지 않게 preview 4개와 발표 정보 line을 넣는다.
- 발표자 보강 포인트: “명령어를 배우기 전에 좌표를 맞추지 않으면 뒤 장이 모두 암기형이 된다”를 설명한다.
- 실습 / 토론 cue: `commit하면 GitLab에도 반영된다고 생각한 적이 있는가?`
- 다음 페이지 연결: `먼저 8시간 전체 흐름 안에서 CH01의 위치를 잡는다.`

### Page 2
- 슬라이드 제목: `CH01은 8시간 전체 흐름에서 어디를 담당하는가`
- 페이지 목적: CH01과 CH02~CH08의 관계를 보여 준다.
- 핵심 takeaway: CH01은 뒤 장의 명령어, MR, rollback, pipeline 해석을 가능하게 하는 기준점이다.
- 반드시 포함할 내용:
  - CH01~CH08 roadmap
  - CH02 상태 변화
  - CH03 진단/복구
  - CH04 branch 전략
  - CH05 권한/MR/approval
  - CH06 conflict/rollback lab
  - CH07 CI/CD, self-managed, MLOps 확장
  - CH08 capstone
- 시각화 방식: horizontal roadmap 또는 8-step timeline
- 정보 밀도 가이드: 각 챕터는 한 줄 설명으로 끝내지 말고 역할을 한 문장씩 준다.
- 발표자 보강 포인트: CH01이 약하면 나머지 장이 “툴 사용법 모음집”처럼 느껴진다는 점을 말한다.
- 실습 / 토론 cue: `뒤 장에서 가장 막힐 것 같은 주제는 무엇인가?`
- 다음 페이지 연결: `이제 Git과 GitLab을 같은 것으로 오해하지 않도록 역할을 나눈다.`

### Page 3
- 슬라이드 제목: `Git과 GitLab, 그리고 CI/CD와 MLOps를 구분하기`
- 페이지 목적: 도구와 운영 레이어를 분리해 이해시킨다.
- 핵심 takeaway: Git은 이력 관리 도구이고, GitLab은 협업 운영 레이어이며, CI/CD와 MLOps는 그 위의 자동화 범위가 다르다.
- 반드시 포함할 내용:
  - Git이 관리하는 대상
  - GitLab이 추가하는 대상
  - CI/CD의 범위
  - MLOps의 범위
  - 이 코스가 어디까지 다루는지
- 시각화 방식: 2단 비교 + 하단 CI/CD vs MLOps boundary box
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: CH07~CH08에서만 MLOps를 확장한다는 범위 통제를 분명히 한다.
- 실습 / 토론 cue: `코드 rollback과 모델 rollback은 왜 다를까?`
- 다음 페이지 연결: `이제 Git 안에서 상태가 어떻게 이동하는지 4공간 모델로 본다.`

### Page 4
- 슬라이드 제목: `Working Tree -> Staging -> Local Repo -> Remote`
- 페이지 목적: Git 4공간 상태 전이 모델을 고정한다.
- 핵심 takeaway: `add`, `commit`, `push`, `fetch/pull`은 서로 다른 공간을 움직인다.
- 반드시 포함할 내용:
  - working tree
  - staging area
  - local repository
  - remote repository `origin`
  - `add`, `commit`, `push`, `fetch`, `pull`의 화살표 관계
  - 초보자 오해 3개
- 시각화 방식: lecture note의 ASCII 그림을 SmartArt 또는 box flow로 재구성
- 정보 밀도 가이드: 박스 4개 + 화살표 라벨 + 오해 방지 callout 3개
- 발표자 보강 포인트: `add`가 저장이 아니고 `commit`이 원격 반영이 아니라는 점을 반복한다.
- 실습 / 토론 cue: `현재 작업 중인 코드는 네 공간 중 어디에 있는가?`
- 다음 페이지 연결: `이제 저장소에서 자주 나오는 이름들을 정확히 정의한다.`

### Page 5
- 슬라이드 제목: `repository, origin, main, HEAD를 정확히 구분하기`
- 페이지 목적: 기본 용어를 정확히 정리한다.
- 핵심 takeaway: `origin`은 remote 별칭이고, `main`은 브랜치명이며, `HEAD`는 현재 가리키는 참조다.
- 반드시 포함할 내용:
  - repository
  - origin
  - main
  - HEAD
  - 기본 브랜치명을 상수처럼 가정하면 안 되는 이유
  - detached HEAD 예고
- 시각화 방식: 용어 정의 표 + pointer diagram
- 정보 밀도 가이드: 용어별 정의, 흔한 오해, 확인 명령을 같이 넣는다.
- 발표자 보강 포인트: 사내 저장소에서는 `main`이 아닐 수 있다는 점을 분명히 한다.
- 실습 / 토론 cue: `origin/HEAD -> origin/main`은 왜 보는가?`
- 다음 페이지 연결: `이제 같은 저장소를 역할별로 다르게 보는 이유를 본다.`

### Page 6
- 슬라이드 제목: `Owner / Maintainer / Developer는 같은 저장소를 어떻게 다르게 보는가`
- 페이지 목적: 역할과 책임을 분리한다.
- 핵심 takeaway: 권한 차이는 숙련도보다 승인, 운영 책임, 위험 관리 기준으로 이해해야 한다.
- 반드시 포함할 내용:
  - Owner 시선
  - Maintainer 시선
  - Developer 시선
  - Guest의 제한적 역할
  - direct push, merge, approval, rollback 승인 관점
- 시각화 방식: role matrix
- 정보 밀도 가이드: 역할별로 “주요 질문”, “주요 행동”, “피해야 할 판단”을 넣는다.
- 발표자 보강 포인트: “실력 있으니 main에 push하게 하자”는 논리가 왜 위험한지 설명한다.
- 실습 / 토론 cue: `merge 권한과 개발 숙련도는 같은 문제인가?`
- 다음 페이지 연결: `이 역할 구분은 shared repository와 fork 모델 이해로 이어진다.`

### Page 7
- 슬라이드 제목: `shared repository와 fork, 그리고 사내 운영 기본 모델`
- 페이지 목적: 협업 운영 모델을 정리한다.
- 핵심 takeaway: 사내 교육의 기본은 shared repository 모델이고, fork는 제한적 예외 모델이다.
- 반드시 포함할 내용:
  - shared repository 정의
  - fork 모델 정의
  - 사내 환경에서 fork가 제한될 수 있는 이유
  - feature branch + MR 흐름 예고
- 시각화 방식: 2열 운영 모델 비교
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: 오픈소스형 fork 경험을 사내 기본 운영 모델로 일반화하지 않도록 설명한다.
- 실습 / 토론 cue: `우리 조직에서 fork를 허용하면 어떤 통제 문제가 생길 수 있는가?`
- 다음 페이지 연결: `이제 self-managed GitLab을 쓸 때 GitLab.com과 달라지는 지점을 본다.`

### Page 8
- 슬라이드 제목: `On-prem GitLab을 쓸 때 무엇이 달라지는가`
- 페이지 목적: self-managed 차이를 개념적으로 소개한다.
- 핵심 takeaway: Git 원리는 같지만 runner, 인증, network, version, policy는 self-managed에서 더 많이 고려해야 한다.
- 반드시 포함할 내용:
  - 인증 방식 차이
  - runner 운영 차이
  - 내부 proxy / certificate / registry 가능성
  - 버전 / tier 차이
  - 후반부에서 자세히 다룰 주제 표시
- 시각화 방식: Git 공통 원리 vs on-prem 운영 변수 2단 표
- 정보 밀도 가이드: self-managed 변수를 5개 이상 명시
- 발표자 보강 포인트: GitLab.com 튜토리얼과 사내 환경이 완전히 같지 않다는 점을 미리 깔아 둔다.
- 실습 / 토론 cue: `우리 환경에서 가장 먼저 확인해야 할 self-managed 변수는 무엇인가?`
- 다음 페이지 연결: `이제 실제로 수업 시작 전에 반드시 보는 기본 명령 세트를 정리한다.`

### Page 9
- 슬라이드 제목: `수업 전체에서 반복해서 쓰는 기본 확인 명령`
- 페이지 목적: 진단 루틴을 고정한다.
- 핵심 takeaway: 명령 실행 전후에는 항상 브랜치, upstream, remote, 최근 이력을 함께 확인한다.
- 반드시 포함할 내용:
  - `git status`
  - `git branch -vv`
  - `git remote -v`
  - `git rev-parse --abbrev-ref HEAD`
  - `git symbolic-ref refs/remotes/origin/HEAD`
  - `git log --oneline --decorate -n 5`
  - 각 명령이 답하는 질문
- 시각화 방식: command-to-question table
- 정보 밀도 가이드: 명령 6개 + 질문 6개
- 발표자 보강 포인트: `status`만 보고 판단하지 않는 습관을 반복한다.
- 실습 / 토론 cue: `왜 브랜치와 upstream을 같이 봐야 하는가?`
- 다음 페이지 연결: `이제 실습 전에 환경과 인증을 점검한다.`

### Page 10
- 슬라이드 제목: `환경 점검과 clone 전 확인 포인트`
- 페이지 목적: Git 설치, 계정, 인증, 브랜치 기본값을 점검한다.
- 핵심 takeaway: clone 전에 Git 작성자 정보와 인증 방식을 확인해야 이후 오류 해석이 쉬워진다.
- 반드시 포함할 내용:
  - `git --version`
  - `git config --global user.name`
  - `git config --global user.email`
  - SSH / HTTPS / SSO / PAT 점검
  - 기본 브랜치명 가정 금지
- 시각화 방식: pre-flight checklist + short code block
- 정보 밀도 가이드: 체크 항목 5개 이상
- 발표자 보강 포인트: 인증 문제가 명령어 오타처럼 보이는 경우가 많다는 점을 강조한다.
- 실습 / 토론 cue: `clone 전에 확인해야 할 항목 세 가지를 말해 보라.`
- 다음 페이지 연결: `이제 clone 후 어떤 순서로 상태를 읽어야 하는지 본다.`

### Page 11
- 슬라이드 제목: `clone 직후 무엇을 확인해야 하는가`
- 페이지 목적: clone 후 상태 해석과 GitLab UI 점검을 묶어서 보여 준다.
- 핵심 takeaway: clone은 끝이 아니라 시작이며, 로컬 상태와 GitLab 권한/정책을 함께 확인해야 한다.
- 반드시 포함할 내용:
  - `git clone <repo-url>`
  - `git status`
  - `git branch -vv`
  - `git remote -v`
  - GitLab UI에서 역할, protected branch, approval rule, direct push 여부 확인
  - `clone 직후 바로 pull하지 않는 이유`
- 시각화 방식: 좌측 terminal flow + 우측 UI policy checklist
- 정보 밀도 가이드: 터미널 단계 4개, UI 정책 체크 4개 이상
- 발표자 보강 포인트: `push 가능`과 `main 반영 가능`이 다른 문제라는 점을 분명히 한다.
- 실습 / 토론 cue: `clone 후 바로 pull하지 않는 이유는 무엇인가?`
- 다음 페이지 연결: `마지막으로 이 장에서 생기는 대표 오해와 실패 사례를 정리한다.`

### Page 12
- 슬라이드 제목: `CH01 요약: 좌표를 맞춰야 뒤 장이 풀린다`
- 페이지 목적: 핵심 개념을 정리하고 CH02로 넘긴다.
- 핵심 takeaway: CH01이 끝나면 로컬/원격/권한/기본 진단 루틴을 설명할 수 있어야 한다.
- 반드시 포함할 내용:
  - Git vs GitLab
  - 4공간 모델
  - origin / main / HEAD
  - 역할별 관점
  - on-prem 차이
  - CH02 handoff: `clone -> add -> commit -> push`
- 시각화 방식: toolbox 또는 summary grid
- 정보 밀도 가이드: 핵심 포인트 5개 이상 + 다음 장 handoff 2개
- 발표자 보강 포인트: CH02에서는 실제로 상태를 바꾸며 배운다는 점을 예고한다.
- 실습 / 토론 cue: `지금 바로 설명할 수 있는 용어와 아직 헷갈리는 용어를 구분해 보라.`
- 다음 페이지 연결: `다음 장에서는 실제 파일을 수정하며 상태 변화를 눈으로 확인한다.`
