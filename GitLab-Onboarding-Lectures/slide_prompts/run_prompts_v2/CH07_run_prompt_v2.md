# CH07 Skywork Run Prompt v2

이번 작업은 `GitLab-Onboarding-Lectures` 8챕터 시리즈 중 `CH07` 단독 프레젠테이션 생성이다.

실행 방식:
- 반드시 `파워포인트` 작업 타입으로 실행하라.
- 반드시 `전문` 모드로 실행하라.
- broad rewrite나 marketing tone을 피하고, 교육용 dense tutorial deck으로 작성하라.
- 심층 리서치는 lecture note에 빈틈이 있는 경우에만 최소 범위로 사용하라. lecture note를 대체하지 마라.

업로드된 파일은 아래 두 개뿐이라고 가정하라.
- `CH07-CICD-Quality-Gates-and-Self-Managed-Operations_lecture-note.md`
- `LGD_Template.pptx`

템플릿 규칙:
- `LGD_Template.pptx`를 최신 기준 템플릿으로 일관되게 적용하라.
- 템플릿이 일부 파싱되지 않더라도 흰 배경, 좌측 정렬, corporate information layout, grid 기반 정리, box / table / flow 중심 구조를 유지하라.
- 템플릿 이름이나 장식만 남는 cover를 만들지 마라.

source-of-truth 규칙:
- 반드시 `@CH07-CICD-Quality-Gates-and-Self-Managed-Operations_lecture-note.md`를 참조 파일로 걸어 사용하라.
- `CH07-CICD-Quality-Gates-and-Self-Managed-Operations_lecture-note.md`를 source of truth로 사용하라.
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

# CH07 Page-Level Prompt

이 문서는 `CH07-CICD-Quality-Gates-and-Self-Managed-Operations_lecture-note.md`를 source of truth로 사용하는 CH07 전용 page prompt다.

## 챕터 개요

- 챕터명: `CI/CD, Quality Gates, and Self-Managed Operations`
- 권장 분량: `16 pages`
- 목적: merge 이후 pipeline, runner, artifact, Pages, webhook, self-managed 운영 차이를 실무적으로 읽게 한다.
- 핵심 축:
  - `.gitlab-ci.yml`
  - pipeline anatomy
  - self-managed runner
  - executor / tags / protected runner
  - artifact / report
  - Pages
  - webhook / RSS
  - OpenProject integration
  - CI/CD vs MLOps extension
- 주요 자산:
  - `.gitlab-ci.yml`
  - Pages publish assets
  - webhook scenario
  - OpenProject integration example

## CH07 고유 규칙

- self-managed 차이를 Git 공통 원리와 섞지 않는다.
- runner는 “설치 방법”보다 “어떻게 읽고 설계하고 장애를 해석하는가”에 초점을 둔다.
- Pages, webhook, RSS, OpenProject, Model Registry는 각각 용도와 경계를 분명히 보여 준다.
- pipeline success와 deploy readiness를 같은 것으로 말하지 않는다.
- MLOps는 CH07에서 확장 구조로 다루되 본 spine은 여전히 Git/GitLab + CI/CD다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `CI/CD, self-managed runner, 그리고 운영 품질 게이트`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 merge 이후 파이프라인과 self-managed 운영 변수를 읽는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 pipeline / operations visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - pipeline anatomy
    - self-managed runner
    - Pages / webhook / OpenProject
    - MLOps extension
- 시각화 방식: cover hero + preview + CH07 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보는 유지
- 발표자 보강 포인트: CH06의 merge 이후 실제로 품질을 누가 보장하는지가 이번 장의 주제라고 연결한다.
- 실습 / 토론 cue: `pipeline success가 곧 배포 가능 상태인가?`
- 다음 페이지 연결: `먼저 CI/CD와 MLOps 확장 범위를 다시 정리한다.`

### Page 2
- 슬라이드 제목: `CI/CD에서 MLOps로 확장되면 무엇이 늘어나는가`
- 페이지 목적: 범위 구분 정리
- 핵심 takeaway: 코드 자동화 위에 모델, 데이터, 평가, 모델 승격, 모델 rollback이 추가되면 MLOps가 된다.
- 반드시 포함할 내용:
  - CI/CD 자산
  - MLOps 추가 자산
  - code rollback vs model rollback
  - 이 코스의 적용 범위
