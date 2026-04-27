# 06. 2단계 실습: Merge Request, 리뷰, 승인, 역할과 권한

## 이 장의 목표

- feature branch의 변경을 GitLab merge request로 올리는 전체 흐름을 익힌다.
- `Developer`, `Maintainer`, `Owner`, `Guest` 역할을 협업 상황과 연결해서 이해한다.
- 리뷰와 승인, merge 가능 상태가 서로 다른 개념임을 구분한다.
- MR 본문을 "검토 가능한 문서"처럼 쓰는 방법을 배운다.

## 선행 개념

- [05_Branching_and_Merge_Strategy.md](./05_Branching_and_Merge_Strategy.md)에서 feature branch를 만들고 push했다.
- 팀마다 개발자, 리뷰어, 승인자 역할이 정해져 있다.

## 이 장의 핵심 메시지

Merge request는 "코드를 올리는 버튼"이 아니다. 팀에게 "이 변경을 이런 이유로, 이런 방식으로, 이렇게 검증했으니 검토해 달라"고 요청하는 협업 단위다.

좋은 MR은 아래 4가지를 포함한다.

- 변경 목적
- 변경 범위
- 확인 방법
- 리뷰어가 봐야 할 위험 포인트

## GitLab 역할을 실습 관점으로 이해하기

공식 GitLab 역할은 세부 권한이 매우 많지만, 교육에서는 먼저 아래처럼 기능적으로 이해하는 것이 좋다.

| 역할 | 실습에서 보는 핵심 행동 | 교육용 이해 포인트 |
| --- | --- | --- |
| `Guest` | 프로젝트 열람, 문서/이슈 참고 | 읽기 중심 사용자 |
| `Developer` | 브랜치 push, MR 생성, 수정 반영 | 코드를 올리고 변경을 제안하는 주체 |
| `Maintainer` | 브랜치 보호 정책 아래 merge 판단, 프로젝트 운영 | 반영 책임과 정책 판단에 가까운 역할 |
| `Owner` | 멤버 관리, 최상위 설정 관리 | 조직/프로젝트 관리 책임 |

### 교육에서 특히 구분해야 하는 것

- `리뷰할 수 있다`와 `merge할 수 있다`는 다르다.
- `코드를 쓸 수 있다`와 `정책을 바꿀 수 있다`도 다르다.
- 사내 GitLab에서는 보호 브랜치와 승인 정책 때문에 Maintainer 이상만 merge할 수 있는 경우가 많다.

## 실습 시나리오

개발자 A가 추천 문구를 개선한 feature branch를 push했다. 이제 아래 순서로 팀 협업을 진행한다.

1. 개발자 A가 MR을 생성한다.
2. 리뷰어가 코드, UI, 설명을 함께 검토한다.
3. 개발자 A가 리뷰 피드백을 반영한다.
4. 승인자 또는 Maintainer가 merge 가능 상태를 확인한다.
5. 필요 조건이 충족되면 merge 한다.

## 실습 1. MR 생성 전에 마지막 확인

```bash
git status
git log --oneline --decorate --graph -n 5
git push
```

MR을 만들기 전에 아래 질문에 답해야 한다.

- 작업 브랜치가 원격에 최신 상태로 올라가 있는가?
- commit 메시지가 읽을 만한가?
- 한 MR에 너무 많은 주제가 섞여 있지 않은가?

## 실습 2. Merge Request 생성

GitLab UI에서 아래를 입력한다.

- Source branch: `feature/snack-copy-update`
- Target branch: `main`
- Title: 변경 핵심이 드러나는 문장
- Description: 변경 목적, 범위, 확인 방법, 요청 사항

### 좋은 MR 제목 예시

- `Improve snack recommendation copy for clearer onboarding`
- `Refine button spacing and card layout for snack app`

### 피해야 할 제목

- `update`
- `fix`
- `final`

## 실습 3. MR 본문 작성

아래 템플릿을 사용한다.

```md
## 변경 목적

- 추천 안내 문구를 초보자에게 더 이해하기 쉽게 수정했습니다.

## 변경 내용

- `index.html`의 안내 문구 수정
- `app.js`의 추천 이유 문장 정리

## 확인 방법

1. 페이지를 연다.
2. 추천 버튼을 누른다.
3. 추천 문구가 어색하지 않은지 확인한다.

## 리뷰 요청 포인트

- 안내 문구 톤이 교육용 예제로 적절한지 확인 부탁드립니다.
```

### 왜 MR 본문이 중요한가?

- 리뷰어는 작성자의 머릿속을 볼 수 없다.
- 코드 차이만으로는 변경 의도를 항상 알 수 없다.
- 좋은 본문은 리뷰 시간을 줄이고, 승인 품질을 높인다.

## 실습 4. 리뷰어의 검토 포인트

리뷰어는 아래 3가지를 함께 본다.

1. 코드
- 문법이 맞는가?
- 의도가 드러나는가?
- 불필요한 변경이 섞이지 않았는가?

