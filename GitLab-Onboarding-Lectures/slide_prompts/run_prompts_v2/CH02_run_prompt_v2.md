# CH02 Skywork Run Prompt v2

이번 작업은 `GitLab-Onboarding-Lectures` 8챕터 시리즈 중 `CH02` 단독 프레젠테이션 생성이다.

실행 방식:
- 반드시 `파워포인트` 작업 타입으로 실행하라.
- 반드시 `전문` 모드로 실행하라.
- broad rewrite나 marketing tone을 피하고, 교육용 dense tutorial deck으로 작성하라.
- 심층 리서치는 lecture note에 빈틈이 있는 경우에만 최소 범위로 사용하라. lecture note를 대체하지 마라.

업로드된 파일은 아래 두 개뿐이라고 가정하라.
- `CH02-Local-Workflow-and-Core-Commands_lecture-note.md`
- `LGD_Template.pptx`

템플릿 규칙:
- `LGD_Template.pptx`를 최신 기준 템플릿으로 일관되게 적용하라.
- 템플릿이 일부 파싱되지 않더라도 흰 배경, 좌측 정렬, corporate information layout, grid 기반 정리, box / table / flow 중심 구조를 유지하라.
- 템플릿 이름이나 장식만 남는 cover를 만들지 마라.

source-of-truth 규칙:
- 반드시 `@CH02-Local-Workflow-and-Core-Commands_lecture-note.md`를 참조 파일로 걸어 사용하라.
- `CH02-Local-Workflow-and-Core-Commands_lecture-note.md`를 source of truth로 사용하라.
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

# CH02 Page-Level Prompt

이 문서는 `CH02-Local-Workflow-and-Core-Commands_lecture-note.md`를 source of truth로 사용하는 CH02 전용 page prompt다.

## 챕터 개요

- 챕터명: `Local Workflow and Core Commands`
- 권장 분량: `13 pages`
- 목적: working tree에서 remote까지 가는 기본 작업 루프를 실습 중심으로 익힌다.
- 핵심 축:
  - `status`, `branch -vv`, `remote -v`
  - `add`, `restore --staged`
  - `commit`
  - `push`
  - `fetch` vs `pull`
  - pre-push verification
  - common failure cases
- 주요 자산:
  - `notes.txt`
  - `docs/tutorial-guide.md`
  - `src/app.js`
  - `src/app.txt`
  - `src/permissions.js`

## CH02 고유 규칙

- 상태 변화가 핵심이므로 working tree -> staging -> local -> remote 흐름을 여러 페이지에서 반복한다.
- `pull`을 초보자의 자동 최신화 명령처럼 가르치지 않는다.
- commit message보다 commit scope가 먼저라는 점도 함께 강조한다.
- 실습 페이지는 코드 블록, 결과 확인, 실패 시그널을 같이 넣는다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `Git 로컬 작업 루프와 핵심 명령`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 실제 파일을 수정하며 상태 변화와 핵심 명령의 의미를 연결하는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 시각 요소
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - 상태 변화 흐름
    - add와 commit의 차이
    - push 전 검증
    - fetch / pull / 복구
- 시각화 방식: cover hero + preview + CH02 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보는 반드시 채운다.
- 발표자 보강 포인트: CH01의 좌표가 이번 장에서 실제 명령어로 연결된다는 점을 강조한다.
- 실습 / 토론 cue: `가장 자주 쓰지만 가장 자주 오해하는 명령은 무엇인가?`
- 다음 페이지 연결: `먼저 전체 상태 변화 루프를 한눈에 본다.`

### Page 2
- 슬라이드 제목: `working tree에서 remote까지 상태가 어떻게 이동하는가`
- 페이지 목적: CH02 전체 실습의 상태 변화 spine을 보여 준다.
- 핵심 takeaway: 각 명령은 서로 다른 저장 공간을 이동시키며, 잘못 쓰면 다른 문제를 만든다.
- 반드시 포함할 내용:
  - working tree
  - staging area
  - local commit history
  - remote branch
  - `add`, `commit`, `push`, `fetch`, `pull`
- 시각화 방식: 4단 box flow
- 정보 밀도 가이드: 화살표에 명령어를 명확히 표시한다.
- 발표자 보강 포인트: CH01의 4공간 모델이 이번 장에서는 실제 동작 모델이 된다고 설명한다.
- 실습 / 토론 cue: `push가 실패해도 commit은 남는 이유는 무엇인가?`
- 다음 페이지 연결: `이제 가장 자주 쓰는 기본 상태 확인 명령부터 본다.`

### Page 3
- 슬라이드 제목: `status, branch -vv, remote -v로 현재 위치 읽기`
- 페이지 목적: 기본 진단 루틴을 실습 중심으로 정리한다.
- 핵심 takeaway: 파일을 수정하기 전후에는 현재 브랜치, upstream, remote를 함께 본다.
- 반드시 포함할 내용:
  - `git status`
  - `git branch -vv`
  - `git remote -v`
  - 각 명령이 보여 주는 정보
  - CH01과의 연결
