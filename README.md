# GitLab / Git Training Manual Rebuild

이 저장소는 Git과 GitLab 교육자료를 `실습 중심`, `협업 중심`, `운영 판단 중심`으로 다시 구성하기 위한 작업 공간이다. 목표는 명령어 나열형 매뉴얼이 아니라, 사내 팀장, PL, Developer가 같은 교육자료를 보되 각자 다른 판단 기준을 가져갈 수 있는 내부 교육 패키지를 만드는 것이다.

## 기준 폴더

- [lecture_notes](./lecture_notes)
  - 현재 상세 기준본
  - 16개 챕터로 구성된 확장형 lecture notes
- [lecture_notes_8H](./lecture_notes_8H)
  - 8시간 교육 운영을 위한 8챕터 dense tutorial 트랙
  - 실제 교육 본문은 루트의 8개 챕터 문서, 기존 스캐폴드는 `plans/` 에 보관

`lecture_notes/`는 16챕터 기준본으로 유지하고, `lecture_notes_8H/`는 이를 실습 밀도가 높은 8챕터 운영본으로 재구성한 별도 트랙으로 운영한다.

## 재구성 목표

- Git 개념을 `상태 변화`와 `작업 흐름`으로 설명하기
- GitLab 협업을 `브랜치`, `MR`, `review`, `approval`, `conflict`, `rollback`까지 실제로 수행하게 만들기
- 팀장, PL, Developer의 체크포인트를 같은 문서 안에서 병렬로 제공하기
- self-managed GitLab 운영 제약과 CI/CD 품질 게이트까지 연결하기
- 이후 Skywork 기반 PPT 제작의 입력 자료로 바로 쓸 수 있게 구조화하기

## 학습자가 최종적으로 할 수 있어야 하는 것

- `repository`, `origin`, `main`, `HEAD`, `working tree`, `staging area`, `commit history` 관계를 설명할 수 있다.
- `clone`, `status`, `add`, `commit`, `push`, `pull`, `fetch`, `branch`, `switch`, `checkout`, `merge`, `rebase`, `stash`, `log`, `show`, `tag`, `bisect`, `revert`를 상황에 맞게 사용할 수 있다.
- GitLab에서 `Owner`, `Maintainer`, `Developer`, `Guest` 권한 차이를 설명할 수 있다.
- MR 생성, 리뷰, 승인, conflict 해결, rollback까지 조별로 수행할 수 있다.
- `.gitlab-ci.yml`, pipeline, artifact, runner, self-managed GitLab 제약을 기본 수준에서 해석할 수 있다.

## 저장소 구조

- `lecture_notes/`
  - 16개 챕터 상세 기준본
- `lecture_notes_8H/`
  - 8챕터 / 8시간 운영용 재구성 트랙
- `tutorials/`
  - `lecture_notes_8H/`와 연결되는 챕터별 신규 실습 자산
  - 각 장에서 새로 도입되는 파일만 넣고, 앞 장 산출물을 이어 쓰는 구조
- `lecture_note/`
  - 버전 패키징, Ralph loop, Skywork 산출물 보관
- `output/`
  - 개별 생성물, 슬라이드, PDF 등 보조 산출물

## 현재 상세 기준본: 16개 챕터

