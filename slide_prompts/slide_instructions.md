아래는 업로드하신 8개 lecture note, 8H README의 장-튜토리얼 매핑, alignment audit를 반영해서 다시 정리한 **Master Prompt + CH01~CH08 챕터별 Markdown Prompt 번들**입니다. 기존 page-by-page 구조는 유지하되, 요청하신 대로 품질 제약 중 **텍스트/명령어 관련 조항을 교육용 슬라이드에 더 적합하게 완화**해 반영했습니다.          

---

# Master Prompt

## 1. 역할 정의

당신은 **Git / GitLab / CI/CD 실무 교육용 슬라이드**를 만드는 **심층 리서치 기반 슬라이드 작성 에이전트**다.
당신의 임무는 지정된 **챕터와 페이지**에 대해, 교육 현장에서 바로 사용 가능한 **슬라이드 원고 수준의 상세 슬라이드 작성 지시문**을 만드는 것이다.

이 작업의 목적은 “예쁜 슬라이드”가 아니라 다음을 동시에 만족하는 **교육 슬라이드**를 설계하는 것이다.

* 개념 이해
* 명령어 이해
* 실습 연결
* 역할별 관점 차이 이해
* 실무 의사결정 기준 습득

---

## 2. 목표 정의

반드시 다음 목표를 만족하라.

1. 각 슬라이드는 **한 페이지당 중심 메시지 1개**를 갖는다.
2. 각 슬라이드는 **앞뒤 슬라이드와 논리적으로 연결**되어야 한다.
3. 각 슬라이드는 단순 요약이 아니라 **교육 목적상 이해를 돕는 설명, 비교, 예시, 명령어, 주의점**을 적절히 포함해야 한다.
4. 각 슬라이드는 **실습 가능한 형태**, 또는 **실무 판단 가능한 형태**여야 한다.
5. 각 슬라이드는 **Owner / Maintainer / Developer**의 시선 차이를 필요한 곳에서 드러내야 한다.
6. 각 슬라이드는 업로드된 lecture notes의 흐름을 기반으로 하되, **공식 Git / GitLab 문서 검증이 필요한 개념은 심층 리서치 대상으로 명시**해야 한다.

---

## 3. 입력 해석 규칙

입력으로는 다음이 주어진다고 가정하라.

* 챕터명
* 챕터 목적
* 챕터 분량
* 챕터 실습 자산
* 페이지별 학습 흐름

입력이 일부 부족해도 합리적으로 보강하되, 반드시 다음 원칙을 따른다.

* 업로드된 chapter lecture notes를 1차 기준으로 삼는다.
* README의 장-튜토리얼 매핑과 alignment audit를 흐름 정렬 기준으로 삼는다.
* chapter note에 나온 파일명, 자산명, 실습 순서, handoff 상태를 존중한다.
* 팀 정책성 요소는 보편적 진리처럼 단정하지 말고, 교육적 기본 원칙과 팀별 변형 가능성을 분리한다.

---

## 4. 리서치 프로세스

각 페이지 프롬프트 내부에는 다음 연구 절차가 암묵적으로 반영되어야 한다.

### STEP 1. 문제 정의

* 이 페이지가 해결해야 하는 학습 문제를 먼저 정의한다.
* 이 페이지가 왜 필요한지, 어떤 오해를 줄이는지, 다음 페이지로 무엇을 넘기는지 정리한다.

### STEP 2. 정보 수집

* 업로드된 chapter note를 먼저 읽는다.
* 그다음 Git / GitLab / CI/CD 개념 중 공식 검증이 필요한 항목은 **공식 Git 문서**와 **공식 GitLab 문서**를 우선 조사 대상으로 삼는다.
* 기능 설명보다 **교육적 판단 기준**이 드러나게 수집한다.

### STEP 3. 출처 검증

* Git 명령, Git object/reference 개념, pull/fetch/rebase/reset/revert/bisect, protected branch, MR approvals, CODEOWNERS, pipeline, runner, variables, artifact 등은 공식 문서 기준으로 검증한다.
* SaaS와 self-managed 차이가 있는 경우, 슬라이드 본문보다 발표자 노트에서 구분하도록 설계한다.

### STEP 4. 구조화

* 한 슬라이드에 메시지를 하나만 남기고, 나머지는 보조 정보로 정리한다.
* 비교가 필요한 페이지는 표, 2열, decision matrix를 우선한다.
* 흐름이 중요한 페이지는 numbered step, lifecycle, swimlane, diagram을 우선한다.

### STEP 5. 인사이트 도출

* 단순 정의를 넘어 “왜 그렇게 가르치는가”를 드러낸다.
* 초보자 오해, 실무 리스크, 복구 비용, 리뷰 비용, 운영 책임과 연결한다.

### STEP 6. 전략 해석

* 이 페이지가 실습에서 어떤 행동 습관으로 이어지는지 설명한다.
* Owner / Maintainer / Developer가 각자 무엇을 판단해야 하는지 필요한 경우 분리한다.

---

## 5. 출력 포맷

각 페이지는 반드시 아래 구조를 따른다.

### 슬라이드 산출 구조

* **슬라이드 제목**
* **핵심 takeaway 1문장**
* **본문 구성 지시**

  * 3~6개 bullet, 또는
  * 2열 비교, 또는
  * table / matrix / flow / timeline / swimlane / lifecycle
* **포함해야 할 핵심 내용**
* **심층 리서치 포인트**
* **시각화 지시**
* **발표자 노트 지시**
* **실습 / 토론 cue**
* **하단 source note 지시**
* **다음 페이지 연결 문장**

---

## 6. 품질 제약

반드시 아래 제약을 따른다.

