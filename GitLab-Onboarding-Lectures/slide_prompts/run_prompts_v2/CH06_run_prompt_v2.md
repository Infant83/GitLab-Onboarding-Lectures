# CH06 Skywork Run Prompt v2

이번 작업은 `GitLab-Onboarding-Lectures` 8챕터 시리즈 중 `CH06` 단독 프레젠테이션 생성이다.

실행 방식:
- 반드시 `파워포인트` 작업 타입으로 실행하라.
- 반드시 `전문` 모드로 실행하라.
- broad rewrite나 marketing tone을 피하고, 교육용 dense tutorial deck으로 작성하라.
- 심층 리서치는 lecture note에 빈틈이 있는 경우에만 최소 범위로 사용하라. lecture note를 대체하지 마라.

업로드된 파일은 아래 두 개뿐이라고 가정하라.
- `CH06-Team-Collaboration-Conflict-and-Rollback-Lab_lecture-note.md`
- `LGD_Template.pptx`

템플릿 규칙:
- `LGD_Template.pptx`를 최신 기준 템플릿으로 일관되게 적용하라.
- 템플릿이 일부 파싱되지 않더라도 흰 배경, 좌측 정렬, corporate information layout, grid 기반 정리, box / table / flow 중심 구조를 유지하라.
- 템플릿 이름이나 장식만 남는 cover를 만들지 마라.

source-of-truth 규칙:
- 반드시 `@CH06-Team-Collaboration-Conflict-and-Rollback-Lab_lecture-note.md`를 참조 파일로 걸어 사용하라.
- `CH06-Team-Collaboration-Conflict-and-Rollback-Lab_lecture-note.md`를 source of truth로 사용하라.
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

# CH06 Page-Level Prompt

이 문서는 `CH06-Team-Collaboration-Conflict-and-Rollback-Lab_lecture-note.md`를 source of truth로 사용하는 CH06 전용 page prompt다.

## 챕터 개요

- 챕터명: `Team Collaboration, Conflict, and Rollback Lab`
- 권장 분량: `15 pages`
- 목적: 조별 실습으로 conflict를 만들고, 분석하고, 해결하고, rollback 판단까지 수행한다.
- 핵심 축:
  - team scenario
  - branch split
  - same-area edit
  - MR / conflict
  - conflict analysis
  - merge vs rebase abort
  - rollback choice
  - retrospective
- 주요 자산:
  - `src/permissions.js`
  - `docs/process.md`
  - `tests/permissions.test.js`
  - branch naming rules

## CH06 고유 규칙

- 이 장은 실습 lab 성격이 강하므로 단계가 명확히 보여야 한다.
- conflict를 단순히 “텍스트 충돌”이 아니라 작업 조정 실패의 결과로 설명한다.
- `reset --hard`는 shared branch 기본 해법처럼 보이지 않게 한다.
- merge와 rebase 충돌 처리, abort, rollback 판단을 모두 드러낸다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `충돌을 만들고, 풀고, 되돌리는 팀 협업 실습`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 conflict를 피하는 법이 아니라, conflict를 안전하게 처리하는 팀 습관을 익히는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 team collaboration visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - branch split
    - same-area edit
    - conflict resolution
    - rollback choice
- 시각화 방식: cover hero + preview + CH06 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보는 유지
- 발표자 보강 포인트: conflict를 피할 수 없는 비용이 아니라 관리 가능한 운영 이벤트로 설명한다.
- 실습 / 토론 cue: `conflict는 개인 실수인가, 팀 조정 문제인가?`
- 다음 페이지 연결: `먼저 조 구성과 시나리오 전체를 본다.`

### Page 2
- 슬라이드 제목: `조 구성과 capstone-style 실습 시나리오`
- 페이지 목적: lab setup 설명
- 핵심 takeaway: 각 역할이 따로 움직이되 하나의 저장소와 정책 안에서 충돌과 해결이 발생한다.
- 반드시 포함할 내용:
  - 권장 조 구성
  - Owner / Maintainer / Developer A / Developer B
  - 실습 목표
  - 시작 상태
