# CH04 학습 노트

## 장 제목

CH04. Branch Strategy and Sync Decisions

## Source of Truth

- 강의 노트: `../../GitLab-Onboarding-Lectures/CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md`
- 실습 가이드: `../../GitLab-Onboarding-Lectures/tutorials/CH04-Branch-Strategy-and-Sync-Decisions/LAB.md`
- 실습 자산: `../../GitLab-Onboarding-Lectures/tutorials/CH04-Branch-Strategy-and-Sync-Decisions/assets/`

## 사용할 repository

- 실제 Git 실습 repo: `../CH01/tutorial-collaboration-lab`
- CH04는 CH03까지 만든 같은 repository 위에 이어서 진행한다.

## 시작 상태

- 최신 commit: `dfd7738 Revert "bug: allow developer sample action by mistake"`
- 현재 상태: `HEAD -> main, origin/main, origin/HEAD`
- working tree: clean
- tag: `v0.1.0 -> ddf22bf`

## 오늘의 핵심 질문

- branch는 폴더 복사인가, commit을 가리키는 ref인가?
- `switch`와 `checkout`은 어떤 차이가 있는가?
- `branch -vv`에서 tracking branch와 ahead/behind를 읽을 수 있는가?
- `merge`와 `rebase`는 history 모양을 어떻게 다르게 만드는가?
- 언제 rebase를 피하고 merge를 선택해야 하는가?

## 오늘 추가할 파일

- `docs/branch-planning.md`
- `src/feature-flags.json`

## 실습 1 결과: feature/branch-playbook

- 생성 branch: `feature/branch-playbook`
- 시작 commit: `dfd7738 Revert "bug: allow developer sample action by mistake"`
- 추가 파일: `docs/branch-planning.md`
- commit: `a1eeb94 docs: add branch planning memo`
- remote tracking: `origin/feature/branch-playbook`
- 현재 의미:
  - `feature/branch-playbook`은 `main`보다 1 commit 앞서 있다.
  - `main`은 여전히 `dfd7738`에 있고, `origin/main`을 tracking한다.
  - branch는 파일 복사본이 아니라 commit을 가리키는 움직이는 ref다.

## 실습 2 결과: feature/feature-flags

- 생성 branch: `feature/feature-flags`
- 시작 commit: `dfd7738 Revert "bug: allow developer sample action by mistake"`
- 추가 파일: `src/feature-flags.json`
- commit: `ed260e0 feat: add tutorial feature flags`
- remote tracking: `origin/feature/feature-flags`
- 현재 의미:
  - `feature/branch-playbook`과 `feature/feature-flags`는 같은 `main` 기준점에서 병렬로 갈라졌다.
  - 두 branch는 서로 다른 파일을 추가하므로 현재는 content conflict 가능성이 낮다.
  - `git log --graph --all`에서 두 feature branch가 같은 부모 commit에서 갈라진 모습을 확인했다.

## 실습 3 결과: fast-forward merge

- 대상 branch: `feature/branch-playbook`
- 실행 위치: `main`
- 실행 명령: `git merge feature/branch-playbook`
- 결과:
  - `main`이 `dfd7738`에서 `a1eeb94`로 이동했다.
  - 별도 merge commit은 생기지 않았다.
  - `main`과 `feature/branch-playbook`이 같은 commit `a1eeb94`를 가리키게 되었다.
- 확인한 핵심:
  - fast-forward merge는 branch가 갈라진 뒤 main에 추가 commit이 없을 때 가능하다.
  - 이 경우 Git은 새 merge commit을 만들지 않고 branch pointer만 앞으로 이동한다.

## 실습 4 결과: rebase

- 대상 branch: `feature/feature-flags`
- rebase 기준: `origin/main`
- rebase 전 feature commit: `ed260e0 feat: add tutorial feature flags`
- rebase 후 feature commit: `c503dfc feat: add tutorial feature flags`
- 결과:
  - `feature/feature-flags`가 최신 `origin/main`의 `a1eeb94` 위로 다시 놓였다.
  - commit 내용은 같지만 SHA가 `ed260e0`에서 `c503dfc`로 바뀌었다.
  - local branch와 `origin/feature/feature-flags`가 diverged 상태가 되었다.
