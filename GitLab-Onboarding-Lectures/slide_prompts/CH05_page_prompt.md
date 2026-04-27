# CH05 Page-Level Prompt

이 문서는 `CH05-GitLab-Project-Structure-Permissions-and-MR_lecture-note.md`를 source of truth로 사용하는 CH05 전용 page prompt다.

## 챕터 개요

- 챕터명: `GitLab Project Structure, Permissions, and MR`
- 권장 분량: `15 pages`
- 목적: GitLab의 권한, 프로젝트 구조, protected branch, approval, MR 운영을 실무 관점에서 이해하게 한다.
- 핵심 축:
  - GitLab roles
  - project structure
  - protected branch
  - approval rules
  - MR lifecycle
  - reviewer vs approver
  - Wiki
  - OpenProject integration
- 주요 자산:
  - `CODEOWNERS`
  - `wiki-home.md`
  - `openproject-linking-guide.md`
  - `src/permissions.js`
  - `tests/role-policy.test.js`

## CH05 고유 규칙

- 권한은 메뉴 설명이 아니라 책임과 위험 관리 기준으로 설명한다.
- Developer가 “불편하다”고 느끼는 이유도 한 번 보여 주되, 운영 설계 관점으로 다시 묶는다.
- Wiki는 repo docs와 반드시 비교한다.
- OpenProject 연동은 webhook/API 운영과 traceability 관점으로 설명한다.
- MR lifecycle은 단순 절차가 아니라 품질 게이트 구조로 보여 준다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `GitLab 권한, MR, 승인 구조를 운영 관점에서 읽기`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 Git 명령 위에 얹히는 GitLab 운영 레이어를 이해하는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 review/approval visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - 역할과 권한
    - project structure
    - protected branch / approval
    - Wiki / OpenProject 연동
- 시각화 방식: cover hero + preview + CH05 강조 미니맵
- 정보 밀도 가이드: cover라도 preview, 발표 정보, 챕터 미니맵을 채운다.
- 발표자 보강 포인트: CH04가 branch 운영이었다면 CH05는 GitLab 정책 운영이라고 연결한다.
- 실습 / 토론 cue: `권한은 속도와 품질 중 무엇을 더 강하게 건드리는가?`
- 다음 페이지 연결: `먼저 GitLab 역할 구조를 책임 관점으로 본다.`

### Page 2
- 슬라이드 제목: `Owner / Maintainer / Developer / Guest 역할 구조`
- 페이지 목적: 역할 모델의 전체 그림 제시
- 핵심 takeaway: GitLab 역할은 기능 사용 권한이 아니라 운영 책임 범위를 구분한다.
- 반드시 포함할 내용:
  - Owner
  - Maintainer
  - Developer
  - Guest
  - 역할별 핵심 질문
- 시각화 방식: role ladder 또는 matrix
- 정보 밀도 가이드: 역할별 책임과 제한을 2개 이상씩 넣는다.
- 발표자 보강 포인트: 역할 차이를 숙련도 서열처럼 설명하지 않는다.
- 실습 / 토론 cue: `merge 승인과 direct push 권한은 왜 분리될 수 있는가?`
- 다음 페이지 연결: `이제 실무 권한 matrix로 더 구체화한다.`

### Page 3
- 슬라이드 제목: `실무 권한 매트릭스로 보면 무엇이 달라지는가`
- 페이지 목적: 역할과 행위 권한을 연결한다.
- 핵심 takeaway: 같은 저장소라도 누가 branch를 보호하고, 누가 merge를 승인하고, 누가 코드만 수정하는지가 다르다.
- 반드시 포함할 내용:
  - branch 보호
  - MR 생성
  - approval
  - merge
  - member 관리
  - project settings 변경