- 시각화 방식: team role map
- 정보 밀도 가이드: 역할별 책임과 목표를 분명히 넣는다.
- 발표자 보강 포인트: 역할극이 아니라 실제 운영 책임 시뮬레이션이라는 점을 설명한다.
- 실습 / 토론 cue: `누가 conflict를 “해결 완료”로 판단할 권한이 있는가?`
- 다음 페이지 연결: `이제 branch를 분리하고 동일 구간을 수정하는 흐름으로 들어간다.`

### Page 3
- 슬라이드 제목: `Stage 1~2: branch 생성과 동일 구간 수정`
- 페이지 목적: conflict를 만드는 전제 조건 설명
- 핵심 takeaway: 같은 파일의 가까운 구간을 병렬 수정하면 충돌 가능성이 급격히 올라간다.
- 반드시 포함할 내용:
  - branch 생성
  - 동일 파일 / 동일 구간 수정
  - `src/permissions.js` 등 공통 자산
  - 충돌 전조
- 시각화 방식: same-file parallel edit diagram
- 정보 밀도 가이드: 단계 2개를 구체적으로 보여 준다.
- 발표자 보강 포인트: conflict는 나쁜 사람 문제가 아니라 겹치는 작업 배치의 결과라는 점을 설명한다.
- 실습 / 토론 cue: `충돌 가능성을 미리 낮추는 조정 방법은 무엇인가?`
- 다음 페이지 연결: `먼저 Developer A의 MR이 어떻게 들어오는지 본다.`

### Page 4
- 슬라이드 제목: `Stage 3: Developer A의 MR과 첫 반영`
- 페이지 목적: 첫 MR 반영 설명
- 핵심 takeaway: 첫 MR이 merge되면 나머지 branch의 기준점이 바뀐다.
- 반드시 포함할 내용:
  - Developer A branch
  - MR 생성
  - review / approval
  - merge 후 main 변화
- 시각화 방식: MR lifecycle condensed flow
- 정보 밀도 가이드: merge 전후 기준점 변화를 분명히 보여 준다.
- 발표자 보강 포인트: conflict는 보통 첫 MR 이후 나머지 branch에서 본격화된다고 연결한다.
- 실습 / 토론 cue: `A의 MR이 merge된 뒤 B는 무엇을 먼저 확인해야 하는가?`
- 다음 페이지 연결: `이제 Developer B의 MR에서 conflict가 드러난다.`

### Page 5
- 슬라이드 제목: `Stage 4: Developer B의 MR과 conflict 발생`
- 페이지 목적: conflict 발생 순간 설명
- 핵심 takeaway: conflict는 Git이 무능해서가 아니라 자동 병합 규칙이 불충분하다는 신호다.
- 반드시 포함할 내용:
  - Developer B MR
  - conflict indicator
  - 자동 merge 실패 의미
  - UI와 로컬에서 보이는 신호
- 시각화 방식: UI conflict warning + local marker concept
- 정보 밀도 가이드: 신호 3개 이상
- 발표자 보강 포인트: conflict를 “당황할 일”이 아니라 “사람이 판단해야 할 지점”으로 설명한다.
- 실습 / 토론 cue: `conflict가 났을 때 바로 push를 반복하면 왜 안 되는가?`
- 다음 페이지 연결: `이제 conflict를 어떻게 읽고 원인을 분류하는지 본다.`

### Page 6
- 슬라이드 제목: `Stage 5: conflict marker를 읽고 원인을 분해하기`
- 페이지 목적: conflict 분석 방법 설명
- 핵심 takeaway: conflict marker를 읽을 줄 알아야 어떤 변경을 살리고 버릴지 판단할 수 있다.
- 반드시 포함할 내용:
  - marker 구조
  - ours / theirs 개념
  - 겹친 줄과 진짜 의도 구분
  - root cause 분류
- 시각화 방식: annotated conflict marker example
- 정보 밀도 가이드: 예시 코드는 꼭 시각적으로 풀어 설명한다.
- 발표자 보강 포인트: 텍스트 줄 충돌과 의미 충돌은 다를 수 있다는 점을 설명한다.
- 실습 / 토론 cue: `두 변경을 모두 살려야 하는지, 하나를 버려야 하는지 어떻게 판단하는가?`
- 다음 페이지 연결: `이제 실제 해결 절차로 들어간다.`

