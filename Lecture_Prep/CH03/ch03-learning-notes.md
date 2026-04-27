# CH03 학습 노트

## 장 제목

CH03. History Inspection and Recovery

## Source of Truth

- 강의 노트: `../../GitLab-Onboarding-Lectures/CH03-History-Inspection-and-Recovery_lecture-note.md`
- 실습 가이드: `../../GitLab-Onboarding-Lectures/tutorials/CH03-History-Inspection-and-Recovery/LAB.md`
- 실습 자산: `../../GitLab-Onboarding-Lectures/tutorials/CH03-History-Inspection-and-Recovery/assets/`

## 사용할 repository

- 실제 Git 실습 repo: `../CH01/tutorial-collaboration-lab`
- CH03은 CH01~CH02에서 만든 같은 repository 위에 이어서 진행한다.

## 오늘의 핵심 질문

- 최근 commit history를 보고 어떤 변경이 있었는지 설명할 수 있는가?
- 특정 commit이 어떤 파일을 바꿨는지 `git show`로 확인할 수 있는가?
- 작업 중인 변경을 임시로 숨길 때 `stash`를 쓸 수 있는가?
- 공유된 이력을 되돌릴 때 왜 `reset`보다 `revert`가 기본인가?
- `bisect`가 회귀 원인을 어떻게 좁히는지 설명할 수 있는가?

## 시작 상태

- 최신 commit: `8d17e51 docs: add peer fetch practice note`
- 현재 상태: `HEAD -> main, origin/main`
- working tree: clean

## 진단 기본 루틴

```text
git status
git branch -vv
git log --oneline --decorate --graph --all -n 15
git show --stat HEAD
git fetch origin
```

## 실습 1 결과: 최근 이력 읽기

- 현재 최신 commit: `8d17e51 docs: add peer fetch practice note`
- 현재 위치: `HEAD -> main, origin/main`
- working tree: clean
- `git log --oneline --decorate --graph --all -6`로 최근 commit 흐름을 확인했다.
- `git show --stat HEAD`로 최신 commit의 변경 규모를 확인했다.
- `git show HEAD`로 실제 patch를 확인했다.
- 확인한 변경:
  - `notes.txt`에 `- Peer added a remote update for fetch practice` 한 줄이 추가되었다.

## show 명령 차이

- `git show --stat HEAD`: 어떤 파일이 얼마나 바뀌었는지 요약한다.
- `git show HEAD`: commit metadata와 실제 patch를 함께 보여준다.

## 실습 2 결과: release notes와 tag

- 추가 파일: `docs/release-notes-draft.md`
- commit: `ddf22bf docs: add release notes draft`
- local tag: `v0.1.0 -> ddf22bf`
- remote tag: `refs/tags/v0.1.0 -> ddf22bf`
- push 후 상태: `HEAD -> main, tag: v0.1.0, origin/main, origin/HEAD`
- 확인한 핵심:
  - branch는 새 commit이 생기면 앞으로 움직이는 이름표다.
  - tag는 특정 commit에 고정되는 이름표다.
  - release point나 rollback 기준점을 명확히 남길 때 tag를 사용한다.

## 실습 3 결과: stash

- 임시 변경: `README.md`에 `CH03 temporary note for stash practice.` 한 줄 추가
- `git stash push -m "wip before history recovery practice"`로 working tree 변경을 임시 보관했다.
- stash 후 상태: working tree clean
- PowerShell에서는 `stash@{0}`를 그대로 쓰면 `{0}`가 특수하게 해석될 수 있으므로 `"stash@{0}"`처럼 따옴표로 감싸는 편이 안전하다.
- `git stash show -p "stash@{0}"`로 stash 안의 patch를 확인했다.
- `git stash pop "stash@{0}"`으로 stash를 다시 working tree에 적용했다.
- 확인한 핵심:
  - stash는 정식 history 기록이 아니라 임시 보관함이다.
  - `stash pop`은 적용 후 stash entry를 제거한다.
  - 오래 보관할 작업은 stash보다 branch로 살리는 편이 안전하다.