- 시각화 방식: permission matrix table
- 정보 밀도 가이드: 행위 5개 이상, 역할 4개
- 발표자 보강 포인트: 실무에서 가장 많이 헷갈리는 권한 행위를 짚는다.
- 실습 / 토론 cue: `Developer가 merge를 못 한다고 해서 개발이 막히는가?`
- 다음 페이지 연결: `이제 프로젝트 구조에서 무엇을 봐야 하는지 넓게 본다.`

### Page 4
- 슬라이드 제목: `GitLab 프로젝트 구조에서 먼저 봐야 할 것`
- 페이지 목적: GitLab 화면에서 봐야 할 surface를 정리한다.
- 핵심 takeaway: 저장소, branches, MR, CI/CD, Wiki, settings는 따로따로가 아니라 하나의 운영 구조다.
- 반드시 포함할 내용:
  - repository
  - branches / tags
  - merge requests
  - CI/CD
  - Wiki
  - settings / members
- 시각화 방식: project structure map
- 정보 밀도 가이드: surface별 “왜 보는가”를 같이 넣는다.
- 발표자 보강 포인트: GitLab UI를 메뉴 사용법으로만 설명하지 않는다.
- 실습 / 토론 cue: `프로젝트를 처음 받았을 때 가장 먼저 확인할 메뉴는 무엇인가?`
- 다음 페이지 연결: `이제 main 보호와 merge 통제를 담당하는 protected branch로 이동한다.`

### Page 5
- 슬라이드 제목: `protected branch는 왜 필요한가`
- 페이지 목적: protected branch의 실무 의미 설명
- 핵심 takeaway: protected branch는 실수 방지보다 감사 가능성과 통제 가능한 반영 경로를 만든다.
- 반드시 포함할 내용:
  - direct push 통제
  - merge 권한 통제
  - main 보호 목적
  - hotfix 예외 가능성
- 시각화 방식: policy card + protected branch flow
- 정보 밀도 가이드: 보호 목적 4개 이상
- 발표자 보강 포인트: branch 보호를 신뢰 부족이 아니라 운영 안전장치로 설명한다.
- 실습 / 토론 cue: `main에 direct push를 허용하면 어떤 사고가 더 빨리 커질 수 있는가?`
- 다음 페이지 연결: `branch 보호 위에 approval rule이 어떻게 올라가는지 본다.`

### Page 6
- 슬라이드 제목: `approval rule은 왜 별도의 품질 게이트인가`
- 페이지 목적: approval의 목적 설명
- 핵심 takeaway: MR이 열렸다고 끝이 아니라, 누가 어떤 기준으로 승인하는지가 품질을 좌우한다.
- 반드시 포함할 내용:
  - approval rule 정의
  - required approver
  - code owner approval 가능성
  - role과 approval의 관계
- 시각화 방식: MR -> review -> approval -> merge flow
- 정보 밀도 가이드: 승인 조건과 merge 차단 조건을 함께 넣는다.
- 발표자 보강 포인트: “approval만 받으면 안전하다”가 아니라 “approval 설계가 중요하다”고 설명한다.
- 실습 / 토론 cue: `approval은 왜 단순 형식 절차가 되기 쉬운가?`
- 다음 페이지 연결: `이제 MR lifecycle 전체를 한눈에 본다.`

### Page 7
- 슬라이드 제목: `MR lifecycle을 단계별로 읽기`
- 페이지 목적: MR 전체 흐름 정리
- 핵심 takeaway: branch 생성부터 merge 후 상태 확인까지 MR은 하나의 운영 사이클이다.
- 반드시 포함할 내용:
  - branch
  - commit
  - MR 생성
  - review
  - approval
  - pipeline
  - merge
  - post-merge 확인
- 시각화 방식: lifecycle timeline
- 정보 밀도 가이드: 단계 7개 이상
- 발표자 보강 포인트: MR을 단순 merge 버튼 이전 단계로 축소하지 않는다.
- 실습 / 토론 cue: `pipeline과 approval 중 무엇이 먼저여야 하는가?`
- 다음 페이지 연결: `이제 좋은 MR을 만드는 품질 기준으로 들어간다.`

