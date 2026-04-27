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
- GitLab Wiki를 언제 쓰고, 저장소 안 문서와 어떻게 역할을 나눌지 설명할 수 있다.
- OpenProject와 GitLab을 연동할 때 work package, branch, MR, pipeline 관계를 설명할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장의 로컬 실습은 `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/LAB.md`와 `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/assets/`를 기준으로 진행한다. 슬라이드 생성 시에는 tutorial 파일을 따로 업로드하지 않고, 아래 파일 이름과 역할을 강의 노트의 source of truth로 본다.

이번 장에서 새로 추가하는 파일:

- `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/assets/.gitlab/merge_request_templates/standard.md`
- `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/assets/CODEOWNERS`
- `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/assets/docs/review-checklist.md`

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH04에서 만든 feature branch와 branch 계획이 이미 존재한다
  - GitLab 프로젝트에 접근 가능하고, 역할별 권한 차이를 확인할 수 있는 상태다
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - 브라우저에서 MR을 열면서 본문 체크리스트를 그대로 읽는다
  - `tutorials/CH05-GitLab-Project-Structure-Permissions-and-MR/LAB.md`는 시연 보조 문서로 본다
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
- wiki
- runner와 variable

## GitLab Wiki를 어떻게 운영할 것인가

GitLab Wiki는 프로젝트 안에 붙어 있지만, 코드 저장소와는 별도의 Git 저장소로 관리되는 문서 공간이다. 즉, README나 `docs/` 폴더처럼 코드 저장소 안에 있는 문서와 성격이 다르다.

### Wiki가 적합한 경우

- 팀 운영 가이드
- 장애 대응 runbook
- 자주 묻는 질문
- 배포/운영 절차 요약
- 프로젝트 개요, 온콜 절차, 연락 체계

### 저장소 문서가 더 적합한 경우

- 코드 변경과 함께 반드시 리뷰되어야 하는 문서
- 특정 버전의 코드와 강하게 결합된 문서
- MR 안에서 diff와 review를 함께 봐야 하는 설계 문서
- 테스트/빌드와 같이 변경 이력 추적이 중요한 문서

실무 메시지:

- “모든 문서를 wiki로 몰아넣는 것”도 나쁘고, “모든 문서를 repo docs로만 두는 것”도 비효율적일 수 있다.
- 운영 runbook, 팀 가이드, FAQ는 wiki가 편하고, 코드와 강하게 묶이는 문서는 repo가 더 낫다.

## Wiki 운영 예제

예를 들어 `tutorial-collaboration-lab` 프로젝트를 운영한다고 가정하자.

Wiki 예시 구조:

- `home`
  - 프로젝트 소개
  - 저장소 접근 규칙
  - 기본 브랜치와 MR 원칙
- `_sidebar`
  - 운영 절차 링크 모음
- `release-runbook`
  - 배포 전 체크리스트
  - rollback 기준
- `faq-permissions`
  - 왜 direct push가 막히는가
  - Maintainer와 Owner 차이는 무엇인가

권장 운영 방식:

- Owner / Maintainer가 wiki의 상위 구조를 설계한다
- Developer는 코드 MR과 연결된 운영 메모를 wiki 또는 repo docs에 반영한다
- 장애 대응이나 배포 규칙처럼 자주 참조되는 문서는 wiki 홈과 sidebar에 고정한다

## Wiki 운영 시 주의할 점

- wiki는 별도 Git 저장소이므로 코드 저장소의 MR 흐름과 완전히 같지 않을 수 있다
- 코드와 함께 강하게 리뷰되어야 하는 문서를 wiki에만 두면 변경 검토 흐름이 끊길 수 있다
- self-managed 환경에서는 wiki 기능이 비활성화되어 있거나 외부 wiki 연동으로 대체될 수 있다
- 문서 소유자 없이 wiki만 열어 두면 오래된 운영 문서가 남아 사고를 유발할 수 있다

질문:

- 이 문서는 코드와 함께 리뷰되어야 하는가
- 이 문서는 운영자가 자주 참조하는 runbook인가
- 이 문서의 최신 책임자는 누구인가

## OpenProject와 GitLab을 어떻게 연동할 것인가

OpenProject를 사내에서 쓰고 있다면, GitLab은 “개발 실행 시스템”, OpenProject는 “계획과 추적 시스템”으로 역할을 나눌 수 있다. 이 둘을 연결하면 기획 문장, 개발 branch, MR 상태, pipeline 상태를 하나의 work package 중심으로 읽을 수 있다.