* 한 페이지에 메시지는 1개만 둔다.
* 교육 목적의 슬라이드이므로 **핵심 개념 설명, 비교 문장, 짧은 예시, 경고 문구, 추가 명령어**를 충분히 담을 수 있다.
* 단, 텍스트는 “짧을수록 좋다”가 아니라 **이해를 돕는 수준까지는 충분히 허용**하되, 한 페이지의 중심 메시지가 흐려질 정도로 unrelated detail을 과도하게 넣지 않는다.
* 명령어는 꼭 최소 1~2줄로 제한하지 않는다. **학습 이해에 필요한 경우 2~6개 이상도 허용**한다.
* 다만 명령어를 나열하지 말고, **언제 쓰는지 / 무엇을 확인하는지 / 어떤 실수를 예방하는지**가 드러나게 구성한다.
* 명령어가 늘어나는 페이지는 본문, 보조 박스, 발표자 노트로 분산해 가독성을 유지한다.
* 실습 페이지는 교육상 필요하면 슬라이드 본문에도 명령어와 설명을 함께 넣을 수 있다.
* 특정 팀의 정책을 보편적 진리처럼 단정하지 않는다.
* default branch를 항상 `main`으로 가정하지 않는다.
* GitLab SaaS와 self-managed 차이가 있으면 발표자 노트에서 분리한다.
* 보호 브랜치, approvals, merge 권한, runner, variables, pipeline 조건은 환경마다 다를 수 있음을 숨기지 않는다.
* 강의 슬라이드는 정의 모음집이 아니라 **판단 기준과 습관 형성 도구**가 되어야 한다.

---

## 7. 스타일

* 슬라이드 텍스트는 한국어로 쓴다.
* 명령어, 파일명, 브랜치명, 설정 키는 원문 그대로 유지한다.
* 지나치게 마케팅 문구처럼 쓰지 않는다.
* “정의 나열”보다 “왜 중요한가 / 언제 쓰는가 / 어떤 실수를 막는가”를 우선한다.
* 비교는 표와 2열을 우선한다.
* 상태 전이와 흐름은 diagram / flow / timeline을 우선한다.
* 실습 페이지는 명령어와 관찰 포인트가 함께 보이게 만든다.
* 발표자 노트에는 필요 시 다음 3가지 레이블을 사용할 수 있다.

  * **Fact**
  * **Inference**
  * **Teaching Tip**

---

## 8. 확장 옵션

조건에 따라 다음을 추가할 수 있다.

* `데모 화면 placeholder`
* `실습 체크 질문`
* `실패 시그널`
* `주의 배지`
* `Owner / Maintainer / Developer 시선 차이`
* `SaaS vs Self-Managed note`
* `Myth vs Reality`
* `Decision Matrix`
* `Before / After 상태 비교`

---

# CH01 Prompt

## 챕터 개요

* 챕터명: **Course Foundation and Operating Model**
* 권장 분량: **11 pages**
* 목적: 뒤 7개 장의 이해를 지탱하는 기준 좌표를 잡는다.
* 핵심 축: Git vs GitLab, 로컬 vs 원격, 권한 vs 책임, 시작 전 진단 습관
* 주요 자산: `README.md`, `src/permissions.js`, `src/app.js`, `docs/process.md`, `tests/permissions.test.js`, `tutorial-collaboration-lab`

---

## Page 1. 왜 이 장이 기준 좌표인가

* **슬라이드 제목**: 왜 CH01이 전체 8시간의 기준점인가
* **핵심 takeaway**: 이 장을 제대로 이해해야 뒤 장의 `pull`, `revert`, `protected branch`, `pipeline`이 연결된다.
* **포함해야 할 핵심 내용**

  * Git이 관리하는 대상
  * GitLab이 추가하는 운영 레이어
  * Owner / Maintainer / Developer 시선 차이
  * 로컬과 원격이 언제 같고 달라지는지
* **심층 리서치 포인트**

  * Git과 GitLab의 공식 정의
  * GitLab role 모델의 교육적 의미
* **시각화 지시**

  * 하단 4개 질문 카드
  * 우측 하단 8챕터 미니맵
* **발표자 노트 지시**

  * CH01이 약하면 이후 장에서 명령어는 따라 쳐도 이해가 이어지지 않는다는 점 설명
* **실습 / 토론 cue**

  * “commit = GitLab 반영”이라고 느끼는 이유를 질문
* **다음 페이지 연결 문장**

  * “이제 전체 8시간을 역할별 렌즈로 먼저 펼쳐본다.”

## Page 2. 8시간 흐름과 역할별 렌즈

* **슬라이드 제목**: 같은 저장소를 역할마다 다르게 본다
* **핵심 takeaway**: 교육 흐름은 같아도 Owner, Maintainer, Developer의 질문은 다르다.
* **포함해야 할 핵심 내용**

  * CH01~CH08 한 줄 요약
  * Owner / Maintainer / Developer가 먼저 보는 질문
  * 왜 같은 변경을 다르게 해석하는지
* **심층 리서치 포인트**

  * GitLab role-based collaboration 관점
* **시각화 지시**

  * 좌측 챕터 타임라인
  * 우측 역할별 질문 3열
* **발표자 노트 지시**

  * “코드를 잘 아는 사람”과 “merge 책임이 있는 사람”이 같지 않을 수 있음을 강조
* **실습 / 토론 cue**

  * “여러분 팀에서 merge 책임은 누가 지는가?”
* **다음 페이지 연결 문장**

  * “이 차이를 이해하려면 먼저 Git과 GitLab을 분리해서 봐야 한다.”

## Page 3. Git vs GitLab

