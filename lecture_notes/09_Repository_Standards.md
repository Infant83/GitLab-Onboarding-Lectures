# 09. 2단계 마무리: 저장소 표준, 브랜치 규칙, commit 규칙, 완료 기준

## 이 장의 목표

- 팀이 반복 가능한 협업을 하기 위한 최소 저장소 표준을 만든다.
- 브랜치 이름, commit 메시지, MR 완료 기준을 문서화한다.
- 리뷰와 승인 기준을 사람이 바뀌어도 유지할 수 있게 정리한다.
- 태그와 기록 체계를 팀 규칙 차원으로 끌어올린다.

## 선행 개념

- branch, MR, review, approval, conflict, revert 흐름을 한 번 이상 경험했다.
- issue 분해와 merge 순서를 운영 관점에서 설계해 봤다.

## 왜 표준이 필요한가?

실력이 좋은 팀도 규칙이 없으면 아래 문제가 반복된다.

- 브랜치 이름이 제각각
- commit 메시지 품질이 들쭉날쭉
- MR 설명 수준이 사람마다 다름
- 리뷰가 감정적이거나 누락됨
- 누가 언제 merge할 수 있는지 모호함

표준의 목적은 창의성을 줄이는 것이 아니라 협업 비용을 줄이는 것이다.

## 권장 저장소 구조

교육용 예시:

```text
today-snack-lab/
├─ index.html
├─ styles.css
├─ app.js
├─ README.md
├─ CHANGELOG.md
└─ .gitlab-ci.yml
```

실습 확장 시 고려:

- `docs/`: 교육용 문서 또는 캡처
- `assets/`: 이미지, 아이콘
- `tests/`: 추후 테스트 스크립트

## 브랜치 이름 규칙

권장 형식:

- `feature/<topic>`
- `fix/<topic>`
- `docs/<topic>`
- `chore/<topic>`

이슈 번호를 붙이는 경우:

- `feature/snack-copy-11`
- `fix/button-spacing-12`

## commit 메시지 규칙

### 최소 원칙

- 한 문장으로 목적이 보여야 한다.
- 과거형보다 "무엇을 바꿨는가"가 드러나야 한다.
- 너무 추상적인 단어를 피한다.

### 좋은 예시

- `Add initial snack recommendation app`
- `Improve snack onboarding copy`
- `Resolve conflict on snack reason text`
- `Document setup and usage guide`

### 피해야 할 예시

- `update`
- `fix`
- `again`
- `real final`

## MR 완료 기준

아래 항목을 만족해야 "검토 완료"가 아니라 "merge 가능" 상태로 본다.

- 변경 목적이 MR 제목과 본문에 적혀 있다.
- 확인 방법이 적혀 있다.
- 불필요한 파일이 섞여 있지 않다.
- 리뷰 코멘트가 반영되었거나 해소되었다.
- 충돌이 없다.
- 필요한 pipeline이 통과했다.

## 리뷰 기준

리뷰어는 아래 순서로 보는 것을 권장한다.

1. 설명
- 제목과 본문이 명확한가?

2. 범위
- 한 MR에 너무 많은 변경이 섞이지 않았는가?

3. 코드
- 변경 목적과 코드가 일치하는가?

4. 결과
- 재현 가능한 확인 방법이 있는가?

## 승인 기준

승인자 또는 Maintainer는 아래를 최종 점검한다.

- 기본 브랜치에 반영해도 되는가?
- 보호 브랜치 정책을 충족하는가?
- 리뷰와 승인 조건이 충족되었는가?
- 필요 시 되돌리기 경로가 분명한가?

## 태그와 마일스톤 기록

협업 기준점이 되는 시점에는 태그를 붙이는 것이 좋다.

예시:

```bash
git tag -a v0.2.0 -m "Team collaboration baseline complete"
git show v0.2.0 --stat
git push origin v0.2.0
```

### 언제 태그를 다는가?

- 개인 단계 완료 시점
- 협업 단계 완료 시점
- 배포 가능한 기준점

## 팀 규칙 예시

아래는 교육용 최소 규칙 예시다.

```md
## Team Rules

1. `main`에는 직접 기능 commit 하지 않는다.
2. 모든 기능 변경은 feature branch에서 시작한다.
3. MR에는 변경 목적, 범위, 확인 방법을 반드시 적는다.
4. 리뷰 코멘트 반영은 새 commit으로 남긴다.
5. merge는 Maintainer 또는 지정된 승인자만 수행한다.
6. 공유 브랜치 복구는 `revert`를 기본으로 한다.
```

## 자주 발생하는 실수와 조치

### 규칙은 있지만 문서화하지 않음

조치:

- README 또는 CONTRIBUTING 성격의 문서에 팀 규칙을 남긴다.

### commit 메시지가 일관되지 않음

조치:

- 리뷰어가 commit 메시지도 함께 본다.
- 최소 예시를 팀 문서에 넣는다.

### 승인 기준이 사람마다 다름

조치:

- 승인자 체크리스트를 명시
- merge 가능 상태 정의를 팀 문장으로 적어 둔다

## 결과 확인 체크리스트

- 저장소 구조를 정리했다.
- 브랜치 이름 규칙을 정했다.
- commit 메시지 기준을 정했다.
- MR 완료 기준, 리뷰 기준, 승인 기준을 문서화했다.
- 협업 기준 태그 전략을 정했다.

## 공식 참고 자료

- GitLab Docs, Roles and permissions:
  - https://docs.gitlab.com/user/permissions/
- Git docs, git-tag:
  - https://git-scm.com/docs/git-tag

## 다음 장

[10_Automation_Basics.md](./10_Automation_Basics.md)에서는 사람이 반복하던 기본 검증을 GitLab CI로 옮겨서, MR과 merge 판단을 더 안정적으로 만드는 자동화 기초를 다룬다.
