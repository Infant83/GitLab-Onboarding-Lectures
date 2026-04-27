# Git / GitLab 8H Tutorials

이 폴더는 [lecture_notes_8H](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\lecture_notes_8H) 본문과 연결되는 실습 자산 모음이다. 중복을 피하기 위해 `각 챕터에서 새롭게 도입되는 파일`만 넣었다. 이미 앞 장에서 만든 파일은 다시 복제하지 않고, 각 장의 `LAB.md`에서 이전 산출물을 계속 이어 쓰도록 설계했다.

## 공통 시나리오

실습 프로젝트 이름은 `tutorial-collaboration-lab`이다. 특정 업무 도메인 대신 순수 tutorial 목적의 샘플 저장소로 구성했다. 이 시나리오는 문서 협업, 권한, MR, conflict, rollback, pipeline, capstone까지 한 흐름으로 이어지도록 설계했다.

## 진행 원칙

- CH01에서 `seed_repo`를 초기 저장소로 만든다.
- CH02 이후는 `해당 챕터의 신규 파일만` 현재 저장소에 추가한다.
- 앞 장에서 만든 파일은 유지하고, 각 장의 지시에 따라 수정한다.
- 강사는 챕터 시작 전에 `새로 도입되는 파일`과 `이전 챕터에서 이어받는 파일`을 먼저 말한다.

## 챕터별 자산

1. [01_foundation](./01_foundation/LAB.md)
2. [02_local_workflow](./02_local_workflow/LAB.md)
3. [03_history_recovery](./03_history_recovery/LAB.md)
4. [04_branch_strategy](./04_branch_strategy/LAB.md)
5. [05_gitlab_mr](./05_gitlab_mr/LAB.md)
6. [06_conflict_rollback](./06_conflict_rollback/LAB.md)
7. [07_cicd](./07_cicd/LAB.md)
8. [08_capstone](./08_capstone/LAB.md)

## 챕터 연결 요약

- CH01: seed repo 초기화
- CH02: 기본 commit/push 연습용 문서 추가
- CH03: history, tag, revert, bisect용 파일 추가
- CH04: branch 전략과 feature flag 관련 파일 추가
- CH05: MR template, CODEOWNERS, review checklist 추가
- CH06: conflict를 의도적으로 만들기 위한 variant 텍스트 추가
- CH07: `.gitlab-ci.yml`과 build/smoke/test 자산 추가
- CH08: capstone 이슈, 구현 파일, 검증 파일 추가

## 강사 메모

- 이 폴더의 자산은 교육용이다. 실제 배포용 최적화보다 `실습 흐름의 명확성`을 우선한다.
- CH06과 CH08은 일부 파일을 의도적으로 충돌시키거나 실패시키도록 설계되어 있다.
- self-managed GitLab 환경에서는 `.gitlab-ci.yml`, runner, variable 정책만 사내 규칙에 맞게 치환하면 된다.