- 시각화 방식: layered architecture diagram
- 정보 밀도 가이드: CI/CD와 MLOps를 최소 4개 항목으로 비교
- 발표자 보강 포인트: MLOps는 CI/CD 대체재가 아니라 확장층이라고 설명한다.
- 실습 / 토론 cue: `model artifact와 build artifact는 어떻게 다른가?`
- 다음 페이지 연결: `이제 pipeline 구조를 .gitlab-ci.yml 기준으로 읽는다.`

### Page 3
- 슬라이드 제목: `.gitlab-ci.yml을 구조로 읽기`
- 페이지 목적: pipeline definition 이해
- 핵심 takeaway: pipeline은 job 목록이 아니라 stage, rule, artifact, report, environment가 결합된 구조다.
- 반드시 포함할 내용:
  - stage
  - job
  - script
  - artifact
  - report
  - rule / only / except 성격
- 시각화 방식: YAML structure map
- 정보 밀도 가이드: 키 5개 이상 설명
- 발표자 보강 포인트: YAML 문법보다 운영 의미를 먼저 읽게 한다.
- 실습 / 토론 cue: `job이 성공해도 전체 pipeline이 안 끝날 수 있는 이유는 무엇인가?`
- 다음 페이지 연결: `이제 pipeline 상태를 실제로 읽는 순서를 본다.`

### Page 4
- 슬라이드 제목: `pipeline을 읽는 순서`
- 페이지 목적: pipeline reading workflow 제시
- 핵심 takeaway: pipeline은 status badge만 보는 것이 아니라 stage 순서, 실패 job, artifact, report를 함께 봐야 한다.
- 반드시 포함할 내용:
  - overall status
  - failing stage
  - failing job
  - log
  - artifact / report
  - branch / MR context
- 시각화 방식: pipeline reading checklist
- 정보 밀도 가이드: reading order 5단계 이상
- 발표자 보강 포인트: retry 전에 log와 context를 먼저 읽는 습관을 설명한다.
- 실습 / 토론 cue: `pipeline이 fail일 때 가장 먼저 보는 것은 status badge인가, failing job인가?`
- 다음 페이지 연결: `이제 self-managed runner 구조를 본다.`

### Page 5
- 슬라이드 제목: `self-managed runner를 어떻게 설계하고 읽어야 하는가`
- 페이지 목적: runner 개념과 운영 구조 설명
- 핵심 takeaway: runner는 단순 실행기가 아니라 네트워크, 보안, executor, tag 정책이 만나는 운영 지점이다.
- 반드시 포함할 내용:
  - shared / group / project runner scope
  - runner와 job 매칭
  - 운영 책임
  - self-managed의 의미
- 시각화 방식: runner scope diagram
- 정보 밀도 가이드: scope 3종 + 운영 영향
- 발표자 보강 포인트: GitLab.com 기본 runner 감각을 사내 환경에 그대로 가져오면 안 된다고 설명한다.
- 실습 / 토론 cue: `shared runner와 project runner는 책임이 어떻게 다른가?`
- 다음 페이지 연결: `이제 executor 차이를 본다.`

### Page 6
- 슬라이드 제목: `shell, docker, kubernetes executor 차이`
- 페이지 목적: executor 비교
- 핵심 takeaway: 같은 pipeline도 executor에 따라 격리 수준, 재현성, 네트워크 조건, 디버깅 방식이 달라진다.
- 반드시 포함할 내용:
  - shell executor
  - docker executor
  - kubernetes executor
  - 장점 / 위험 / 적합한 상황
- 시각화 방식: 3열 comparison table
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: “무조건 docker가 좋다” 같은 단순화는 피한다.
- 실습 / 토론 cue: `폐쇄망과 내부 인증서 환경에서 executor 선택은 왜 중요해지는가?`
- 다음 페이지 연결: `이제 tag, protected runner, pending 해석으로 이어간다.`

### Page 7
- 슬라이드 제목: `runner tag, protected runner, pending 해석`
- 페이지 목적: job routing과 pending 분석 설명
- 핵심 takeaway: pending은 단순 대기 상태가 아니라 tag mismatch, 보호 설정, capacity 부족의 신호일 수 있다.
- 반드시 포함할 내용:
  - runner tag
  - protected runner
  - pending 원인
  - first action