## 실습 4 결과: role policy 기준 테스트 추가

- 추가 파일: `tests/role-policy.test.js`
- commit: `4546185 test: add role policy history fixtures`
- push 후 상태: `HEAD -> main, origin/main, origin/HEAD`
- `node --test` 결과: 6개 테스트 통과
- 이 commit은 이후 regression과 `revert` 실습의 기준점이다.

## 실습 5 결과: bad commit과 revert

- 의도적 regression commit: `d84b237 bug: allow developer sample action by mistake`
- 변경 내용:
  - `SAMPLE_ACTION_ROLES`에 `"Developer"`를 잘못 추가했다.
  - 결과적으로 `Developer`가 sample action을 사용할 수 있게 되어 정책 테스트가 실패했다.
- 실패 확인:
  - `node --test` 결과: 6개 중 4개 통과, 2개 실패
  - 실패 원인: `actual: true`, `expected: false`
- 복구 commit:
  - `dfd7738 Revert "bug: allow developer sample action by mistake"`
  - `git revert HEAD --no-edit`로 생성했다.
- revert 후 확인:
  - `src/permissions.js`가 `new Set(["Owner", "Maintainer"])`로 복구되었다.
  - `node --test` 결과: 6개 테스트 통과
- 확인한 핵심:
  - `revert`는 기존 commit을 history에서 삭제하지 않는다.
  - 잘못된 commit의 효과를 취소하는 새 commit을 만든다.
  - 그래서 공유된 branch에서는 `reset`보다 `revert`가 안전한 기본 복구 방식이다.

## 실습 6 결과: bisect

- 목적: 어느 commit부터 policy regression이 들어왔는지 찾기
- 실행한 기준:
  - bad: `d84b237`
  - good: `4546185`
- 실행 명령:
  - `git bisect start`
  - `git bisect bad d84b237`
  - `git bisect good 4546185`
- 결과:
  - first bad commit: `d84b237 bug: allow developer sample action by mistake`
- 종료:
  - `git bisect reset`
  - reset 후 `main`으로 복귀했고 working tree는 clean
- 확인한 핵심:
  - `bisect`는 회귀 원인을 찾기 위한 이분 탐색이다.
  - 좋은 commit과 나쁜 commit의 기준을 알려 주면 Git이 중간 commit을 좁혀 간다.
  - 실습에서는 bad/good commit이 인접해 있어 바로 답이 나왔다.
  - bisect 후에는 반드시 `git bisect reset`으로 원래 작업 상태로 돌아와야 한다.

## CH03 완료 상태

- 최신 commit: `dfd7738 Revert "bug: allow developer sample action by mistake"`
- 현재 상태: `HEAD -> main, origin/main, origin/HEAD`
- tag: `v0.1.0 -> ddf22bf`
- working tree: clean
- `node --test`: 6개 테스트 통과

## CH03 종료 질문 답변 정리

- `git log`는 commit history의 흐름을 보여준다. 누가 어떤 commit을 어떤 순서로 쌓았는지 읽을 때 사용한다.
- `git show`는 특정 commit의 내용을 확인한다. 어떤 파일이 얼마나 바뀌었는지, 실제 patch가 무엇인지 볼 수 있다.
- `tag`는 release point나 기준 commit을 고정하는 ref다. branch처럼 앞으로 움직이지 않고 특정 commit에 고정된다.
- `stash`는 아직 commit하기에는 완성되지 않았지만, 잠시 working tree를 clean하게 만들고 싶을 때 쓰는 임시 저장소다.
- 공유된 branch에서는 `reset --hard`보다 `revert`가 안전하다. 잘못된 변경 이력과 되돌린 이력이 모두 공유되어 추적성과 감사 가능성이 남기 때문이다.
- `bisect`는 어느 commit부터 문제가 생겼는지, 즉 first bad commit을 찾기 위한 도구다.
