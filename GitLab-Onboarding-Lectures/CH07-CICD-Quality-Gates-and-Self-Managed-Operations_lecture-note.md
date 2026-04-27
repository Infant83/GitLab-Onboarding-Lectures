# CH07. CI/CD Quality Gates and Self-Managed Operations

## 이 장의 목적

협업은 merge에서 끝나지 않는다. 실제 운영에서는 merge 이후 pipeline이 어떻게 검증하고, 어떤 결과물을 남기고, runner가 어떤 제약을 가지며, self-managed GitLab에서는 무엇이 추가 고려사항인지까지 알아야 한다. 이 장은 `코드 반영`을 `운영 가능 상태`로 바꾸는 기준을 다룬다.

## 1시간 운영안

- 0:00~0:15 `.gitlab-ci.yml` 읽기
- 0:15~0:30 pipeline 상태 해석
- 0:30~0:45 실패 주입과 복구
- 0:45~0:55 self-managed GitLab 제약
- 0:55~1:00 deploy readiness 정리

## 학습 목표

- `.gitlab-ci.yml`의 stage, job, artifact 개념을 설명할 수 있다.
- pipeline 성공/실패/pending을 해석할 수 있다.
- self-managed GitLab에서 runner, variable, network 제약을 점검할 수 있다.
- runner scope, tag, protected runner, executor 차이를 운영 관점에서 설명할 수 있다.
- CI/CD 파이프라인을 MLOps 파이프라인으로 확장할 때 무엇이 추가되는지 설명할 수 있다.
- merge 후 “배포해도 되는가”를 체크리스트로 판단할 수 있다.
- GitLab Pages를 정적 문서 배포 관점에서 설명하고, self-managed 환경에서의 추가 제약을 말할 수 있다.
- webhook과 RSS/Atom feed를 각각 어떤 목적으로 써야 하는지 구분할 수 있다.
- OpenProject와 GitLab을 webhook 기반으로 연동할 때 필요한 이벤트와 운영 제약을 설명할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장의 로컬 실습은 `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/LAB.md`와 `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/assets/`를 기준으로 진행한다. 슬라이드 생성 시에는 tutorial 파일을 따로 업로드하지 않고, 아래 파일 이름과 파이프라인 역할을 이 강의 노트 설명만으로 사용한다.

이번 장에서 새로 추가하는 파일:

- `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/assets/.gitlab-ci.yml`
- `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/assets/scripts/build-site.js`
- `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/assets/scripts/smoke-check.js`
- `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/assets/tests/role-visibility-smoke.test.js`

핵심 설명:

- 튜토리얼 hands-on은 `test -> build` 두 단계로 진행한다.
- `deploy`는 개념적으로 다루되, 실제 자산은 self-managed 환경 차이를 줄이기 위해 build 결과물 생성까지로 제한한다.
- GitLab Pages는 확장 예제로 다루며, `public/` 또는 build 산출물을 정적 사이트로 배포하는 패턴을 설명한다.

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH06까지의 merge 또는 conflict 해결 결과가 저장소에 반영된 상태
  - `src/feature-flags.json`, `src/permissions.js`, MR 흐름이 이미 한 번 검토된 상태
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - build보다 먼저 test와 smoke check를 읽고, 왜 그 순서인지 설명한다
  - `tutorials/CH07-CICD-Quality-Gates-and-Self-Managed-Operations/LAB.md`는 실습 보조 체크리스트로만 쓴다
- 이 장에서 반드시 눈으로 확인할 것:
  - `.gitlab-ci.yml`의 `stages`, `script`, `artifacts`가 각각 무엇을 보장하는지
  - `role-visibility-smoke.test.js`와 `scripts/smoke-check.js`가 무엇을 다르게 검증하는지
  - pending이 runner 문제인지, job rule 문제인지, variable 문제인지
- 이 장 종료 상태:
  - `.gitlab-ci.yml`, `scripts/build-site.js`, `scripts/smoke-check.js`, `tests/role-visibility-smoke.test.js`가 저장소에 반영되어 있다
  - test, build, artifact, pending 원인을 최소 1개씩 설명할 수 있다
  - CH08에서 end-to-end capstone을 할 때 pipeline 결과를 merge 기준과 연결해 해석할 수 있다

## CH06와 CH07의 연결

CH06에서 conflict를 해결하고 merge까지 했다면, CH07은 “그 merge가 운영 가능한 상태인지”를 판단하는 장이다.

