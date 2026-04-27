# Slide Alignment Audit Round 1

Date: 2026-04-11
Scope: `GitLab-Onboarding-Lectures`의 CH01~CH08 `lecture note`, `tutorials`, `slide_prompts`, 생성된 `pptx`/`pdf`
Mode: Ralph hybrid audit, read-mostly with evidence capture

## Audit Bar

- 챕터별 `lecture note`, `tutorial`, `slide prompt`, `actual slide`가 같은 학습 목표와 같은 실습 흐름을 말해야 한다.
- CH01 seed에서 CH08 capstone까지 파일과 시나리오가 끊기지 않아야 한다.
- 실제 슬라이드는 page-level prompt가 요구한 제목, 메시지, 실습 연결, 역할 렌즈를 placeholder 없이 반영해야 한다.
- GitLab / OpenProject / CI/CD / self-managed 운영의 실측 결과는 관련 챕터에 반영되어야 한다.
- 2차 라운드는 필요한 부분만 겨냥해야 하며, 이미 안정된 lecture note / tutorial 축을 불필요하게 흔들면 안 된다.

## Evidence Checked

### Corpus structure

- 루트 lecture note 8종 존재 확인
- `tutorials/CH01~CH08` 존재 확인
- `slide_prompts/CH01~CH08_page_prompt.md` 존재 확인
- 루트 `CH01~CH08.pptx`, `.pdf` 존재 확인
- `slide_output/CH01~CH08` 존재 확인

### Continuity evidence

- 기존 `course_alignment_audit_2026-04-10.md` 확인
- 기존 `tutorial_continuity_audit_2026-04-11.md` 확인
- GitLab live audit 및 OpenProject webhook 실측 결과 확인

### Slide evidence

- 각 `pptx`에서 실제 슬라이드 수 추출
- 각 `slide_prompt`의 기대 슬라이드 제목 추출
- 실제 `pptx`의 각 슬라이드 첫 텍스트와 대조
- placeholder / generic table header / 잘못된 cover title 여부 추출

## Overall Result

- `lecture note`와 `tutorial`의 정합성은 현재 기준으로 충분히 높다.
- 1차 슬라이드 산출물은 전 챕터 공통 page budget은 대체로 지켰지만, 일부 챕터에서 prompt drift와 placeholder 잔존이 있다.
- 따라서 2차 라운드는 필요하다.
- 다만 범위는 `lecture note 재작성`이 아니라 `slide prompt hardening + slide 재생성 + 결과 검수`로 좁히는 것이 맞다.

## Findings

### High 1. Slide deck quality is the current bottleneck, not the lecture notes

- `lecture note`와 `tutorial`은 CH01 seed -> CH08 capstone까지 이어지는 구조가 이미 한 차례 로컬 연속 검증을 통과했다.
- 반면 실제 `pptx`에는 placeholder가 남아 있거나, prompt의 핵심 슬라이드 제목이 generic title로 대체된 페이지가 여러 개 보인다.
- 따라서 현재 품질 병목은 source material이 아니라 generated slide layer다.

Evidence:

- CH01 slide 2: `페이지 제목 / Page title`
- CH03 slide 3: `페이지 제목 / diff, log, show를 목적별로 구분하기`
- CH03 slide 5: `1`
- CH04 slide 1: `LG Display`
- CH04 slide 11: `페이지 제목 / Page title`
- CH05 slide 12: `페이지 제목 : OpenProject와 GitLab 연결의 이점`
- CH06 slide 11: `페이지 제목 / 왜 reset --hard를 기본 복구로 가치지 않는가`
- CH07 slide 14: `... | 페이지 제목 / Page title | ...`
- CH08 slide 5: `페이지 제목 / branch -> MR -> review -> approval -> merge`

Implication:

- 2차 라운드는 slide 재생성이 중심이어야 한다.
- lecture note / tutorial을 다시 뜯는 것은 우선순위가 아니다.

### High 2. Several chapters have prompt-to-slide semantic drift even when slide count matches