- 확인한 핵심:
  - rebase는 history를 직선적으로 만들 수 있다.
  - rebase는 commit을 새로 만들기 때문에 SHA가 바뀐다.
  - 이미 remote에 올린 branch를 rebase하면 push할 때 일반 push가 막힐 수 있고, force-with-lease 같은 신중한 push가 필요할 수 있다.

## 실습 5 결과: force-with-lease

- 상황: rebase 후 local `feature/feature-flags`와 `origin/feature/feature-flags`가 diverged 상태가 되었다.
- 실행 명령: `git push --force-with-lease`
- 결과:
  - `origin/feature/feature-flags`가 `ed260e0`에서 `c503dfc`로 업데이트되었다.
  - local branch와 remote tracking branch가 다시 정렬되었다.
- 확인한 핵심:
  - rebase 후 remote branch를 갱신하려면 일반 push가 막힐 수 있다.
  - `--force-with-lease`는 내가 알고 있던 remote 상태가 유지된 경우에만 강제 업데이트하므로 `--force`보다 안전하다.

## 실습 6 결과: feature/feature-flags를 main에 반영

- 실행 branch: `main`
- merge 대상: `feature/feature-flags`
- 결과:
  - `main`이 `a1eeb94`에서 `c503dfc`로 fast-forward 되었다.
  - `docs/branch-planning.md`와 `src/feature-flags.json`이 모두 `main`에 존재한다.
  - `node --test` 결과: 6개 테스트 통과
- 현재 push 전 상태:
  - `main`은 `origin/main`보다 1 commit 앞서 있다.

## 실습 6 push 후 상태

- 최신 commit: `c503dfc feat: add tutorial feature flags`
- 현재 상태: `HEAD -> main, origin/main, origin/HEAD`
- feature branch 상태:
  - `feature/branch-playbook -> a1eeb94`
  - `feature/feature-flags -> c503dfc`
- 확인한 핵심:
  - 두 feature branch의 변경이 모두 `main`에 반영되었다.
  - rebase 후 main merge 결과는 직선형 history로 정리되었다.

## 실습 7 결과: detached HEAD

- 실행 명령: `git checkout dfd7738`
- 상태:
  - `HEAD detached at dfd7738`
  - `HEAD`가 branch가 아니라 특정 commit `dfd7738`을 직접 가리켰다.
- 확인한 핵심:
  - detached HEAD는 과거 commit을 조사할 때 유용하다.
  - 이 상태에서 새 commit을 만들면 branch가 아닌 위치에 commit이 생길 수 있어 주의해야 한다.
  - 보존할 실험이면 `git switch -c <new-branch-name>`으로 branch를 만들어야 한다.
- 복귀:
  - `git switch main`
  - 복귀 후 상태: `HEAD -> main -> c503dfc`

## CH04 종료 질문 답변 정리

- branch는 폴더 복사본이 아니라 특정 commit을 가리키는 움직이는 ref다. 새 commit이 생기면 해당 branch ref가 앞으로 이동한다.
- `switch`는 branch 이동과 생성에 집중한 명령이다. `checkout`은 branch 이동, commit checkout, 파일 복구 등 여러 기능을 함께 갖고 있어 초보자에게 혼동될 수 있다.
- fast-forward merge는 target branch가 feature branch의 조상 commit에 있을 때 가능하다. 이 경우 Git은 새 merge commit을 만들지 않고 target branch pointer만 feature branch commit으로 앞으로 이동한다.
- rebase는 기존 commit을 새 base 위에 다시 적용하면서 새 commit object를 만든다. 그래서 변경 내용이 같아도 commit SHA가 바뀐다.
- 이미 remote에 올린 branch를 rebase하면 local history와 remote history가 달라진다. 일반 push는 막힐 수 있고, `--force-with-lease`는 remote가 내가 마지막으로 알고 있던 상태일 때만 안전하게 업데이트한다.
- detached HEAD는 branch가 아니라 특정 commit을 직접 보고 있는 상태다. 이 상태에서 새 commit을 만들면 branch 이름이 그 commit을 붙잡고 있지 않아 나중에 잃어버리기 쉬우므로 주의해야 한다.
