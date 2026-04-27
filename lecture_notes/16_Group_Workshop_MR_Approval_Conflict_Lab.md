# 16. 조별 실습: MR, 승인, Conflict, Rollback 통합 랩

## 이 장의 목표

- 팀장, PL, Developer 관점이 실제 GitLab 협업에서 어떻게 만나는지 체험한다.
- `branch`, `switch`, `push`, `MR`, `review`, `approval`, `merge`, `conflict`, `revert`를 한 번의 조별 랩으로 연결한다.
- 충돌이 왜 생기고 누가 어떤 기준으로 해결과 승인 판단을 해야 하는지 설명할 수 있다.
- 실습 종료 후 각 역할별 체크포인트로 팀 운영 수준을 점검한다.

## 권장 조 편성

### 4인 1조 기본형

1. 팀장 역할: `Maintainer`
2. PL 역할: `Maintainer` 또는 승인 권한을 가진 `Developer`
3. Developer A 역할: `Developer`
4. Developer B 역할: `Developer`

### 확장 역할

- 강사 또는 실습 운영자: `Owner`
- 참관자 또는 QA 확인자: `Guest`

## 역할별 책임

### Owner

- 프로젝트 생성
- 멤버 초대
- 전반 정책과 초기 권한 확인

### Maintainer

- 보호 브랜치 정책 운영
- MR 승인 가능 여부 판단
- merge 시점과 rollback 방향 결정

### Developer

- feature branch 작업
- commit, push, MR 생성
- review 피드백 반영
- conflict 해결

### Guest

- 프로젝트 열람
- 문서, 이슈, 결과 참고
- 직접 push 또는 merge 불가

## 랩 개요

이 랩은 한 개의 저장소에서 아래 순서를 재현한다.

1. 프로젝트 준비
2. 두 명의 개발자가 같은 파일을 다른 방향으로 수정
3. 첫 번째 MR은 정상 승인 및 merge
4. 두 번째 MR은 conflict 발생
5. conflict 해결 후 재검토
6. merge 완료 후 문제 발견
7. `revert`로 안전하게 되돌리기

## 랩 준비

### Maintainer 또는 Owner가 먼저 수행

```bash
gitlab project 생성
main 브랜치 보호
direct push 제한
MR 승인 1회 이상 요구
```

실습 저장소에는 아래 파일을 준비한다.

- `README.md`
- `docs/process.md`
- `src/app.txt`

충돌을 쉽게 만들기 위해 `docs/process.md`에 같은 문단을 수정하도록 설계한다.

## Stage 1. 저장소 준비와 복제

각 Developer는 아래를 수행한다.

```bash
git clone <repo-url>
cd <repo>
git status
git branch -vv
```

PL과 팀장은 브라우저에서 아래를 확인한다.

- 멤버 역할
- 보호 브랜치 정책
- 승인 규칙

## Stage 2. 브랜치 생성과 작업 분리

Developer A:

```bash
git switch -c feature/update-process-a
```

Developer B:

```bash
git switch -c feature/update-process-b
```

두 사람 모두 `docs/process.md`의 같은 문단을 각자 다른 방향으로 수정한다.

학습 포인트:

- conflict는 "같은 파일"이 아니라 "같은 줄 또는 인접 맥락을 서로 다르게 바꿀 때" 잘 생긴다.
- 브랜치를 따로 만들더라도 나중에 합칠 때 충돌할 수 있다.

## Stage 3. Developer A의 정상 MR

Developer A:

```bash
git status
git add docs/process.md
git commit -m "docs: clarify process guide for onboarding"
git push -u origin feature/update-process-a
```

GitLab에서 MR 생성:

- 제목: `docs: clarify process guide for onboarding`
- 설명: 수정 배경, 변경 범위, 검토 포인트 작성
- 리뷰어: PL
- 승인자: 팀장

PL 체크:

- 요구사항과 변경 범위 일치 여부
- 설명이 충분한지
- 불필요한 파일이 포함됐는지

팀장 체크:

- `main` 반영 위험도
- 보호 브랜치 정책 준수 여부
- merge 타이밍 적절성

정상 승인 후 merge한다.

## Stage 4. Developer B의 MR과 conflict 유도

Developer B는 자신이 브랜치를 만든 시점 이후 `main`이 바뀌었다는 사실을 아직 모른 상태에서 진행한다.

```bash
git status
git add docs/process.md
git commit -m "docs: adjust process wording for handoff"
git push -u origin feature/update-process-b
```

이제 두 번째 MR을 생성한다.

예상 결과:

- GitLab MR 화면에서 conflict 경고가 뜨거나
- merge 불가 상태가 된다

## Stage 5. conflict 분석

Developer B가 먼저 로컬에서 상태를 확인한다.

```bash
git fetch origin
git log --oneline --decorate --graph --all -n 20
```

이 시점의 판단 질문:

- `main`이 언제 먼저 바뀌었는가?
- 내 브랜치는 그 변경을 아직 반영하지 않았는가?
- 지금 `merge`로 합칠까, `rebase`로 정리할까?

교육 기본 선택은 아래 둘 중 하나로 통일한다.

### 옵션 A. `merge origin/main`

```bash
git switch feature/update-process-b
git merge origin/main
```

### 옵션 B. `rebase origin/main`

```bash
git switch feature/update-process-b
git rebase origin/main
```

초보자 실습에서는 merge 방식을 먼저 권장하고, rebase는 비교 설명용으로 운영한다.

## Stage 6. conflict 해결

