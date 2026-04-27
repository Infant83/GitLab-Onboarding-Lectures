# Master Page-Level Prompt System

이 문서는 `GitLab-Onboarding-Lectures`의 8개 챕터 슬라이드를 Skywork에서 일관되게 생성하기 위한 상위 규칙이다. 모든 챕터 프롬프트는 이 문서를 먼저 따른다.

## 목적

- root lecture note를 source of truth로 유지한다.
- 8챕터를 각각 생성하더라도 하나의 교육 과정처럼 이어지게 만든다.
- 텍스트, 도식, 표, 실습 안내, 코드 블록이 충분히 밀도 있게 들어간 실무형 강의 슬라이드를 만든다.
- Git, GitLab, CI/CD, self-managed runner, Pages, Wiki, webhook, OpenProject, MLOps 확장을 서로 충돌 없이 설명한다.

## 입력 우선순위

충돌 시 아래 순서를 따른다.

1. 해당 챕터 `CH??-..._lecture-note.md`
2. 나머지 7개 lecture note의 연속성 정보
3. `README.md`
4. `course_alignment_audit_2026-04-10.md`
5. `tutorials/CH??-.../LAB.md`와 자산 파일명
6. 공식 문서 기반 심층 리서치

즉, 외부 심층 리서치는 lecture note를 대체하지 않고, lecture note에 빈틈이 있을 때만 보강한다.

## 심층 리서치 사용 원칙

- 기본 설명, 명령어, 실습 흐름은 lecture note 기준으로 유지한다.
- 아래처럼 변경 가능성이 있거나 self-managed 차이가 큰 주제만 공식 문서로 보강한다.
  - GitLab roles / permissions
  - protected branch / approval rules
  - self-managed runner scope / executor
  - GitLab Pages
  - webhook / outbound request
  - GitLab Model Registry
  - OpenProject GitLab integration
- 리서치 결과가 lecture note와 충돌하면 lecture note를 먼저 따른다. 단, 명백한 최신 기능 차이가 있으면 슬라이드에서 “사내 버전에 따라 다를 수 있음”으로 처리한다.

## 챕터 생성 공통 규칙

- 각 챕터는 독립적으로 볼 수 있어야 한다.
- 동시에 8시간 전체 과정의 한 구간처럼 읽혀야 한다.
- Page 1은 항상 `chapter cover + introduction`이다.
- 별도 표지 슬라이드는 만들지 않는다.
- Page 1에는 반드시 아래가 들어간다.
  - 챕터 제목
  - 대표 이미지 또는 대표 시각 요소
  - 발표자명 placeholder
  - 발표부서 placeholder
  - 발표일자
  - 이번 장에서 배울 preview topic 3~4개
- Page 1 제목은 “왜 CH01이 중요한가” 같은 메타 표현보다, 실제 학습 주제를 직접 드러내는 제목을 쓴다.

## 정보 밀도 규칙

- 중심 메시지는 페이지당 1개로 유지한다.
- 하지만 교육 슬라이드이므로 정보 밀도는 높게 유지한다.
- 슬라이드 본문이 지나치게 비어 보이지 않게 아래 기준을 따른다.

### 개념 페이지

- 최소 3개 이상의 구체 포인트를 넣는다.
- 아래 중 최소 1개를 반드시 사용한다.
  - 비교표
  - 2열 구조
  - 역할 matrix
  - lifecycle / flow diagram
  - callout box

### 명령어 / 실습 페이지

- 핵심 명령은 2~6개 범위에서 넣는다.
- 명령어 나열만 하지 말고 아래 중 최소 2개를 같이 보여 준다.
  - 언제 쓰는가
  - 무엇을 확인하는가
  - 기대 결과
  - 실패 시그널
  - 자주 하는 실수

### 운영 / 의사결정 페이지

- 최소 4행 이상의 matrix, checklist, symptom table 중 하나를 사용한다.
- `상태 -> 판단 -> 첫 행동`이 보이게 구성한다.

### 요약 / handoff 페이지

- 오늘의 핵심 도구나 규칙을 4개 이상 정리한다.
- 다음 장으로 넘어가는 handoff를 2~3개 넣는다.

## 시각화 규칙

- 도식이 필요한 페이지는 텍스트를 그대로 나열하지 말고 도형 흐름이나 표로 변환한다.
- 명령어는 monospace 계열로 표현한다.
- Git 4공간, branch graph, pipeline flow, webhook flow, role matrix, failure matrix는 반드시 시각화한다.
- 흰 배경 corporate 스타일을 유지하되, 시각 요소가 빈약해지지 않도록 box, divider, matrix, flow를 적극 사용한다.

## 발표자 노트 / 슬라이드 본문 분리 규칙

- 슬라이드 본문은 교육용 요약과 판단 기준 위주로 쓴다.
- 긴 실전 질문, 예외 설명, 주의사항은 speaker note 성격으로 처리하되, 본문 핵심 메시지가 약해지면 안 된다.
- 강의 노트의 장문 해설을 본문에 전부 복사하지 않는다.
- 하지만 본문만 보고도 학습자가 핵심 개념과 실습 순서를 이해할 수 있어야 한다.

## 역할 규칙

- `Owner / Maintainer / Developer` 시선이 필요한 페이지에서는 반드시 분리한다.
- 역할 차이는 숙련도보다 책임, 승인, 감사, 위험 관리 관점으로 설명한다.
- `Guest`는 읽기 권한, 가시성, 관찰 목적에서만 제한적으로 다룬다.

## Git / GitLab / self-managed / MLOps 경계 규칙

- Git 공통 원리와 GitLab 운영 레이어를 혼동하지 않는다.
- GitLab.com 예시를 self-managed 일반론처럼 단정하지 않는다.
- self-managed 차이는 CH07~CH08에서 가장 자세히 다룬다.
- MLOps는 코스의 주 spine이 아니라 CH01 개념 구분, CH07~CH08 운영 확장으로 다룬다.

## 템플릿 규칙

- Skywork에서는 `LGD_Template.pptx`를 기준 템플릿으로 사용한다.
- 템플릿 적용이 실패하면 흰 배경, 좌측 정렬, corporate 정보 구조, 선명한 section divider, grid 기반 배치를 유지한다.
- 템플릿 실패를 이유로 슬라이드 밀도를 낮추지 않는다.

## 품질 우선순위

충돌 시 아래 순서를 따른다.

1. lecture note의 정확한 개념, 명령어, 자산명, 역할 관계
2. 페이지 중심 메시지 1개가 분명하게 보일 것
3. 교육적으로 충분한 정보 밀도
4. 챕터 간 연속성
5. 시각적 완성도

## 페이지 프롬프트 작성 형식

각 챕터 prompt는 아래 구조를 따른다.

1. 챕터 개요
2. source-of-truth 선언
3. chapter-specific density / risk / style rules
4. page-by-page guide

각 페이지는 아래 항목을 가진다.

- 페이지 번호
- 슬라이드 제목
- 페이지 목적
- 핵심 takeaway
- 반드시 포함할 내용
- 시각화 방식
- 정보 밀도 가이드
- 발표자 보강 포인트
- 실습 / 토론 cue
- 다음 페이지 연결

## 생성 후 Ralph Audit 기준

각 챕터 슬라이드는 최소 아래 항목으로 점검한다.

- source alignment
- density
- role clarity
- self-managed accuracy
- tutorial continuity
- delivery readiness

점수는 10점 만점 기준으로 기록하고, drift가 있으면 correction loop를 한 번 더 돈다.
