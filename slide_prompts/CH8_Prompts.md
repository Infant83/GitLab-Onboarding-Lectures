# CH08 Execution Prompt

업로드된 `08_Capstone_Scenario_and_Role_Based_Playbook.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH08 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Capstone Scenario and Role-Based Playbook
- 권장 분량: 13 slides
- 강의 시간: 약 1시간
- 목적: issue부터 rollback까지 전 과정을 끊김 없이 수행하는 종합 시나리오를 만든다
- 핵심 축: issue -> branch -> commit -> MR -> review -> approval -> pipeline -> merge -> incident -> rollback -> retrospective
- 핵심 자산:
  - `issues/ISSUE-101-sample-action.md`
  - `src/sample-action.js`
  - `tests/sample-action.test.js`
  - `docs/release-decision-log.md`

## 반드시 반영할 학습 메시지
- CH08은 명령어 종합문제가 아니라 운영 시뮬레이션이다.
- 기능 완료, merge-ready, deploy-ready는 서로 다른 상태다.
- incident 순간에는 즉흥 수정이 아니라 판단 루틴이 먼저다.
- rollback 이후 문서화와 회고까지가 진짜 종료다.

## 시작/종료 상태
- 시작 상태:
  - CH01~CH07 자산이 같은 저장소에 누적된 상태
  - permissions, feature flags, MR template, CODEOWNERS, CI 파일이 이미 존재
- 새로 추가되는 파일:
  - `issues/ISSUE-101-sample-action.md`
  - `src/sample-action.js`
  - `tests/sample-action.test.js`
  - `docs/release-decision-log.md`
- 종료 상태:
  - issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback 흐름을 한 번에 수행 가능
  - 역할별 판단과 회고가 문서로 남음
  - 팀 규칙 초안으로 전환 가능한 운영 문장 확보

## 슬라이드 구성
1. 전체 흐름 연결 선언
2. 앞선 7개 장이 capstone에 재등장하는 방식
3. 시나리오 요구사항과 제약
4. Issue 정의
5. Issue에서 Branch로
6. 개발과 Commit
7. Capstone용 MR 작성
8. 역할별 Review와 Approval
9. Pipeline과 Merge Readiness
10. 사고 주입
11. Hotfix vs Revert
12. 사고 발생 시 역할별 즉시 행동
13. 최종 회고와 현업 전이 체크리스트

## 반드시 반영할 시나리오
- 기능: sample action 버튼 추가
- 조건: role별 노출 차등
- 요구사항:
  - UI 변경
  - 테스트
  - MR
  - approval
  - pipeline success
- 제약:
  - main direct push 금지
  - rollback은 Owner 승인 후
- 사고 주입:
  - 권한 없는 사용자에게 버튼 노출

## 반드시 포함할 명령어 세트
```bash
git switch main
git pull
git switch -c feature/sample-action
git status
git diff
git diff --staged
git add .
git commit -m "feat: add sample action visibility"
git show --stat HEAD
git push -u origin feature/sample-action
git log --oneline
git revert <sha>
git push origin main
```

## 반드시 반영할 역할별 관점

* Owner:

  * merge 최종 승인
  * rollback 승인
  * 운영 영향 판단
* Maintainer:

  * 작업 분해
  * 리뷰 포인트 정의
  * merge readiness 판단
* Developer:

  * 구현
  * 테스트
  * MR 작성
  * 상태 확정

## 반드시 반영할 자산 연결

* issue 내용이 branch 이름과 MR 설명으로 이어져야 함
* sample action 기능이 `permissions`, `feature-flags`, test, pipeline과 연결되어야 함
* `docs/release-decision-log.md`에 사고 판단과 회고가 남아야 함

## 출력 시 주의

* CH08은 앞선 장 요약이 아니라 실제 end-to-end 운영 시나리오로 써라.
* 각 슬라이드에서 역할별 질문이 자연스럽게 드러나야 한다.
* 사고 주입 이후에는 blame보다 안정화와 기준점 회복을 우선하는 언어를 써라.
* 마지막 슬라이드는 교육 종료가 아니라 “팀 규칙 초안 확보”로 마무리하라.

지금 바로 CH08 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH08 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **Capstone Scenario and Role-Based Playbook**
* 권장 분량: **13 pages**
* 목적: issue부터 rollback까지 전 과정을 끊김 없이 수행하는 종합 시나리오를 만든다.
* 핵심 축: issue → branch → commit → MR → review → approval → pipeline → merge → incident → rollback → retrospective
* 주요 자산: `issues/ISSUE-101-sample-action.md`, `src/sample-action.js`, `tests/sample-action.test.js`, `docs/release-decision-log.md`

---

## Page 1. 전체 흐름 연결 선언

* **제목**: 오늘은 전체 흐름을 한 번에 연결한다
* **takeaway**: CH08은 명령어 종합이 아니라 운영 시뮬레이션이다.
* **포함**

  * 기술 흐름 + 운영 흐름
  * 역할별 책임 문장을 말하게 만드는 목표
* **시각화**

  * end-to-end 흐름도
* **노트**

  * “운영 시나리오”라는 말 강조
* **연결**

  * 앞선 7개 장 회상으로 이동

## Page 2. 앞선 7개 장이 capstone에 재등장하는 방식

* **제목**: 이전 7개 장을 capstone에서 다시 쓰기
* **takeaway**: capstone은 새로운 내용이 아니라 앞선 장의 연결 실습이다.
* **포함**

  * CH01~CH07 핵심 산출물과 재사용 위치
  * permissions, feature-flags, MR template, CODEOWNERS, CI 파일 연결
* **시각화**

  * 챕터 ↔ capstone 단계 매핑표
* **노트**

  * 이미 준비된 자산이 어떻게 연결되는지 명확히 설명
* **연결**

  * 시나리오 요구사항으로 이동

## Page 3. 시나리오 요구사항과 제약

* **제목**: 기능 요구와 운영 제약을 동시에 이해하기
* **takeaway**: 기능 완료와 운영 허가는 서로 다른 조건을 가진다.
* **포함**

  * sample action 버튼 추가
  * role별 노출 차등
  * 테스트 / MR / approval / pipeline success 필요
  * main direct push 금지
  * rollback은 Owner 승인 후
* **시각화**

  * 기능 카드 vs 운영 정책 카드
* **노트**

  * 기능 완료 ≠ merge-ready ≠ deploy-ready
* **연결**

  * issue 정의로 이동

## Page 4. Issue 정의

* **제목**: issue를 제대로 정의하면 branch와 MR이 깨끗해진다
* **takeaway**: 문제 정의가 흐리면 뒤 모든 산출물이 넓고 흐려진다.
* **포함**

  * 목적
  * 범위
  * 제외 범위
  * 테스트 포인트
  * 배포 영향
  * rollback 기준
  * feature flag 여부
* **시각화**

  * issue template 카드 + 화살표
* **노트**

  * 모호한 issue가 왜 큰 branch와 엉킨 MR을 만드는지 설명
* **연결**

  * branch 전략으로 이동

## Page 5. Issue에서 Branch로

* **제목**: 요구사항을 안전한 작업 단위로 바꾸기
* **takeaway**: branch는 기능 요청을 실행 가능한 범위로 자르는 첫 번째 도구다.
* **포함**

  * `git switch main`
  * `git pull`
  * `git switch -c feature/sample-action`
  * 이 branch에 넣지 말아야 할 unrelated change
* **시각화**

  * issue → feature branch 그림
* **노트**

  * default branch가 항상 `main`은 아닐 수 있음을 발표자 노트에 분리
* **연결**

  * 개발과 commit으로 이동

## Page 6. 개발과 Commit

* **제목**: scope를 지키는 commit이 capstone 품질을 결정한다
* **takeaway**: 기능 구현보다 변경 범위를 정확히 통제하는 것이 더 중요할 수 있다.
* **포함**

  * `src/sample-action.js`
  * `tests/sample-action.test.js`
  * permissions / feature flag 연계 가능성
  * `git diff`
  * `git diff --staged`
  * `git show --stat HEAD`
* **시각화**

  * 파일 자산 맵 + commit 전 검증 루틴
* **노트**

  * `git add .` 전에 반드시 범위를 눈으로 확인하라고 강조
* **연결**

  * MR 작성으로 이동

## Page 7. Capstone용 MR 작성

* **제목**: 코드 변경을 리뷰 가능한 문서로 번역하기
* **takeaway**: MR은 코드를 제출하는 곳이 아니라 의도와 검증 범위를 제출하는 곳이다.
* **포함**

  * 목적
  * 변경 범위
  * 테스트 결과
  * 리뷰 포인트
  * 배포 영향
  * role별 노출 기준
  * rollback 방법
  * 스크린샷 / 로그
* **시각화**

  * MR 본문 mockup + checklist
* **노트**

  * Developer 역할은 코드 + 설명 + 검증 범위 제출까지 포함됨
* **연결**

  * review / approval로 이동

## Page 8. 역할별 Review와 Approval

* **제목**: Maintainer와 Owner는 같은 MR을 다르게 본다
* **takeaway**: 리뷰 관점과 승인 관점이 다르다는 점이 운영 품질을 만든다.
* **포함**

  * Maintainer: 요구사항, 범위, 테스트 누락
  * Owner: 운영 영향, rollback 가능성, merge 시점
  * Developer가 미리 답해야 할 항목
* **시각화**

  * 2열 질문 카드
* **노트**

  * approval을 통과 의례처럼 다루면 안 된다는 메시지
* **연결**

  * pipeline / merge readiness로 이동

## Page 9. Pipeline과 Merge Readiness

* **제목**: approved but not ready 상태를 구분하기
* **takeaway**: 승인됐더라도 최신 pipeline, artifact, 권한 시나리오 검증이 필요하다.
* **포함**

  * success / failed / pending
  * artifact 확인
  * 최신 commit 기준 pipeline인지
  * role별 노출 시나리오 검증 여부
* **시각화**

  * merge readiness checklist
* **노트**

  * green pipeline은 필요조건이지 충분조건이 아님을 반복
* **연결**

  * incident injection으로 이동

## Page 10. 사고 주입

* **제목**: 권한 없는 사용자에게 버튼이 노출됐다
* **takeaway**: incident 순간에는 즉흥 수정이 아니라 판단 루틴이 먼저다.
* **포함**

  * 잘못된 권한 노출 발견
  * hotfix vs revert 질문
  * 배포 중지 여부는 누가 판단하는가
  * 로그 확인 vs 즉시 복구 우선순위
* **시각화**

  * 사고 배너 + 즉시 질문 3개
* **노트**

  * blame보다 서비스 안정화와 기준점 회복이 우선
* **연결**

  * hotfix vs revert decision으로 이동

## Page 11. Hotfix vs Revert

* **제목**: 지금 무엇이 더 안전한가
* **takeaway**: 공유 이력에서는 revert가 기본 프레임이고, hotfix는 맥락에 따라 추가 선택이다.
* **포함**

  * 사용자 영향 발생 여부
  * rollback이 더 빠른가
  * hotfix가 더 작은가
  * Owner 승인과 커뮤니케이션
* **시각화**

  * decision tree
* **노트**

  * shared history에서 revert가 기본인 이유를 release 운영 관점으로 설명
* **연결**

  * 역할별 즉시 행동으로 이동

## Page 12. 사고 발생 시 역할별 즉시 행동

* **제목**: Owner / Maintainer / Developer playbook
* **takeaway**: 같은 incident라도 역할별 첫 행동은 달라야 한다.
* **포함**

  * Owner: 영향 범위, rollback 여부 결정
  * Maintainer: 문제 branch/commit 정리, 검증 누락 기록
  * Developer: `status`, `branch -vv`, `log`, `show`로 상태 확정
  * `docs/release-decision-log.md` 기록
* **시각화**

  * 3열 role-based playbook
* **노트**

  * 각 역할의 언어가 다르게 들리도록 작성
* **연결**

  * 최종 회고와 현업 전이로 이동

## Page 13. 최종 회고와 현업 전이 체크리스트

* **제목**: 교육 내용을 팀 규칙 초안으로 바꾸기
* **takeaway**: capstone의 끝은 실습 종료가 아니라 팀 운영 규칙 언어 확보다.
* **포함**

  * 브랜치 보호 정책
  * MR 템플릿
  * approval rule
  * runner 관리 책임
  * rollback 기준 문서화
  * 장애 커뮤니케이션 채널
  * sync 전략
  * release tag 운영
  * 우리가 말할 수 있어야 하는 3문장
* **시각화**

  * 상단 3문장, 하단 체크리스트
* **노트**

  * 마무리 문장:

    * 나는 지금 어떤 상태에 있는지 안다.
    * 팀은 내 변경을 어떻게 반영하는지 안다.
    * 문제 시 어디서부터 복구할지 안다.
* **연결**

  * 교육 종료 슬라이드로 완결
