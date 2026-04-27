# CH05. GitLab Project Structure, Permissions, and MR

## 이 장의 목적

Git을 혼자 쓸 줄 아는 것과 GitLab에서 팀 협업을 안전하게 운영하는 것은 다르다. 이 장은 GitLab을 단순 저장소 웹 UI가 아니라 `권한`, `보호 정책`, `리뷰`, `승인`, `감사 가능성`을 제공하는 운영 시스템으로 이해시키는 장이다.

## 1시간 운영안

- 0:00~0:15 GitLab 프로젝트 구조와 역할
- 0:15~0:30 protected branch, approval rule
- 0:30~0:45 MR lifecycle 실습
- 0:45~0:55 권한 부족 / 승인 부족 / merge 거절 시나리오
- 0:55~1:00 역할별 판단 정리

## 학습 목표

- `Owner`, `Maintainer`, `Developer`, `Guest` 역할 차이를 설명할 수 있다.
- protected branch와 MR approval의 목적을 설명할 수 있다.
- MR 생성, 리뷰, 승인, merge의 흐름을 수행할 수 있다.
- GitLab 프로젝트 운영 규칙을 저장소 표준으로 연결할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장은 [05_gitlab_mr/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\LAB.md) 와 함께 진행한다.

이번 장에서 새로 추가하는 파일:

- [.gitlab/merge_request_templates/standard.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\assets\.gitlab\merge_request_templates\standard.md)
- [CODEOWNERS](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\assets\CODEOWNERS)
- [docs/review-checklist.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\assets\docs\review-checklist.md)

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH04에서 만든 feature branch와 branch 계획이 이미 존재한다
  - GitLab 프로젝트에 접근 가능하고, 역할별 권한 차이를 확인할 수 있는 상태다
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - 브라우저에서 MR을 열면서 본문 체크리스트를 그대로 읽는다
  - [05_gitlab_mr/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\05_gitlab_mr\LAB.md)는 시연 보조 문서로 본다
- 이 장에서 반드시 눈으로 확인할 것:
  - `CODEOWNERS`가 reviewer 흐름에 어떤 영향을 주는지
  - protected branch가 direct push를 어떻게 막는지
  - reviewer와 approver가 같은 사람인지 다른 사람인지
  - pipeline 결과가 MR merge 조건에 연결되어 있는지
- 이 장 종료 상태:
  - MR 템플릿, `CODEOWNERS`, review checklist가 저장소에 반영되어 있다
  - 권한 부족, 승인 부족, pipeline 부족이 각각 어떤 거절 메시지로 나타나는지 설명할 수 있다
  - CH06에서 같은 저장소와 MR 흐름을 기반으로 conflict 랩을 진행할 준비가 끝난다

## CH04와 CH05의 연결

CH04가 “브랜치를 어떻게 나누고 동기화할 것인가”를 다뤘다면, CH05는 “그 브랜치를 GitLab에서 어떤 규칙으로 반영할 것인가”를 다룬다.

- CH04의 branch 전략이 코드 흐름을 정리한다
- CH05의 권한과 approval 정책이 반영 흐름을 통제한다

즉, 좋은 branch 전략만으로는 부족하고, 누가 언제 merge를 허가할지까지 설계되어야 실제 협업이 안정된다.

## 역할별 체크포인트

### Owner

- 누가 merge를 승인하고 누가 final 책임을 져야 하는지 정리할 수 있는가
- protected branch 정책을 왜 저장소별로 다르게 가져가야 하는지 설명할 수 있는가

### Maintainer

- MR 설명 템플릿을 통해 변경 범위, 테스트 범위, 배포 영향도를 명확히 할 수 있는가
- 승인 전 어떤 체크리스트를 강제해야 하는지 설계할 수 있는가

### Developer

- 권한 부족 오류를 명령어 문제와 구분할 수 있는가
- MR 설명, 리뷰 반영, 후속 commit 추가를 스스로 수행할 수 있는가

## GitLab 역할 요약

### Guest

- 프로젝트 열람 중심
- 문서, 이슈, 결과 확인에는 유용
- 보통 코드 push, branch 관리, merge는 불가

### Developer

- feature branch 작업
- push
- MR 생성
- 리뷰 반영

### Maintainer

- merge 가능
- 보호 브랜치 정책 운영 가능
- 승인 조건과 저장소 운영을 더 넓게 다룸

### Owner

- 프로젝트와 그룹 수준 정책의 최상위 관리자
- 멤버 관리, 전반 정책, 보안/운영 책임 범위가 가장 넓다

실무 메시지:

- “누가 코드를 잘 아는가”와 “누가 merge 책임을 지는가”는 항상 같지 않다
- 권한은 기술 숙련도보다 운영 책임과 감사 가능성에 맞춰 설계한다

## 실무 권한 매트릭스 관점으로 보기

### Guest가 적합한 경우

- 외부 이해관계자가 이슈와 결과만 봐야 하는 경우
- 품질 담당자나 참관자가 산출물 열람만 필요한 경우