- CH06은 사람 간 협업 정합성
- CH07은 자동 검증과 운영 정합성

즉, conflict를 잘 해결했다고 해서 deploy-ready인 것은 아니다.

## 왜 on-prem self-managed GitLab은 GitLab.com과 다르게 느껴지는가

공식 문서의 기본 개념은 동일하다. pipeline, stage, job, artifact, runner라는 단어도 같다. 하지만 self-managed 환경에서는 “누가 runner를 설치하고 유지하는가”, “어떤 네트워크를 통과해야 하는가”, “어떤 executor를 허용하는가”가 교육 난이도를 크게 바꾼다.

- GitLab.com은 비교적 관리형 경험에 가깝다
- self-managed는 runner, registry, variable, network, certificate, proxy, 버전 호환성까지 팀이 직접 관리해야 할 수 있다
- 따라서 CH07에서는 코드를 보는 습관만이 아니라 인프라 병목을 분리해서 보는 습관도 가르쳐야 한다

실측 메모:

- 2026-04-11 GitLab.com 개인 namespace 실측에서 새 private 프로젝트는 shared runner가 기본 활성화되어 있었고, CH07의 `test_job`, `build_job`은 추가 runner 설정 없이 성공했다.
- 반대로 self-managed에서는 runner가 등록되어 있지 않거나 tag가 맞지 않으면 같은 `.gitlab-ci.yml`이라도 바로 `pending`이 될 수 있다.

## 역할별 체크포인트

### Owner

- pipeline 성공과 운영 승인 사이의 차이를 설명할 수 있는가
- self-managed 환경의 정책 제약을 알고 있는가

### Maintainer

- 테스트와 배포 게이트를 일정 계획에 반영할 수 있는가
- 실패 시 어떤 로그를 먼저 보고 누구에게 넘길지 정할 수 있는가

### Developer

- `.gitlab-ci.yml`을 읽고 최소 수정이 가능한가
- 로그에서 어느 단계가 실패했는지 찾아낼 수 있는가

## `.gitlab-ci.yml` 기본 구조

예시:

```yaml
stages:
  - test
  - build

test_job:
  stage: test
  image: node:20
  script:
    - node --test
    - node scripts/smoke-check.js

build_job:
  stage: build
  image: node:20
  script:
    - node scripts/build-site.js
  artifacts:
    paths:
      - dist/
```

주의:

- `scripts/smoke-check.js`는 CH06에서 해결한 `docs/process.md`가 정책 문장뿐 아니라 1~4 단계 구조도 유지한다고 가정한다.
- 따라서 conflict 해결 시 2단계만 바꾸는 것이 아니라 문서 전체 절차 구조를 보존해야 한다.

핵심:

- `stages`는 순서
- `job`은 실제 작업 단위
- `script`는 실행 명령
- `artifacts`는 다음 단계나 사람에게 남길 결과물

추가로 자주 보는 것:

- `rules`
- `only / except`
- `needs`
- `dependencies`
- `variables`
- `when: manual`

실무 해설:

- stage만 보면 큰 흐름이 보인다
- rules를 보면 언제 실행되는지 보인다
- variables와 runner 태그를 보면 왜 특정 환경에서만 깨지는지 단서가 보인다

## GitLab Pages를 어떻게 운영할 것인가

GitLab Pages는 프로젝트의 정적 웹사이트를 GitLab CI/CD로 배포하는 기능이다. 교육 자료, 운영 가이드, API 문서, 실습 안내 사이트를 정적 HTML로 배포할 때 유용하다.

### Pages가 적합한 경우

- 튜토리얼 문서 사이트
- 운영 매뉴얼 정적 배포
- 릴리스 노트 아카이브
- 사내 정적 포털

### Pages 기본 구조

- 저장소에 정적 자산 또는 build 결과를 만든다
- `.gitlab-ci.yml`에 `pages` job을 정의한다
- Pages job이 특정 폴더를 artifact로 게시한다

예시:

```yaml
pages:
  stage: build
  script:
    - node scripts/build-site.js
  artifacts:
    paths:
      - dist
```

또는 Pages 요구사항에 맞게 `public/`을 직접 게시하는 패턴도 흔하다.

실측 메모:

