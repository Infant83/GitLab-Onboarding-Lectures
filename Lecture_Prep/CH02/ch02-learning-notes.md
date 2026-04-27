# CH02 학습 노트

## 장 제목

CH02. Local Workflow and Core Commands

## Source of Truth

- 강의 노트: `../../GitLab-Onboarding-Lectures/CH02-Local-Workflow-and-Core-Commands_lecture-note.md`
- 실습 가이드: `../../GitLab-Onboarding-Lectures/tutorials/CH02-Local-Workflow-and-Core-Commands/LAB.md`
- 실습 자산: `../../GitLab-Onboarding-Lectures/tutorials/CH02-Local-Workflow-and-Core-Commands/assets/`

## 사용할 repository

- 실제 Git 실습 repo: `../CH01/tutorial-collaboration-lab`
- CH02는 CH01에서 만든 같은 repository 위에 이어서 진행한다.

## 오늘의 핵심 루프

```text
status -> diff -> add -> commit -> show -> push
```

## 학습 목표

- `git status`와 `git diff`의 역할 차이를 설명한다.
- `git add`가 저장이 아니라 staging이라는 점을 이해한다.
- `git commit`이 local history를 바꾸고, `git push`가 remote repository를 바꾼다는 점을 구분한다.
- 잘못 staging한 파일을 `git restore --staged`로 되돌릴 수 있다.
- push 전 검증 루틴을 습관화한다.

## 실습 1 결과: notes.txt commit

- 추가 파일: `notes.txt`
- commit: `8f90074 docs: add training journal note`
- push 후 상태: `HEAD -> main, origin/main`이 모두 `8f90074`를 가리킴
- 확인한 핵심:
  - untracked file은 `git status`에는 보이지만 기본 `git diff`에는 보이지 않을 수 있다.
  - `git add`는 저장이 아니라 다음 commit 후보로 올리는 staging 작업이다.
  - push 전에는 `git status`, `git log`, `git show --stat HEAD`, `git branch -vv`를 확인한다.

## 실습 2 결과: restore --staged

- 추가 파일: `docs/tutorial-guide.md`
- 먼저 staging한 뒤 `git restore --staged docs/tutorial-guide.md`로 staging area에서만 제거했다.
- 확인한 핵심:
  - `restore --staged`는 파일을 삭제하지 않는다.
  - working tree 파일은 유지되고, 다음 commit 후보에서만 빠진다.
- 최종 commit: `b9c683e docs: add tutorial workflow guide`
- push 후 상태: `HEAD -> main, origin/main`이 모두 `b9c683e`를 가리킴

## 실습 3 결과: fetch와 pull 차이

- peer repo: `Lecture_Prep/CH02/tutorial-collaboration-peer`
- peer repo에서 remote에 추가한 commit: `8d17e51 docs: add peer fetch practice note`
- 원래 repo에서 `git fetch origin` 실행 후 상태:
  - `origin/main`은 `8d17e51`로 이동했다.
  - local `main`과 `HEAD`는 아직 `b9c683e`에 남아 있었다.
  - working tree는 바뀌지 않았다.
- 원래 repo에서 `git pull` 실행 후 상태:
  - `HEAD -> main, origin/main`이 모두 `8d17e51`을 가리켰다.
  - `notes.txt`에 peer가 추가한 줄이 실제 working tree에 반영되었다.
- 확인한 핵심:
  - `fetch`는 remote-tracking branch를 갱신하지만 working tree를 바로 바꾸지 않는다.
  - `pull`은 보통 `fetch + merge`이므로 local branch와 working tree가 바뀔 수 있다.
  - 따라서 실무에서는 `pull` 전에 `status`, `branch -vv`, `fetch`, `log --all`로 상황을 먼저 보는 습관이 안전하다.

## CH02 현재 완료 상태

- 최신 commit: `8d17e51 docs: add peer fetch practice note`
- 현재 상태: `HEAD -> main, origin/main`
- working tree: clean

## CH02 종료 질문 답변 정리

- `git status`는 현재 branch, working tree 변경, staging area 상태, remote와의 ahead/behind 상태를 요약해서 보여준다.
- `git diff`는 기본적으로 tracked file의 unstaged line change를 보여준다. staging area에 올라간 변경은 `git diff --staged`로 확인한다.
- `git add`는 파일을 저장하는 명령이 아니다. 다음 commit에 포함할 content snapshot을 staging area에 올리는 명령이다.
- `git restore --staged <file>`은 파일을 삭제하지 않는다. working tree 파일은 그대로 두고 staging area에서만 제거한다.
- `git fetch`는 remote repository의 최신 정보를 가져와 `origin/main` 같은 remote-tracking branch를 갱신하지만, local `main`과 working tree는 바로 바꾸지 않는다.
- `git pull`은 보통 `fetch + merge`이므로 remote 변경을 local branch에 섞는다. 그래서 바로 `pull`하기 전에 `fetch`로 remote 변화를 먼저 읽는 습관이 안전하다.