### Developer가 적합한 경우

- 기능 구현과 MR 생성이 주된 역할인 경우
- 직접 main 반영보다는 review 흐름을 따라야 하는 경우

### Maintainer가 적합한 경우

- 저장소 표준, 브랜치 보호, merge 책임을 운영해야 하는 경우
- 긴급 rollback, hotfix merge, runner/variable 운영을 가까이서 보는 경우

### Owner가 적합한 경우

- 그룹 수준 정책과 멤버십, 보안 책임까지 포함하는 경우
- 실무에서는 모든 팀원에게 Owner를 주지 않는 것이 정상이다

## GitLab 프로젝트 구조에서 봐야 할 것

- 멤버와 역할
- default branch
- protected branch
- merge request approvals
- pipeline requirement
- issue / board / milestone
- runner와 variable

## protected branch를 왜 쓰는가

- `main`이나 release branch를 우발적 push에서 보호한다
- 승인과 검증 없이 직접 반영되는 것을 막는다
- 운영 사고 발생 시 누가 어떤 절차를 생략했는지 추적 가능하게 만든다

질문:

- 모든 브랜치를 보호해야 하는가
- hotfix branch는 누구까지 direct push를 허용할 것인가
- 긴급 장애 시 예외 절차가 있는가

## approval rule을 왜 쓰는가

- merge 전에 최소한의 검토 품질을 강제한다
- 제품 영향, 보안 영향, 배포 영향이 큰 변경에 다른 승인자를 붙일 수 있다
- 사람을 믿지 말라는 뜻이 아니라 중요한 변경을 기록 가능한 방식으로 검토하자는 뜻이다

## MR lifecycle

```text
feature branch push
-> MR 생성
-> 설명 작성
-> reviewer / approver 지정
-> 리뷰 코멘트
-> 추가 commit 반영
-> 승인
-> merge
-> pipeline / deploy 확인
```

이 흐름을 건너뛰면 흔히 생기는 문제:

- 설명 부족으로 리뷰 비용 증가
- 누가 어떤 기준으로 승인했는지 불명확
- rollback 때 근거 부족

## MR 품질 기준

좋은 MR은 “코드가 돌아간다”보다 “리뷰어가 빠르게 판단할 수 있다”에 가깝다.

핵심 기준:

- 제목만 보고 목적이 드러난다
- 변경 범위와 제외 범위가 분리되어 있다
- 테스트 방식과 결과가 적혀 있다
- 리뷰 포인트가 적혀 있다
- 배포 영향과 rollback 포인트가 적혀 있다

나쁜 MR 징후:

- 제목이 `fix`, `update`, `changes`처럼 모호하다
- unrelated 파일이 다수 섞여 있다
- “테스트함”이라고만 쓰고 근거가 없다
- 리뷰어가 무엇을 중점적으로 봐야 하는지 적혀 있지 않다

## reviewer와 approver를 구분해서 이해하기

- reviewer는 내용 검토와 코멘트를 중심으로 본다
- approver는 조직 규칙상 반영 허용 여부까지 포함해 본다
- 작은 팀에서는 같은 사람이 두 역할을 겸할 수 있지만, 개념적으로는 다르다

Owner에게 중요한 질문:

- 승인자는 기술 검토자와 같아야 하는가
- 운영 위험이 큰 변경은 추가 승인자가 필요한가
- 문서 변경, 코드 변경, 인프라 변경의 승인 기준이 동일해야 하는가

## 실습 1. MR 생성

Developer가 feature branch를 push한 뒤 GitLab UI에서 MR을 연다.

필수 항목:

- 제목
- 목적
- 변경 범위
- 테스트 범위
- 배포 영향
- 리뷰 포인트

예시 템플릿:

```text
제목: feat: add sample action visibility

목적:
- 샘플 동작 노출 규칙 추가

변경 범위:
- UI 버튼 추가
- sample action 연결

테스트:
- 버튼 노출 확인
- 정상 동작 확인
- 권한 없는 사용자 차단 확인

리뷰 포인트:
- 버튼 노출 조건
- 실패 메시지 처리
```

추가 요구:

- 스크린샷 또는 로그 링크
- 관련 이슈 번호
- rollback 시 되돌릴 commit 또는 기능 플래그 지점

강조:

- MR description은 “예의 바른 설명문”이 아니라 review 비용을 줄이는 운영 문서다
- 나중에 장애가 났을 때 어떤 판단으로 merge했는지 남는 기록이기도 하다

튜토리얼 실행 예시:

```powershell
Copy-Item ..\tutorials\05_gitlab_mr\assets\.gitlab\merge_request_templates\standard.md .\.gitlab\merge_request_templates\
Copy-Item ..\tutorials\05_gitlab_mr\assets\CODEOWNERS .\
Copy-Item ..\tutorials\05_gitlab_mr\assets\docs\review-checklist.md .\docs\
git add .gitlab CODEOWNERS docs/review-checklist.md
git commit -m "docs: add MR standards and review checklist"
```