- 2026-04-11 GitLab.com 개인 namespace 실측에서는 `pages.publish: dist`를 사용한 `deploy_pages` job이 성공했고, Pages 배포 정보 API에서 실제 배포 URL과 `root_directory=dist`가 확인되었다.
- 다만 프로젝트 `pages_access_level`이 `private`인 상태에서는 배포 URL에 비인증으로 접근할 때 로그인 페이지 또는 보호 화면으로 유도되었다.
- 따라서 “Pages job success”와 “누가 그 URL을 바로 열 수 있는가”는 별개의 운영 판단이다.

메시지:

- Pages는 “문서를 예쁘게 보여주는 기능”이 아니라 CI/CD 기반 정적 배포 예제다
- 따라서 CH07에서 Pages를 이해하면 build artifact, publish artifact, deploy surface의 차이를 함께 배울 수 있다

## Pages 운영 예제

예를 들어 이 교육 자료를 self-managed GitLab에서 운영한다고 가정하자.

- 코드와 실습 자산은 repository에 둔다
- 운영형 튜토리얼 사이트는 GitLab Pages로 배포한다
- 장애 대응 runbook과 FAQ는 wiki 또는 repo docs로 관리한다

실행 예:

- `public/index.html`: 코스 홈
- `dist/`: `build-site.js`가 생성한 정적 결과물
- `pages` job: 최신 교육 사이트를 publish

이때 Owner / Maintainer / Developer 관점은 이렇게 나뉜다.

- Owner: Pages 공개 범위와 접근 정책을 본다
- Maintainer: Pages 배포 job과 문서 배포 규칙을 관리한다
- Developer: build 스크립트와 문서 변경을 MR로 제출한다

## self-managed GitLab에서 Pages가 더 까다로운 이유

GitLab.com에서는 Pages가 비교적 관리형 경험에 가깝지만, self-managed에서는 아래를 확인해야 한다.

- 인스턴스에 GitLab Pages 기능이 활성화되어 있는가
- Pages용 도메인과 TLS가 준비되어 있는가
- Pages daemon 또는 관련 인프라가 운영 중인가
- Pages artifact를 어디에 저장하는가
- 내부망에서만 접근 가능한지, 외부 노출인지
- Pages와 일반 application deploy가 같은 runner를 쓰는지

실무 메시지:

- self-managed에서 Pages가 안 뜨는 문제는 코드보다 인프라 설정 문제일 수 있다
- 따라서 Pages 실패를 “HTML이 잘못됐다”로 바로 결론내리면 안 된다

## webhook과 RSS를 언제 쓰는가

둘 다 GitLab 바깥으로 정보를 내보내거나 읽는 방법처럼 보이지만 목적이 다르다.

### webhook

- 이벤트가 발생했을 때 외부 시스템으로 즉시 HTTP 요청을 보낸다
- 자동화, 상태 동기화, 알림 연동에 적합하다
- merge request, pipeline, issue, comment, push 이벤트를 실시간으로 외부에 전달할 수 있다

적합한 예:

- MR 생성 시 OpenProject work package 활동 업데이트
- pipeline 실패 시 운영 채널 또는 내부 시스템 알림
- 특정 branch push 시 내부 배포 승인 시스템 호출

### RSS / Atom feed

- 사람이 구독해서 읽는 용도에 가깝다
- 자동 상태 동기화보다 읽기 전용 모니터링에 적합하다
- GitLab 공식 문서 기준으로는 topic 구독의 Atom feed 사용 사례가 대표적이다

적합한 예:

- 특정 topic에 새 프로젝트가 생기는지 팀 리드가 구독
- 신규 프로젝트 흐름을 운영자가 가볍게 모니터링

실무 메시지:

- webhook은 자동화용
- RSS/Atom은 구독/관찰용
- 둘을 같은 수준의 연동 수단으로 보면 설계가 흔들린다

실측 메모:

- 2026-04-11 현재 사내 OpenProject 인스턴스의 work package `43`은 `_links.atom`을 노출하고 있었다.
- 그러나 UI route인 `/work_packages/43.atom`에 API key 기반 Basic 인증으로 접근했을 때는 로그인 페이지 HTML이 반환되었다.
- 즉, API 인증과 UI/feed 인증은 동일하다고 가정하면 안 되며, feed 소비 시에는 세션 기반 인증 또는 인스턴스별 feed token 정책을 별도로 확인해야 한다.

## webhook 운영 예제

아래 이벤트를 외부 시스템으로 보낸다고 가정하자.

- merge request events
- pipeline events
- issue events
- comment events
- push events

흐름:

```text
GitLab event
-> project webhook
-> internal endpoint or OpenProject
-> activity update / notification / sync result
```

운영 질문:

- 어떤 이벤트만 보낼 것인가
- 누가 webhook URL과 secret을 관리하는가
- 실패한 webhook delivery를 누가 확인하는가
- branch filter나 event filter가 필요한가

## OpenProject와 GitLab 연동 운영 예제

OpenProject 공식 연동은 GitLab webhook와 OpenProject integration endpoint를 연결해 work package와 개발 활동을 이어 주는 방식으로 이해하면 된다.

권장 이벤트:

- push events
- comments
- issues events
- merge request events
- pipeline events

얻는 효과:

- PM과 Owner가 work package 기준으로 개발 흐름을 읽기 쉬워진다
- MR과 pipeline 상태가 계획 맥락과 함께 보인다
- 요구사항과 구현 결과의 traceability가 높아진다

주의:

- OpenProject 연동은 상태 가시성을 높이는 도구이지 GitLab approval rule을 대체하지 않는다
- merge 허용과 protected branch 정책은 여전히 GitLab이 source of truth여야 한다

실측 메모:

- 2026-04-11 현재 사내 OpenProject 인스턴스에서는 work package comment API write/readback은 성공했다.
- 같은 날 GitLab.com live audit 프로젝트에 OpenProject webhook를 실제 등록하고 `push`, `merge_request`, `pipeline` 이벤트를 발생시킨 결과, GitLab webhook event log에서 각 delivery가 `response_status=200`으로 기록되었다.
- OpenProject work package `43` activity에는 `MR Opened`, `Pushed in refs/heads/main`, `MR Merged` 이벤트가 실제로 생성되었다.
- 반면 `gitlab_issues`, `gitlab_merge_requests` API는 현재 계정 기준 `MissingPermission(403)`을 반환했다.
- 같은 계정으로 `TechReview` 프로젝트 direct membership을 조회했을 때 `count=0`이었으므로, 관리자 우회 접근으로 activity는 볼 수 있어도 linked GitLab tab/API는 프로젝트 권한에 계속 묶일 수 있다는 점이 드러났다.
- 따라서 운영 점검 시 “webhook이 붙었는가”만 보면 부족하고, OpenProject 쪽 linked tab/endpoint 열람 권한까지 함께 확인해야 한다.

## self-managed webhook 운영에서 특히 확인할 것

- GitLab에서 외부(OpenProject 포함)로 outbound request가 허용되는가
- 대상 서버의 DNS, reverse proxy, TLS 인증서가 유효한가
- mutual TLS가 필요한가
- webhook secret 또는 token을 어디에 저장하는가
- private project 이벤트가 외부 시스템에 과다 노출되지 않는가
- integration 전용 사용자와 권한이 준비되어 있는가

실무 메시지:

- self-managed에서는 webhook 실패 원인이 코드가 아니라 네트워크, 인증서, 방화벽, outbound 정책일 수 있다
- webhook 테스트를 할 때는 payload보다 연결 경로와 HTTP status를 먼저 본다

## runner를 어떻게 설계하고 읽어야 하는가

### runner scope

- instance runner: 여러 프로젝트가 공용으로 쓸 수 있다
- group runner: 특정 그룹 단위로 공유한다
- project runner: 특정 프로젝트만 쓴다

교육 포인트:

- 공용 runner는 편하지만 오염 범위가 넓다
- 프로젝트 전용 runner는 통제가 쉽지만 운영 비용이 크다
- self-managed 환경에서는 “왜 이 프로젝트가 이 runner를 쓰는가”를 먼저 이해해야 한다

### tag routing

- job은 tag로 runner를 고른다
- runner에 tag가 없거나 불일치하면 job은 pending이 된다
- 태그는 단순 라벨이 아니라 실행 위치와 권한 경계를 나타낼 수 있다

예:

- `linux`
- `docker`
- `internal-registry`
- `deploy-prod`

### executor choice

- shell executor:
  - 호스트 환경을 직접 사용한다
  - 빠르지만 환경 오염과 권한 노출 위험이 크다
- docker executor:
  - 이미지 기반으로 격리된 실행을 제공한다
  - 재현성은 좋지만 내부 registry, proxy, certificate 설정이 필요할 수 있다
- kubernetes executor:
  - 대규모 확장과 격리에 유리하다
  - 클러스터와 네트워크 정책을 함께 이해해야 한다

