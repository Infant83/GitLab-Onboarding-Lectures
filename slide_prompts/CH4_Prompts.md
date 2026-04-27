# CH04 Execution Prompt

업로드된 `04_Branch_Strategy_and_Sync_Decisions.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH04 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Branch Strategy and Sync Decisions
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: branch 전략과 sync 판단을 명령어보다 먼저 이해시킨다
- 핵심 축: branch의 본질, switch/checkout, tracking, merge vs rebase, shared repo vs fork
- 핵심 자산:
  - `docs/branch-planning.md`
  - `src/feature-flags.json`

## 반드시 반영할 학습 메시지
- 협업이 꼬이는 가장 큰 이유는 전략 부재다.
- branch는 폴더 복사가 아니라 움직이는 포인터다.
- sync는 기술 가능성보다 협업 맥락이 선택 기준이다.
- branch 전략은 복구 비용과 review 비용을 줄이는 운영 설계다.

## 시작/종료 상태
- 시작 상태:
  - CH03까지의 이력이 정리되어 있고 `log --graph`를 읽을 수 있는 상태
- 새로 추가되는 파일:
  - `docs/branch-planning.md`
  - `src/feature-flags.json`
- 종료 상태:
  - feature branch를 만들고 동기화 방식을 선택할 수 있음
  - CH05에서 MR을 열 브랜치와 범위를 정리한 상태

## 슬라이드 구성
1. 전략이 먼저다
2. 브랜치는 포인터다
3. `switch`와 `checkout`
4. Tracking branch와 upstream
5. branch naming과 수명 관리
6. Shared Repository와 Fork
7. `merge` vs `rebase`
8. 동기화 의사결정 매트릭스
9. 실습: 병렬 작업과 merge/rebase 비교
10. 대표 실패 시나리오
11. 장 정리 + CH05 handoff

## 반드시 포함할 명령어 세트
```bash
git branch
git branch -vv
git switch main
git switch -c feature/user-profile
git checkout <commit-sha>
git checkout -b hotfix/login
git push -u origin feature/user-profile
git fetch origin
git merge origin/main
git rebase origin/main
```

## 반드시 반영할 판단 포인트

* `origin/main`과 `main`은 다르다
* upstream이 없으면 push/pull 판단이 모호해진다
* 개인 feature branch와 shared branch는 rebase 허용성이 다르다
* protected branch, force push 금지 정책은 기술 가능성과 별개로 선택을 제한한다
* 오래된 branch는 conflict와 stale review를 만든다

## 실습 슬라이드 작성 지시

* `feature/a`, `feature/b` 병렬 작업 예시를 반드시 넣어라.
* `docs/branch-planning.md`, `src/feature-flags.json`를 실습 자산으로 명시하라.
* merge 결과 graph와 rebase 결과 graph를 시각적으로 비교하게 하라.

## 출력 시 주의

* CH04는 명령어 장이 아니라 운영 의사결정 장으로 보이게 써라.
* rebase는 비교 대상으로 가르치되, 초보자 공통 기본 전략은 merge 쪽이 더 안전하다는 메시지를 유지하라.
* 마지막 슬라이드는 “이 브랜치를 누가 어떤 규칙으로 반영할 것인가”라는 질문으로 CH05에 연결하라.

지금 바로 CH04 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH04 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **Branch Strategy and Sync Decisions**
* 권장 분량: **11 pages**
* 목적: branch 전략과 sync 판단을 명령어보다 먼저 이해시킨다.
* 핵심 축: branch의 본질, switch/checkout, tracking, merge vs rebase, shared repo vs fork
* 주요 자산: `docs/branch-planning.md`, `src/feature-flags.json`

---

## Page 1. 전략이 먼저다

* **제목**: 협업이 꼬이는 이유는 명령어보다 전략이다
* **takeaway**: 어떤 브랜치 전략과 sync 정책을 쓰느냐가 갈등 비용을 결정한다.
* **포함**

  * branch 전략
  * merge vs rebase
  * shared repo vs fork
  * CH03과의 차이
* **시각화**

  * 전략 → 명령 → 결과 3단
* **노트**

  * branch 전략은 미학이 아니라 복구/리뷰 비용 설계
* **연결**

  * branch 본질 설명으로 이동

## Page 2. 브랜치는 포인터다

* **제목**: 브랜치는 폴더 복사가 아니라 움직이는 참조다
* **takeaway**: branch가 가볍기 때문에 작업을 잘게 나눌 수 있다.
* **포함**

  * branch = 특정 commit을 가리키는 reference
  * 그래서 싸고 빠름
  * 짧게 운용해야 하는 이유
* **시각화**

  * commit line + branch pointer
* **노트**

  * 길게 살아있는 branch가 conflict를 키우는 이유
* **연결**

  * switch / checkout로 이동

## Page 3. `switch`와 `checkout`

* **제목**: 이동은 switch, 과거 열람은 checkout
* **takeaway**: 교육에서는 다기능 checkout보다 역할이 분명한 switch를 기본으로 둔다.
* **포함**

  * `git switch main`
  * `git switch -c feature/...`
  * `git checkout <sha>`
  * `git checkout -b ...`
  * 교육 규칙
* **리서치**

  * switch 도입 배경
* **시각화**

  * 좌우 비교표
* **노트**

  * detached HEAD와 연결
* **연결**

  * tracking branch로 이동

## Page 4. Tracking Branch와 Upstream

* **제목**: 브랜치가 무엇을 추적하는지 읽기
* **takeaway**: upstream 관계를 모르면 sync 판단도 흐려진다.
* **포함**

  * `git branch -vv`
  * 앞섬/뒤짐 표시
  * upstream 없음의 불편
  * `origin/main`과 `main`의 차이
* **시각화**

  * 예시 출력 + 해석
* **노트**

  * upstream 없는 branch에서 push/pull이 왜 모호해지는지
* **연결**

  * naming과 수명 관리로 이동

## Page 5. Naming과 수명 관리

* **제목**: 좋은 branch 이름과 짧은 수명이 리뷰를 살린다
* **takeaway**: 이름과 수명은 협업 품질과 충돌 비용을 크게 좌우한다.
* **포함**

  * `feature/...`, `fix/...`, `hotfix/...`, `docs/...`
  * 하나의 목적, 하나의 branch, 하나의 MR
  * 오래된 branch의 비용
* **시각화**

  * 좋은 예 / 나쁜 예 + 짧은 수명 / 긴 수명
* **노트**

  * 긴 branch가 MR diff를 키우고 리뷰어 맥락을 잃게 한다는 설명
* **연결**

  * shared repo vs fork로 이동

## Page 6. Shared Repository와 Fork

* **제목**: 어떤 협업 모델이 우리 환경에 맞는가
* **takeaway**: 내부 협업과 외부 기여는 저장소 구조부터 다르게 설계된다.
* **포함**

  * shared repo: 내부 협업
  * fork: 외부 기여 / 오픈소스
  * 사내 보안정책으로 fork 제한 가능
* **시각화**

  * 상황별 decision table
* **노트**

  * 외부 협력사 / 민감 저장소 / 보안 정책 차이
* **연결**

  * merge vs rebase로 이동

## Page 7. `merge` vs `rebase`

* **제목**: 이력 모양과 운영 비용으로 비교하기
* **takeaway**: merge와 rebase는 둘 다 가능하지만, 협업 비용은 다르게 만든다.
* **포함**

  * merge = 공동 이력 보존
  * rebase = 더 직선적 이력
  * rebase는 SHA 변경
  * 초보자 교육에서 merge를 기본으로 두는 이유
* **시각화**

  * 같은 작업의 graph 비교
* **노트**

  * “가능”과 “바람직”은 다르다는 점 설명
* **연결**

  * 동기화 decision matrix로 이동

## Page 8. 동기화 의사결정 매트릭스

* **제목**: 언제 merge하고 언제 rebase할 것인가
* **takeaway**: 기술 가능성보다 협업 맥락이 선택 기준이다.
* **포함**

  * 개인 feature branch
  * 공유 branch
  * 리뷰 중 branch
  * protected branch
  * force push 금지 정책
  * 상황 / 권장 / 이유 / 주의사항
* **시각화**

  * decision matrix
* **노트**

  * rebase 가능한 상황도 팀 정책상 피할 수 있다는 점
* **연결**

  * 병렬 작업 실습으로 이동

## Page 9. 실습: 병렬 작업과 동기화 비교

* **제목**: 두 개의 feature branch로 merge와 rebase를 비교하기
* **takeaway**: 병렬 작업 자체가 문제는 아니며, 합치는 전략이 문제를 만든다.
* **포함**

  * `feature/a`, `feature/b`
  * `docs/branch-planning.md`, `src/feature-flags.json`
  * merge/rebase 비교 포인트
* **시각화**

  * swimlane / 두 갈래 branch diagram
* **노트**

  * merge commit, SHA 변경, 그래프 모양 차이를 관찰하게 하기
* **연결**

  * 실패 시나리오로 이동

## Page 10. 대표 실패 시나리오

* **제목**: wrong branch, rebase 후 push 실패, stale branch
* **takeaway**: branch 운영 실패는 개인 실수보다 전략 부재에서 자주 시작된다.
* **포함**

  * 잘못된 branch 작업
  * rebase 후 push 거절
  * 오래된 feature branch
  * 증상 / 원인 / 첫 대응 / 조직적 예방
* **노트**

  * `--force-with-lease`는 특정 조건에서만 허용될 수 있음을 보수적으로 설명
* **연결**

  * GitLab 운영 정책 장으로 이동

## Page 11. 장 정리

* **제목**: 좋은 branch 전략은 좋은 GitLab 운영으로 이어진다
* **takeaway**: branch를 잘 나누는 것만으로는 부족하고, 반영 규칙까지 필요하다.
* **포함**

  * branch = 포인터
  * upstream = 추적 관계
  * merge/rebase = 운영 결정
  * shared repo/fork = 정책 선택
* **시각화**

  * 핵심 메시지 카드 + MR 아이콘 브리지
* **노트**

  * CH05는 “누가 어떤 규칙으로 반영할 것인가”를 다룬다고 예고
* **연결**

  * GitLab roles / protected branches / MR로 이동
