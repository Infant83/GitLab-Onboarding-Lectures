# CH05 Execution Prompt

업로드된 `05_GitLab_Project_Structure_Permissions_and_MR.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH05 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: GitLab Project Structure, Permissions, and MR
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: GitLab을 웹 저장소가 아니라 협업 운영 시스템으로 이해시킨다
- 핵심 축: roles, protected branches, approvals, MR lifecycle, CODEOWNERS
- 핵심 자산:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`

## 반드시 반영할 학습 메시지
- Git skill과 GitLab 운영 능력은 다르다.
- protected branch는 사람을 못 믿어서가 아니라 운영 사고를 줄이기 위해 필요하다.
- approval은 기록 가능한 검토 강제 장치다.
- MR description은 review와 rollback을 돕는 운영 문서다.

## 시작/종료 상태
- 시작 상태:
  - CH04의 feature branch와 branch 계획이 이미 존재
- 새로 추가되는 파일:
  - `.gitlab/merge_request_templates/standard.md`
  - `CODEOWNERS`
  - `docs/review-checklist.md`
- 종료 상태:
  - 권한 부족, 승인 부족, pipeline 부족, conflict 부족(=없음) 문제가 각각 어떻게 다른지 설명 가능
  - CH06 conflict lab에 바로 진입할 준비 완료

## 슬라이드 구성
1. Git skill과 GitLab 운영은 다르다
2. GitLab 프로젝트 구조에서 실제로 볼 것
3. Role Matrix: Guest / Developer / Maintainer / Owner
4. Protected Branch
5. Approval Rule
6. MR Lifecycle
7. 좋은 MR의 기준
8. CODEOWNERS와 Review Checklist
9. Reviewer vs Approver
10. 실습: MR 생성과 direct push 거절 경험
11. merge 버튼이 안 보일 때 troubleshooting
12. 장 정리 + CH06 handoff

## 반드시 포함할 요소
- 역할별 책임
- protected branch의 목적
- approval 없는 저장소 / 1인 approval / 특정 role approval 비교 관점
- reviewer와 approver의 차이
- MR 본문에 들어가야 할 항목:
  - 목적
  - 변경 범위
  - 테스트
  - 리뷰 포인트
  - 배포 영향
  - rollback 기준
- MR template / CODEOWNERS / checklist의 연결

## 실습 슬라이드에 반드시 포함할 명령어 및 파일
```bash
git add .gitlab CODEOWNERS docs/review-checklist.md
git commit -m "docs: add MR standards and review checklist"
```

파일:

* `.gitlab/merge_request_templates/standard.md`
* `CODEOWNERS`
* `docs/review-checklist.md`

## failure / troubleshooting 슬라이드에 반드시 넣을 것

* 권한 부족
* approval 부족
* pipeline 실패
* conflict
* base branch stale
* “merge 가능”과 “merge해야 함”은 다르다

## 출력 시 주의

* CH05는 GitLab UI 기능 소개가 아니라 운영 통제 설계 장으로 보여야 한다.
* 작은 팀에서는 reviewer와 approver가 겹칠 수 있지만 개념적으로는 다르다는 점을 분명히 하라.
* direct push 거절은 Git 오류가 아니라 GitLab 정책 집행으로 해석하게 만들어라.
* 마지막 슬라이드는 CH06의 role play conflict lab로 긴장감 있게 연결하라.

지금 바로 CH05 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH05 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **GitLab Project Structure, Permissions, and MR**
* 권장 분량: **12 pages**
* 목적: GitLab을 웹 저장소가 아니라 협업 운영 시스템으로 이해시킨다.
* 핵심 축: roles, protected branches, approvals, MR lifecycle, CODEOWNERS
* 주요 자산: `.gitlab/merge_request_templates/standard.md`, `CODEOWNERS`, `docs/review-checklist.md`

---

## Page 1. Git skill과 GitLab 운영은 다르다

* **제목**: Git을 혼자 쓰는 것과 GitLab을 운영하는 것은 다르다
* **takeaway**: 팀 협업에는 권한, 보호 정책, 승인, 감사 가능성이 별도의 층위로 필요하다.
* **포함**

  * Git layer vs GitLab operations layer
  * 왜 별도 운영 레이어가 필요한가
* **시각화**

  * 2층 구조 그림
* **노트**

  * “누가 merge를 허가하는가”까지가 협업의 일부라는 점 강조
* **연결**

  * 프로젝트 구조 체크포인트로 이동

## Page 2. GitLab 프로젝트 구조에서 실제로 볼 것

* **제목**: GitLab UI를 운영 체크포인트로 읽기
* **takeaway**: UI는 기능 목록이 아니라 운영 상태를 확인하는 대시보드다.
* **포함**

  * Members
  * default branch
  * protected branches
  * approvals
  * merge requests
  * pipeline / runner / variables
* **시각화**

  * GitLab 화면 placeholder + callout
* **노트**

  * 어디를 클릭하느냐보다 왜 그 항목을 보느냐 설명
* **연결**

  * roles matrix로 이동

## Page 3. Role Matrix

* **제목**: Guest / Developer / Maintainer / Owner를 책임으로 읽기
* **takeaway**: 권한 차이는 기능 접근보다 반영 책임과 운영 범위를 보여준다.
* **포함**

  * 열람 / 작업 / merge / 정책 / 멤버십 책임
  * highest-role 개념
* **리서치**

  * GitLab permissions 모델
* **시각화**

  * matrix 표
* **노트**

  * 실력보다 책임 축으로 설명