* **슬라이드 제목**: Git과 GitLab은 무엇이 다르고 왜 함께 필요한가
* **핵심 takeaway**: Git은 버전 관리, GitLab은 협업 운영이다.
* **포함해야 할 핵심 내용**

  * Git: local history, branch, merge, recovery
  * GitLab: MR, approval, issue, CI/CD, permissions, auditability
  * Git만으로는 팀 운영이 부족한 이유
* **심층 리서치 포인트**

  * Git vs GitLab 공식 설명
  * roles / permissions / MR 운영 개념
* **시각화 지시**

  * 2열 비교표
* **발표자 노트 지시**

  * “commit했다 = GitLab에 올라갔다” 오해를 다음 슬라이드 구조와 연결
* **실습 / 토론 cue**

  * “GitLab 없이도 팀 협업이 가능한가?”
* **다음 페이지 연결 문장**

  * “이제 파일 변경이 실제로 어느 공간을 움직이는지 보자.”

## Page 4. 로컬과 원격의 4공간

* **슬라이드 제목**: Working Tree → Staging → Local Repo → Remote
* **핵심 takeaway**: Git은 한 공간이 아니라 여러 상태 공간의 이동이다.
* **포함해야 할 핵심 내용**

  * `add`, `commit`, `push`, `fetch`, `pull`의 이동 방향
  * commit은 로컬, push는 원격 반영
  * fetch는 remote-tracking 갱신
* **심층 리서치 포인트**

  * staging / index 개념
  * fetch / pull 기본 동작
* **시각화 지시**

  * 상태 전이 diagram
* **발표자 노트 지시**

  * `add`를 저장으로, `pull`을 단순 다운로드로 오해하는 사례 설명
* **실습 / 토론 cue**

  * `push` 없이 GitLab에서 보일 수 있는 것은 무엇인가?
* **다음 페이지 연결 문장**

  * “이 구조 위에서 자주 나오는 핵심 용어를 먼저 고정한다.”

## Page 5. 필수 용어 정리

* **슬라이드 제목**: repository, origin, default branch, HEAD
* **핵심 takeaway**: 용어를 정확히 이해해야 상태를 정확히 말할 수 있다.
* **포함해야 할 핵심 내용**

  * repository
  * origin
  * default branch는 `main` 고정 가정 금지
  * HEAD
  * 자주 하는 오해 1줄씩
* **심층 리서치 포인트**

  * HEAD / detached HEAD 설명
* **시각화 지시**

  * 4분할 카드
* **발표자 노트 지시**

  * detached HEAD는 여기서는 정의만 하고 상세는 CH03/CH04로 넘김
* **실습 / 토론 cue**

  * `origin ≠ main`을 직접 말하게 하기
* **다음 페이지 연결 문장**

  * “이제 초보자가 자주 하는 잘못된 문장을 교정한다.”

## Page 6. 대표 오해 5가지

* **슬라이드 제목**: Git 초보자의 대표 오해 교정
* **핵심 takeaway**: 잘못된 문장을 먼저 버려야 올바른 습관이 생긴다.
* **포함해야 할 핵심 내용**

  * commit했으니 올라갔다
  * pull은 항상 안전하다
  * origin은 main이다
  * direct push는 실력의 증거다
  * GitLab branch만 보면 된다
* **심층 리서치 포인트**

  * 보편 원칙 vs 팀 정책 구분
* **시각화 지시**

  * Myth vs Reality 표
* **발표자 노트 지시**

  * 각 오해가 어떤 협업 장애로 이어지는지 한 사례씩 설명
* **실습 / 토론 cue**

  * 팀에서 실제로 가장 많이 들은 오해 공유
* **다음 페이지 연결 문장**

  * “오해를 줄이는 가장 좋은 방법은 먼저 상태를 진단하는 습관이다.”

## Page 7. 기본 진단 명령 세트

* **슬라이드 제목**: 시작 전 반드시 보는 6개 진단 명령
* **핵심 takeaway**: 상태를 모른 채 명령어를 치는 것이 가장 비싼 실수다.
* **포함해야 할 핵심 내용**

  * `git status`
  * `git branch -vv`
  * `git remote -v`
  * `git rev-parse --abbrev-ref HEAD`
  * `git symbolic-ref refs/remotes/origin/HEAD`
  * `git log --oneline --decorate -n 5`
  * 각 명령이 답하는 질문
* **심층 리서치 포인트**

  * upstream / remote-tracking branch 설명
* **시각화 지시**

  * 명령어 + 확인 질문 표
* **발표자 노트 지시**

  * “내 위치 확인 → 의도 확인 → 명령 실행 → 결과 검증” 루틴 반복
* **실습 / 토론 cue**

  * status만 봐서는 모르는 정보는 무엇인가?
* **다음 페이지 연결 문장**

  * “이제 협업 구조 자체가 어떻게 다른지 본다.”

## Page 8. Shared Repository vs Fork

* **슬라이드 제목**: 협업 모델이 먼저이고 명령어는 나중이다
* **핵심 takeaway**: 저장소 운영 모델이 달라지면 브랜치와 MR 전략도 달라진다.
* **포함해야 할 핵심 내용**

  * shared repository 특징
  * fork 모델 특징
  * 사내 환경에서 fork 제한 가능성
  * 이번 교육은 shared repository 기준
* **심층 리서치 포인트**

  * GitLab fork / MR / pipeline의 운영 차이
* **시각화 지시**

  * 좌우 비교 또는 decision tree
* **발표자 노트 지시**

  * 오픈소스와 내부 협업의 차이 설명
* **실습 / 토론 cue**

  * “우리 환경에서 fork가 허용되는가?”
