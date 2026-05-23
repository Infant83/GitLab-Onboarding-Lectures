# GitLab Onboarding Pages Audit Gates

이 문서는 `GitLab-Onboarding-Lectures/public`을 배포하기 전 확인할 기준이다.

## 1. Content Audit

- GitLab 역할 설명은 공식 문서와 대조한다.
- `Reviewer`는 접근 권한이 아니라 MR 책임으로 설명한다.
- Free/Premium/Ultimate 차이가 있는 기능은 한 문장으로 섞지 않는다.
- self-managed GitLab에서 달라질 수 있는 runner, variable, approval 정책은 운영 노트로 분리한다.
- 기준 문서 확인일을 남긴다.
- 각 챕터는 `목표`, `실습`, `완료 기준`을 가진다.
- 권한 설명은 표보다 상황을 먼저 둔다.

공식 기준 확인일: 2026-05-23

- <https://docs.gitlab.com/user/permissions/>
- <https://docs.gitlab.com/user/project/merge_requests/authorization_for_merge_requests/>
- <https://docs.gitlab.com/user/project/merge_requests/approvals/>
- <https://docs.gitlab.com/user/project/repository/branches/protected/>

## 2. Scenario Audit

- 모든 시나리오는 `role`, `state`, `action`, `result`, `next_action` 관점으로 읽혀야 한다.
- 차단 결과에는 항상 다음 행동이 있어야 한다.
- "권한을 올려 달라"를 기본 답으로 만들지 않는다.
- 위험한 선택지는 왜 위험한지 짧게 설명한다.
- 실제 GitLab 테스트 프로젝트에서 최소 1회 검증한다.
- 정답만 보여주지 않는다. 왜 틀렸는지, 다음에는 어디를 봐야 하는지 남긴다.

## 3. Interaction Audit

- role switcher가 현재 역할, 권한 결과, workflow highlight를 함께 바꾼다.
- action selector가 허용/조건부/차단 결과를 즉시 갱신한다.
- scenario 선택과 선택지 버튼이 피드백을 갱신한다.
- 키보드만으로 select와 button을 조작할 수 있다.
- 모바일 viewport에서 버튼과 문장이 겹치지 않는다.

## 4. Visual Audit

- 색감은 `infant83.github.io`의 warm paper tone과 dark green accent를 따른다.
- GitLab orange/purple는 보조 의미 색으로만 쓰고 화면을 지배하지 않는다.
- section 안에 section-card를 다시 넣는 중첩 구조를 피한다.
- 버튼, tag, select, panel의 border와 radius가 같은 시스템 안에 있어야 한다.
- desktop과 mobile screenshot을 모두 남긴다.

## 5. Editorial Audit

피할 문장:

- "협업 효율성 제공"
- "다양한 옵션 제공"
- "워크플로우 최적화"
- "액션 수행"
- "변경 사항 반영"

권장 문장:

- "누가 merge할 수 있고, 누가 막히는지 확인합니다."
- "feature branch로 push하고 MR을 엽니다."
- "pipeline 실패 원인을 먼저 봅니다."
- "리뷰 코멘트를 고쳐 다시 push합니다."
- "정책을 바꾸면 이유와 원복 조건을 남깁니다."

최종 점검:

- 실제 강사가 읽어도 어색하지 않은가
- 버튼 문구가 행동으로 끝나는가
- 영어 GitLab 용어를 억지로 번역하지 않았는가
- 추상어보다 상황과 판단이 앞에 오는가

## 6. Learner Audit

학습자 관점에서 아래 질문에 답이 보여야 한다.

- 지금 내가 맡은 역할은 무엇인가
- 이 역할에서 바로 할 수 있는 일은 무엇인가
- 막히는 일은 무엇이고, 왜 막히는가
- 막힌 뒤 누구에게 무엇을 넘기는가
- 이 챕터에서 손으로 해보는 파일과 명령은 무엇인가
- 끝났을 때 내가 설명할 수 있어야 하는 문장은 무엇인가

페이지를 훑었을 때 이 질문이 보이지 않으면 섹션을 다시 쓴다. 설명을 늘리는 대신 판단 순서를 더 선명하게 둔다.
