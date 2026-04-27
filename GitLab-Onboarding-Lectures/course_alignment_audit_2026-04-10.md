# Course Alignment Audit

Date: 2026-04-10
Scope: `README.md`, 8개 root lecture note, `tutorials/` 전체
Mode: Ralph read-only audit with targeted fix pass

## Audit Bar

- 8개 챕터가 하나의 단계적 학습 경로로 이어져야 한다.
- lecture note만 따라도 학습과 시연이 가능해야 한다.
- `tutorials/`는 lecture note의 실습 시나리오와 파일 단위를 정확히 뒷받침해야 한다.
- 교육 수준은 Git, GitLab 협업, MR/approval, conflict/rollback, CI/CD 운영을 실무형으로 충분히 다뤄야 한다.
- 슬라이드용 page-level prompt를 다시 세울 수 있을 정도로 chapter purpose, role lens, failure pattern, handoff가 명확해야 한다.
- MLOps를 전면에 내세우려면 GitLab의 ML-specific 운영 기능까지 최소 개념 수준 이상 포함되어야 한다.

## What Was Checked

- 챕터별 목적, 학습 목표, 역할별 체크포인트, 실습 시나리오, failure scenario, 종료 체크리스트 존재 여부
- lecture note가 언급하는 tutorial 파일명이 실제 `tutorials/` 자산과 일치하는지
- chapter 간 handoff가 끊기지 않는지
- Git / GitLab / CI/CD / rollback / approval / conflict 축의 커버리지가 충분한지
- 현재 코스가 `MLOps expert-level` 범위를 충족하는지

## Fixed During Audit

### 1. Structure drift

- README에 남아 있던 구 chapter-pack / `_shared` 설명을 제거했다.
- 모든 lecture note의 `tutorial/...` 경로를 현재 구조인 `tutorials/CH??-.../...`로 정리했다.
- lecture note 내 `Copy-Item ..\\tutorial\\...` 예시를 현재 루트 구조 기준 `.\tutorials\CH??-...\...`로 맞췄다.

### 2. Broken file references

- CH04 tutorial LAB의 `tests/report-policy.test.js`를 실제 파일명인 `tests/role-policy.test.js`로 수정했다.
- CH05 tutorial LAB의 `tests/report-policy.test.js`를 실제 파일명인 `tests/role-policy.test.js`로 수정했다.

### 3. Scope extension for self-managed and MLOps

- CH01에 `CI/CD와 MLOps는 어떻게 다른가`, `On-prem GitLab을 전제로 볼 때 달라지는 것` 섹션을 추가했다.
- CH07에 self-managed runner scope, tag routing, protected runner, executor choice, version compatibility, MLOps pipeline 확장 내용을 추가했다.
- CH08에 `MLOps capstone variant`, `code rollback vs model rollback`, 역할별 MLOps 해석을 추가했다.

### 4. Documentation surface examples

- CH05에 GitLab Wiki 운영 기준과 예제를 추가했다.
- CH07에 GitLab Pages 운영 기준과 self-managed 제약 예제를 추가했다.
- CH08 체크리스트에 wiki / repo docs / Pages 역할 분리 질문을 추가했다.

### 5. Event and planning integration examples

- CH05에 OpenProject와 GitLab 연동 목적, branch/MR/work package 연결 원칙, 사내 환경 확인 항목을 추가했다.
- CH07에 webhook vs RSS/Atom 구분, webhook 운영 예제, OpenProject 연동 운영 예제, self-managed webhook 제약을 추가했다.
- CH08에 OpenProject capstone variant와 work package 기반 traceability 질문을 추가했다.

## Findings

### High

1. Current corpus is now credible for Git/GitLab collaboration and CI/CD, and has a meaningful MLOps extension, but it still treats MLOps as an advanced extension rather than the primary course spine.

- 현재 강의는 Git 기초, GitLab 권한/MR, conflict, rollback, pipeline, self-managed runner/variable 제약까지는 잘 다룬다.
- 그러나 GitLab의 ML-specific 운영 축인 model registry, experiment tracking, model version lineage, ML artifact governance, promotion workflow는 사실상 없다.
- 따라서 지금 자료는 `Git/GitLab + CI/CD core course with MLOps extension`으로 부르는 편이 더 정확하다.

Implication:
- 현재 구조는 유지 가능하다.
- 다만 슬라이드와 강의 진행에서 “이 과정의 중심은 Git/GitLab 협업과 self-managed CI/CD이고, MLOps는 후반 확장”이라는 메시지를 일관되게 유지해야 한다.

### Medium

2. CH06, CH07, CH08 are too dense for the current likely page budget.

