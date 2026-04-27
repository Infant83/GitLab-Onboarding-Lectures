# CH02 Execution Prompt

업로드된 `02_Local_Workflow_and_Core_Commands.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH02 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Local Workflow and Core Commands
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: `status -> diff -> add -> commit -> show -> push` 기본 루프를 몸에 익힌다
- 핵심 축: 상태 변화, staging 의미, fetch/pull 차이, push 전 검증 습관
- 핵심 자산:
  - `notes.txt`
  - `docs/tutorial-guide.md`
  - `README.md`
  - `docs/process.md`
  - `src/app.txt`
  - `src/permissions.js`

## 반드시 반영할 학습 메시지
- Git 루프는 암기가 아니라 상태 전이다.
- staging은 임시 저장이 아니라 커밋 후보 설계 공간이다.
- `fetch`는 안전한 확인이고 `pull`은 자동 동기화다.
- push 전에 검증하는 습관이 협업 사고를 줄인다.
- 좋은 커밋 습관이 CH03의 복구 비용을 줄인다.

## 반드시 반영할 시작/종료 상태
- 시작 상태:
  - CH01에서 clone된 저장소가 있고 기본 브랜치가 원격과 연결된 상태
- 새로 추가되는 파일:
  - `notes.txt`
  - `docs/tutorial-guide.md`
- 종료 상태:
  - 두 파일이 저장소에 반영되어 있음
  - `restore --staged`를 설명할 수 있음
  - `fetch -> 비교 -> pull 여부 판단` 루틴을 말할 수 있음

## 슬라이드 구성
1. Git 루프는 상태 전이로 봐야 한다
2. 전체 작업 루프: clone -> status -> edit -> diff -> add -> commit -> show -> push
3. `status`, `diff`, `diff --staged` 비교
4. `git add`의 진짜 의미
5. 좋은 commit의 기준
6. `push`와 upstream
7. `fetch` vs `pull`
8. 실습: first commit cycle
9. 잘못 staging했을 때: `restore --staged`와 `.gitignore`
10. push 직전 검증 루틴
11. 대표 실패 시나리오
12. 장 정리 + CH03 handoff

## 반드시 포함할 명령어 세트
```bash
git status
git diff
git diff --staged
git add <file>
git add .
git commit -m "docs: add training note"
git log --oneline --decorate -n 5
git show --stat HEAD
git push
git push -u origin <branch>
git fetch origin
git pull
git restore --staged <file>
git branch -vv
```

## 실패 시나리오 슬라이드에 반드시 반영할 것

* `non-fast-forward`
* `Your local changes would be overwritten`
* wrong branch push
* “좋은 메시지는 나쁜 diff를 구해주지 못한다”는 문장
* `force push`를 기본 해법처럼 보이지 않게 작성

## 실습 슬라이드 작성 지시

* `notes.txt`, `docs/tutorial-guide.md`를 실제로 추가하는 흐름을 써라.
* 단계별로 “무엇을 눈으로 확인해야 하는가”를 반드시 넣어라.
* `status`와 `diff`를 함께 봐야 하는 이유를 드러내라.
* `git add .`는 교육상 위험 포인트로 표시하라.

## 출력 시 주의

* CH02는 가장 기본적인 장이지만 가장 많이 쓰는 실무 습관을 만드는 장으로 써라.
* 초보자가 따라칠 수 있게 충분히 자세히 쓰되, 한 슬라이드에 메시지는 1개만 유지하라.
* 마지막 슬라이드는 CH03의 `log`, `show`, `revert`, `bisect`와 연결되게 마무리하라.

지금 바로 CH02 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH02 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **Local Workflow and Core Commands**
* 권장 분량: **12 pages**
* 목적: `status → diff → add → commit → show → push`의 기본 루프를 몸에 익힌다.
* 핵심 축: 상태 변화, staging 의미, fetch와 pull 차이, push 전 검증 습관
* 주요 자산: `notes.txt`, `docs/tutorial-guide.md`, `README.md`, `docs/process.md`, `src/app.txt`, `src/permissions.js`

---

## Page 1. 상태 전이로 보는 Git 루프

* **제목**: Git 루프는 명령어 암기가 아니라 상태 전이다
* **takeaway**: working tree, staging, local history, remote를 이해해야 명령이 연결된다.
* **포함**

  * 이번 장의 상태 공간
  * 왜 `pull`을 무심코 누르면 안 되는가
  * CH03 복구와 연결되는 이유
* **리서치**

  * Git state model, fetch/pull 기본 설명
* **시각화**

  * 상태 루프 다이어그램
* **노트**

  * 좋은 습관이 복구 비용을 줄인다는 메시지
* **연결**

  * 다음 슬라이드에서 전체 workflow map으로 확대

## Page 2. 전체 작업 루프 지도

* **제목**: clone → status → edit → diff → add → commit → show → push
* **takeaway**: 각 단계마다 멈춰서 확인해야 하는 질문이 다르다.
* **포함**

  * 전체 루프
  * 위험 단계에 주의 배지 (`git add .`, `git pull`)
  * 시작 전 / commit 직전 / push 직전 루틴 예고
* **리서치**

  * upstream, show, push 목적 중심 설명
* **시각화**

  * pipeline형 프로세스 맵
* **노트**

  * “바로 다음 명령으로 넘어가면 안 되는 순간” 강조
* **연결**

  * status/diff/diff --staged 비교로 이동

## Page 3. `status`, `diff`, `diff --staged`

* **제목**: 무엇이 바뀌었는지를 서로 다르게 보여주는 세 명령
* **takeaway**: 상태 요약과 실제 줄 차이를 구분해야 커밋 범위를 통제할 수 있다.
* **포함**

  * `status` = 상태 요약
  * `diff` = working tree 차이
  * `diff --staged` = 다음 commit 후보 차이
  * 보지 않으면 생기는 실수
* **리서치**

  * index / working tree 차이
* **시각화**

  * 3열 비교 + 미니 예시
* **노트**

  * status만 보고 commit했다가 범위를 놓친 사례
* **연결**

  * staging의 의미 설명으로 이동

## Page 4. `git add`의 진짜 의미

* **제목**: `git add`는 저장이 아니라 커밋 후보 확정이다
* **takeaway**: staging은 의도 단위로 커밋 범위를 설계하는 공간이다.
* **포함**

  * `git add <file>` vs `git add .`
  * staging 후에도 history는 바뀌지 않음
  * 좋은 습관 / 나쁜 습관
* **리서치**

  * index/staging 개념
* **시각화**

  * working tree → staging 확대도
* **노트**

  * IDE 생성 파일, 로그, local config가 왜 섞이는지
* **연결**

  * commit 품질로 이동

## Page 5. 좋은 commit의 기준

* **제목**: 좋은 commit은 작은 범위와 읽히는 메시지로 만든다
* **takeaway**: 좋은 commit은 review와 rollback 단위를 동시에 개선한다.
* **포함**

  * 작은 커밋
  * 읽히는 commit message
  * `git show --stat HEAD` 검증 습관
  * 나쁜 메시지 vs 좋은 메시지
* **리서치**

  * 실무 commit semantics
* **시각화**

  * 메시지 예시 대비 + `show --stat` 박스
* **노트**

  * “좋은 메시지는 나쁜 diff를 구해주지 못한다”
* **연결**

  * push / upstream 개념으로 이동

## Page 6. `push`와 upstream

* **제목**: 어디로 보내고 있는가를 알아야 push가 안전해진다
* **takeaway**: push는 현재 브랜치와 upstream 관계를 이해할 때 비로소 예측 가능하다.
* **포함**

  * `git push`
  * `git push -u origin <branch>`
  * upstream 의미
  * `git branch -vv` 읽기
* **리서치**

  * upstream / ahead / behind 개념
* **시각화**

  * 로컬 브랜치 ↔ origin 브랜치 연결 그림
* **노트**

  * upstream이 없을 때 초보자가 겪는 혼란 설명
* **연결**

  * fetch vs pull 비교로 이동

## Page 7. `fetch` vs `pull`

* **제목**: `fetch`는 안전한 확인, `pull`은 자동 동기화다
* **takeaway**: 최신화는 버튼이 아니라 판단 과정이다.
* **포함**

  * `fetch`는 remote-tracking만 갱신
  * `pull`은 보통 fetch + merge
  * 왜 바로 pull하지 말라고 가르치는가
* **리서치**

  * pull 기본 동작, rebase-based pull 가능성
* **시각화**

  * before/after 흐름도
* **노트**

  * `fetch → 비교 → pull 여부 판단` 루틴 반복
* **연결**

  * first commit cycle 실습으로 이동

## Page 8. 실습: First Commit Cycle

* **제목**: 첫 번째 정상 루프를 끝까지 완주하기
* **takeaway**: 한 번의 정상 루프를 정확히 밟는 경험이 이후 복구의 기준이 된다.
* **포함**

  * `notes.txt`, `docs/tutorial-guide.md` 추가
  * `status → diff → add → diff --staged → commit → log/show → push`
  * 각 단계의 관찰 포인트
* **리서치**

  * 명령 기본 동작
* **시각화**

  * 단계형 numbered flow
* **노트**

  * commit 후에도 GitLab은 아직 변하지 않았다는 점 강조
* **연결**

  * 잘못 add했을 때의 복구로 이동

## Page 9. 잘못 staging했을 때

* **제목**: `restore --staged`와 `.gitignore`로 실수를 줄인다
* **takeaway**: 잘못 add한 파일은 빨리 빼고, 반복되는 실수는 ignore로 막는다.
* **포함**

  * `git restore --staged <file>`
  * working tree 유지, staging만 해제
  * `.gitignore`의 팀적 의미
* **리서치**

  * restore 기본 동작
* **시각화**

  * before/after 상태 비교
* **노트**

  * `config.local.json`, local secret, 로그 파일 사례
* **연결**

  * push 전 검증 루틴으로 이동

## Page 10. Push 직전 검증 루틴

* **제목**: push 전에 반드시 보는 4가지
* **takeaway**: push 전 1분의 점검이 협업 사고를 크게 줄인다.
* **포함**

  * `git status`
  * `git log --oneline --decorate -n 3`
  * `git show --stat HEAD`
  * `git branch -vv`
  * 무엇을 확인하는가
* **리서치**

  * 검증 습관 중심
* **시각화**

  * pre-flight checklist
* **노트**

  * 잘못된 브랜치인지 마지막으로 확인하는 습관 강조
* **연결**

  * 실패 시나리오 묶음으로 이동

## Page 11. 대표 실패 시나리오

* **제목**: non-fast-forward, overwritten, wrong branch
* **takeaway**: 실패 메시지는 공포가 아니라 진단 시작점이다.
* **포함**

  * `non-fast-forward`
  * `Your local changes would be overwritten`
  * wrong branch push
  * 증상 / 원인 / 첫 진단 명령
* **리서치**

  * force push를 기본 해법처럼 보이지 않게 설계
* **시각화**

  * 3행 매트릭스
* **노트**

  * `fetch → branch -vv → log --graph` 기본 대응 루틴 반복
* **연결**

  * CH03 진단과 복구로 연결

## Page 12. 장 정리

* **제목**: 정상 루프를 만들면 복구가 쉬워진다
* **takeaway**: CH02는 작업 루프를, CH03는 그 결과를 읽고 복구하는 능력을 만든다.
* **포함**

  * 기본 루프 요약
  * fetch vs pull 차이
  * push 전 검증
  * add 실수 복구
* **시각화**

  * 완료 체크리스트
* **노트**

  * 좋은 커밋 습관이 CH03에서 왜 중요한지 연결
* **연결**

  * “이제 만든 이력을 읽고 되돌리는 법으로 넘어간다.”