충돌이 나면 아래 순서로 진행한다.

```bash
git status
```

충돌 파일을 열어 conflict marker를 읽는다.

```text
<<<<<<< HEAD
Developer B의 변경
=======
main에 먼저 반영된 Developer A의 변경
>>>>>>> origin/main
```

조치 원칙:

- 한쪽을 버리는 것이 아니라 최종 요구사항에 맞는 문장으로 다시 쓴다.
- 가능하면 PL이 요구사항 기준을 다시 말해 주고
- 팀장은 운영/배포 위험 기준을 말해 준다.

해결 후:

```bash
git add docs/process.md
git commit -m "merge: resolve conflict in process guide"
```

rebase를 썼다면:

```bash
git rebase --continue
```

문제가 복잡해 포기해야 하면:

```bash
git merge --abort
git rebase --abort
```

## Stage 7. 재검토와 승인

Developer B는 해결 후 다시 push한다.

```bash
git push
```

rebase를 사용해 이력이 바뀌었다면:

```bash
git push --force-with-lease
```

주의:

- 공유 브랜치에는 무분별한 `--force`를 쓰지 않는다.
- 교육에서는 `--force-with-lease`의 의미를 설명만 하고, 반드시 팀장 승인 하에 사용한다.

PL 재검토 포인트:

- conflict 해결이 요구사항을 만족하는가?
- 문맥이 어색하지 않은가?
- 불필요한 변경이 섞이지 않았는가?

팀장 승인 포인트:

- rollback 필요 가능성이 큰가?
- main 반영 시 다른 팀 작업에 영향이 큰가?
- 지금 merge해도 되는가?

## Stage 8. merge 후 문제 발견과 rollback

merge 이후 기능 이상 또는 문서 오류를 발견했다고 가정한다.

### 팀 협업 환경 권장 방법

```bash
git log --oneline
git revert <merge-or-feature-commit-sha>
git push origin main
```

이 방법을 권장하는 이유:

- 이력이 남는다.
- 누가 무엇을 왜 되돌렸는지 추적 가능하다.
- 이미 공유된 브랜치에 안전하다.

### 실습에서 설명만 하고 제한하는 것

```bash
git reset --hard HEAD~1
```

- push 전 개인 실습에는 가능
- 공유 브랜치에 사용하면 위험

## 참가자별 체크포인트

### 팀장

- 승인 기준을 말로 설명할 수 있는가?
- direct push 금지, 보호 브랜치, rollback 기준을 이해하는가?
- `revert`와 `reset`의 운영상 차이를 아는가?

### PL

- MR 설명, 리뷰 포인트, conflict 재검토 기준을 세울 수 있는가?
- merge 전후 리스크를 일정·품질 관점에서 설명할 수 있는가?
- 충돌을 "개발자 실수"가 아니라 "변경 충돌 관리 문제"로 볼 수 있는가?

### Developer

- branch 생성부터 MR 생성까지 스스로 할 수 있는가?
- `fetch -> 상태 확인 -> merge/rebase 판단`을 직접 수행할 수 있는가?
- conflict 해결 후 `add`, `commit`, `push`까지 복구 흐름을 완주할 수 있는가?

## 실습 운영자 체크리스트

- 보호 브랜치가 실제로 설정되었는가?
- approval rule이 적용되었는가?
- 두 명이 정말 같은 파일의 같은 구간을 수정했는가?
- merge 후 revert까지 한 번 실행했는가?
- 참가자들이 각자 역할의 판단 문장을 말로 설명했는가?

## 자주 생기는 운영 문제와 대응

### 문제 1. 충돌이 안 난다

원인:

- 서로 다른 줄만 수정했거나
- 두 번째 개발자가 이미 최신 `main`을 반영한 상태

조치:

- 같은 문단 같은 줄을 수정하도록 시나리오를 더 좁힌다.

### 문제 2. 승인 버튼이 보이지 않는다

원인:

- 역할이 `Developer`라 merge 권한이 없음
- approval rule 설정이 다름

조치:

- 프로젝트 멤버 권한과 보호 브랜치 설정 확인

### 문제 3. `push --force-with-lease`가 거절된다

원인:

- 보호 브랜치 정책 또는 권한 제한

조치:

- rebase 실습은 개인 feature branch에서만
- 공동 브랜치에서는 merge 전략으로 전환

## 결과 확인 체크리스트

- 조별로 MR, review, approval, conflict, revert 흐름을 한 번 완주했다.
- Owner, Maintainer, Developer, Guest 권한 차이를 설명할 수 있다.
- 팀장, PL, Developer가 각각 어떤 판단을 해야 하는지 말할 수 있다.
- conflict를 해결한 뒤 merge 또는 rollback까지 연결할 수 있다.

## 공식 참고 자료

- GitLab Docs, roles and permissions:
  - https://docs.gitlab.com/user/permissions/
- GitLab Docs, merge requests:
  - https://docs.gitlab.com/user/project/merge_requests/
- Git docs, git-merge:
  - https://git-scm.com/docs/git-merge
- Git docs, git-rebase:
  - https://git-scm.com/docs/git-rebase
- Git docs, git-revert:
  - https://git-scm.com/docs/git-revert

## 마지막 메모

이 랩의 목적은 충돌을 일부러 만들어 보는 데 있지 않다. 팀이 안전하게 협업하기 위해 무엇을 미리 맞춰야 하는지, 문제가 생겼을 때 누가 어떤 기준으로 판단해야 하는지를 몸으로 익히는 데 있다.