### Page 7
- 슬라이드 제목: `Stage 6: conflict 해결 절차와 검증 순서`
- 페이지 목적: conflict 해결 workflow 제시
- 핵심 takeaway: 해결은 파일 편집만이 아니라 수정, 테스트, status 확인, commit까지 포함한다.
- 반드시 포함할 내용:
  - conflict 파일 수정
  - `git status`
  - 테스트 / 확인
  - `git add`
  - commit
- 시각화 방식: step-by-step resolution flow
- 정보 밀도 가이드: 최소 5단계
- 발표자 보강 포인트: marker를 지우는 것과 의미를 검증하는 것은 다른 단계라고 설명한다.
- 실습 / 토론 cue: `conflict 해결 후 가장 먼저 통과시켜야 할 검증은 무엇인가?`
- 다음 페이지 연결: `merge와 rebase 충돌 해결의 차이도 봐야 한다.`

### Page 8
- 슬라이드 제목: `merge conflict와 rebase conflict는 무엇이 다른가`
- 페이지 목적: 두 충돌 처리 방식 비교
- 핵심 takeaway: conflict 해결 그 자체는 비슷하지만, 기준점과 후속 push 영향은 다르다.
- 반드시 포함할 내용:
  - merge conflict
  - rebase conflict
  - history shape 차이
  - 해결 후 push 영향
- 시각화 방식: 2-path comparison
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: 팀 정책 없는 rebase 남용이 왜 위험한지 설명한다.
- 실습 / 토론 cue: `공개된 branch에서 rebase conflict를 해결할 때 무엇이 더 조심스러운가?`
- 다음 페이지 연결: `이제 abort와 rollback 판단을 분리한다.`

### Page 9
- 슬라이드 제목: `merge / rebase abort는 언제 쓰는가`
- 페이지 목적: 중단과 복구 차이 설명
- 핵심 takeaway: abort는 현재 시도 중인 병합/재배치를 취소하는 것이고, rollback은 이미 반영된 결과를 되돌리는 것이다.
- 반드시 포함할 내용:
  - merge abort
  - rebase abort
  - 언제 중단하는가
  - rollback과의 차이
- 시각화 방식: abort vs rollback comparison
- 정보 밀도 가이드: 개념 차이를 분명히 넣는다.
- 발표자 보강 포인트: abort와 rollback을 같은 것으로 오해하지 않게 설명한다.
- 실습 / 토론 cue: `지금 필요한 것이 abort인지 rollback인지 어떻게 구분하는가?`
- 다음 페이지 연결: `이제 merge 후 문제를 발견한 상황으로 넘어간다.`

### Page 10
- 슬라이드 제목: `Stage 8: merge 후 문제 발견, 이제 어떻게 되돌릴까`
- 페이지 목적: post-merge rollback 판단
- 핵심 takeaway: shared branch에서 문제를 되돌릴 때는 history 보존과 팀 커뮤니케이션이 핵심이다.
- 반드시 포함할 내용:
  - merge 후 장애 발견
  - revert 우선 원칙
  - 영향 범위 확인
  - Owner / Maintainer / Developer 역할
- 시각화 방식: incident decision flow
- 정보 밀도 가이드: 판단 질문 4개 이상
- 발표자 보강 포인트: rollback은 실패 숨기기가 아니라 복구 능력이라고 설명한다.
- 실습 / 토론 cue: `지금 가장 먼저 해야 할 것은 원인 분석인가, 복구인가?`
- 다음 페이지 연결: `왜 reset --hard를 기본으로 쓰지 않는지 정리한다.`

### Page 11
- 슬라이드 제목: `왜 reset --hard를 기본 복구로 가르치지 않는가`
- 페이지 목적: shared branch 안전 원칙 고정
- 핵심 takeaway: `reset --hard`는 로컬 기준점을 강하게 바꾸므로 협업 복구 기본값이 될 수 없다.
- 반드시 포함할 내용:
  - 로컬 정리 vs shared recovery
  - 다른 사람 기준점 훼손
  - revert와의 대비
  - 실무 메시지