- 시각화 방식: symptom / cause / first action matrix
- 정보 밀도 가이드: pending 원인 최소 4개
- 발표자 보강 포인트: pending을 “느리다”로만 이해하지 않게 한다.
- 실습 / 토론 cue: `pending을 봤을 때 가장 먼저 확인할 runner 정보는 무엇인가?`
- 다음 페이지 연결: `이제 artifact와 report가 왜 중요한지 본다.`

### Page 8
- 슬라이드 제목: `artifact와 report는 왜 결과 해석의 증거가 되는가`
- 페이지 목적: artifact/report 의미 설명
- 핵심 takeaway: pipeline log만으로 충분하지 않을 때 artifact와 report가 품질 증거가 된다.
- 반드시 포함할 내용:
  - artifact
  - test report
  - coverage / report
  - deploy artifact
  - 추적과 복구 관점
- 시각화 방식: artifact lifecycle diagram
- 정보 밀도 가이드: artifact 종류와 보는 이유를 같이 넣는다.
- 발표자 보강 포인트: pipeline success만 보고 산출물을 확인하지 않는 실수를 지적한다.
- 실습 / 토론 cue: `artifact를 확인하지 않으면 놓치는 것은 무엇인가?`
- 다음 페이지 연결: `이제 Pages 운영으로 문서/정적 사이트 배포를 본다.`

### Page 9
- 슬라이드 제목: `GitLab Pages를 어떻게 운영할 것인가`
- 페이지 목적: Pages 개념과 활용 설명
- 핵심 takeaway: Pages는 repo docs와 Wiki와 다른, CI/CD로 배포되는 정적 문서 surface다.
- 반드시 포함할 내용:
  - Pages 정의
  - 언제 유용한가
  - repo docs / Wiki와의 차이
  - publish 흐름
- 시각화 방식: docs surface comparison + Pages flow
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: Pages를 “예쁜 문서 사이트”가 아니라 배포 대상 산출물로 설명한다.
- 실습 / 토론 cue: `운영 runbook을 Pages에 둘 때 생길 수 있는 장단점은 무엇인가?`
- 다음 페이지 연결: `이제 self-managed에서 Pages가 왜 더 까다로운지 본다.`

### Page 10
- 슬라이드 제목: `self-managed GitLab에서 Pages가 더 까다로운 이유`
- 페이지 목적: Pages self-managed 차이 설명
- 핵심 takeaway: Pages job success와 실제 사이트 접근 가능 여부 사이에는 domain, TLS, daemon, proxy, publish path 같은 운영 변수가 있다.
- 반드시 포함할 내용:
  - domain
  - TLS / certificate
  - proxy
  - Pages daemon / service
  - publish path
  - 대표 failure case
- 시각화 방식: Pages failure matrix
- 정보 밀도 가이드: 변수 5개 이상
- 발표자 보강 포인트: Pages job이 성공해도 사이트가 안 열릴 수 있다는 점을 강조한다.
- 실습 / 토론 cue: `Pages가 안 열릴 때 pipeline만 보고 멈추면 왜 안 되는가?`
- 다음 페이지 연결: `이제 webhook과 RSS/Atom을 구분해 본다.`

### Page 11
- 슬라이드 제목: `webhook과 RSS/Atom은 언제 쓰는가`
- 페이지 목적: event integration vs read-only feed 구분
- 핵심 takeaway: webhook은 자동화와 상태 전달, RSS/Atom은 구독과 읽기용 보조 채널이다.
- 반드시 포함할 내용:
  - webhook 용도
  - RSS/Atom 용도
  - 언제 webhook이 맞는가
  - 언제 feed가 충분한가
- 시각화 방식: 2열 integration comparison
- 정보 밀도 가이드: 용도, 장점, 한계 3축으로 비교
- 발표자 보강 포인트: RSS를 양방향 연동 도구처럼 오해하지 않게 설명한다.
- 실습 / 토론 cue: `OpenProject와 상태 동기화에는 webhook과 RSS 중 무엇이 맞는가?`
- 다음 페이지 연결: `이제 OpenProject 연동 예제로 연결한다.`

### Page 12
- 슬라이드 제목: `OpenProject와 GitLab 연동 운영 예제`
- 페이지 목적: integration scenario 설명
- 핵심 takeaway: work package, branch, MR, pipeline, merge를 하나의 추적선으로 연결하면 운영 가시성이 높아진다.
- 반드시 포함할 내용:
  - work package reference
  - webhook 연결
  - pipeline status 반영
  - traceability 의미
  - 사내 확인 포인트