### Page 8
- 슬라이드 제목: `좋은 MR은 무엇이 다른가`
- 페이지 목적: MR 품질 기준 제시
- 핵심 takeaway: 좋은 MR은 변경 범위, 설명, 검증 정보, reviewer 부담이 관리된다.
- 반드시 포함할 내용:
  - scope
  - description
  - linked issue / work package
  - verification evidence
  - reviewer 부담 감소
- 시각화 방식: good MR checklist
- 정보 밀도 가이드: 품질 항목 5개 이상
- 발표자 보강 포인트: “깔끔해 보이는 MR”과 “운영 가능한 MR”의 차이를 짚는다.
- 실습 / 토론 cue: `reviewer가 가장 빨리 신뢰를 잃는 MR은 어떤 MR인가?`
- 다음 페이지 연결: `이제 reviewer와 approver의 역할을 분리해 본다.`

### Page 9
- 슬라이드 제목: `reviewer와 approver를 왜 구분해야 하는가`
- 페이지 목적: 두 역할의 차이를 정리
- 핵심 takeaway: 리뷰는 이해와 피드백, approval은 반영 가능성 승인이다.
- 반드시 포함할 내용:
  - reviewer 역할
  - approver 역할
  - 같은 사람일 수도 있고 아닐 수도 있음
  - 역할 혼동 시 생기는 문제
- 시각화 방식: 2열 역할 비교
- 정보 밀도 가이드: 판단 기준과 책임을 분리한다.
- 발표자 보강 포인트: 승인 책임을 피드백 역할과 혼동하지 않게 설명한다.
- 실습 / 토론 cue: `좋은 리뷰와 좋은 승인 기준은 왜 다를까?`
- 다음 페이지 연결: `이제 문서 운영 면에서 Wiki와 repo docs를 구분한다.`

### Page 10
- 슬라이드 제목: `Wiki, repo docs, Pages는 각각 어디에 쓰는가`
- 페이지 목적: 문서 채널 구분
- 핵심 takeaway: Wiki는 운영 지식베이스, repo docs는 코드와 함께 리뷰되는 문서, Pages는 배포되는 문서 surface다.
- 반드시 포함할 내용:
  - Wiki
  - repo docs
  - Pages 예고
  - 언제 어디에 두는가
  - 잘못 두면 생기는 문제
- 시각화 방식: 3열 비교표
- 정보 밀도 가이드: 용도, 장점, 주의점 3축으로 비교한다.
- 발표자 보강 포인트: 문서 위치가 곧 review 흐름과 운영 책임을 바꾼다고 설명한다.
- 실습 / 토론 cue: `runbook은 Wiki와 repo docs 중 어디에 두는 것이 맞는가?`
- 다음 페이지 연결: `이제 Wiki 운영 예제를 좀 더 구체적으로 본다.`

### Page 11
- 슬라이드 제목: `GitLab Wiki 운영 예제와 주의점`
- 페이지 목적: Wiki 운영 실전 예시 제시
- 핵심 takeaway: Wiki는 FAQ, 운영 가이드, runbook에는 강하지만 코드와 동기화가 필요한 문서에는 한계가 있다.
- 반드시 포함할 내용:
  - Wiki 운영 예제
  - FAQ / runbook / team guide
  - repo docs로 두어야 하는 문서 예시
  - drift 방지 주의점
- 시각화 방식: example cards + caution box
- 정보 밀도 가이드: 예시 3개 이상, 주의점 3개 이상
- 발표자 보강 포인트: 문서 위치를 잘못 잡으면 review와 최신성 관리가 깨진다고 설명한다.
- 실습 / 토론 cue: `배포 절차 문서는 Wiki와 repo docs 중 어디가 더 적합한가?`
- 다음 페이지 연결: `이제 OpenProject와 GitLab을 traceability 관점에서 연결한다.`

