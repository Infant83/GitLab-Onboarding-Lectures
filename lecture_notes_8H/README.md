# Git / GitLab Dense Tutorial 8H

이 폴더는 Git과 GitLab을 실제로 사용할 수 있게 만드는 `8시간 / 8챕터` 통합 교육자료이다.

## 대상

- Owner
- Maintainer
- Developer

주의:

- 이 문서의 `Owner`, `Maintainer`, `Developer`는 GitLab 권한 모델 기준이다.

## 교육 목표

- Git을 명령어 목록이 아니라 `상태 변화 제어 도구`로 이해한다.
- GitLab 협업을 `브랜치 -> MR -> 리뷰 -> 승인 -> 병합 -> 파이프라인 -> 복구` 흐름으로 설명할 수 있다.
- 권한, 승인, protected branch, rollback 같은 운영 판단을 역할별로 구분할 수 있다.
- self-managed GitLab 환경의 제약을 고려해 실무 적용 계획을 세울 수 있다.

## 8시간 구성

1. [01_Course_Foundation_and_Operating_Model.md](./01_Course_Foundation_and_Operating_Model.md)
2. [02_Local_Workflow_and_Core_Commands.md](./02_Local_Workflow_and_Core_Commands.md)
3. [03_History_Inspection_and_Recovery.md](./03_History_Inspection_and_Recovery.md)
4. [04_Branch_Strategy_and_Sync_Decisions.md](./04_Branch_Strategy_and_Sync_Decisions.md)
5. [05_GitLab_Project_Structure_Permissions_and_MR.md](./05_GitLab_Project_Structure_Permissions_and_MR.md)
6. [06_Team_Collaboration_Conflict_and_Rollback_Lab.md](./06_Team_Collaboration_Conflict_and_Rollback_Lab.md)
7. [07_CICD_Quality_Gates_and_Self_Managed_Operations.md](./07_CICD_Quality_Gates_and_Self_Managed_Operations.md)
8. [08_Capstone_Scenario_and_Role_Based_Playbook.md](./08_Capstone_Scenario_and_Role_Based_Playbook.md)

## 튜토리얼 정렬 원칙

- 각 장은 `tutorials`의 동일 번호 `LAB.md`와 1:1로 연결된다.
- 강의 노트 본문만 따라도 학습이 가능하도록, 각 장에는 `시작 상태`, `새로 추가하는 파일`, `실행 순서`, `실수 포인트`, `종료 상태`를 넣는다.
- `LAB.md`는 강사나 실습 진행자가 빠르게 흐름을 확인하는 보조 문서로 본다.
- 따라서 학습자는 본문에서 명령을 실행하고, 필요할 때만 `LAB.md`를 참고한다.

## 장과 튜토리얼 매핑

| Chapter | Lecture Note | Tutorial | 장 종료 시 확보해야 하는 상태 |
| --- | --- | --- | --- |
| CH01 | [01_Course_Foundation_and_Operating_Model.md](./01_Course_Foundation_and_Operating_Model.md) | [01_foundation/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\01_foundation\LAB.md) | seed repo 생성, `origin`/기본 브랜치/권한 확인 |
| CH02 | [02_Local_Workflow_and_Core_Commands.md](./02_Local_Workflow_and_Core_Commands.md) | [02_local_workflow/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\02_local_workflow\LAB.md) | `status -> diff -> add -> commit -> push` 루프 숙달 |
| CH03 | [03_History_Inspection_and_Recovery.md](./03_History_Inspection_and_Recovery.md) | [03_history_recovery/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\03_history_recovery\LAB.md) | 이력 읽기, `stash`, `tag`, `revert`, `bisect` 수행 |
| CH04 | [04_Branch_Strategy_and_Sync_Decisions.md](./04_Branch_Strategy_and_Sync_Decisions.md) | [04_branch_strategy/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\04_branch_strategy\LAB.md) | feature branch 생성, `merge`/`rebase` 비교 |
| CH05 | [05_GitLab_Project_Structure_Permissions_and_MR.md](./05_GitLab_Project_Structure_Permissions_and_MR.md) | [05_gitlab_mr/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\LAB.md) | MR, review, approval, protected branch 이해 |
| CH06 | [06_Team_Collaboration_Conflict_and_Rollback_Lab.md](./06_Team_Collaboration_Conflict_and_Rollback_Lab.md) | [06_conflict_rollback/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\06_conflict_rollback\LAB.md) | conflict 해결, `merge --abort`, `rebase --abort`, `revert` 경험 |
| CH07 | [07_CICD_Quality_Gates_and_Self_Managed_Operations.md](./07_CICD_Quality_Gates_and_Self_Managed_Operations.md) | [07_cicd/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\LAB.md) | `.gitlab-ci.yml`, pipeline 상태, artifact, runner 제약 설명 |
| CH08 | [08_Capstone_Scenario_and_Role_Based_Playbook.md](./08_Capstone_Scenario_and_Role_Based_Playbook.md) | [08_capstone/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\08_capstone\LAB.md) | issue부터 rollback까지 end-to-end 수행 |

## 사용 방법

- 각 챕터는 `개념 설명 -> guided lab -> failure scenario -> 역할별 체크포인트` 순서로 진행한다.
- 강사는 챕터 시작 시 `오늘의 산출물`과 `실패해도 괜찮은 지점`을 먼저 말한다.
- 학습자는 명령어를 실행하기 전에 항상 현재 브랜치, working tree 상태, 원격과 로컬 차이를 먼저 말로 설명한다.
- Owner, Maintainer, Developer는 같은 장을 보되 각자 `역할별 체크포인트` 문단을 중심으로 봐야 한다.
- 각 장이 끝날 때는 `clean working tree 여부`, `현재 branch`, `원격 추적 상태`, `다음 장에서 이어 쓸 파일`까지 함께 확인한다.

## 준비물

- Git 설치
- GitLab 접속 권한
- 교육용 저장소 또는 샌드박스 그룹
- 터미널과 에디터
- 브라우저

## 산출물 기준

- 개인 실습 로그
- 조별 MR 링크
- conflict 해결 기록
- pipeline 결과 스크린샷 또는 로그
- 역할별 운영 체크리스트

## 참고

- 상세 기준본은 [lecture_notes](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\lecture_notes) 에 있다.
- 챕터별 실습 자산은 [tutorials](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials) 에 있다.
