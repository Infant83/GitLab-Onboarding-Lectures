# CH08 Page-Level Prompt

이 문서는 `CH08-Capstone-Scenario-and-Role-Based-Playbook_lecture-note.md`를 source of truth로 사용하는 CH08 전용 page prompt다.

## 챕터 개요

- 챕터명: `Capstone Scenario and Role-Based Playbook`
- 권장 분량: `15 pages`
- 목적: issue부터 branch, MR, approval, pipeline, conflict, rollback, OpenProject, MLOps 확장까지 전체 흐름을 한 번에 연결한다.
- 핵심 축:
  - end-to-end scenario
  - team roles
  - traceability
  - deploy readiness
  - incident response
  - code rollback vs model rollback
  - OpenProject integration variant
- 주요 자산:
  - issue / work package references
  - `src/permissions.js`
  - pipeline / approval checkpoints
  - rollback decision points

## CH08 고유 규칙

- CH08은 종합 장이므로 앞선 7개 장을 자연스럽게 참조해야 한다.
- 흐름은 `계획 -> 구현 -> review -> approval -> pipeline -> release -> incident -> rollback`으로 명확히 보여 준다.
- 역할별 플레이북은 실제 행동 문장으로 써야 한다.
- MLOps variant와 OpenProject variant는 별도 페이지로 분리한다.
- 마지막은 강의 종료용이 아니라 현업 전이용 체크리스트여야 한다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `GitLab 협업 전체 흐름을 하나로 연결하는 capstone`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 이번 장은 앞선 7개 장의 개념과 실습을 하나의 운영 시나리오로 통합하는 장이다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 end-to-end workflow visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - traceability
    - role-based playbook
    - incident and rollback
    - OpenProject / MLOps variant
- 시각화 방식: cover hero + preview + CH08 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보는 유지
- 발표자 보강 포인트: 이 장은 복습이 아니라 통합 운영 판단 훈련이라고 설명한다.
- 실습 / 토론 cue: `앞선 장 중 실제 현업에서 가장 약한 연결고리는 무엇이라고 느끼는가?`
- 다음 페이지 연결: `먼저 capstone 전체 지도를 본다.`

### Page 2
- 슬라이드 제목: `end-to-end capstone map`
- 페이지 목적: 전체 시나리오 개요 제시
- 핵심 takeaway: issue 또는 work package에서 시작한 변경은 branch, MR, pipeline, release, rollback까지 이어진다.
- 반드시 포함할 내용:
  - issue / work package
  - branch
  - commit
  - MR
  - approval
  - pipeline
  - deploy
  - rollback
- 시각화 방식: full lifecycle timeline
- 정보 밀도 가이드: 단계 8개 이상
- 발표자 보강 포인트: 각 단계가 어느 챕터와 연결되는지 짚어 준다.
- 실습 / 토론 cue: `지금 이 흐름에서 가장 불투명한 단계는 무엇인가?`
- 다음 페이지 연결: `이제 팀 역할을 시나리오 안에 배치한다.`

### Page 3
- 슬라이드 제목: `팀 역할을 시나리오 안에 배치하기`
- 페이지 목적: role-based capstone 설명
- 핵심 takeaway: Owner, Maintainer, Developer는 같은 흐름 안에서도 서로 다른 판단을 담당한다.
- 반드시 포함할 내용:
  - Owner 역할
  - Maintainer 역할
  - Developer 역할
  - Guest 또는 관찰자 역할이 있다면 제한적으로 표현
- 시각화 방식: role swimlane
- 정보 밀도 가이드: 역할별 주요 행동 3개 이상
- 발표자 보강 포인트: 역할 구분이 승인 책임과 위험 관리에 어떻게 연결되는지 설명한다.
- 실습 / 토론 cue: `이번 시나리오에서 가장 위험한 승인 지점은 어디인가?`
- 다음 페이지 연결: `이제 traceability를 만드는 첫 단계인 issue/work package 연결을 본다.`

### Page 4
- 슬라이드 제목: `issue 또는 work package에서 branch와 MR로 연결하기`
- 페이지 목적: traceability 시작점 설명
- 핵심 takeaway: 계획과 구현을 연결하는 reference가 있어야 나중에 승인과 복구의 근거가 남는다.
- 반드시 포함할 내용:
  - issue / work package reference
  - branch naming 연결
  - MR description 연결
  - 추적 가능성 의미
- 시각화 방식: traceability chain
- 정보 밀도 가이드: 연결 지점 4개 이상
- 발표자 보강 포인트: “왜 이 변경을 했는가”를 나중에 설명 가능하게 만드는 구조라고 설명한다.
- 실습 / 토론 cue: `branch와 MR에 work item reference가 없으면 어떤 공백이 생기는가?`
- 다음 페이지 연결: `이제 branch와 MR을 통해 review/approval로 들어간다.`