* **다음 페이지 연결 문장**

  * “같은 shared repo 안에서도 역할에 따라 책임은 다르게 배분된다.”

## Page 9. 권한은 실력보다 책임이다

* **슬라이드 제목**: Owner / Maintainer / Developer / Guest를 책임으로 이해하기
* **핵심 takeaway**: 권한은 기술 숙련도보다 운영 책임 배분에 가깝다.
* **포함해야 할 핵심 내용**

  * 각 역할의 핵심 질문
  * push 가능과 merge 책임의 차이
  * 권한 문제를 명령어 문제로 오해하면 늦어진다는 메시지
* **심층 리서치 포인트**

  * GitLab roles / permissions 최신 구조
* **시각화 지시**

  * responsibility matrix
* **발표자 노트 지시**

  * 그룹/프로젝트 수준에서 권한이 달라질 수 있음을 설명
* **실습 / 토론 cue**

  * “내 팀에서 merge 권한은 누구에게 있는가?”
* **다음 페이지 연결 문장**

  * “이제 실제 환경에서 무엇을 확인할지 hands-on으로 내려간다.”

## Page 10. 실습: 내 환경 점검과 clone 직후 확인

* **슬라이드 제목**: 실습 시작 전 환경과 clone 상태를 읽는 법
* **핵심 takeaway**: 첫 실습은 파일 수정이 아니라 환경 확인이다.
* **포함해야 할 핵심 내용**

  * `git --version`
  * `git config --global user.name`
  * `git config --global user.email`
  * `git clone <repo-url>`
  * `git status`
  * `git branch -vv`
  * `git remote -v`
  * 각 명령의 확인 포인트
* **심층 리서치 포인트**

  * SSH vs HTTPS 인증 차이
* **시각화 지시**

  * 좌측 명령, 우측 확인 포인트
* **발표자 노트 지시**

  * `tutorial-collaboration-lab`, `README.md`, `src/permissions.js`, `docs/process.md`, `tests/permissions.test.js` 언급
* **실습 / 토론 cue**

  * clone 직후 왜 바로 pull하지 않는가?
* **다음 페이지 연결 문장**

  * “터미널에서 확인했다면 이제 브라우저에서 정책을 본다.”

## Page 11. 브라우저 권한 점검과 CH02 handoff

* **슬라이드 제목**: GitLab UI에서 확인할 정책 체크리스트
* **핵심 takeaway**: 로컬 상태와 GitLab 정책을 함께 봐야 다음 장이 안전하다.
* **포함해야 할 핵심 내용**

  * 내 역할
  * protected branch 여부
  * approval rule 여부
  * direct push 허용 여부
  * default branch 이름
  * fork 허용 여부
  * runner 존재 여부
* **심층 리서치 포인트**

  * protected branch / approvals 용어 통일
* **시각화 지시**

  * 상단 UI 체크, 하단 CH02 준비 상태
* **발표자 노트 지시**

  * CH02에서 `notes.txt`, `docs/tutorial-guide.md`를 추가한다는 handoff 설명
* **실습 / 토론 cue**

  * “권한은 있는데 merge가 안 되는 경우가 왜 생길까?”
* **다음 페이지 연결 문장**

  * “이제 실제 상태 전이를 수행하는 로컬 작업 루프로 들어간다.”

---

# CH02 Prompt

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

---

# CH03 Prompt

## 챕터 개요

* 챕터명: **History Inspection and Recovery**
* 권장 분량: **12 pages**
* 목적: 진단과 복구 도구 상자를 갖게 한다.
* 핵심 축: `log`, `show`, `diff`, `stash`, `tag`, `revert`, `reset`, `bisect`, `reflog`
* 주요 자산: `docs/release-notes-draft.md`, `tests/role-policy.test.js`, `src/permissions.js`, `docs/tutorial-guide.md`, `notes.txt`

---

## Page 1. 실수는 정상, 복구 능력이 실력이다

* **제목**: Git은 실수를 막기보다 추적·복구하게 만든다
* **takeaway**: 중요한 것은 빨리 발견하고, 정확히 원인을 찾고, 안전하게 복구하는 능력이다.
* **포함**

  * 발견 / 진단 / 복구 3단 구조
  * CH02의 좋은 커밋 습관과 연결
* **시각화**

  * 사고 대응 플로우
* **노트**

  * “문제가 생기면 파일부터 고치지 않는다”
* **연결**

  * 기본 진단 루틴으로 이동

## Page 2. 기본 진단 루틴

* **제목**: 문제 발생 시 먼저 실행할 진단 루틴
* **takeaway**: 무슨 명령을 칠까보다 현재 상태를 먼저 확정해야 한다.
* **포함**

  * `git status`
  * `git branch -vv`
  * `git log --oneline --decorate --graph -n 15`
  * `git show --stat HEAD`
  * `git fetch origin`
  * 각 명령이 답해주는 질문
* **시각화**

  * 명령어 ↔ 질문 표
* **노트**

  * 코드 문제 / 이력 문제 / 권한 문제를 구분하는 첫 단서 설명
* **연결**

  * diff/log/show 역할 분리로 이동

## Page 3. `diff`, `log`, `show`

* **제목**: 세 도구를 목적별로 구분해서 쓰기
* **takeaway**: `diff`는 아직 안 쌓인 변화, `log`는 흐름, `show`는 특정 commit이다.
* **포함**

  * 각 명령의 역할
  * 언제 무엇을 먼저 볼지
* **시각화**

  * 3열 비교표
* **노트**

  * 상태에 따라 show부터 볼지 diff부터 볼지 결정하는 기준
* **연결**

  * graph 읽기로 이동

## Page 4. `log --graph` 읽기

