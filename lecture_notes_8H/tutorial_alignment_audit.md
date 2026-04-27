# Tutorial Alignment Audit

## Quality Bar

- `lecture_notes_8H`의 8개 장이 `tutorials`의 8개 `LAB.md`와 1:1로 연결되어 있어야 한다.
- 각 장은 `시작 상태`, `새로 추가하는 파일`, `실행 순서`, `실수 포인트`, `종료 상태`를 본문 안에 가져야 한다.
- 학습자는 `LAB.md`를 열지 않아도 강의 노트만으로 실습을 진행할 수 있어야 한다.
- 튜토리얼 자산 이름과 강의 노트의 예시 이름이 일치해야 한다.
- 명령어 커버리지는 전체 8장 기준으로 Git 기초, 협업, 복구, GitLab 운영, CI/CD까지 끊기지 않아야 한다.

## Findings Fixed

1. 장과 튜토리얼의 연결 방식이 느슨했다.
- 수정: [README.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\lecture_notes_8H\README.md)에 장과 튜토리얼 매핑 표를 추가하고, 각 장에 `이 장을 따라갈 때의 실습 연결 맵`을 넣었다.

2. `LAB.md` 없이 따라가기 어려운 구간이 있었다.
- 수정: 각 장에 `강의 노트만으로 진행하는 순서`, `반드시 눈으로 확인할 것`, `이 장 종료 상태`를 추가했다.

3. 장 종료 후 다음 장으로 넘기는 상태가 문서마다 불균등했다.
- 수정: CH01~CH08 모두에 handoff 상태를 명시해 실습 흐름을 이어 붙였다.

4. active note에 남아 있던 예전 용어 drift가 있었다.
- 수정: CH08의 `onboarding 교육` 표현을 `tutorial 교육`으로 교정했다.

## Command Coverage

| Area | Commands / Topics | Primary Chapters |
| --- | --- | --- |
| 저장소 기초 | `repository`, `origin`, `main`, `HEAD`, `clone`, `remote -v`, `branch -vv` | CH01 |
| 로컬 작업 루프 | `status`, `diff`, `add`, `restore --staged`, `commit`, `show`, `push`, `fetch`, `pull` | CH02 |
| 진단과 복구 | `log`, `show`, `stash`, `tag`, `revert`, `reset`, `bisect`, `reflog`, detached HEAD | CH03 |
| 브랜치 운영 | `branch`, `switch`, `checkout`, tracking branch, `merge`, `rebase`, `fork` | CH04 |
| GitLab 운영 | roles, protected branch, MR, review, approval, `CODEOWNERS` | CH05 |
| 협업 충돌 | conflict marker, `merge --abort`, `rebase --abort`, `revert` | CH06 |
| CI/CD | `.gitlab-ci.yml`, test/build job, artifact, runner, pending, variables | CH07 |
| 종합 시나리오 | issue -> branch -> commit -> MR -> review -> approval -> merge -> pipeline -> rollback | CH08 |

## Alignment Notes by Chapter

### CH01

- tutorial seed repo와 초기 저장소 구조를 직접 연결했다.
- `origin`, 기본 브랜치, 권한 상태를 먼저 읽고 들어가도록 기준을 고정했다.

### CH02

- `notes.txt`, `docs/tutorial-guide.md`를 추가하는 흐름과 `status -> diff -> add -> commit -> push` 루프를 직접 연결했다.
- 잘못 staging한 파일을 되돌리는 루틴을 lecture note 본문에 유지했다.

### CH03

- `release-notes-draft.md`, `role-policy.test.js`를 기준으로 `log`, `show`, `stash`, `tag`, `revert`, `bisect`가 이어지도록 정리했다.
- `src/permissions.js` 회귀 예시와 연결되어 복구 판단이 튜토리얼 자산에 닿도록 맞췄다.

### CH04

- `branch-planning.md`, `feature-flags.json`를 기준 자산으로 고정했다.
- `merge`와 `rebase`의 이력 차이를 같은 자산 위에서 비교하도록 유지했다.

### CH05

- MR 템플릿, `CODEOWNERS`, review checklist를 실제 파일 수준에서 연결했다.
- 권한 부족, approval 부족, merge 거절을 GitLab 운영 시나리오와 맞췄다.

### CH06

- `process-a-rewrite.md`, `process-b-rewrite.md`, `app-a.txt`, `app-b.txt`를 활용하는 conflict 랩을 본문에 직접 묶었다.
- conflict 해결, abort, revert가 한 시나리오 안에서 이어지게 정리했다.

### CH07

- `.gitlab-ci.yml`, `build-site.js`, `smoke-check.js`, `role-visibility-smoke.test.js`가 각기 무슨 역할을 하는지 본문에서 설명하도록 보강했다.
- deploy는 개념 설명만 하고 hands-on은 test/build로 한정하는 튜토리얼 범위를 분명히 했다.

### CH08

- `ISSUE-101-sample-action.md`, `sample-action.js`, `sample-action.test.js`, `release-decision-log.md`가 앞선 장의 자산과 이어지도록 정리했다.
- role-based playbook과 사고 대응 절차가 issue부터 rollback까지 한 흐름으로 이어지도록 고정했다.

## Residual Gaps

- 실제 GitLab UI, approval rule, protected branch, runner 상태는 사내 환경마다 다르므로 현장 시연 전에 한 번 더 확인해야 한다.
- 이 환경에서는 `node --test` 실행이 `spawn EPERM`으로 제한되어 전체 자동 검증까지는 수행하지 못했다.
- 문서 alignment는 완료했지만, 실제 교육 전에는 사내 GitLab 프로젝트 정책과 브랜치 이름을 한 번 더 대조하는 것이 안전하다.

## Result

- `lecture_notes_8H`는 이제 `tutorial-collaboration-lab` 시나리오 기준으로 `tutorials`와 정렬되어 있다.
- 각 장은 강의 노트만으로도 실습 진행이 가능하도록 standalone 흐름을 갖는다.
- `LAB.md`는 보조 문서로 위치가 정리되었고, 본문이 주 실행 문서가 되었다.