### Page 5
- 슬라이드 제목: `branch -> MR -> review -> approval -> merge`
- 페이지 목적: CH04~CH05 흐름 통합
- 핵심 takeaway: 구현은 branch에서 이루어지지만, 반영 여부는 MR과 approval 체계 안에서 결정된다.
- 반드시 포함할 내용:
  - branch 생성
  - commit 품질
  - MR 생성
  - review
  - approval
  - protected branch / merge
- 시각화 방식: gated merge flow
- 정보 밀도 가이드: 단계별 질문을 같이 넣는다.
- 발표자 보강 포인트: Git 명령과 GitLab 운영 정책이 만나는 지점이라고 설명한다.
- 실습 / 토론 cue: `이 흐름에서 가장 먼저 드러나야 할 품질 증거는 무엇인가?`
- 다음 페이지 연결: `이제 conflict와 recovery 포인트를 중간에 끼워 넣는다.`

### Page 6
- 슬라이드 제목: `conflict가 생겼을 때 capstone 흐름은 어떻게 흔들리는가`
- 페이지 목적: CH06 연결
- 핵심 takeaway: conflict는 branch/MR 흐름을 멈추게 하며, 누가 언제 개입해야 하는지 명확해야 한다.
- 반드시 포함할 내용:
  - conflict 발생 지점
  - 분석
  - 해결
  - 검증
  - 재승인 필요 여부
- 시각화 방식: lifecycle interruption diagram
- 정보 밀도 가이드: 끊긴 흐름과 복원 흐름을 같이 보여 준다.
- 발표자 보강 포인트: conflict 해결 후에는 테스트와 review가 다시 필요할 수 있음을 강조한다.
- 실습 / 토론 cue: `conflict 해결 후 approval을 다시 받아야 하는 상황은 언제인가?`
- 다음 페이지 연결: `이제 pipeline과 deploy readiness로 이동한다.`

### Page 7
- 슬라이드 제목: `pipeline과 deploy readiness를 최종 판단에 연결하기`
- 페이지 목적: CH07 연결
- 핵심 takeaway: merge가 끝나도 pipeline, artifact, report, readiness 기준을 통과해야 release 판단이 가능하다.
- 반드시 포함할 내용:
  - pipeline status
  - artifact / report
  - readiness checklist
  - merge 후 확인
- 시각화 방식: readiness gate flow
- 정보 밀도 가이드: checklist 4개 이상
- 발표자 보강 포인트: success badge만 보고 배포 가능으로 단정하지 않는다고 설명한다.
- 실습 / 토론 cue: `pipeline success인데 release를 멈춰야 하는 경우는 무엇인가?`
- 다음 페이지 연결: `이제 incident 발생 시 rollback 판단으로 넘어간다.`

### Page 8
- 슬라이드 제목: `incident 발생 시 code rollback, config rollback, model rollback`
- 페이지 목적: 복구 유형 분리
- 핵심 takeaway: 문제 원인에 따라 되돌려야 하는 대상이 코드, 설정, 모델 중 달라질 수 있다.
- 반드시 포함할 내용:
  - code rollback
  - config rollback
  - model rollback
  - 선택 기준
  - 승인 책임
- 시각화 방식: rollback decision matrix
- 정보 밀도 가이드: 대상, 신호, 첫 행동 3열 이상
- 발표자 보강 포인트: rollback은 하나의 버튼이 아니라 대상 선택 문제라고 설명한다.
- 실습 / 토론 cue: `모델 성능 저하와 서비스 장애는 rollback 대상이 어떻게 달라지는가?`
- 다음 페이지 연결: `이제 OpenProject variant를 capstone 안에 넣는다.`

### Page 9
- 슬라이드 제목: `OpenProject 연동 capstone variant`
- 페이지 목적: work package traceability 확장
- 핵심 takeaway: 계획과 구현 도구를 연결하면 변경의 이유, 상태, 승인 근거를 끝까지 추적할 수 있다.
- 반드시 포함할 내용:
  - work package
  - branch reference
  - MR reference
  - webhook / pipeline status
  - merge 후 상태 반영
- 시각화 방식: OpenProject <-> GitLab traceability diagram
- 정보 밀도 가이드: 단계 5개 이상
- 발표자 보강 포인트: PM/Owner 시점에서 가시성이 어떻게 좋아지는지 설명한다.
- 실습 / 토론 cue: `연동이 끊기면 어떤 운영 보고가 가장 먼저 무너지는가?`
- 다음 페이지 연결: `이제 MLOps variant로 확장한다.`

### Page 10
- 슬라이드 제목: `MLOps capstone variant: 모델 승격과 rollback`
- 페이지 목적: model lifecycle 확장
- 핵심 takeaway: 모델 운영에서는 코드 merge와 별도로 평가, registry, promotion, rollback 판단이 필요하다.
- 반드시 포함할 내용:
  - training / evaluation
  - model artifact
  - model registry
  - promotion
  - model rollback