* **제목**: 브랜치 흐름과 merge 흔적을 그래프로 읽기
* **takeaway**: 그래프를 읽으면 어디서 갈라졌고 어디서 합쳐졌는지 보인다.
* **포함**

  * 내 branch와 main이 갈라진 지점
  * merge commit 존재 여부
  * 최근 변경 유형 읽기
* **시각화**

  * 예시 그래프 + 읽는 질문 4개
* **노트**

  * `--all`, author filter가 Maintainer에게 중요한 이유
* **연결**

  * stash로 이동

## Page 5. `stash`

* **제목**: stash는 임시 보관함이지 장기 저장소가 아니다
* **takeaway**: 임시 작업은 숨길 수 있지만, 오래 쌓아두면 나중에 더 비싸다.
* **포함**

  * `git stash push -m`
  * `git stash list`
  * `git stash show -p`
  * `git stash pop`
  * `git stash branch`
  * stash vs commit vs branch 선택 기준
* **시각화**

  * 명령 흐름 + 선택 기준 카드
* **노트**

  * 오래된 stash가 conflict를 부르는 이유
* **연결**

  * tag로 기준점 고정하기로 이동

## Page 6. `tag`

* **제목**: 태그는 릴리즈와 기준점을 고정하는 이름표다
* **takeaway**: tag는 “그때 그 상태”를 다시 찾기 쉽게 만든다.
* **포함**

  * `git tag v0.1.0`
  * `git show v0.1.0 --stat`
  * `git push origin v0.1.0`
  * 교육/배포/데모 기준점
* **시각화**

  * commit 위 tag 아이콘
* **노트**

  * annotated vs lightweight 차이는 발표자 노트에서만 짧게
* **연결**

  * revert vs reset 비교로 이동

## Page 7. `revert` vs `reset`

* **제목**: 무엇을 지키고 무엇을 버릴지 결정하기
* **takeaway**: 공유 이력에는 revert, 개인 로컬 정리에는 reset이 기본 프레임이다.
* **포함**

  * 이력 보존 vs 기준점 재작성
  * shared history에서 revert 우선
  * push 전 개인 정리에서 reset 가능
* **시각화**

  * 2열 비교표
* **노트**

  * “공유 이력을 깬다”가 무슨 뜻인지 다른 사람 기준점 관점으로 설명
* **연결**

  * reset 3종 비교로 이동

## Page 8. `reset --soft / --mixed / --hard`

* **제목**: reset 옵션 차이를 상태와 연결해서 이해하기
* **takeaway**: reset은 무엇을 남기고 무엇을 버리는지 정확히 알아야 쓸 수 있다.
* **포함**

  * commit / staging / working tree 변화 표
  * 대표 사용 시나리오
  * `--hard`는 마지막 수단
* **시각화**

  * matrix 표 + 색상 표시
* **노트**

  * 실제로 헷갈리는 “무엇이 남고 사라지는가”를 반복 설명
* **연결**

  * bisect로 이동

## Page 9. `bisect`

* **제목**: 회귀를 반으로 줄여 찾는 방법
* **takeaway**: bisect는 마법이 아니라 이분 탐색이다.
* **포함**

  * `git bisect start`
  * `git bisect bad`
  * `git bisect good <sha>`
  * 반복 판정
  * `git bisect reset`
  * `src/permissions.js` / `tests/role-policy.test.js` 예시
* **시각화**

  * commit range를 반씩 줄이는 그림
* **노트**

  * 테스트 자동화와 좋은 커밋 품질이 bisect 효율을 높임
* **연결**

  * reflog와 detached HEAD로 이동

## Page 10. `reflog`와 detached HEAD

* **제목**: 길을 잃었을 때 보는 로컬 안전망
* **takeaway**: reflog는 내 로컬 이동 기록이고, detached HEAD는 조사에는 유용하지만 작업 상태로는 위험하다.
* **포함**

  * detached HEAD 의미
  * `git switch main`
  * `git switch -c <new-branch>`
  * `git reflog -n 20`
* **시각화**

  * HEAD 포인터 그림
* **노트**

  * reflog는 shared history 복구를 대신하지 않는다는 점 분리
* **연결**

  * 실패 시나리오 decision matrix로 이동

## Page 11. 실패 시나리오 decision matrix

* **제목**: 상황별 복구 도구 빠르게 고르기
* **takeaway**: commit 전, push 전, 공유 후는 서로 다른 복구 전략을 요구한다.
* **포함**

  * commit 전 파손
  * push 전 commit 실수
  * 공유 후 문제 발견
  * stash 과적체
  * reset 후 위치 상실
  * 상태 / 기본 대응 / 피해야 할 행동
* **시각화**

  * 5행 상황표
* **노트**

  * 파일부터 고치지 말고 상태부터 확정하라는 메시지 반복
* **연결**

  * CH04의 branch 전략으로 이동

## Page 12. 장 정리

* **제목**: 이력은 읽고, 복구는 안전하게
* **takeaway**: CH03은 “문제 후 복구”, CH04는 “애초에 덜 꼬이게 일하는 법”이다.
* **포함**

  * `log/show/diff`
  * `stash/tag`
  * `revert/reset`
  * `bisect/reflog`
* **시각화**

  * 도구 상자형 요약
* **노트**

  * 공유 이력에서는 왜 revert가 기본인지 다시 고정
* **연결**

  * “이제 덜 꼬이게 일하는 branch 전략으로 넘어간다.”

---

# CH04 Prompt

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

---

# CH05 Prompt

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

---

# CH06 Prompt

## 챕터 개요

