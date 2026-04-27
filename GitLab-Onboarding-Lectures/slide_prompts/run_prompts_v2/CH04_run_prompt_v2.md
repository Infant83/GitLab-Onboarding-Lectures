# CH04 Skywork Run Prompt v2

이번 작업은 `GitLab-Onboarding-Lectures` 8챕터 시리즈 중 `CH04` 단독 프레젠테이션 생성이다.

실행 방식:
- 반드시 `파워포인트` 작업 타입으로 실행하라.
- 반드시 `전문` 모드로 실행하라.
- broad rewrite나 marketing tone을 피하고, 교육용 dense tutorial deck으로 작성하라.
- 심층 리서치는 lecture note에 빈틈이 있는 경우에만 최소 범위로 사용하라. lecture note를 대체하지 마라.

업로드된 파일은 아래 두 개뿐이라고 가정하라.
- `CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md`
- `LGD_Template.pptx`

템플릿 규칙:
- `LGD_Template.pptx`를 최신 기준 템플릿으로 일관되게 적용하라.
- 템플릿이 일부 파싱되지 않더라도 흰 배경, 좌측 정렬, corporate information layout, grid 기반 정리, box / table / flow 중심 구조를 유지하라.
- 템플릿 이름이나 장식만 남는 cover를 만들지 마라.

source-of-truth 규칙:
- 반드시 `@CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md`를 참조 파일로 걸어 사용하라.
- `CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md`를 source of truth로 사용하라.
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

# CH04 Page-Level Prompt

이 문서는 `CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md`를 source of truth로 사용하는 CH04 전용 page prompt다.

## 챕터 개요

- 챕터명: `Branch Strategy and Sync Decisions`
- 권장 분량: `13 pages`
- 목적: 여러 사람이 동시에 작업할 때 branch와 sync 전략을 결정할 수 있게 한다.
- 핵심 축:
  - branch 이해
  - `switch` vs `checkout`
  - tracking branch
  - shared repository vs fork
  - merge vs rebase
  - branch naming / 수명 관리
  - decision matrix