- 시각화 방식: 3열 비교표
- 정보 밀도 가이드: 명령별 “무엇을 확인하는가”를 한 줄씩 붙인다.
- 발표자 보강 포인트: status만 보고 판단하는 습관을 교정한다.
- 실습 / 토론 cue: `branch -vv를 보지 않으면 놓치는 정보는 무엇인가?`
- 다음 페이지 연결: `이제 add가 무엇을 바꾸는지 본다.`

### Page 4
- 슬라이드 제목: `add는 저장이 아니라 staging이다`
- 페이지 목적: `add`와 staging 개념을 고정한다.
- 핵심 takeaway: `add`는 working tree 변경을 commit 후보로 올리는 단계다.
- 반드시 포함할 내용:
  - `git add <file>`
  - staging의 의미
  - 잘못 add했을 때의 위험
  - `restore --staged` 예고
- 시각화 방식: working tree -> staging 강조 다이어그램
- 정보 밀도 가이드: add의 목적, 기대 결과, 흔한 오해를 같이 넣는다.
- 발표자 보강 포인트: `add = 저장` 오해를 다시 한번 깨 준다.
- 실습 / 토론 cue: `파일 일부만 add하고 싶은 상황은 언제 생기는가?`
- 다음 페이지 연결: `잘못 올린 파일을 staging에서 어떻게 되돌리는지 본다.`

### Page 5
- 슬라이드 제목: `잘못 add했을 때 restore --staged로 되돌리기`
- 페이지 목적: staging 복구를 가르친다.
- 핵심 takeaway: commit 전 실수는 비교적 싸게 되돌릴 수 있다.
- 반드시 포함할 내용:
  - `git restore --staged <file>`
  - 잘못 add된 파일 판별
  - working tree는 남고 staging만 바뀌는 점
  - 실습 연결
- 시각화 방식: before/after state table
- 정보 밀도 가이드: 상태 변화가 명확히 보여야 한다.
- 발표자 보강 포인트: 복구 비용이 낮은 시점은 commit 전이라는 점을 설명한다.
- 실습 / 토론 cue: `restore --staged 후 파일 내용은 어디에 남아 있는가?`
- 다음 페이지 연결: `이제 commit으로 로컬 이력을 만든다.`

### Page 6
- 슬라이드 제목: `좋은 commit은 메시지보다 범위가 먼저다`
- 페이지 목적: commit의 의미와 품질 기준을 정리한다.
- 핵심 takeaway: 좋은 commit은 나중에 review, revert, bisect를 쉽게 만든다.
- 반드시 포함할 내용:
  - `git commit -m "..."`
  - 좋은 commit 범위
  - 좋은 메시지 기준
  - 나쁜 commit 예시
- 시각화 방식: good vs bad commit comparison
- 정보 밀도 가이드: scope, message, traceability 3축으로 설명한다.
- 발표자 보강 포인트: CH03의 복구 품질이 CH02의 commit 품질에 달려 있다는 점을 연결한다.
- 실습 / 토론 cue: `좋은 메시지인데 나쁜 commit인 경우는 어떤 경우인가?`
- 다음 페이지 연결: `commit 후에는 바로 push하지 말고 검증 루틴을 거친다.`

### Page 7
- 슬라이드 제목: `push 전 검증 루틴`
- 페이지 목적: pre-push 습관을 고정한다.
- 핵심 takeaway: push 전에 상태, diff, 이력, 대상 브랜치를 다시 확인해야 불필요한 사고를 줄일 수 있다.
- 반드시 포함할 내용:
  - `git status`
  - `git diff --staged`
  - `git log --oneline --decorate -n 3`
  - 대상 브랜치 확인
  - push 전 스스로에게 묻는 질문
- 시각화 방식: pre-push checklist + short command block
- 정보 밀도 가이드: 체크리스트 5개 이상
- 발표자 보강 포인트: 급할수록 push 전 검증 루틴이 더 중요하다고 설명한다.
- 실습 / 토론 cue: `push 전에 마지막으로 꼭 보는 정보는 무엇인가?`
- 다음 페이지 연결: `이제 remote와 동기화할 때 fetch와 pull을 어떻게 구분하는지 본다.`

### Page 8
- 슬라이드 제목: `fetch와 pull은 왜 다르게 가르쳐야 하는가`
- 페이지 목적: safe sync 모델을 정리한다.
- 핵심 takeaway: `fetch`는 관찰, `pull`은 상태 변화 가능성이 있는 동기화다.
- 반드시 포함할 내용:
  - `git fetch origin`
  - `git pull`
  - `fetch -> 상태 확인 -> merge/rebase 판단` 기본 모델
  - 자동 merge 위험
- 시각화 방식: 2단 decision flow
- 정보 밀도 가이드: fetch와 pull의 차이를 최소 4개 항목으로 비교한다.
- 발표자 보강 포인트: 초보자에게 pull을 기본 최신화 명령으로 가르치지 않는 이유를 말한다.
- 실습 / 토론 cue: `pull 전에 먼저 확인해야 하는 것은 무엇인가?`
- 다음 페이지 연결: `실습 흐름을 한 번에 정리하고 대표 오류로 넘어간다.`