* 챕터명: **Team Collaboration, Conflict, and Rollback Lab**
* 권장 분량: **13 pages**
* 목적: 실제 conflict를 만들고 해결하고 revert까지 경험하게 한다.
* 핵심 축: role play, conflict marker, abort, semantic conflict, revert
* 주요 자산: `docs/process.md`, `src/app.txt`, `process-a-rewrite.md`, `process-b-rewrite.md`, `app-a.txt`, `app-b.txt`

---

## Page 1. 이 장은 팀 협업 랩이다

* **제목**: 이번 장은 “팀이 함께 GitLab로 일하는 장”이다
* **takeaway**: CH06은 명령어 장이 아니라 조별 역할극 기반 협업 실습이다.
* **포함**

  * Owner 1, Maintainer 1, Developer A/B 구성
  * 병렬 작업 → MR → conflict → merge → revert 흐름
* **시각화**

  * 사람 아이콘 + 흐름도
* **노트**

  * Guest는 참관용으로만 가능
* **연결**

  * 시나리오 파일과 충돌 의도 설명으로 이동

## Page 2. 시나리오 맵

* **제목**: 어떤 파일이 왜 충돌하도록 설계되었는가
* **takeaway**: conflict는 같은 줄보다 같은 의미 영역을 다르게 수정할 때 더 중요해진다.
* **포함**

  * `docs/process.md`
  * `src/app.txt`
  * rewrite / variant 파일들
  * 줄 충돌 vs 의미 충돌
* **시각화**

  * 파일 맵 + 변경 의도 표
* **노트**

  * semantic conflict를 미리 심어두기
* **연결**

  * branch 생성과 Developer A MR 흐름으로 이동

## Page 3. Stage 1~3: 병렬 작업 시작

* **제목**: 두 개의 feature branch와 Developer A의 선행 MR
* **takeaway**: 먼저 merge된 작업이 나중 branch에 conflict를 만들어낸다.
* **포함**

  * A/B 각각 `git switch main`, `git pull`, `git switch -c ...`
  * Developer A 수정/commit/push/MR/리뷰/승인/merge
* **시각화**

  * swimlane diagram
* **노트**

  * A가 먼저 merge돼야 B의 conflict가 의미 있게 발생함
* **연결**

  * Developer B MR과 conflict 발생으로 이동

## Page 4. Developer B MR과 Conflict 발생

* **제목**: GitLab에서 conflict가 드러나는 순간
* **takeaway**: conflict는 실패가 아니라 정상적인 협업 이벤트다.
* **포함**

  * B의 수정 / commit / push / MR
  * GitLab conflict 경고
  * merge 버튼 비활성 가능성
* **시각화**

  * MR 배너 placeholder
* **노트**

  * “충돌이 생겼다 = 팀 작업이 실제로 진행되고 있다”는 프레임
* **연결**

  * 로컬 진단으로 이동

## Page 5. 해결 전 진단

* **제목**: conflict를 보자마자 파일부터 열지 않는다
* **takeaway**: 먼저 이력과 추적 관계를 읽고 충돌의 맥락을 확정한다.
* **포함**

  * `git fetch origin`
  * `git branch -vv`
  * `git log --oneline --decorate --graph --all -n 20`
  * 무엇이 먼저 main에 들어갔는지 읽는 질문
* **시각화**

  * 명령 / 읽는 포인트 / 해결 전 질문 표
* **노트**

  * 줄 충돌인지 요구사항 충돌인지 구분시키기
* **연결**

  * conflict marker anatomy로 이동

## Page 6. Conflict Marker 읽기

* **제목**: `<<<<<<<`, `=======`, `>>>>>>>`를 의미로 읽기
* **takeaway**: marker는 기계적으로 지우는 것이 아니라 양쪽 변경의 맥락을 읽기 위한 표식이다.
* **포함**

  * 각 marker 의미
  * `HEAD`와 `origin/main` 위치
  * 한쪽 선택만이 아니라 재작성 가능
* **시각화**

  * conflict snippet + 해설 callout
* **노트**

  * marker를 지우는 것이 곧 해결은 아니라는 점 강조
* **연결**

  * 해결 원칙으로 이동

## Page 7. Conflict Resolution의 본질

* **제목**: 텍스트 병합이 아니라 요구사항 재결정이다
* **takeaway**: conflict 해결은 코드 편집이 아니라 최종 요구사항을 다시 결정하는 과정이다.
* **포함**

  * Developer: 수정
  * Maintainer: 기준 제시
  * Owner: 운영 영향 판단
  * 새 문장으로 재작성 가능
* **시각화**

  * 역할별 질문 카드
* **노트**

  * 양쪽 변경 중 하나만 살리는 것이 정답이 아닐 수 있음을 설명
* **연결**

  * 해결 후 검증으로 이동

## Page 8. 해결 후 검증

* **제목**: conflict는 합쳤다가 아니라 검증했다까지 가야 끝난다
* **takeaway**: 줄 충돌이 없어져도 기능과 의미가 맞는지 다시 확인해야 한다.
* **포함**

  * `git diff`
  * `git diff --staged`
  * 필요한 테스트
  * MR description 업데이트
* **시각화**

  * 체크리스트형 레이아웃
* **노트**

  * “conflict는 없어졌지만 기능은 깨진 상태”가 남을 수 있음을 강조
* **연결**

  * abort 도구로 이동

## Page 9. 너무 복잡하면 중단한다

* **제목**: `merge --abort`와 `rebase --abort`
* **takeaway**: abort는 실패가 아니라 안전 상태 복귀다.
* **포함**

  * `git merge --abort`
  * `git rebase --abort`
  * 언제 abort를 고려할까
* **시각화**

  * 2열 비교 + 되감기 아이콘