- 주요 자산:
  - `src/feature-flags.json`
  - `src/permissions.js`
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`

## CH04 고유 규칙

- merge와 rebase는 명령 설명보다 운영 판단으로 다뤄야 한다.
- `switch`와 `checkout`은 “새 명령 vs 구 명령” 수준이 아니라 역할 분리 관점으로 설명한다.
- fork는 오픈소스 친화 모델, shared repository는 사내 기본 모델로 정리한다.
- decision matrix는 꼭 넣고, 오래된 feature branch와 rebase 후 push 문제를 별도로 다룬다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `브랜치 전략과 동기화 판단의 기준`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 동시에 일할 때 덜 꼬이게 만드는 branch 운영 규칙을 다룬다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 branch/network visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - branch lifecycle
    - tracking branch
    - merge vs rebase
    - shared repo vs fork
- 시각화 방식: cover hero + preview + CH04 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보 필수
- 발표자 보강 포인트: CH03이 문제 후 복구였다면 CH04는 애초에 덜 꼬이게 설계하는 장이라고 연결한다.
- 실습 / 토론 cue: `branch 전략이 없으면 어떤 비용이 생기는가?`
- 다음 페이지 연결: `먼저 branch를 어떻게 이해해야 하는지부터 정리한다.`

### Page 2
- 슬라이드 제목: `브랜치는 이름표가 아니라 협업 단위다`
- 페이지 목적: branch의 본질을 설명
- 핵심 takeaway: branch는 작업을 분리하고, review와 merge 단위를 만드는 협업 단위다.
- 반드시 포함할 내용:
  - branch가 필요한 이유
  - main을 바로 수정하지 않는 이유
  - branch와 MR의 관계
  - 작은 작업 단위 분리
- 시각화 방식: main + feature branch conceptual diagram
- 정보 밀도 가이드: branch 필요성 4개 이상
- 발표자 보강 포인트: branch를 “마음 편한 개인 공간”이 아니라 협업 운영 단위로 설명한다.
- 실습 / 토론 cue: `branch를 너무 오래 살려 두면 어떤 문제가 생기는가?`
- 다음 페이지 연결: `이제 switch와 checkout을 역할 기준으로 구분한다.`

### Page 3
- 슬라이드 제목: `switch와 checkout을 어떻게 구분해서 쓸까`
- 페이지 목적: 두 명령의 역할 차이 설명
- 핵심 takeaway: branch 이동/생성은 `switch` 중심으로, 과거 commit 조사 등 넓은 기능은 `checkout`이 남아 있다.
- 반드시 포함할 내용:
  - `git switch <branch>`
  - `git switch -c <new-branch>`
  - `git checkout <sha>`
  - detached HEAD와의 연결
- 시각화 방식: command role comparison
- 정보 밀도 가이드: 명령, 목적, 위험 포인트를 같이 넣는다.
- 발표자 보강 포인트: `checkout` 하나에 너무 많은 의미를 몰아 넣지 않도록 설명한다.
- 실습 / 토론 cue: `branch 이동은 switch, commit 조사는 checkout으로 나누는 이유는 무엇인가?`
- 다음 페이지 연결: `이제 tracking branch를 이해해 원격과의 연결을 본다.`

### Page 4
- 슬라이드 제목: `tracking branch와 upstream을 읽는 법`
- 페이지 목적: 로컬 branch와 원격 branch 관계 설명
- 핵심 takeaway: 현재 branch가 어느 upstream을 추적하는지 알아야 sync 판단이 가능하다.
- 반드시 포함할 내용:
  - `git branch -vv`
  - upstream 의미
  - ahead / behind 상태
  - 새 branch와 origin 연결
- 시각화 방식: local branch <-> remote branch mapping table
- 정보 밀도 가이드: ahead, behind, tracking 상태를 예시로 보여 준다.
- 발표자 보강 포인트: CH02의 상태 확인 루틴이 CH04에서는 branch 관계 해석으로 확장된다고 설명한다.
- 실습 / 토론 cue: `tracking branch를 모르면 왜 push/pull 판단이 흔들리는가?`
- 다음 페이지 연결: `이제 shared repository와 fork 모델을 운영 관점에서 비교한다.`

### Page 5
- 슬라이드 제목: `shared repository와 fork를 언제 쓰는가`
- 페이지 목적: 협업 모델 비교
- 핵심 takeaway: 사내 환경 기본은 shared repository이고, fork는 외부 기여나 격리 목적에서 제한적으로 쓴다.
- 반드시 포함할 내용:
  - shared repository 모델
  - fork 모델
  - 사내 보안/운영 관점 차이
  - review와 권한 측면 차이
- 시각화 방식: 2열 모델 비교표
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: 오픈소스 경험을 사내 운영 기본값으로 일반화하지 않도록 설명한다.
- 실습 / 토론 cue: `우리 환경에서 fork가 제한될 수 있는 이유는 무엇인가?`
- 다음 페이지 연결: `이제 sync 전략의 핵심인 merge와 rebase를 비교한다.`

### Page 6
- 슬라이드 제목: `merge와 rebase는 무엇을 바꾸는가`
- 페이지 목적: merge와 rebase의 결과 차이 설명
- 핵심 takeaway: merge는 이력을 합치고, rebase는 기준점을 옮겨 이력을 다시 세운다.
- 반드시 포함할 내용:
  - merge 결과
  - rebase 결과
  - history readability
  - shared branch에서의 주의점
- 시각화 방식: before/after commit graph comparison
- 정보 밀도 가이드: 그래프 2개 + 비교 설명
- 발표자 보강 포인트: “예쁘다/안 예쁘다”가 아니라 협업 영향으로 설명한다.
- 실습 / 토론 cue: `merge와 rebase 중 무엇이 다른 사람 기준점을 바꿀 수 있는가?`
- 다음 페이지 연결: `이제 운영 관점에서 언제 merge하고 언제 rebase할지 결정한다.`

### Page 7
- 슬라이드 제목: `언제 merge하고 언제 rebase할까`
- 페이지 목적: decision framework 제시
- 핵심 takeaway: 팀 정책, branch 공개 여부, review 단계, 공유 여부에 따라 선택이 달라진다.
- 반드시 포함할 내용:
  - merge가 적합한 경우
  - rebase가 적합한 경우
  - 공개 branch에서 rebase 주의
  - 오래된 branch 정리 기준
- 시각화 방식: decision matrix
- 정보 밀도 가이드: 판단 질문 4개 이상
- 발표자 보강 포인트: tool preference가 아니라 team operating rule이라는 점을 강조한다.
- 실습 / 토론 cue: `이미 공유된 feature branch를 rebase하려면 무엇을 먼저 확인해야 하는가?`
- 다음 페이지 연결: `branch naming과 수명 관리로 운영 규칙을 좁힌다.`

### Page 8
- 슬라이드 제목: `branch naming과 수명 관리`
- 페이지 목적: branch hygiene 규칙 설명
- 핵심 takeaway: branch 이름과 수명은 검색성, review 효율, 충돌 비용을 좌우한다.
- 반드시 포함할 내용:
  - naming rule 예시
  - 짧은 수명 branch 원칙
  - 오래된 branch의 위험
  - main과 자주 sync해야 하는 이유
- 시각화 방식: naming examples + lifecycle diagram
- 정보 밀도 가이드: 좋은 예와 나쁜 예를 함께 넣는다.
- 발표자 보강 포인트: branch naming은 사소한 취향이 아니라 협업 검색성과 traceability 문제라고 설명한다.
- 실습 / 토론 cue: `branch가 오래 살수록 충돌 비용이 커지는 이유는 무엇인가?`
- 다음 페이지 연결: `이제 실제 branch 생성과 병렬 작업 실습 흐름을 본다.`

### Page 9
- 슬라이드 제목: `실습 흐름: branch 생성과 병렬 작업`
- 페이지 목적: lab flow 소개
- 핵심 takeaway: branch 생성, 변경, sync, MR 준비까지의 흐름을 한 번에 묶는다.
- 반드시 포함할 내용:
  - `git switch -c ...`
  - 작업 파일
  - 병렬 작업 개념
  - 결과 확인 포인트
- 시각화 방식: numbered lab flow
- 정보 밀도 가이드: 단계 5개 이상
- 발표자 보강 포인트: 작은 작업 단위로 나누는 이유를 실습 흐름과 연결한다.
- 실습 / 토론 cue: `branch를 나눌 기준은 기능, 파일, 역할 중 무엇인가?`
- 다음 페이지 연결: `이제 merge 방식 sync를 본다.`

### Page 10
- 슬라이드 제목: `merge 방식 sync와 rebase 방식 sync를 비교하기`
- 페이지 목적: 두 sync 방식의 실습 비교
- 핵심 takeaway: 같은 동기화 목표라도 merge와 rebase는 이력 형태와 협업 비용이 다르다.
- 반드시 포함할 내용:
  - merge sync 흐름
  - rebase sync 흐름
  - 충돌 발생 가능성
  - push 후 영향
- 시각화 방식: 2-path flow comparison
- 정보 밀도 가이드: 명령 흐름과 결과 이력을 같이 보여 준다.
- 발표자 보강 포인트: 팀 표준을 정하고 예외 조건을 둬야 한다고 설명한다.
- 실습 / 토론 cue: `왜 같은 sync라도 팀마다 merge/rebase 선호가 다를까?`
- 다음 페이지 연결: `이제 rebase 후 push 실패와 오래된 branch 문제를 본다.`

### Page 11
- 슬라이드 제목: `failure scenario: rebase 후 push 실패와 오래된 feature branch`
- 페이지 목적: rebase 위험 시나리오 설명
- 핵심 takeaway: rebase는 유용하지만 이미 공유된 branch에서 쓰면 push와 협업 조정이 어려워질 수 있다.
- 반드시 포함할 내용:
  - rebase 후 push 안 되는 이유
  - 오래된 branch가 main과 멀어지는 문제
  - fetch 후 비교
  - 팀과의 동기화 필요
- 시각화 방식: symptom / cause / first action table
- 정보 밀도 가이드: 증상과 대응 순서 명확히
- 발표자 보강 포인트: `force push`를 아무 설명 없이 권하지 않는다.
- 실습 / 토론 cue: `이미 공유된 branch를 rebase했다면 누구와 먼저 맞춰야 하는가?`
- 다음 페이지 연결: `wrong branch와 detached HEAD 같은 다른 실패 시나리오도 정리한다.`

### Page 12
- 슬라이드 제목: `failure scenario: wrong branch, detached HEAD, stale branch`
- 페이지 목적: 대표 실패 시나리오 통합 정리
- 핵심 takeaway: branch 전략 오류는 대개 위치 확인 부족과 branch 수명 관리 실패에서 나온다.
- 반드시 포함할 내용:
  - 잘못된 branch에서 작업
  - detached HEAD
  - stale feature branch
  - 기본 대응과 예방 습관
- 시각화 방식: failure matrix
- 정보 밀도 가이드: 상황, 신호, 기본 대응, 예방 4열 이상
- 발표자 보강 포인트: 위치 확인과 branch hygiene가 가장 싼 예방책이라고 설명한다.
- 실습 / 토론 cue: `wrong branch 문제를 가장 빨리 발견하는 방법은 무엇인가?`
- 다음 페이지 연결: `마지막으로 역할별 운영 규칙과 handoff를 정리한다.`

### Page 13
- 슬라이드 제목: `CH04 요약: 덜 꼬이게 일하는 branch 운영 규칙`
- 페이지 목적: CH04 정리와 CH05 handoff
- 핵심 takeaway: branch 전략은 개인 취향이 아니라 팀의 review, approval, merge 운영과 직접 연결된다.
- 반드시 포함할 내용:
  - switch vs checkout
  - tracking branch
  - shared repo vs fork
  - merge vs rebase
  - naming / branch lifetime
  - CH05 handoff: GitLab roles, protected branch, MR, approval
- 시각화 방식: summary grid
- 정보 밀도 가이드: 요점 5개 이상 + 다음 장 연결 2개
- 발표자 보강 포인트: CH05는 이제 GitLab 운영 정책을 본다는 점을 연결한다.
- 실습 / 토론 cue: `우리 팀에 가장 먼저 도입해야 할 branch 운영 규칙은 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 GitLab 역할, protected branch, MR, approval을 운영 관점에서 다룬다.`