2. 결과
- 브라우저에서 실제로 동작하는가?
- 문구나 UI가 요구사항에 맞는가?

3. 설명
- MR 제목과 본문이 변경을 정확히 설명하는가?
- 확인 방법이 재현 가능한가?

### 좋은 리뷰 코멘트 예시

- "버튼 문구는 좋아졌는데, 첫 화면 안내 문장도 같이 맞추면 더 자연스러울 것 같습니다."
- "`app.js`의 이유 문장 톤은 좋아졌습니다. 다만 README의 현재 기능 설명도 함께 맞추면 좋겠습니다."

### 나쁜 리뷰 코멘트 예시

- "별로예요."
- "다시 해 주세요."

## 실습 5. 리뷰 반영

개발자 A는 코멘트를 보고 추가 수정 후 아래처럼 반영한다.

```bash
git status
git add .
git commit -m "Address MR feedback on intro copy"
git push
```

### 교육 원칙

- 리뷰 후에는 가능하면 새 commit으로 반영 흐름을 남긴다.
- 이미 팀이 검토 중인 브랜치를 무리하게 history rewrite하지 않는다.
- "무엇을 왜 반영했는지" MR 대화에 짧게 남긴다.

## 승인과 리뷰는 왜 다른가?

리뷰는 "의견과 검토"에 가깝고, 승인은 "정책 기준에서 반영 가능"에 가깝다. 같은 사람이 둘 다 할 수도 있지만 개념은 다르다.

### 리뷰어가 주로 보는 것

- 변경 품질
- 설명 품질
- 누락된 테스트 또는 확인 포인트

### 승인자 또는 Maintainer가 주로 보는 것

- 보호 브랜치 정책 충족 여부
- 필수 리뷰 또는 승인 수 충족 여부
- 충돌 여부
- pipeline 결과
- 지금 merge해도 팀 기준상 안전한지

## MR이 막히는 대표 원인

### 1. 파이프라인 실패

- 코드는 좋아 보여도 자동 검증이 실패하면 merge가 막힐 수 있다.

### 2. 충돌 발생

- source branch가 오래되어 target branch와 충돌한다.

### 3. 필수 승인 부족

- 팀 규칙 또는 GitLab 정책상 필요한 승인 수가 부족할 수 있다.

### 4. 권한 부족

- Developer는 MR을 만들 수 있지만 merge는 Maintainer만 가능한 환경이 있을 수 있다.

## Guest, Developer, Maintainer, Owner를 상황으로 이해하기

### 상황 A. 교육생이 문서를 읽고 이슈를 본다

- `Guest`로도 충분할 수 있다.

### 상황 B. 교육생이 feature branch를 만들고 push한다

- 보통 `Developer` 이상이 필요하다.

### 상황 C. 보호된 `main`에 merge한다

- 일반적으로 `Maintainer` 이상이 관여한다.

### 상황 D. 팀원을 추가하고 기본 정책을 바꾼다

- 보통 `Owner` 또는 상위 관리 권한이 필요하다.

## 자주 발생하는 오류와 조치

### "MR은 만들었는데 merge 버튼이 안 보여요"

원인 예시:

- 권한 부족
- 파이프라인 실패
- 충돌 발생
- 필수 승인 부족

조치:

- MR 상단 상태 메시지 확인
- pipeline 탭 확인
- approvals 또는 reviewers 상태 확인
- 프로젝트 권한과 보호 브랜치 정책 확인

### "리뷰어가 없어요"

조치:

- 교육 실습에서는 역할을 최소 3개로 미리 나눈다.
- 실제 조직에서는 팀 리드나 Maintainer가 리뷰 체계를 정의해야 한다.

### "작은 수정인데 바로 main에 넣으면 안 되나요?"

조치:

- 개인 저장소 실험이라면 가능할 수 있다.
- 하지만 교육 목적상 MR은 코드 검토 문화를 익히는 핵심 장치이므로 생략하지 않는다.

## 결과 확인 체크리스트

- feature branch를 기준으로 MR을 생성했다.
- MR 제목과 본문을 작성했다.
- 리뷰 포인트와 확인 방법을 명시했다.
- 리뷰 코멘트를 반영하는 후속 commit을 push했다.
- 리뷰와 승인, merge 가능 상태의 차이를 설명할 수 있다.
- `Guest`, `Developer`, `Maintainer`, `Owner`를 상황적으로 구분할 수 있다.

## 공식 참고 자료

- GitLab Docs, Creating merge requests:
  - https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html
- GitLab Docs, Roles and permissions:
  - https://docs.gitlab.com/user/permissions/

## 다음 장

[07_Conflict_and_Rollback.md](./07_Conflict_and_Rollback.md)에서는 같은 파일을 여러 사람이 수정하는 상황을 의도적으로 만들고, conflict 해결과 `revert` 중심의 안전한 복구를 실습한다.