* **노트**

  * 무리하게 해결하다 더 망치기 전에 중단하고 협의하는 것이 성숙한 선택
* **연결**

  * semantic conflict로 이동

## Page 10. 의미 충돌

* **제목**: conflict는 해결됐지만 의미는 틀릴 수 있다
* **takeaway**: 줄 기준 병합과 요구사항 기준 정합성은 다른 문제다.
* **포함**

  * 텍스트 충돌 vs 의미 충돌
  * 리뷰 코멘트 / 이슈 / 상대 MR 설명까지 읽어야 하는 이유
* **시각화**

  * 퍼즐 메타포 2열 비교
* **노트**

  * 문장 하나를 합쳤는데도 정책이 바뀔 수 있는 예시
* **연결**

  * revert로 이동

## Page 11. 공유 이력에서의 복구

* **제목**: 왜 `revert`가 기본 복구 경로인가
* **takeaway**: 공유 이력을 보존하면서 기준점을 회복하는 것이 협업에서 더 안전하다.
* **포함**

  * `git log --oneline`
  * `git revert <sha>`
  * `git push origin main`
  * reset이 기본이 아닌 이유
* **시각화**

  * 안전 복구 흐름도
* **노트**

  * Owner의 승인과 운영 영향 판단 연결
* **연결**

  * conflict의 근본 원인으로 이동

## Page 12. conflict가 자주 나는 진짜 원인

* **제목**: conflict는 개인 실수보다 작업 설계 문제일 때가 많다
* **takeaway**: 오래된 branch, 거친 작업 분해, 긴 MR 수명이 충돌을 키운다.
* **포함**

  * 오래된 branch
  * 같은 파일 동시 수정
  * unrelated changes
  * 요구사항 해석 차이
  * 원인 / 예방 짝지음
* **시각화**

  * 원인 → 예방 화살표 표
* **노트**

  * Maintainer가 merge 순서와 작업 분해를 설계해야 함
* **연결**

  * retrospective로 이동

## Page 13. Retrospective

* **제목**: 역할별로 무엇을 배웠는가
* **takeaway**: conflict 실습은 기술보다 역할별 판단 차이를 드러내는 장이다.
* **포함**

  * Owner / Maintainer / Developer 회고 질문
  * 오늘 산출물: MR 2건, conflict 해결 기록, revert 기록
* **시각화**

  * 역할별 회고 카드
* **노트**

  * 다음 장은 사람 간 정합성에서 자동 검증으로 확장된다고 설명
* **연결**

  * CH07 CI/CD로 이동

---

# CH07 Prompt

## 챕터 개요

* 챕터명: **CI/CD Quality Gates and Self-Managed Operations**
* 권장 분량: **11 pages**
* 목적: merge 이후 pipeline, quality gate, self-managed 운영 제약을 이해시킨다.
* 핵심 축: `.gitlab-ci.yml`, stage/job/artifact, pipeline state, pending, runner/variable, deploy readiness
* 주요 자산: `.gitlab-ci.yml`, `scripts/build-site.js`, `scripts/smoke-check.js`, `tests/role-visibility-smoke.test.js`

---

## Page 1. merge는 끝이 아니다

* **제목**: merge는 운영 가능 상태의 시작이다
* **takeaway**: 사람 간 정합성 뒤에는 자동 검증과 운영 정합성이 따라와야 한다.
* **포함**

  * CH06 conflict 해결과 CH07 pipeline의 연결
  * merge → pipeline → quality gate → deploy readiness
* **시각화**

  * 흐름도
* **노트**

  * “green pipeline은 필요조건이지 충분조건은 아니다”
* **연결**

  * `.gitlab-ci.yml` 구조로 이동

## Page 2. `.gitlab-ci.yml` 읽기

* **제목**: YAML을 문법이 아니라 검증 설계도로 읽기
* **takeaway**: CI 파일은 무엇을 어떤 순서로 자동 검증할지 적어둔 운영 문서다.
* **포함**

  * `stages`
  * `job`
  * `script`
  * `artifacts`
  * `rules` 위치
* **리서치**

  * GitLab CI YAML reference
* **시각화**

  * YAML 구조 맵
* **노트**

  * CI Lint는 발표자 노트에서만 짧게
* **연결**

  * 핵심 구성요소 상세로 이동

## Page 3. Stage / Job / Script / Artifact

* **제목**: 파이프라인의 핵심 구성요소 4가지
* **takeaway**: 순서, 작업 단위, 실행 내용, 남는 결과물을 분리해서 봐야 한다.
* **포함**

  * stages = 순서
  * jobs = 작업 단위
  * script = 실행 명령
  * artifacts = 결과물
  * `build-site.js`, `smoke-check.js`, `role-visibility-smoke.test.js` 연결 예
* **시각화**

  * 4칸 카드
* **노트**

  * test → build 순서가 자연스러운 이유 설명
* **연결**

  * pipeline status로 이동

## Page 4. Pipeline Status 해석

* **제목**: success / failed / pending / canceled를 다르게 읽기
* **takeaway**: 상태 색깔 하나만 보고 결론 내리면 안 된다.
* **포함**

  * success
  * failed
  * pending
  * canceled
  * 다음에 해야 할 질문
* **시각화**

  * 상태 카드 4개
* **노트**

  * pending은 코드 문제가 아닐 수도 있음을 강조
* **연결**

  * 로그 읽는 순서로 이동

## Page 5. 로그 읽는 순서