### 연동의 핵심 목적

- work package와 MR의 연결
- branch 이름과 commit 메시지의 표준화
- GitLab에서 일어난 개발 활동을 OpenProject에서도 볼 수 있게 하기
- PM, Owner, Maintainer가 GitLab에 직접 들어가지 않아도 개발 진행을 읽을 수 있게 하기

### 연결 모델

```text
OpenProject work package
   -> branch naming convention
   -> commit message hint
   -> MR description reference
   -> GitLab MR / pipeline status
   -> OpenProject activity / GitLab tab
```

실무 메시지:

- OpenProject는 개발을 대신하지 않는다
- GitLab은 계획을 대신하지 않는다
- 둘을 연결하면 “요구사항 -> 구현 -> 리뷰 -> 반영”의 traceability가 높아진다

### 실무에서 가장 많이 쓰는 연결 방식

- branch 이름에 work package 식별자를 포함한다
- commit 메시지나 MR 제목/설명에 `OP#123` 또는 work package URL을 포함한다
- MR 생성 후 OpenProject work package에서 linked MR과 상태를 확인한다
- pipeline 상태가 OpenProject work package의 개발 진행 해석에 참고 자료가 된다

예시:

- branch: `feature/op-123-sample-action`
- commit: `feat: add sample action visibility OP#123`
- MR description:
  - 관련 work package: `OP#123`
  - 또는 OpenProject URL

### 역할별 관점

- Owner:
  - work package 우선순위와 merge 승인 기준이 연결되는가
  - 개발 상태를 PM 관점으로 해석할 수 있는가
- Maintainer:
  - branch, MR, approval, pipeline 결과를 work package와 매끄럽게 연결할 수 있는가
  - 누락된 링크 때문에 추적성이 끊기지 않는가
- Developer:
  - branch와 MR을 work package에 정확히 연결하는가
  - “코드는 끝났다”가 아니라 “work package 기준으로 어떤 상태인가”를 설명할 수 있는가

## OpenProject 연동 시 사내 환경에서 확인할 것

- OpenProject 쪽 integration 전용 사용자와 API token이 준비되어 있는가
- GitLab 프로젝트 webhook를 등록할 권한이 있는가
- GitLab에서 OpenProject로 outbound request가 가능한가
- 내부 DNS, reverse proxy, TLS 인증서가 webhook 통신을 막지 않는가
- private project와 OpenProject work package 권한 모델이 충돌하지 않는가

운영 원칙:

- PM 도구와 개발 도구를 연결하되, 승인 권한은 GitLab 정책으로 유지한다
- OpenProject는 상태 가시성을 높이는 도구이지, GitLab approval rule을 대체하는 도구가 아니다
- 연동 장애가 났을 때도 GitLab MR과 pipeline 자체는 독립적으로 진행 가능해야 한다

실측 메모:

- 2026-04-11 현재 사내 OpenProject 인스턴스의 `TechReview` 프로젝트 work package `43`을 조회한 결과, `_links.gitlab_issues`, `_links.gitlab_merge_requests`, `_links.atom` 링크 자체는 노출되어 있었다.
- 같은 work package에 대해 API comment `POST /api/v3/work_packages/43/activities`는 성공했고, 생성된 activity `175`를 다시 읽어 write/readback이 확인되었다.
- 같은 날 GitLab.com live audit 프로젝트에서 OpenProject webhook endpoint(`/webhooks/gitlab?key=...`)를 붙여 push / merge request / pipeline 이벤트를 실제 전송한 결과, GitLab delivery log 기준 모두 `200` 응답을 받았고 work package `43` activity에 `MR Opened`, `Pushed in refs/heads/main`, `MR Merged` 기록이 생성되었다.
- 반면 `GET /api/v3/work_packages/43/gitlab_issues`, `GET /api/v3/work_packages/43/gitlab_merge_requests`는 현재 계정 기준 `MissingPermission(403)`을 반환했다.
- 같은 시점에 `GET /api/v3/memberships?filters=[project=12, principal=5]`를 조회하면 direct membership은 `count=0`이었다. 즉 현재 사용자는 관리자 권한으로 work package 접근은 가능하지만, 프로젝트 또는 모듈 단위의 GitLab linked data 열람 권한은 별도일 수 있다.
- 즉, “연동 탭 또는 링크가 보인다”와 “현재 역할로 실제 linked GitLab 데이터를 읽을 수 있다”는 별도 검증 항목이다.