### Page 12
- 슬라이드 제목: `OpenProject와 GitLab을 연결하면 무엇이 좋아지는가`
- 페이지 목적: OpenProject 연동 의미 설명
- 핵심 takeaway: 계획, 구현, review, pipeline, merge를 하나의 추적선으로 묶을 수 있다.
- 반드시 포함할 내용:
  - work package -> branch -> MR -> pipeline -> merge 흐름
  - webhook / reference linkage
  - traceability 의미
  - 사내 환경에서 확인할 것 예고
- 시각화 방식: integration flow diagram
- 정보 밀도 가이드: 연결 단계 5개 이상
- 발표자 보강 포인트: OpenProject는 계획과 추적, GitLab은 구현과 승인이라는 구분을 강조한다.
- 실습 / 토론 cue: `work package와 MR이 연결되지 않으면 어떤 보고 공백이 생기는가?`
- 다음 페이지 연결: `이제 실습 흐름과 실패 시나리오를 묶어 운영 관점으로 본다.`

### Page 13
- 슬라이드 제목: `실습 흐름: MR, protected branch, approval, Wiki, OpenProject`
- 페이지 목적: CH05 실습 전반을 한 장에 묶는다.
- 핵심 takeaway: GitLab 운영은 개별 메뉴가 아니라 연결된 정책 세트다.
- 반드시 포함할 내용:
  - MR 생성
  - protected branch 거절 경험
  - approval rule 비교
  - Wiki 운영 점검
  - OpenProject 연동 점검
- 시각화 방식: numbered lab flow
- 정보 밀도 가이드: 단계 5개 이상
- 발표자 보강 포인트: “권한이 불편하다”는 느낌을 운영 설계 언어로 다시 설명한다.
- 실습 / 토론 cue: `실습 중 가장 정책적 사고가 필요한 단계는 무엇인가?`
- 다음 페이지 연결: `이제 자주 만나는 실패 시나리오를 표로 정리한다.`

### Page 14
- 슬라이드 제목: `실무 실패 시나리오: 권한, 승인, merge, 연동`
- 페이지 목적: 대표 실패 시나리오 통합
- 핵심 takeaway: 메뉴가 안 보이거나 merge가 안 되는 문제는 대부분 권한, 정책, pipeline, integration 상태를 같이 봐야 풀린다.
- 반드시 포함할 내용:
  - merge 버튼이 안 보임
  - Developer의 권한 불만
  - approval은 받았는데 문제 발생
  - merge 후 main 파손
  - OpenProject work package 미연결
- 시각화 방식: symptom / cause / first action matrix
- 정보 밀도 가이드: 상황 5개 이상
- 발표자 보강 포인트: 문제를 개인 실수로만 보지 말고 운영 설계 관점에서 읽는다고 설명한다.
- 실습 / 토론 cue: `문제가 났을 때 가장 먼저 확인할 GitLab 정책 항목은 무엇인가?`
- 다음 페이지 연결: `마지막으로 CH05 핵심을 요약하고 conflict lab으로 넘긴다.`

### Page 15
- 슬라이드 제목: `CH05 요약: GitLab은 협업 운영과 통제의 레이어다`
- 페이지 목적: CH05 정리와 CH06 handoff
- 핵심 takeaway: roles, protected branch, approval, MR, Wiki, OpenProject 연동은 모두 위험을 통제하고 추적성을 높이기 위한 구조다.
- 반드시 포함할 내용:
  - 역할 matrix
  - protected branch
  - approval rule
  - MR lifecycle
  - Wiki / repo docs / Pages 구분
  - OpenProject traceability
  - CH06 handoff: conflict / rollback lab
- 시각화 방식: summary grid
- 정보 밀도 가이드: 핵심 포인트 6개 이상
- 발표자 보강 포인트: CH06에서는 이 정책 구조 위에서 실제 conflict와 rollback을 해 본다고 연결한다.
- 실습 / 토론 cue: `우리 팀 운영에서 가장 먼저 손봐야 할 GitLab 정책은 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 팀 단위로 conflict를 만들고 해결하며 rollback을 판단한다.`