### Page 9
- 슬라이드 제목: `first commit cycle 실습 흐름`
- 페이지 목적: CH02 실습의 대표 흐름을 한 페이지에 정리한다.
- 핵심 takeaway: 파일 수정 -> add -> commit -> 검증 -> push의 반복 루프가 CH02 핵심이다.
- 반드시 포함할 내용:
  - `notes.txt`, `docs/tutorial-guide.md` 추가
  - `git add`
  - `git commit`
  - `git push -u origin <branch>`
  - 결과 확인 포인트
- 시각화 방식: numbered lab flow
- 정보 밀도 가이드: 단계 5~6개
- 발표자 보강 포인트: 각 단계에서 어디를 봐야 하는지 짚어 준다.
- 실습 / 토론 cue: `어느 단계에서 가장 실수가 많이 발생하는가?`
- 다음 페이지 연결: `이제 대표 실패 시나리오를 본다.`

### Page 10
- 슬라이드 제목: `failure scenario: non-fast-forward`
- 페이지 목적: remote가 앞서 있을 때의 대응을 설명한다.
- 핵심 takeaway: non-fast-forward는 보통 원격 이력이 앞서 있다는 신호이며, 먼저 fetch로 상태를 읽어야 한다.
- 반드시 포함할 내용:
  - 발생 상황
  - 에러 의미
  - `git fetch origin`
  - 비교 후 merge/rebase 판단
  - force push를 기본 해법으로 제시하지 않기
- 시각화 방식: symptom / cause / first action table
- 정보 밀도 가이드: 오류 메시지 의미와 대응 순서를 같이 보여 준다.
- 발표자 보강 포인트: force push를 초보자 기본 행동처럼 가르치지 않는다.
- 실습 / 토론 cue: `non-fast-forward가 났을 때 첫 명령은 무엇인가?`
- 다음 페이지 연결: `로컬 수정이 남아 있을 때 덮어쓰기 경고가 나는 경우를 본다.`

### Page 11
- 슬라이드 제목: `failure scenario: local changes would be overwritten`
- 페이지 목적: local change 보호와 stash/commit 판단을 가르친다.
- 핵심 takeaway: 내 작업이 아직 보존되지 않았는데 pull/checkout으로 덮어쓰려 하면 Git이 막아 준다.
- 반드시 포함할 내용:
  - 대표 에러 상황
  - commit, stash, branch 중 선택 기준
  - `git stash push -m`
  - `git commit`
  - 임시 회피보다 작업 보존이 먼저라는 원칙
- 시각화 방식: decision matrix
- 정보 밀도 가이드: 최소 4개 상황 비교
- 발표자 보강 포인트: 덮어쓰기 경고를 “귀찮은 오류”가 아니라 “안전장치”로 설명한다.
- 실습 / 토론 cue: `지금 commit, stash, branch 중 어느 것이 맞는지 어떻게 판단하는가?`
- 다음 페이지 연결: `잘못된 브랜치에 push하거나 커밋 범위가 나쁜 경우도 본다.`

### Page 12
- 슬라이드 제목: `failure scenario: 잘못된 브랜치에 push하거나 커밋 범위가 나쁠 때`
- 페이지 목적: 실무에서 자주 생기는 두 가지 사고를 같이 다룬다.
- 핵심 takeaway: 브랜치와 커밋 범위 문제는 나중에 MR, revert, bisect 비용으로 되돌아온다.
- 반드시 포함할 내용:
  - wrong branch push 사례
  - commit 범위가 과도한 사례
  - push 전 브랜치/대상 확인 습관
  - commit 분해 원칙
- 시각화 방식: 2-case comparison
- 정보 밀도 가이드: 사례별 원인, 신호, 예방 습관을 명확히 넣는다.
- 발표자 보강 포인트: `메시지는 좋아도 커밋 범위가 나쁘면 복구 비용이 커진다`를 다시 강조한다.
- 실습 / 토론 cue: `잘못된 브랜치에 push한 것을 가장 빨리 알아차리는 방법은 무엇인가?`
- 다음 페이지 연결: `마지막으로 CH02의 핵심 루프를 정리하고 CH03으로 넘긴다.`

### Page 13
- 슬라이드 제목: `CH02 요약: 상태를 읽고, 작게 쌓고, 검증 후 보낸다`
- 페이지 목적: CH02 핵심 루프 요약과 CH03 handoff
- 핵심 takeaway: 좋은 로컬 작업 습관은 이후 history 읽기와 recovery를 쉽게 만든다.
- 반드시 포함할 내용:
  - 상태 읽기
  - add / restore
  - commit scope
  - pre-push verification
  - fetch vs pull
  - CH03 handoff: `log`, `show`, `revert`, `stash`
- 시각화 방식: checklist + toolbox summary
- 정보 밀도 가이드: 핵심 포인트 5개 이상
- 발표자 보강 포인트: CH03은 이미 만든 이력을 읽는 장이라는 점을 연결한다.
- 실습 / 토론 cue: `지금 내 루틴에서 가장 부족한 단계는 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 이미 쌓인 이력을 읽고 복구하는 법을 다룬다.`