- 시각화 방식: OpenProject <-> GitLab flow diagram
- 정보 밀도 가이드: 연결 단계 5개 이상
- 발표자 보강 포인트: 계획 도구와 구현 도구의 역할 분리를 설명한다.
- 실습 / 토론 cue: `연동이 끊기면 어떤 관리 공백이 생기는가?`
- 다음 페이지 연결: `이제 self-managed 환경에서 추가로 봐야 할 운영 변수로 넘어간다.`

### Page 13
- 슬라이드 제목: `self-managed 운영에서 추가로 봐야 할 것`
- 페이지 목적: on-prem 변수 통합 정리
- 핵심 takeaway: network, outbound request, certificate, internal registry, version compatibility가 실제 운영 난이도를 올린다.
- 반드시 포함할 내용:
  - outbound request 허용
  - internal registry
  - proxy / certificate
  - GitLab / runner version compatibility
  - variable / secret 정책
- 시각화 방식: self-managed risk checklist
- 정보 밀도 가이드: 항목 5개 이상
- 발표자 보강 포인트: SaaS 예시가 사내에서 그대로 안 되는 이유를 구조적으로 설명한다.
- 실습 / 토론 cue: `우리 환경에서 가장 자주 병목이 되는 self-managed 변수는 무엇인가?`
- 다음 페이지 연결: `이제 CI/CD에서 MLOps로 확장할 때 무엇이 추가되는지 본다.`

### Page 14
- 슬라이드 제목: `CI/CD에서 MLOps로 확장하면 pipeline은 어떻게 달라지는가`
- 페이지 목적: MLOps extension 설명
- 핵심 takeaway: training, evaluation, model artifact, model registry, promotion, model rollback이 추가되면 운영 판단이 더 복잡해진다.
- 반드시 포함할 내용:
  - training step
  - evaluation gate
  - model artifact
  - model registry
  - promotion
  - code rollback vs model rollback
- 시각화 방식: CI/CD pipeline vs MLOps pipeline comparison
- 정보 밀도 가이드: 추가되는 단계 5개 이상
- 발표자 보강 포인트: CH08 capstone에서 이 변형을 다시 다룰 것이라고 연결한다.
- 실습 / 토론 cue: `모델 성능이 떨어지면 코드 rollback과 모델 rollback 중 무엇이 먼저일 수 있는가?`
- 다음 페이지 연결: `이제 deploy readiness 기준과 failure matrix를 한 번에 정리한다.`

### Page 15
- 슬라이드 제목: `deploy readiness checklist와 대표 failure scenario`
- 페이지 목적: 배포 준비와 실패 해석 통합
- 핵심 takeaway: pipeline success만으로는 부족하고 runner, artifact, variable, Pages, webhook 상태까지 봐야 한다.
- 반드시 포함할 내용:
  - deploy readiness checklist
  - pending
  - variable 누락
  - flaky retry
  - Pages 미오픈
  - webhook 미반영
- 시각화 방식: readiness checklist + failure matrix
- 정보 밀도 가이드: checklist 5개 이상, failure 5개 이상
- 발표자 보강 포인트: 운영자는 성공보다 실패 신호를 먼저 읽어야 한다고 설명한다.
- 실습 / 토론 cue: `retry 전에 반드시 확인해야 할 세 가지는 무엇인가?`
- 다음 페이지 연결: `마지막으로 CH07을 정리하고 capstone으로 넘긴다.`

### Page 16
- 슬라이드 제목: `CH07 요약: pipeline은 코드 실행이 아니라 운영 판단 체계다`
- 페이지 목적: CH07 정리와 CH08 handoff
- 핵심 takeaway: self-managed runner, Pages, webhook, OpenProject, MLOps 확장을 읽을 수 있어야 pipeline을 운영할 수 있다.
- 반드시 포함할 내용:
  - `.gitlab-ci.yml`
  - runner
  - artifact / report
  - Pages
  - webhook / RSS
  - OpenProject
  - MLOps extension
  - CH08 handoff: end-to-end capstone
- 시각화 방식: summary grid
- 정보 밀도 가이드: 핵심 포인트 6개 이상
- 발표자 보강 포인트: CH08에서는 issue부터 rollback까지 전 과정 연결을 본다고 설명한다.
- 실습 / 토론 cue: `지금 우리 조직에서 가장 먼저 성숙시켜야 할 운영 레이어는 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 전체 흐름을 하나의 capstone 시나리오로 연결한다.`