## protected branch를 왜 쓰는가

- `main`이나 release branch를 우발적 push에서 보호한다
- 승인과 검증 없이 직접 반영되는 것을 막는다
- 운영 사고 발생 시 누가 어떤 절차를 생략했는지 추적 가능하게 만든다

실측 메모:

- 2026-04-11 GitLab.com 개인 namespace에서 새 private 프로젝트를 생성해 확인한 결과, 기본 `main` 브랜치가 이미 protected 상태였고 push/merge 기준은 `Maintainers`로 잡혀 있었다.
- 따라서 GitLab.com에서는 “먼저 보호 정책이 이미 걸려 있을 수 있다”는 전제를 확인해야 한다.
- 반대로 self-managed에서는 인스턴스 기본값이나 프로젝트 템플릿에 따라 초기 보호 정책이 비어 있을 수 있으므로, 온프렘 교육에서는 생성 직후 설정 확인 단계를 반드시 넣는 편이 안전하다.

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
Copy-Item .\tutorials\CH05-GitLab-Project-Structure-Permissions-and-MR\assets\.gitlab\merge_request_templates\standard.md .\.gitlab\merge_request_templates\
Copy-Item .\tutorials\CH05-GitLab-Project-Structure-Permissions-and-MR\assets\CODEOWNERS .\
Copy-Item .\tutorials\CH05-GitLab-Project-Structure-Permissions-and-MR\assets\docs\review-checklist.md .\docs\
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

## 실습 5. Wiki 운영 시나리오 점검

GitLab UI에서 아래를 확인하거나 가정 시나리오로 토론한다.

- 프로젝트 wiki가 활성화되어 있는가
- `home` 페이지에는 무엇이 들어가야 하는가
- `_sidebar`에는 어떤 운영 링크를 고정해야 하는가
- `release-runbook`, `faq-permissions` 중 어떤 문서는 wiki가 더 적합한가
- 어떤 문서는 `docs/` 폴더와 MR 기반 review가 더 적합한가

예시 토론 결론:

- `docs/review-checklist.md`는 코드 저장소에 두고 MR과 함께 리뷰한다
- `배포 전 체크리스트`, `긴급 rollback 연락 체계`, `자주 묻는 권한 질문`은 wiki로 옮길 수 있다

## 실습 6. OpenProject 연동 시나리오 점검

아래를 가정 시나리오로 토론한다.

- work package `OP#123`에서 샘플 기능 요청이 올라왔다
- Developer는 `feature/op-123-sample-action` branch를 만든다
- MR 설명에 `OP#123`을 적고 OpenProject 활동과 연결한다
- Maintainer는 MR과 pipeline 결과를 보고 work package 진행 상태를 업데이트한다

확인 질문:

- branch 이름과 MR 설명만으로도 work package와 연결이 가능한가
- OpenProject에서 linked MR 상태를 보면 PM/Owner가 무엇을 이해할 수 있는가
- 연동이 끊겨도 GitLab 쪽 승인과 merge 판단은 계속 가능한가

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

## failure scenario 5. OpenProject work package와 MR이 연결되지 않는다

가능 원인:

- branch 이름이나 MR 설명에 work package reference가 빠졌다
- webhook 또는 integration 설정이 잘못되었다
- OpenProject 쪽 권한 또는 API token이 만료되었다
- OpenProject 쪽에서는 GitLab 연동 메뉴가 보여도 현재 역할에 linked MR / issue 열람 권한이 없을 수 있다

메시지:

- 연동 누락은 개발 실패라기보다 traceability 실패다
- Maintainer는 링크가 안 붙은 MR을 “형식 문제”가 아니라 운영 품질 문제로 봐야 한다
- 실제로는 webhook delivery가 `200`으로 성공해도 linked GitLab endpoint가 `403`이면, 활동 이력만 보이고 GitLab 탭 상세는 못 볼 수 있다
- 따라서 점검 순서는 “reference 존재 여부 -> webhook delivery 상태 -> OpenProject 권한 -> linked tab 열람 결과” 순으로 잡는 편이 안정적이다

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
- GitLab Wiki:
  - https://docs.gitlab.com/user/project/wiki/
- OpenProject GitLab integration:
  - https://www.openproject.org/docs/system-admin-guide/integrations/gitlab-integration/

## 다음 장

`CH06 lecture note` 에서 실제로 충돌을 만들고 해결하고 rollback까지 수행한다.
