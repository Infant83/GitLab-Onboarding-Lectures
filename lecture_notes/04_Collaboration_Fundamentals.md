# 04. 1단계 확장: 혼자 일해도 협업 가능한 기록 남기기

## 이 장의 목표

- 개인 프로젝트라도 협업 가능한 구조로 기록하는 습관을 만든다.
- `README`, `CHANGELOG`, `tag`가 왜 필요한지 실습으로 이해한다.
- 실수한 파일 변경을 `restore`로 되돌리는 기본기를 익힌다.
- "혼자 개발"과 "나중에 팀이 합류하는 개발"의 차이를 문서와 이력 관점에서 배운다.

## 선행 개념

- [03_Daily_Workflow.md](./03_Daily_Workflow.md)를 통해 기본 일일 Git 루틴을 익혔다.
- commit 하나가 변경 묶음이라는 감각이 있다.

## 왜 이 장이 필요한가?

초보자는 종종 이렇게 생각한다.

- "아직 혼자 하는 프로젝트니까 README는 나중에 써도 된다."
- "지금은 작은 수정이니까 changelog는 필요 없다."
- "태그는 배포할 때나 쓰는 것 아닌가?"

하지만 실제로는 혼자 하던 프로젝트도 아래 순간에 바로 협업 자산이 된다.

- 미래의 내가 다시 들어왔을 때
- 팀원이 중간에 합류했을 때
- 어떤 버전에서 문제가 시작됐는지 찾아야 할 때
- 교육용 산출물로 특정 시점을 다시 보여 줘야 할 때

## 실습 시나리오

`오늘의 팀 간식 추천기`를 "보여 줄 수 있는 저장소"로 바꾼다.

- README에 프로젝트 설명과 실행 방법을 적는다.
- CHANGELOG에 지금까지의 변경을 정리한다.
- 첫 번째 학습 마일스톤을 태그로 남긴다.
- 실수한 수정은 `restore`로 되돌려 본다.

## 실습 1. `README.md` 작성

아래 구조를 기준으로 README를 만든다.

```md
# 오늘의 팀 간식 추천기

간단한 버튼 클릭으로 오늘의 간식을 추천하는 Git / GitLab 실습 프로젝트입니다.

## 실행 방법

1. 저장소를 clone 합니다.
2. `index.html`을 브라우저에서 엽니다.
3. 버튼을 눌러 추천 결과를 확인합니다.

## 현재 기능

- 간식 이름 추천
- 간식 추천 이유 표시

## 다음 개선 아이디어

- 기분별 추천 필터
- 최근 추천 기록 표시
- 배포 자동화
```

### 왜 README가 중요한가?

- 저장소 목적을 즉시 설명한다.
- 실행 방법이 없으면 리뷰어와 팀원이 같은 결과를 재현하기 어렵다.
- 프로젝트 범위와 다음 작업을 빠르게 공유할 수 있다.

## 실습 2. `CHANGELOG.md` 작성

아래처럼 간단한 changelog를 만든다.

```md
# CHANGELOG

## 0.1.0

- 프로젝트 초기 뼈대 생성
- 추천 버튼과 기본 추천 로직 추가

## 0.1.1

- 추천 안내 문구 개선
- 바나나 추천 항목 추가
```

### 여기서 배우는 점

- changelog는 commit 전체를 복사하는 문서가 아니다.
- 사용자가 느끼는 변경을 버전 단위로 압축해서 보여 주는 문서다.

## 실습 3. 상태 확인 후 commit

```bash
git status
git diff
git add README.md CHANGELOG.md
git commit -m "Document project usage and change history"
git show --stat HEAD
```

## 실습 4. 태그 달기

이제 교육 1단계의 기초가 정리된 시점을 태그로 남긴다.

```bash
git tag -a v0.1.0 -m "Solo workflow baseline complete"
git tag
git show v0.1.0 --stat
```

### `tag`는 왜 쓰나?

- 특정 시점을 이름으로 고정할 수 있다.
- 교육 자료, 릴리즈, 데모 기준점으로 쓰기 좋다.
- 나중에 "어느 시점부터 협업을 시작했는가?"를 명확히 남길 수 있다.