- 모든 챕터에서 기대 slide 수와 실제 slide 수는 일치했다.
- 그러나 slide count 일치만으로는 충분하지 않았다.
- 특히 CH02, CH03, CH04는 prompt가 요구한 “실패 시나리오”, “명령어의 질문 기반 구분”, “tracking/upstream”, “rebase failure”가 실제 deck에서 generic table header 또는 다른 페이지 제목으로 흘렀다.

Evidence:

- CH02 expected slide 4 `add는 저장이 아니라 staging이다` -> actual `명령어`
- CH02 expected slide 10 `failure scenario: non-fast-forward` -> actual `잘못된 Staging 복구와 gitignore의 활용`
- CH02 expected slide 12 `wrong branch / bad commit scope` -> actual `증상`
- CH04 expected slide 4 `tracking branch와 upstream을 읽는 법` -> actual `브랜치 동기화 상태 및 조치`
- CH04 expected slide 10 `merge 방식 sync와 rebase 방식 sync를 비교하기` -> actual `비교 항목`

Implication:

- page-level prompt는 이미 존재하므로, 2차 라운드에서는 “generic header 금지”, “slide title exactness”, “failure slide의 구조 강제”를 더 세게 걸어야 한다.

### High 3. CH03 and CH04 are not ready for sign-off without regeneration

- CH03은 placeholder와 `1` 같은 비정상 제목이 있어 deck 신뢰도를 즉시 떨어뜨린다.
- CH04는 cover slide가 `LG Display`만 보이고, 실패 시나리오 슬라이드도 placeholder가 남아 있다.
- 두 챕터는 지금 상태로는 강의용 교재로 바로 쓰기 어렵다.

Implication:

- CH03, CH04는 2차 라운드 우선 재생성 대상이다.

### Medium 1. CH05~CH07 content bar is stronger because live validation now exists

- CH05, CH07, live audit 문서에는 GitLab webhook / OpenProject activity / linked endpoint `403` / direct membership `count=0`까지 실측 근거가 반영되어 있다.
- 이 영역은 단순 개념 설명보다 실제 운영 차이를 가르칠 수 있는 상태다.
- 따라서 2차 슬라이드에서는 이 실측 메모를 더 강하게 살려야 한다.

Evidence:

- OpenProject webhook delivery `200`
- work package `43` activity에 `MR Opened`, `Pushed in refs/heads/main`, `MR Merged`
- linked endpoint `gitlab_issues`, `gitlab_merge_requests`는 `403 MissingPermission`
- direct membership query `count=0`

Implication:

- CH05 slide 12, CH07 OpenProject / webhook 관련 슬라이드는 재생성 시 “activity 생성 성공 vs linked tab 권한 실패”를 분리해서 보여 줘야 한다.

### Medium 2. Tutorial continuity is in better shape than the slide narrative continuity

- `tutorials/CH01~CH08`는 각 장에서 “이번 장에서 새로 추가하는 파일”, “이전 장에서 이어받는 파일”, “강의 연결 포인트”를 갖고 있다.
- 이 구조는 lecture note의 chapter handoff와 잘 맞는다.
- 반면 실제 slide는 chapter handoff보다 단일 페이지 품질 문제로 더 많이 깨져 있다.

Implication:

- 2차 라운드에서 tutorial 재설계보다 slide narrative continuity를 우선 보강해야 한다.

### Medium 3. Cover slide policy is not being applied consistently

- 현재 actual deck들은 모두 page 1을 cover/introduction 용도로 사용하고 있으나, 일부 챕터는 chapter cover가 잘 되고 일부는 generic/incorrect 표현이 남아 있다.
- CH04 slide 1의 `LG Display` 단독 표기는 대표적인 실패다.

Implication:

- 2차 run prompt에는 page 1 강제 규칙이 필요하다:
  - chapter title
  - 부제 또는 이번 장 학습 주제
  - 발표자 / 발표 부서 / 발표일
  - 대표 이미지 또는 핵심 시각 요소
  - placeholder 절대 금지

### Low 1. Minor wording and typo cleanup remains

- CH01 actual: `저작소`
- CH04 actual: `쏠까`, `덜 끌이게`
- CH06 actual: `가치지`
- CH03 actual: `상향별`

Implication:

- 2차 라운드 후에는 language proof pass가 필요하다.

## Chapter-by-Chapter Status

### CH01