* **연결**

  * protected branch로 이동

## Page 4. Protected Branch

* **제목**: protected branch는 왜 필요한가
* **takeaway**: 보호 브랜치는 사람을 불신해서가 아니라 운영 사고를 줄이기 위해 존재한다.
* **포함**

  * `main`/release branch 보호
  * direct push 방지
  * 승인/검증 없는 반영 차단
  * auditability
* **시각화**

  * 위험 시나리오 vs 보호 장치
* **노트**

  * hotfix 예외가 있더라도 일반 규칙과 예외 절차는 분리해야 한다
* **연결**

  * approval rule로 이동

## Page 5. Approval Rule

* **제목**: merge 전에 무엇을 강제할 것인가
* **takeaway**: approval은 완전한 무결성 보장이 아니라 기록 가능한 검토 강제 장치다.
* **포함**

  * optional vs required approval
  * 기술 / 보안 / 운영 승인 예시
  * reviewer와의 차이 예고
* **리서치**

  * MR approvals 기본 개념
* **시각화**

  * 승인 단계 구조
* **노트**

  * 티어/버전 차이는 발표자 노트에서만 짧게
* **연결**

  * MR lifecycle로 이동

## Page 6. MR Lifecycle

* **제목**: Merge Request를 한 장으로 보기
* **takeaway**: MR은 코드 업로드가 아니라 검토·승인·반영 프로세스다.
* **포함**

  * feature branch push
  * MR 생성
  * 설명 작성
  * reviewer/approver 지정
  * 리뷰 반영
  * 승인
  * merge
  * pipeline 확인
* **시각화**

  * lifecycle flow
* **노트**

  * MR description은 운영 문서라는 메시지
* **연결**

  * 좋은 MR 품질 기준으로 이동

## Page 7. 좋은 MR의 기준

* **제목**: 제목, 범위, 테스트, 리뷰 포인트가 좋은 MR을 만든다
* **takeaway**: 좋은 MR은 리뷰어가 빠르게 판단할 수 있는 변경이다.
* **포함**

  * 제목
  * 목적
  * 변경 범위
  * 테스트 범위
  * 리뷰 포인트
  * 배포 영향
  * rollback 기준
* **시각화**

  * 좋은 MR / 나쁜 MR 대비
* **노트**

  * 모호한 제목과 과도하게 큰 MR이 리뷰 비용을 키운다는 점
* **연결**

  * CODEOWNERS와 checklist로 이동

## Page 8. CODEOWNERS와 Review Checklist

* **제목**: 책임 분배와 리뷰 표준화를 연결하기
* **takeaway**: 경로 기반 책임과 리뷰 체크리스트가 함께 있어야 품질이 안정된다.
* **포함**

  * `CODEOWNERS`
  * MR template
  * `docs/review-checklist.md`
  * 세 요소의 관계
* **리서치**

  * CODEOWNERS의 성격, protected branch와의 결합
* **시각화**

  * 3원 관계도
* **노트**

  * code owner approval과 일반 approval 차이 설명
* **연결**

  * reviewer vs approver로 이동

## Page 9. Reviewer vs Approver

* **제목**: 리뷰어와 승인자는 왜 개념적으로 다를까
* **takeaway**: 리뷰는 내용 검토, 승인은 반영 허용까지 포함한다.
* **포함**

  * reviewer 역할
  * approver 역할
  * 작은 팀에서의 겸직 가능성
  * 큰 팀 vs 작은 팀 운영 예시
* **시각화**

  * 돋보기 vs 도장 메타포
* **노트**

  * 운영 리스크와 배포 타이밍도 승인 판단에 들어갈 수 있음을 설명
* **연결**

  * MR 생성 실습으로 이동

## Page 10. 실습: MR 생성과 direct push 거절 경험

* **제목**: 정책이 명령을 막는 순간을 경험하기
* **takeaway**: Git 명령이 틀린 것이 아니라 GitLab 정책이 반영 방식을 통제하는 것이다.
* **포함**

  * `CODEOWNERS`, template, checklist 추가
  * feature branch push
  * MR 생성
  * Developer의 direct push 거절 경험
* **시각화**

  * 좌측 터미널, 우측 UI
* **노트**

  * 거절을 기술 오류가 아니라 정책 집행으로 해석하게 만들기
* **연결**

  * merge 버튼이 안 보일 때 원인 분류로 이동

## Page 11. merge 버튼이 안 보일 때

* **제목**: MR이 막혔을 때 원인 분류하기
* **takeaway**: 권한, pipeline, approval, conflict는 서로 다른 종류의 문제다.
* **포함**

  * 권한 부족
  * pipeline 실패
  * approval 부족
  * conflict
  * base branch stale
  * 증상 / 확인 위치 / 첫 조치
* **시각화**

  * troubleshooting flowchart
* **노트**

  * “merge 가능”과 “merge해야 함”은 다르다
* **연결**

  * CH06 conflict lab로 이동

## Page 12. 장 정리

* **제목**: 정책 도구를 실제 충돌 상황에 적용할 준비
* **takeaway**: CH05의 정책과 절차는 CH06의 충돌/rollback 랩에서 살아 움직인다.
* **포함**

  * role
  * protected branch
  * approval
  * MR quality
  * CODEOWNERS
  * pipeline 조건
* **시각화**

  * 정책 도구 상자
* **노트**

  * self-managed 환경에서는 정책 강도가 달라질 수 있다는 점은 발표자 노트로
* **연결**

  * 조별 role play 랩으로 이동