1. [01_Why_GitLab_MLOps.md](./lecture_notes/01_Why_GitLab_MLOps.md)
2. [02_Getting_Started.md](./lecture_notes/02_Getting_Started.md)
3. [03_Daily_Workflow.md](./lecture_notes/03_Daily_Workflow.md)
4. [04_Collaboration_Fundamentals.md](./lecture_notes/04_Collaboration_Fundamentals.md)
5. [05_Branching_and_Merge_Strategy.md](./lecture_notes/05_Branching_and_Merge_Strategy.md)
6. [06_Merge_Request_and_Code_Review.md](./lecture_notes/06_Merge_Request_and_Code_Review.md)
7. [07_Conflict_and_Rollback.md](./lecture_notes/07_Conflict_and_Rollback.md)
8. [08_Project_Planning_and_Orchestration.md](./lecture_notes/08_Project_Planning_and_Orchestration.md)
9. [09_Repository_Standards.md](./lecture_notes/09_Repository_Standards.md)
10. [10_Automation_Basics.md](./lecture_notes/10_Automation_Basics.md)
11. [11_MLOps_Expansion_Path.md](./lecture_notes/11_MLOps_Expansion_Path.md)
12. [12_Troubleshooting_and_FAQ.md](./lecture_notes/12_Troubleshooting_and_FAQ.md)
13. [13_Internal_GitLab_Environment_Adaptation.md](./lecture_notes/13_Internal_GitLab_Environment_Adaptation.md)
14. [14_Learning_Routes_for_Developer_and_PM.md](./lecture_notes/14_Learning_Routes_for_Developer_and_PM.md)
15. [15_Command_Relationships_and_Diagnostics.md](./lecture_notes/15_Command_Relationships_and_Diagnostics.md)
16. [16_Group_Workshop_MR_Approval_Conflict_Lab.md](./lecture_notes/16_Group_Workshop_MR_Approval_Conflict_Lab.md)

## 8H 트랙 방향

8H는 요약판이 아니다. 16개 챕터를 8개 대챕터로 재구성하고, 각 챕터 안에 더 많은 실습, failure scenario, 역할별 체크포인트를 넣은 dense tutorial 운영본이다.

현재 본문 문서:

- [lecture_notes_8H/README.md](./lecture_notes_8H/README.md)

실제 8개 챕터:

1. [01_Course_Foundation_and_Operating_Model.md](./lecture_notes_8H/01_Course_Foundation_and_Operating_Model.md)
2. [02_Local_Workflow_and_Core_Commands.md](./lecture_notes_8H/02_Local_Workflow_and_Core_Commands.md)
3. [03_History_Inspection_and_Recovery.md](./lecture_notes_8H/03_History_Inspection_and_Recovery.md)
4. [04_Branch_Strategy_and_Sync_Decisions.md](./lecture_notes_8H/04_Branch_Strategy_and_Sync_Decisions.md)
5. [05_GitLab_Project_Structure_Permissions_and_MR.md](./lecture_notes_8H/05_GitLab_Project_Structure_Permissions_and_MR.md)
6. [06_Team_Collaboration_Conflict_and_Rollback_Lab.md](./lecture_notes_8H/06_Team_Collaboration_Conflict_and_Rollback_Lab.md)
7. [07_CICD_Quality_Gates_and_Self_Managed_Operations.md](./lecture_notes_8H/07_CICD_Quality_Gates_and_Self_Managed_Operations.md)
8. [08_Capstone_Scenario_and_Role_Based_Playbook.md](./lecture_notes_8H/08_Capstone_Scenario_and_Role_Based_Playbook.md)

기존 계획 및 chapter mapping 문서:

- [lecture_notes_8H/plans/README.md](./lecture_notes_8H/plans/README.md)
- [lecture_notes_8H/plans/00_8H_Curriculum_Plan.md](./lecture_notes_8H/plans/00_8H_Curriculum_Plan.md)

## 교육 설계 원칙

- 명령어는 항상 `왜`, `언제`, `실행 후 무엇이 바뀌는가`를 함께 설명한다.
- `fetch -> 비교 -> merge/rebase 판단` 같은 운영 루틴을 습관으로 만든다.
- 에러와 실패는 부록이 아니라 핵심 교육 포인트로 다룬다.
- 협업은 개념이 아니라 역할이 갈리는 실제 흐름으로 설계한다.
- self-managed GitLab 환경 차이를 별도 운영 관점으로 설명한다.

## 다음 작업

1. `lecture_notes_8H/` 기준으로 Skywork 슬라이드 source pack 구성
2. 챕터별 실습 리포지토리 구조와 샌드박스 데이터셋 구체화
3. 역할별 평가표와 강사용 진행 스크립트 분리