### protected runner

- protected branch나 protected tag에서만 특정 runner를 쓰게 제한할 수 있다
- production deploy runner는 protected runner로 설계하는 것이 보통 더 안전하다

### version compatibility

- GitLab 본체 버전과 runner 버전 차이가 크면 job 기능이 예상과 다르게 동작할 수 있다
- self-managed에서는 문서를 볼 때도 “우리 인스턴스 버전에서 가능한가”를 같이 봐야 한다

## pipeline 상태 읽기

### success

- 기술 검증 기준을 통과했다
- 하지만 배포 적합성까지 자동 보증하는 것은 아니다

### failed

- 어떤 stage 또는 job에서 검증에 실패
- 코드 문제, 환경 문제, runner 문제를 구분해야 한다

### pending

- runner가 없거나 잡지 못함
- self-managed 환경에서는 흔하다

### canceled

- 사람이 중단했거나 새 파이프라인이 이전 것을 대체

## artifact와 report를 왜 보나

- 테스트 결과
- build 결과물
- coverage report
- lint output

메시지:

- pipeline 초록색만 보지 말고 어떤 검증이 실제로 돌았는지 봐야 한다

## pipeline을 읽는 순서

1. MR과 연결된 최신 pipeline이 맞는지 확인
2. 실패 job이 어느 stage에 있는지 확인
3. 로그 첫 번째 유의미한 에러 줄 찾기
4. artifact나 report가 남았는지 확인
5. 환경 문제인지 코드 문제인지 분류
6. 재시도가 합리적인지, 코드 수정이 필요한지 판단

강조:

- 마지막 줄의 에러보다 “처음 실패를 만든 줄”이 더 중요할 때가 많다
- flaky test와 deterministic failure를 구분해야 한다

## 실습 1. `.gitlab-ci.yml` 읽기

저장소 루트에서:

```bash
cat .gitlab-ci.yml
```

또는 에디터에서 열어 아래를 찾는다.

- stages 정의
- 각 job의 stage
- 실행 명령
- artifact 여부
- only / rules / except 같은 실행 조건

질문:

- build와 test가 분리되어 있는가
- smoke check는 어떤 파일을 검증하는가
- 실패했을 때 어떤 로그를 봐야 하는가

## 실습 2. 실패 주입

의도적으로 테스트를 깨뜨리거나 파일 경로를 틀리게 만든다.

예시:

- 없는 파일 참조
- 테스트 expected value 변경
- 실행 스크립트 오타
- `src/feature-flags.json`의 `sampleActionEnabled` 키 이름 변경

pipeline 결과를 보고 아래를 말한다.

1. 어느 stage가 실패했는가
2. 어느 job이 실패했는가
3. 로그 첫 번째 유의미한 에러 줄은 무엇인가
4. 코드 문제인가, 환경 문제인가

추가 질문:

- 실패가 merge 전 막혔는가, merge 후에야 드러났는가
- local에서는 왜 안 보였는가
- 같은 job을 rerun하면 재현되는가

## 실습 3. artifact 확인

GitLab UI에서:

- pipeline 상세
- job 상세
- artifact 다운로드 또는 테스트 리포트 확인

질문:

- 실패했는데 artifact가 남았는가
- 사람이 봐야 할 증거는 무엇인가

## 실습 4. pending 분석

상황:

- self-managed GitLab에서 pipeline이 계속 pending

확인:

- runner 등록 여부
- runner 태그 일치 여부
- protected branch / protected runner 조건
- job이 요구하는 executor와 현재 runner 일치 여부

실전 확장:

- shared runner가 바쁜 것인지
- 특정 group runner만 접근 가능한 프로젝트인지
- manual job이 pending처럼 보이는 상황은 아닌지

## 실습 5. Pages / webhook / feed 운영 시나리오 점검

아래를 가정 시나리오로 읽는다.

- 교육 문서 사이트를 GitLab Pages로 게시한다
- MR과 pipeline 상태를 OpenProject로 보낸다
- 특정 topic의 신규 프로젝트는 Atom feed로 구독한다

질문:

- 어느 것은 webhook이어야 하고, 어느 것은 feed면 충분한가
- Pages 장애와 webhook 장애를 같은 유형의 문제로 보면 안 되는 이유는 무엇인가
- self-managed에서 가장 먼저 확인할 인프라 조건은 무엇인가

## self-managed GitLab에서 추가로 봐야 할 것