- CH06은 조별 역할, MR, approval, conflict, abort, revert, retrospective까지 한 장 안에서 다루는 양이 많다.
- CH07은 `.gitlab-ci.yml`, pipeline 상태 해석, artifact, pending, self-managed 제약까지 포함해 페이지 수가 부족해질 가능성이 높다.
- CH08은 issue부터 rollback, role-based playbook, rubric, operational checklist까지 있어 capstone치고 설명량이 많다.

Implication:
- page-level prompt 설계에서 CH06~CH08은 상대적으로 더 많은 페이지를 배정해야 한다.

3. README and lecture notes are now structurally aligned, but slide prompts must be rebuilt from the new root structure.

- 예전 `run_prompt` 체계와 `_shared`는 삭제되었으므로, 새 prompt 시스템은 root lecture note 8개를 공통 source pack으로 사용하는 형태로 다시 정의해야 한다.

### Low

4. README still shows future output examples even though the deck outputs are currently empty.

- 기능적으로 문제는 아니지만, 지금은 `slide_output/`이 초기화된 상태이므로 example output 표시는 실제 상태보다 앞서 있다.

## Coverage Assessment

### Strong

- Git 기본 구조: local / staging / repo / remote
- 핵심 명령: `status`, `add`, `commit`, `push`, `fetch`, `pull`, `branch`, `switch`, `checkout`
- 이력과 복구: `log`, `show`, `diff`, `stash`, `tag`, `revert`, `reset`, `bisect`
- 협업 운영: shared repo vs fork, MR, approvals, protected branch, CODEOWNERS, review checklist
- conflict/rollback: `merge --abort`, `rebase --abort`, `revert`, conflict marker 해석, meaning conflict
- CI/CD 운영: `.gitlab-ci.yml`, pipeline state, artifact, pending, self-managed runner and variable constraints
- 역할 분리: Owner / Maintainer / Developer 관점과 의사결정 질문

### Underrepresented

- full GitLab ML model lifecycle
- hands-on model registry / model version metadata lab
- experiment tracking or MLflow-compatible workflow
- model artifact lineage and promotion gate
- environment promotion for ML-serving use cases

## Recommended Slide Page Counts

These are recommended starting points for the rebuilt page-level prompt system.

- CH01: 12 pages
- CH02: 13 pages
- CH03: 14 pages
- CH04: 13 pages
- CH05: 14 pages
- CH06: 15 pages
- CH07: 14 pages
- CH08: 15 pages

Rationale:

- CH01 needs one extra page for the full 8-chapter roadmap and role lens without compressing the 4-space Git model.
- CH03 benefits from separate pages for `stash/tag`, `revert vs reset`, and `bisect`.
- CH05 needs room for role matrix, protected branch, approval rules, MR anatomy, and failure cases.
- CH06 and CH08 are the densest labs and should not be over-compressed.
- CH07 should separate pipeline anatomy, state interpretation, artifact/report reading, and self-managed operational constraints.

## Recommended Prompt Rebuild Principles

1. Build one common source pack from all 8 lecture notes before drafting chapter prompts.
2. Use each chapter lecture note as the local source of truth for that chapter.
3. Add cross-chapter continuity from the other 7 lecture notes.
4. Use tutorial files only as execution evidence and file anchors, not as the main narrative source.
5. Keep slides information-dense:
   - concept pages: comparison table or matrix
   - workflow pages: 4-7 step flow
   - command pages: code block plus “what question this command answers”
   - failure pages: `symptom / cause / first action`
6. Put longer operational reasoning into speaker notes instead of dropping it.

## Official Accuracy Anchors

- Git reset:
  - https://git-scm.com/docs/git-reset
- Git revert:
  - https://git-scm.com/docs/git-revert
- Git bisect:
  - https://git-scm.com/docs/git-bisect
- GitLab roles and permissions:
  - https://docs.gitlab.com/user/permissions/
- GitLab merge request approvals:
  - https://docs.gitlab.com/user/project/merge_requests/approvals/settings/
- GitLab protected branches:
  - https://docs.gitlab.com/user/project/protected_branches/
- GitLab pipelines:
  - https://docs.gitlab.com/ci/pipelines/
- GitLab model registry:
  - https://docs.gitlab.com/user/project/ml/model_registry/

## Bottom Line

- Current material is credible for a dense Git / GitLab collaboration course with practical CI/CD operations in a self-managed environment.
- MLOps is now present as a deliberate extension in CH01, CH07, CH08, but not yet as a full independent training spine.
- Before rebuilding page-level slide prompts, the next best step is to preserve that scope distinction and reflect self-managed runner realities explicitly in CH07 and CH08 slides.
