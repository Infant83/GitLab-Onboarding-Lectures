# CH01 Execution Prompt

업로드된 `01_Course_Foundation_and_Operating_Model.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH01 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Course Foundation and Operating Model
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: 뒤 7개 장의 기준 좌표를 잡는다
- 핵심 축: Git vs GitLab, 로컬 vs 원격, 권한 vs 책임, 시작 전 진단 습관
- 핵심 자산:
  - `tutorial-collaboration-lab`
  - `README.md`
  - `src/permissions.js`
  - `src/app.js`
  - `docs/process.md`
  - `tests/permissions.test.js`

## 반드시 반영할 학습 메시지
- Git은 상태 전이와 이력 관리 도구다.
- GitLab은 협업 통제와 감사의 운영 레이어다.
- 권한은 실력보다 책임에 가깝다.
- 모든 실습은 `내 위치 확인 -> 의도 확인 -> 명령 실행 -> 결과 검증` 순서로 수행한다.
- CH01이 약하면 뒤 장에서 `pull`, `revert`, `protected branch`, `pipeline` 설명이 무너진다.

## 반드시 반영할 실습 구조
- 시작 상태:
  - 아직 로컬 저장소가 없거나 GitLab에 빈 프로젝트만 있는 상태
- 이 장에서 확인할 것:
  - `origin` URL
  - 기본 브랜치 이름
  - `HEAD`
  - direct push 허용 여부
  - protected branch 여부
- 종료 상태:
  - 로컬 저장소가 만들어지고 기본 브랜치가 원격과 연결됨
  - CH02에서 `notes.txt`, `docs/tutorial-guide.md`를 추가할 준비 완료

## 슬라이드 구성
1. 왜 CH01이 전체 8시간의 기준점인가
2. 8시간 전체 흐름과 역할별 렌즈
3. Git vs GitLab
4. Working Tree / Staging / Local Repo / Remote Repo
5. 필수 용어: repository, origin, default branch, HEAD
6. 초보자의 대표 오해 5가지
7. 기본 진단 명령 6개
8. Shared Repository vs Fork
9. Owner / Maintainer / Developer / Guest를 책임으로 읽기
10. 실습: 환경 점검과 clone 직후 확인
11. 브라우저에서 권한/정책 확인 + CH02 handoff

## CH01에서 특히 강하게 써야 하는 포인트
- `commit != GitLab 반영`
- `origin != main`
- `pull`은 단순 다운로드가 아님
- direct push는 실력 과시가 아니라 운영 정책의 문제
- GitLab roles는 기술 숙련도보다 운영 책임 배분의 관점으로 설명
- SSH/HTTPS 차이, 기본 브랜치 차이, self-managed 차이는 발표자 노트에서 분리

## 실습 슬라이드에 반드시 포함할 명령어
```bash
git --version
git config --global user.name
git config --global user.email
git clone <repo-url>
git status
git branch -vv
git remote -v
git rev-parse --abbrev-ref HEAD
git symbolic-ref refs/remotes/origin/HEAD
git log --oneline --decorate -n 5
```

## 출력 시 주의

* CH01은 오리엔테이션처럼 보이되, 실제로는 뒤 챕터 해석 프레임을 만드는 장으로 써라.
* 텍스트를 너무 줄이지 마라. 교육 목적상 설명 문장과 비교 문장은 충분히 넣어라.
* 다만 각 슬라이드의 중심 메시지는 분명히 유지하라.
* Slide 10과 11은 실제 hands-on 시작 장면처럼 구체적으로 써라.
* 마지막 슬라이드에서는 반드시 CH02로 자연스럽게 연결하라.

지금 바로 CH01 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH01 섹션을 그대로 옮긴 page-by-page 상세 지시다.


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
