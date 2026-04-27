# Page Prompt Ralph Audit

Date: 2026-04-10

## Scope

- `slide_prompts/MASTER_PAGE_PROMPT_SYSTEM.md`
- `slide_prompts/CH01_page_prompt.md`
- `slide_prompts/CH02_page_prompt.md`
- `slide_prompts/CH03_page_prompt.md`
- `slide_prompts/CH04_page_prompt.md`
- `slide_prompts/CH05_page_prompt.md`
- `slide_prompts/CH06_page_prompt.md`
- `slide_prompts/CH07_page_prompt.md`
- `slide_prompts/CH08_page_prompt.md`

## Audit Criteria

- lecture note alignment
- chapter-to-chapter continuity
- information density guidance
- role clarity
- self-managed accuracy boundary
- tutorial continuity
- slide generation readiness

## Findings

### 1. Source-of-truth drift

- 이전 prompt 체계에는 chapter별로 page count와 detailed guide가 충돌하는 부분이 있었다.
- 이번 개편에서는 모든 chapter prompt가 root lecture note를 source of truth로 명시하고, chapter-specific rules를 별도로 가졌다.
- 현재 page 수는 모두 `^### Page` 개수와 권장 분량이 일치한다.

### 2. Page 1 consistency

- 모든 chapter prompt는 Page 1을 `cover + introduction`으로 고정했다.
- Page 1에 발표자명, 발표부서, 발표일자, preview topic이 들어가도록 통일했다.
- “왜 이 장이 중요한가” 같은 메타 제목 대신 실제 학습 주제를 제목으로 잡았다.

### 3. Density

- 이전보다 텍스트/도식 밀도 기준이 명확해졌다.
- command page는 명령어만 나열하지 않고 용도, 확인 포인트, 실패 신호를 같이 넣도록 통일했다.
- summary page는 다음 장 handoff를 명시한다.

### 4. High-risk chapters

- CH05는 Wiki, approval, OpenProject traceability를 별도 페이지로 확보했다.
- CH07은 runner, Pages, webhook/RSS, self-managed risk, MLOps extension을 분리해 과밀을 줄였다.
- CH08은 OpenProject variant와 MLOps variant를 각각 따로 두었다.

### 5. Remaining risks

- 실제 Skywork 생성에서는 한 페이지에 들어가는 텍스트 양이 도구 내부 layout 판단에 따라 조금 달라질 수 있다.
- CH07, CH08은 정보량이 많으므로 첫 생성 후 밀도 과소 또는 과대 여부를 Ralph correction loop로 다시 봐야 한다.
- self-managed 세부사항은 사내 GitLab 버전에 따라 일부 UI 명칭 차이가 있을 수 있으므로, 생성 후 실서비스 화면과 대조가 필요하다.

## Scores

- lecture note alignment: 9.4 / 10
- continuity: 9.2 / 10
- density guidance: 9.1 / 10
- role clarity: 9.3 / 10
- self-managed boundary: 9.0 / 10
- tutorial continuity: 9.1 / 10
- generation readiness: 9.2 / 10

Overall: 9.2 / 10

## Next Step

1. CH01부터 chapter lecture note + chapter page prompt를 함께 사용해 Skywork 생성
2. 생성 후 Ralph audit
3. drift가 큰 페이지만 correction loop 수행