- 시각화 방식: MLOps extension flow
- 정보 밀도 가이드: 단계 5개 이상
- 발표자 보강 포인트: CH07의 MLOps 확장이 이 장에서 의사결정 시나리오로 구체화된다고 설명한다.
- 실습 / 토론 cue: `모델만 되돌리고 코드는 유지해야 하는 상황은 언제인가?`
- 다음 페이지 연결: `이제 incident 시 각 역할이 어떻게 즉시 행동해야 하는지 본다.`

### Page 11
- 슬라이드 제목: `사고 발생 시 역할별 즉시 행동`
- 페이지 목적: role-based incident playbook
- 핵심 takeaway: 사고 대응은 누가 무엇을 먼저 해야 하는지가 정해져 있어야 속도가 난다.
- 반드시 포함할 내용:
  - Owner immediate actions
  - Maintainer immediate actions
  - Developer immediate actions
  - communication / approval / rollback 관계
- 시각화 방식: role playbook board
- 정보 밀도 가이드: 역할별 행동 3개 이상
- 발표자 보강 포인트: 동일한 정보를 모두가 다 볼 필요는 없지만, 기준은 공유되어야 한다고 설명한다.
- 실습 / 토론 cue: `incident 초기에 가장 먼저 결정해야 할 것은 무엇인가?`
- 다음 페이지 연결: `이제 이 capstone을 어떻게 평가할지 본다.`

### Page 12
- 슬라이드 제목: `최종 평가 루브릭`
- 페이지 목적: 교육 평가 기준 제시
- 핵심 takeaway: 좋은 capstone은 코드 완성도만이 아니라 traceability, review, rollback readiness까지 갖춘다.
- 반드시 포함할 내용:
  - branch hygiene
  - MR quality
  - approval / policy adherence
  - pipeline / readiness
  - rollback 판단
  - role collaboration
- 시각화 방식: scoring rubric table
- 정보 밀도 가이드: 평가 항목 5개 이상
- 발표자 보강 포인트: 결과물만 보지 말고 판단 과정을 평가해야 한다고 설명한다.
- 실습 / 토론 cue: `우리 팀 기준으로 가장 중요한 루브릭 항목은 무엇인가?`
- 다음 페이지 연결: `이제 현업 전이 체크리스트로 마무리한다.`

### Page 13
- 슬라이드 제목: `현업 전이 체크리스트`
- 페이지 목적: 교육 내용을 실무로 옮기는 기준 제시
- 핵심 takeaway: 수업에서 배운 내용을 실제 저장소와 정책에 옮기려면 구체적 운영 질문으로 번역해야 한다.
- 반드시 포함할 내용:
  - roles
  - branch strategy
  - MR / approval
  - runner / pipeline
  - Pages / Wiki / OpenProject
  - rollback / incident rule
- 시각화 방식: operational checklist
- 정보 밀도 가이드: 항목 6개 이상
- 발표자 보강 포인트: “좋은 수업이었다”보다 “내 저장소에서 무엇을 바꿀지”로 끝내야 한다고 설명한다.
- 실습 / 토론 cue: `내 프로젝트에 바로 적용할 한 가지 규칙은 무엇인가?`
- 다음 페이지 연결: `마지막으로 흔한 실패와 전체 메시지를 정리한다.`

### Page 14
- 슬라이드 제목: `사람들이 마지막까지 자주 실수하는 포인트`
- 페이지 목적: common pitfalls 정리
- 핵심 takeaway: 도구보다 운영 규칙이 약하면 같은 실수가 반복된다.
- 반드시 포함할 내용:
  - commit과 GitLab 반영 혼동
  - pull 남용
  - force push / reset 경계
  - approval 형식화
  - pipeline success 과신
  - 문서 위치 혼동
- 시각화 방식: pitfalls grid
- 정보 밀도 가이드: 실수 6개 이상
- 발표자 보강 포인트: 교육 종료 시점에서 가장 재발률이 높은 실수를 경고한다.
- 실습 / 토론 cue: `지금 내 습관에서 가장 위험한 것은 무엇인가?`
- 다음 페이지 연결: `이제 전체 코스를 마무리한다.`

### Page 15
- 슬라이드 제목: `CH08 요약: 협업, 통제, 추적, 복구를 하나의 운영 흐름으로 본다`
- 페이지 목적: CH08과 전체 코스 최종 정리
- 핵심 takeaway: 좋은 GitLab 운영은 명령어, 역할, 승인, 파이프라인, 문서, 복구가 하나의 체계로 맞물려야 가능하다.
- 반드시 포함할 내용:
  - end-to-end flow
  - role playbook
  - OpenProject traceability
  - MLOps variant
  - incident / rollback
  - 현업 적용 메시지
- 시각화 방식: final course map
- 정보 밀도 가이드: 코스 전 구간을 6개 이상 핵심 축으로 요약
- 발표자 보강 포인트: 수업이 끝난 뒤에도 저장소 운영 규칙으로 남아야 의미가 있다고 정리한다.
- 실습 / 토론 cue: `이제 실제 프로젝트에서 가장 먼저 표준화할 운영 규칙은 무엇인가?`
- 다음 페이지 연결: `강의 종료`