### 원격에 태그 보내기

```bash
git push origin main
git push origin v0.1.0
```

또는

```bash
git push origin --tags
```

### 초보자가 자주 놓치는 점

- commit은 push했지만 tag는 push하지 않는 경우가 많다.
- GitLab에서 release-like 기준점을 보여 주고 싶다면 tag도 원격에 올라가야 한다.

## 실습 5. 잘못 수정한 파일 되돌리기

`README.md`에 일부러 임시 문장을 하나 추가한 뒤 저장한다.

예시:

```md
이 문장은 실수로 넣은 테스트 문장입니다.
```

이후 아래 명령을 실행한다.

```bash
git status
git diff
git restore README.md
git status
```

### 여기서 배우는 점

- `git restore <file>`는 working tree의 아직 commit되지 않은 변경을 버린다.
- 되돌리기 전에 `diff`를 보고 정말 버릴 변경이 맞는지 확인해야 한다.

## `restore`, `reset`, `revert`는 왜 다 다른가?

입문자는 이 세 개를 자주 헷갈린다. 이 장에서는 아래 수준으로만 구분해도 충분하다.

- `restore`: 아직 commit되지 않은 파일 변경을 되돌릴 때
- `reset`: 브랜치 포인터와 staging 상태를 강하게 바꿀 수 있는 명령
- `revert`: 이미 남긴 commit을 "반대 변경 commit"으로 되돌릴 때

이 교육에서는 공유 브랜치 복구에 `revert`를 우선 가르치고, `reset --hard`는 매우 조심스럽게 다룬다.

## 혼자 개발할 때도 기록을 남겨야 하는 이유

- 미래의 내가 다시 시작하기 쉽다.
- 다른 사람이 들어왔을 때 프로젝트 의도를 빠르게 이해할 수 있다.
- 특정 버전 기준으로 회귀 테스트나 비교가 가능하다.
- 나중에 merge request 본문과 release note의 초안이 된다.

## 실무 팁

### README에 최소한 들어가야 하는 것

- 프로젝트 목적
- 실행 방법
- 현재 기능
- 다음 계획 또는 제한사항

### CHANGELOG에 최소한 들어가야 하는 것

- 버전 또는 마일스톤 이름
- 사용자 관점에서 보이는 변경
- 복구나 회귀 점검에 필요한 큰 변동

### 태그를 달 때 주의할 점

- 의미 있는 시점에만 단다.
- commit 직후 내용이 맞는지 `git show <tag>`로 확인한다.
- 팀이 참조할 태그는 원격에도 push한다.

## 자주 발생하는 실수와 조치

### README를 코드 설명서처럼만 씀

조치:

- "이 프로젝트가 무엇인지"
- "어떻게 실행하는지"
- "무엇을 확인하면 되는지"

이 세 문장을 먼저 적는다.

### changelog를 commit 로그 그대로 복붙함

조치:

- 개발자 시점이 아니라 사용자 또는 리뷰어 시점으로 바꿔 적는다.

### 잘못된 파일을 `restore`해서 날려 버림

조치:

```bash
git diff
```

- restore 전에 항상 diff를 먼저 본다.

## 결과 확인 체크리스트

- README를 작성했다.
- CHANGELOG를 작성했다.
- 관련 문서를 별도 commit으로 남겼다.
- `tag`를 생성하고 확인했다.
- tag를 원격에 push했다.
- `restore`로 실수한 working tree 변경을 되돌려 봤다.

## 공식 참고 자료

- Git docs, git-tag:
  - https://git-scm.com/docs/git-tag
- Git docs, git-restore:
  - https://git-scm.com/docs/git-restore
- Git Book, Undoing Things:
  - https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things

## 다음 장

[05_Branching_and_Merge_Strategy.md](./05_Branching_and_Merge_Strategy.md)에서는 이제 팀 협업으로 넘어가서 `branch`, `switch`, `checkout`, `fetch`, `merge`, `rebase`, `fork`의 관계를 실제 운영 전략으로 배운다.