- runner가 shared인지 group 전용인지
- internet egress 제한이 있는지
- registry 접근 권한이 있는지
- secret variable이 protected인지
- shell runner인지 docker runner인지
- 배포 대상 네트워크가 내부망인지

추가 포인트:

- 내부 인증서 문제 때문에 package install이 깨지지 않는지
- 외부 registry 또는 mirror 접근이 막혀 있지 않은지
- 사내 proxy 설정이 job 환경에 주입되는지
- 운영팀 승인 없이는 variable 갱신이 불가한지
- runner host가 애플리케이션 서버와 같은지, 별도 격리되어 있는지
- production deploy job이 개발용 runner와 같은 executor를 쓰는지
- shell executor의 워크스페이스 오염 때문에 이전 job 잔재가 남지 않는지

## self-managed runner 운영 체크리스트

- 이 프로젝트는 어떤 scope의 runner를 쓰는가
- job tag와 runner tag는 실제로 일치하는가
- protected branch / protected runner 조건이 충돌하지 않는가
- 내부망, proxy, certificate, registry 접근이 필요한 job인가
- executor 선택이 보안 정책과 맞는가
- runner host의 디스크, 캐시, workspace 정리 정책이 있는가
- GitLab 버전과 runner 버전이 과도하게 벌어지지 않았는가
- 운영팀, 개발팀, 보안팀 중 누가 runner 장애 1차 대응자인가
- Pages 배포 job이 별도 runner, 별도 domain, 별도 publish path를 요구하는가

## CI/CD에서 MLOps로 확장하면 무엇이 늘어나는가

일반 CI/CD는 코드의 품질과 배포 가능성을 확인한다. MLOps는 여기에 모델 학습, 평가, 모델 아티팩트 등록, 승격 기준을 추가한다.

예시 파이프라인 흐름:

```yaml
stages:
  - test
  - build
  - train
  - evaluate
  - register_model

train_model:
  stage: train
  script:
    - python train.py

evaluate_model:
  stage: evaluate
  script:
    - python evaluate.py

register_model:
  stage: register_model
  script:
    - echo "register model candidate"
```

MLOps 확장에서 추가로 봐야 할 것:

- 어떤 데이터 버전으로 학습했는가
- metric threshold를 통과했는가
- model artifact가 남았는가
- model registry 또는 이에 준하는 버전 기록이 있는가
- code rollback과 model rollback 중 무엇이 더 빠르고 안전한가

## deploy readiness checklist

- 코드 리뷰 완료
- required approvals 완료
- pipeline success
- artifact 확인
- rollback 방법 준비
- 담당자 연락 체계 준비
- 배포 창구와 시간 확인
- 모델이 포함된 변경이라면 model artifact 추적 정보 확인
- metric threshold, 평가 리포트, model promotion 승인 기준 확인
- 이전 serving model 또는 이전 release로 되돌릴 절차 확인

## failure scenario 1. pipeline은 success인데 서비스는 깨졌다

의미:

- 파이프라인은 설정된 검증만 통과했다
- 검증 범위가 부족했을 수 있다

조치:

- 어떤 테스트가 빠졌는지 회고
- smoke test, integration test, environment-specific check 추가 고려

## failure scenario 2. pending이 오래 지속된다

가능 원인:

- runner 없음
- 태그 불일치
- protected runner 조건 불일치
- self-managed 인프라 장애

Maintainer 메시지:

- 개발자에게 “왜 테스트 안 했냐”고 묻기 전에 pipeline 인프라 상태부터 본다

## failure scenario 3. variable 누락

상황:

- deploy job에서 secret variable이 없어 실패

질문:

- variable이 project level인지 group level인지
- protected branch에서만 쓰도록 묶였는지
- self-managed 운영자 승인 절차가 필요한지

## failure scenario 4. retry하면 가끔 되고 가끔 안 된다

가능 원인:

- flaky test
- 외부 의존성 네트워크 불안정
- runner 자원 부족
- 시간대나 데이터 상태에 민감한 테스트

메시지:

- “한 번 더 돌려서 되면 끝”으로 넘기면 품질 부채가 누적된다
- Maintainer는 이를 일정 리스크로, Owner는 운영 리스크로 봐야 한다

## failure scenario 5. Pages job은 성공했는데 사이트가 안 열린다

가능 원인:

- self-managed 인스턴스에서 Pages 기능 자체가 비활성화됨
- Pages domain 또는 TLS 설정 누락
- artifact 경로와 publish 경로 불일치
- 내부망 DNS 또는 reverse proxy 문제

첫 조치:

- job success만 보지 말고 instance Pages 설정과 접근 경로를 함께 확인한다
- artifact에 실제 정적 파일이 있는지 먼저 본다

## failure scenario 6. webhook은 설정했는데 OpenProject에 아무 것도 안 보인다

가능 원인:

- 잘못된 endpoint URL
- outbound request 차단
- TLS 또는 reverse proxy 문제
- 지원하지 않는 이벤트를 보냈거나 이벤트 선택이 잘못됨
- OpenProject integration token 또는 사용자 권한 문제
- OpenProject linked GitLab endpoint 자체는 있어도 현재 역할에 열람 권한이 없을 수 있음

첫 조치:

- GitLab webhook delivery 기록에서 HTTP status를 먼저 본다
- GitLab -> OpenProject 네트워크 경로를 확인한다
- branch filter와 event filter가 지나치게 좁지 않은지 본다
- OpenProject에서 직접 linked tab 또는 관련 API를 열어 `403`, `404`, 빈 목록`을 구분한다

메시지:

- “연동이 안 된다”는 말만으로는 부족하다
- 최소한 어떤 이벤트가 어떤 endpoint로 어떤 status code를 받았는지 설명할 수 있어야 한다
- 그리고 activity는 생기는데 linked tab은 안 열리면, webhook 문제가 아니라 OpenProject permission 문제일 수 있다

## 사람들이 많이 실수하는 포인트

- success 배지 하나만 보고 merge 품질을 과신한다
- 로그 마지막 줄만 보고 첫 에러를 놓친다
- pending을 코드 문제로 오해한다
- self-managed 제약을 GitLab 일반론으로 덮어쓴다
- artifact와 report를 열어보지 않는다

## 실전에서 특히 많이 강조할 것

- green pipeline은 필요조건이지 충분조건이 아니다
- 첫 유의미 에러 줄을 찾는 습관이 중요하다
- pending은 인프라/runner 문제일 수 있다
- variable과 runner 정책은 self-managed 환경에서 자주 병목이 된다

## Owner / Maintainer / Developer 관점

### Owner

- “green pipeline”을 merge 허가 조건으로 둘 것인가
- 수동 승인과 자동 검증의 책임 경계를 어떻게 둘 것인가

### Maintainer

- pipeline 실패를 일정 리스크로 어떻게 반영할 것인가
- 어떤 단계까지 자동화하고 어디서 사람 검토를 둘 것인가

### Developer

- 로그에서 첫 유의미 에러를 찾고 재현 가능한 최소 수정안을 만들 수 있는가

## 오늘의 산출물

- `.gitlab-ci.yml` 구조 메모
- 실패한 pipeline 로그 분석 기록
- deploy readiness checklist 초안
- self-managed 운영 제약 메모

## 종료 체크리스트

- `.gitlab-ci.yml`의 기본 구조를 설명할 수 있다
- pipeline 상태를 success / failed / pending으로 해석할 수 있다
- self-managed GitLab에서 runner와 variable 제약을 점검할 수 있다
- 배포 전 사람이 확인해야 할 체크리스트를 만들 수 있다

## 공식 참고 자료

- GitLab CI/CD:
  - https://docs.gitlab.com/ci/
- GitLab pipelines:
  - https://docs.gitlab.com/ci/pipelines/
- GitLab CI YAML reference:
  - https://docs.gitlab.com/ci/yaml/
- GitLab Runner:
  - https://docs.gitlab.com/runner/
- GitLab runner scopes:
  - https://docs.gitlab.com/ci/runners/runners_scope/
- GitLab runner executors:
  - https://docs.gitlab.com/runner/executors/
- GitLab model registry:
  - https://docs.gitlab.com/user/project/ml/model_registry/
- GitLab Pages:
  - https://docs.gitlab.com/ee/user/project/pages/introduction.html
- GitLab webhooks:
  - https://docs.gitlab.com/user/project/integrations/webhooks/
- GitLab topic feed / Atom:
  - https://docs.gitlab.com/user/project/project_topics/
- OpenProject GitLab integration:
  - https://www.openproject.org/docs/system-admin-guide/integrations/gitlab-integration/

## 다음 장

`CH08 lecture note` 에서 지금까지 배운 내용을 하나의 종합 시나리오로 묶는다.
