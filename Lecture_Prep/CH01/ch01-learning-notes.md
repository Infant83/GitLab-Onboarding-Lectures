# CH01 학습 노트

## 환경 점검

- Git version: 2.52.0.windows.1
- Git user.name: Infant83
- Git user.email: Infant@kias.re.kr

## 현재 이해

- Git은 소스 코드와 파일 변경 이력을 관리하는 버전 관리 / 형상 관리 도구다.
- GitLab은 Git remote repository를 제공하고, 그 위에 MR, review, approval, issue, pipeline 같은 협업 기능을 더하는 플랫폼이다.

## GitLab 권한 확인

- Project: tutorial-collaboration-lab
- 내 역할: Owner
- main 보호 여부: protected 상태로 판단함. GitLab UI에 Unprotect가 보였기 때문
- approval rule: 아직 확인하지 못함
- main direct push: 초기 설정 과정에서 Owner 권한으로 허용됨

## CH01 핵심 용어

- working tree: 내가 로컬에서 실제로 보고 수정하는 파일 영역
- staging area: 다음 commit에 포함할 변경을 고르는 영역
- commit: 로컬 history에 저장된 특정 시점의 snapshot
- HEAD: 현재 내가 서 있는 repository 위치. 보통 현재 branch의 최신 commit을 가리킨다.
- main: 현재 기본 branch
- origin: GitLab remote repository를 가리키는 로컬 별명
- origin/main: GitLab remote의 main branch를 내 PC가 마지막으로 알고 있는 위치

## CH01 종료 답변 정리

- Git은 소스 코드 변경 이력과 형상을 관리한다.
- GitLab은 Git 저장소를 remote로 제공하고, 협업과 운영 통제를 위한 기능을 붙인다.
- origin은 branch 이름이 아니라 remote repository의 별명이다. main은 branch이고, origin/main은 remote main branch를 뜻한다.
- HEAD -> main -> origin/main -> d116b8b는 현재 local HEAD, local main, remote-tracking origin/main이 모두 같은 commit d116b8b를 가리키는 동기화 상태를 뜻한다.
- git add 전에 git status를 보는 이유는 현재 branch, 변경 파일, untracked file, staging 여부를 확인해서 원하지 않는 파일을 commit에 넣지 않기 위해서다.

## CH01 완료 상태

- tutorial-collaboration-lab repository 생성 완료
- CH01 seed files 복사 완료
- 첫 commit 생성 완료: `d116b8b ch01: initialize tutorial collaboration seed`
- `origin/main` push 완료
- local working tree clean 확인 완료