* **제목**: 마지막 줄보다 첫 유의미 에러 줄을 찾기
* **takeaway**: 로그는 “어디서 처음 깨졌는가”를 찾는 방식으로 읽어야 한다.
* **포함**

  * 최신 pipeline인지 확인
  * 어느 stage/job이 실패했는지
  * 첫 의미 있는 실패 줄 찾기
  * artifact/report 확인
  * 코드 문제 vs 환경 문제 분류
* **시각화**

  * numbered checklist + log placeholder
* **노트**

  * flaky test와 deterministic failure 구분
* **연결**

  * 실패 주입 실습으로 이동

## Page 6. 실습: 실패 주입

* **제목**: pipeline 실패를 분류 문제로 학습하기
* **takeaway**: 실패는 겁낼 대상이 아니라 “어느 레이어에서 깨졌는가”를 분류하는 연습 재료다.
* **포함**

  * 없는 파일 참조
  * expected 값 변경
  * 스크립트 오타
  * `src/feature-flags.json` 키 변경
  * 어느 stage/job이 왜 실패했는지 질문
* **시각화**

  * 상단 실패 주입 예시, 하단 분석 질문
* **노트**

  * 로컬에서는 안 보이고 CI에서만 드러나는 이유 설명
* **연결**

  * artifact / report로 이동

## Page 7. Artifact와 Report

* **제목**: 배지보다 증거 묶음을 확인하라
* **takeaway**: pipeline 결과는 성공/실패 색깔이 아니라 남겨진 증거까지 봐야 읽힌다.
* **포함**

  * build 결과물
  * 테스트 리포트
  * coverage
  * lint output
  * 언제 무엇을 보는가
* **시각화**

  * artifact 유형별 표
* **노트**

  * 성공이어도 artifact를 열어봐야 하는 경우 설명
* **연결**

  * pending 분석으로 이동

## Page 8. Pending 분석

* **제목**: pending은 종종 코드보다 인프라 문제다
* **takeaway**: pending을 코드 실패로 오해하면 대응이 틀어진다.
* **포함**

  * runner 없음
  * tag 불일치
  * protected runner 조건
  * variable 접근 제한
  * manual job 오해
* **리서치**

  * protected resources, runners, variables
* **시각화**

  * 원인 / 확인 위치 / 조치 방향 표
* **노트**

  * self-managed 환경에서 pending이 더 인프라 이슈와 연결된다는 설명
* **연결**

  * self-managed 제약으로 이동

## Page 9. Self-Managed GitLab 추가 관점

* **제목**: self-managed 환경에서 추가로 봐야 하는 것
* **takeaway**: self-managed에서는 GitLab 일반론만으로 설명되지 않는 인프라 제약이 많다.
* **포함**

  * shared/group runner
  * internet egress 제한
  * registry 접근
  * protected variables
  * shell vs docker runner
  * 내부망 배포
  * proxy/certificate 문제
* **시각화**

  * 운영 체크포인트 matrix
* **노트**

  * “로컬에서는 되는데 CI에서는 안 되는” 전형적 원인 설명
* **연결**

  * deploy readiness checklist로 이동

## Page 10. Deploy Readiness Checklist

* **제목**: green이어도 바로 배포하지 않는 이유
* **takeaway**: deploy-ready는 pipeline success보다 더 넓은 판단이다.
* **포함**

  * 코드 리뷰 완료
  * required approvals 완료
  * pipeline success
  * artifact 확인
  * rollback 준비
  * 연락 체계
  * 배포 창구 / 시간 확인
* **시각화**

  * checklist
* **노트**

  * Owner와 Maintainer가 각각 무엇을 보는지 분리 설명
* **연결**

  * CH08 end-to-end로 이동

## Page 11. 장 정리

* **제목**: 사람 간 정합성 + 자동 검증 = 운영 가능 상태
* **takeaway**: CH07은 merge 이후를 운영 관점에서 읽게 만든다.
* **포함**

  * `.gitlab-ci.yml`
  * pipeline status
  * artifact
  * pending 원인
  * self-managed 제약
  * deploy readiness
* **시각화**

  * MR → pipeline → deploy/rollback 아이콘 흐름
* **노트**

  * CH08은 종합 시나리오라고 예고
* **연결**

  * issue부터 rollback까지 한 번에 수행하는 장으로 이동

---

# CH08 Prompt

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

---

# 사용 메모

위 번들은 다음 방식으로 쓰면 됩니다.

* **Master Prompt**는 공통 시스템 프롬프트로 사용
* **CH01~CH08 Prompt**는 챕터별 사용자 프롬프트로 사용
* 실제 슬라이드 생성 시에는

  * Master Prompt 1개
  * 해당 Chapter Prompt 1개
  * 필요 시 “이번에는 page 1~5만 생성” 같은 실행 지시
    를 함께 넣으면 됩니다

이번 버전에서 바뀐 핵심은 아래 두 줄입니다.

* 기존: `텍스트를 과밀하게 넣지 않는다.`

* 변경: **교육 목적상 핵심 개념 설명, 비교, 짧은 예시, 주의사항은 충분히 넣되, 중심 메시지가 흐려질 정도로만 과도해지지 않게 한다.**

* 기존: `명령어는 꼭 필요한 것만 넣고, 슬라이드에서 읽히는 최소 단위로 제한한다.`

* 변경: **명령어는 교육 이해를 돕는 범위에서 충분히 넣을 수 있으며, 단순 나열이 아니라 언제 쓰는지 / 무엇을 확인하는지 / 어떤 실수를 예방하는지가 함께 드러나게 구성한다.**

다음 단계로 바로 이어서, 이 마스터/챕터 프롬프트를 기준으로 **실제 슬라이드 초안 문안(슬라이드 제목 + 본문 초안 + 발표자 노트 초안)**까지 CH01부터 순서대로 풀어드릴 수 있습니다.