## 실습 2. protected branch 거절 경험

상황:

- Developer 권한으로 `main`에 직접 push를 시도한다

예상:

- GitLab에서 거절

해석:

- Git 명령어 문제가 아니라 정책 문제
- 저장소 운영 규칙이 기술적으로 집행되는 사례

토론:

- 이런 제한이 왜 Owner를 보호하는가
- 이런 제한이 왜 개발 속도를 늦추지 않고 오히려 안정화에 기여하는가

## 실습 3. approval rule 비교

비교 항목:

- approval 없는 저장소
- 1인 approval 저장소
- 특정 role만 승인 가능한 저장소

질문:

- 어느 저장소가 더 빠른가
- 어느 저장소가 더 복구 가능한가
- 어느 저장소가 더 감사 가능성이 높은가

## 실습 4. 저장소 표준 점검

아래를 체크리스트로 본다.

- 브랜치 네이밍
- 커밋 메시지
- MR 제목
- MR 설명
- reviewer / approver 지정
- test evidence 첨부

추가 항목:

- protected branch 정책 문서화
- CODEOWNERS 존재 여부
- squash merge 기본값 여부
- merge commit 허용 정책
- pipeline success를 merge 필수 조건으로 두는지

## failure scenario 1. merge 버튼이 안 보인다

원인:

- 권한 부족
- pipeline 실패
- approval 부족
- conflict 발생

확인 순서:

1. MR 배너
2. approvals 상태
3. pipeline 상태
4. role 확인

## failure scenario 2. Developer가 “권한 때문에 불편하다”고 말한다

Owner 질문:

- 어떤 작업이 막히는가
- 그 작업이 정말 direct push여야 하는가
- MR 기반 흐름으로 대체 가능한가

Maintainer 질문:

- 병목은 권한 자체인가, 리뷰 프로세스 설계 부족인가

Developer 질문:

- 설명, 테스트 evidence, 브랜치 관리가 충분한가

## failure scenario 3. approval은 받았는데 나중에 문제 발생

메시지:

- approval은 “문제가 절대 없다”는 보증이 아니다
- 다만 누가 어떤 기준으로 반영을 허용했는지 남기므로 복구와 개선이 빨라진다

## failure scenario 4. MR은 깔끔한데 merge 후 main이 깨졌다

가능 원인:

- 기준 branch가 오래돼 최신 main과 의미 충돌이 남아 있었음
- reviewer는 코드만 봤고 운영 영향은 안 봤음
- pipeline이 해당 시나리오를 검증하지 못했음

조치:

- MR 품질과는 별개로 sync 시점과 검증 범위를 다시 본다
- CH06, CH07과 연결해 conflict 후 테스트와 pipeline 범위를 함께 점검한다

## 사람들이 많이 실수하는 포인트

- reviewer와 approver를 같은 의미로 쓴다
- branch 보호를 “개발자를 못 믿어서”라고 해석한다
- approval이 있으면 테스트와 pipeline은 대충 봐도 된다고 생각한다
- MR 설명을 최초 작성 후 끝까지 갱신하지 않는다
- 권한 문제를 Git 명령어 문제로 오해한다

## 실전에서 특히 많이 강조할 것

- protected branch는 사람을 통제하는 장치가 아니라 운영 사고를 줄이는 장치다
- MR description은 리뷰 속도와 rollback 속도를 동시에 높인다
- main merge 권한은 실력보다 책임 기준으로 배분한다
- “merge 가능”과 “merge해야 함”은 다르다

## 역할별 운영 문장

### Owner

- “main은 보호하고, merge는 승인된 변경만 허용한다.”

### Maintainer

- “MR 설명과 리뷰 포인트를 표준화해 검토 비용을 낮춘다.”

### Developer

- “코드만 올리는 것이 아니라 변경의 의도와 검증 범위를 함께 제출한다.”

## 오늘의 산출물

- MR 1건
- MR 설명 템플릿
- 권한/approval 비교 메모
- 저장소 표준 체크리스트 초안

## 종료 체크리스트

- GitLab 역할 차이를 설명할 수 있다
- protected branch와 approval rule 목적을 설명할 수 있다
- MR을 생성하고 리뷰 흐름을 따라갈 수 있다
- merge가 안 되는 이유를 권한, 승인, 충돌, 파이프라인으로 구분할 수 있다

## 공식 참고 자료

- GitLab roles and permissions:
  - https://docs.gitlab.com/user/permissions/
- GitLab merge requests:
  - https://docs.gitlab.com/user/project/merge_requests/
- GitLab protected branches:
  - https://docs.gitlab.com/user/project/repository/branches/protected/

## 다음 장

[06_Team_Collaboration_Conflict_and_Rollback_Lab.md](./06_Team_Collaboration_Conflict_and_Rollback_Lab.md) 에서 실제로 충돌을 만들고 해결하고 rollback까지 수행한다.