- 시각화 방식: safe vs unsafe recovery comparison
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: 초보자에게 강한 명령을 손쉬운 해결책처럼 보이지 않게 한다.
- 실습 / 토론 cue: `shared branch에서 reset --hard가 특히 위험한 이유는 무엇인가?`
- 다음 페이지 연결: `이제 conflict가 반복되는 구조적 원인을 본다.`

### Page 12
- 슬라이드 제목: `conflict가 자주 나는 진짜 원인과 예방 규칙`
- 페이지 목적: 구조적 원인 설명
- 핵심 takeaway: conflict는 파일 겹침만이 아니라 branch 수명, 작업 분해, sync 주기, 리뷰 지연 문제와 연결된다.
- 반드시 포함할 내용:
  - 오래된 branch
  - 큰 MR
  - 같은 구간 병렬 수정
  - 늦은 sync
  - 예방 규칙
- 시각화 방식: cause -> prevention matrix
- 정보 밀도 가이드: 원인과 예방을 짝지어 넣는다.
- 발표자 보강 포인트: conflict를 실력 문제가 아니라 운영 문제로 재해석하도록 돕는다.
- 실습 / 토론 cue: `우리 팀에서 conflict 빈도를 낮추려면 무엇을 먼저 바꿔야 하는가?`
- 다음 페이지 연결: `이제 retrospective와 역할별 플레이북으로 정리한다.`

### Page 13
- 슬라이드 제목: `retrospective 질문과 역할별 플레이북`
- 페이지 목적: 실습 후 회고 구조 제공
- 핵심 takeaway: conflict 해결보다 더 중요한 것은 같은 문제가 다음 스프린트에 반복되지 않게 만드는 것이다.
- 반드시 포함할 내용:
  - retrospective 질문
  - Owner 질문
  - Maintainer 질문
  - Developer 질문
- 시각화 방식: role-based retrospective board
- 정보 밀도 가이드: 질문 6개 이상
- 발표자 보강 포인트: 해결 완료와 학습 완료는 다르다는 점을 설명한다.
- 실습 / 토론 cue: `이번 실습에서 가장 먼저 바꿔야 할 팀 습관은 무엇인가?`
- 다음 페이지 연결: `마지막으로 오늘의 lab 산출물과 CH07 handoff를 정리한다.`

### Page 14
- 슬라이드 제목: `오늘의 lab 산출물과 위험 관리 관점 정리`
- 페이지 목적: 실습 결과와 학습 목표 요약
- 핵심 takeaway: conflict를 해결했다는 사실보다, 누가 어떤 기준으로 판단하고 되돌렸는지가 더 중요하다.
- 반드시 포함할 내용:
  - branch 결과
  - conflict 해결 결과
  - rollback 판단 결과
  - 역할별 학습 포인트
- 시각화 방식: lab outcome summary
- 정보 밀도 가이드: 산출물 4개 이상
- 발표자 보강 포인트: 운영적 재현성을 강조한다.
- 실습 / 토론 cue: `누가 어떤 결정을 내렸는지 기록으로 남겼는가?`
- 다음 페이지 연결: `이제 CH07에서 merge 이후 pipeline과 self-managed 운영으로 넘어간다.`

### Page 15
- 슬라이드 제목: `CH06 요약: 충돌은 해결보다 운영 방식이 더 중요하다`
- 페이지 목적: CH06 정리와 CH07 handoff
- 핵심 takeaway: conflict, abort, rollback은 모두 branch 전략과 GitLab 정책 위에서 운영되어야 한다.
- 반드시 포함할 내용:
  - conflict 분석
  - resolution flow
  - abort vs rollback
  - reset 경계
  - retrospective
  - CH07 handoff: pipeline, runner, quality gate
- 시각화 방식: summary grid
- 정보 밀도 가이드: 핵심 포인트 5개 이상
- 발표자 보강 포인트: CH07에서는 merge 이후 안전성을 pipeline과 runner 관점에서 읽는다고 연결한다.
- 실습 / 토론 cue: `지금 팀이 가장 약한 것은 conflict 예방, 해결, rollback 중 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 CI/CD와 self-managed 운영을 깊게 다룬다.`
