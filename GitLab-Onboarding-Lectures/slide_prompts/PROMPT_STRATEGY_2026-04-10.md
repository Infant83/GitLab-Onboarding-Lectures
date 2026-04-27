# Prompt Strategy

Date: 2026-04-10

## Decision

`GPTs 심층리서치 프롬프트 생성기`는 주 생성기가 아니라 보강기와 검증기로 사용한다.

## Why

- 현재 코스의 source of truth는 root lecture note 8개와 `tutorials/`다.
- 페이지 프롬프트는 챕터 간 연속성, 실습 자산명, 역할 관점, self-managed 경계를 유지해야 하므로 로컬 자료 우선이 더 안전하다.
- 외부 GPT를 주 생성기로 쓰면 lecture note에서 멀어지는 drift 위험이 크다.

## Working Rule

1. root lecture note를 기준으로 chapter page prompt를 작성한다.
2. `README.md`와 다른 7개 lecture note는 continuity 보강에만 사용한다.
3. CH05, CH07, CH08처럼 self-managed / Pages / Wiki / OpenProject / MLOps 비중이 큰 장만 공식 문서 기반 심층 리서치로 추가 검증한다.
4. 심층 리서치 결과는 lecture note를 대체하지 않고, 표현의 빈틈과 최신 운영 주의점을 메우는 용도로만 쓴다.
5. Skywork 입력 시에는 해당 챕터 lecture note와 chapter page prompt를 주 입력으로 사용한다.
6. 생성 후 Ralph audit으로 source alignment, density, role clarity, self-managed accuracy, delivery readiness를 점검한다.

## Chapter Risk Guidance

- CH01~CH04:
  - Git / GitLab / local workflow / history / branch 전략 중심
  - 심층 리서치 의존도 낮음
- CH05:
  - permissions, approval, Wiki, OpenProject 연동
  - 공식 문서 검증 가치 높음
- CH06:
  - conflict / rollback lab 중심
  - lecture note 우선
- CH07:
  - self-managed runner, Pages, webhook, MLOps extension
  - 공식 문서 검증 중요
- CH08:
  - capstone, OpenProject traceability, model rollback variant
  - 공식 문서 검증 중간 이상

## Output Expectation

- 슬라이드는 교육용으로 충분히 dense해야 한다.
- Page 1은 항상 cover + introduction 구조여야 한다.
- command, matrix, flow, checklist, failure table이 필요한 페이지는 적극적으로 시각화한다.
- 발표자가 실제 수업에 바로 쓸 수 있을 정도로 page purpose와 transition이 분명해야 한다.