- Lecture/tutorial alignment: good
- Slide status: usable but needs refresh
- Reason:
  - slide 2 placeholder
  - wording drift on command slide
  - role / on-prem / command overview structure는 대체로 유지
- Recommendation:
  - 2차 라운드 대상
  - 우선순위 medium

### CH02

- Lecture/tutorial alignment: good
- Slide status: needs refresh
- Reason:
  - command/failure pages가 generic header로 무너짐
  - prompt의 “질문 기반 명령어 설명”이 약화됨
- Recommendation:
  - 2차 라운드 대상
  - 우선순위 high

### CH03

- Lecture/tutorial alignment: good
- Slide status: not sign-off ready
- Reason:
  - placeholder title
  - broken title `1`
  - recovery decision matrix는 살아 있으나 완성도 부족
- Recommendation:
  - 2차 라운드 최우선

### CH04

- Lecture/tutorial alignment: good
- Slide status: not sign-off ready
- Reason:
  - cover 실패
  - comparison/failure slides generic
  - branch strategy chapter의 기준 좌표가 deck에서 약화됨
- Recommendation:
  - 2차 라운드 최우선

### CH05

- Lecture/tutorial alignment: good
- Slide status: mostly usable with one weak page
- Reason:
  - OpenProject integration slide에 placeholder 잔존
  - live validation 근거를 더 명확히 반영할 가치가 큼
- Recommendation:
  - 2차 라운드 대상
  - 우선순위 medium

### CH06

- Lecture/tutorial alignment: strong
- Slide status: mostly usable with one weak page
- Reason:
  - CH06/CH07 continuity는 이미 local chain 검증 완료
  - 다만 `reset --hard` 설명 slide가 placeholder를 포함
- Recommendation:
  - 2차 라운드 대상
  - 우선순위 medium

### CH07

- Lecture/tutorial alignment: strong
- Slide status: mostly usable
- Reason:
  - 내용 범위는 좋고 self-managed / webhook / MLOps 확장 축도 살아 있음
  - 다만 일부 placeholder 잔존과 phrasing cleanup 필요
- Recommendation:
  - 2차 라운드 후보
  - 우선순위 medium-low

### CH08

- Lecture/tutorial alignment: strong
- Slide status: needs refresh
- Reason:
  - capstone 핵심 flow slide에 placeholder 잔존
  - role playbook과 rollback 축은 유지되나 delivery polish 부족
- Recommendation:
  - 2차 라운드 대상
  - 우선순위 high

## Decision

2차 라운드는 진행하는 것이 맞다.

다만 순서는 다음처럼 좁혀야 한다.

1. CH03, CH04, CH08 재생성
2. CH02, CH01 재생성
3. CH05, CH06, CH07 보강 재생성
4. 마지막에 전 챕터 language proof + title consistency pass

## What Should Be Improved In Round 2

### Prompt hardening

- `페이지 제목`, `Page title`, `비교 항목`, `명령어` 같은 generic header 금지
- slide title은 page prompt의 제목을 그대로 쓰거나 의미 손실 없는 수준으로만 바꿀 수 있게 제한
- failure scenario page는 `증상 / 원인 / 첫 조치 / role별 판단` 구조 강제
- cover page는 chapter title + subtitle + 발표자 정보 + 날짜 + 대표 시각 요소 강제
- tutorial과 연결되는 파일명은 slide 안에서 실제 파일명과 일치시킬 것

### Slide validation

- 생성 직후 `pptx` 텍스트 추출로 placeholder scan
- expected slide title vs actual slide first text 비교
- chapter별 1개 이상 screenshot or rendered preview check

### Content strengthening

- CH05 / CH07은 live GitLab/OpenProject 실측 결과를 운영 사례로 더 선명하게 반영
- CH08은 capstone flow에서 issue/work package -> branch -> MR -> pipeline -> rollback 흐름을 더 명확히 시각화

## Bottom Line

- source material은 2차 대개편이 필요하지 않다
- slides는 2차 라운드가 필요하다
- 특히 CH03, CH04, CH08이 가장 시급하다
- 따라서 다음 실행 단위는 `slide prompt 강화 -> chapter별 slide 재생성 -> placeholder/continuity 재검수`가 맞다
