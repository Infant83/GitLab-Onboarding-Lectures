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
- merge 후 “배포해도 되는가”를 체크리스트로 판단할 수 있다.

## 튜토리얼 자산과 준비 파일

이 장은 [07_cicd/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\LAB.md) 와 함께 진행한다.

이번 장에서 새로 추가하는 파일:

- [.gitlab-ci.yml](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\assets\.gitlab-ci.yml)
- [scripts/build-site.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\assets\scripts\build-site.js)
- [scripts/smoke-check.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\assets\scripts\smoke-check.js)
- [tests/role-visibility-smoke.test.js](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\assets\tests\role-visibility-smoke.test.js)

핵심 설명:

- 튜토리얼 hands-on은 `test -> build` 두 단계로 진행한다.
- `deploy`는 개념적으로 다루되, 실제 자산은 self-managed 환경 차이를 줄이기 위해 build 결과물 생성까지로 제한한다.

## 이 장을 따라갈 때의 실습 연결 맵

- 시작 상태:
  - CH06까지의 merge 또는 conflict 해결 결과가 저장소에 반영된 상태
  - `src/feature-flags.json`, `src/permissions.js`, MR 흐름이 이미 한 번 검토된 상태
- 강의 노트만으로 진행하는 순서:
  - `실습 1 -> 실습 2 -> 실습 3 -> 실습 4` 순서로 진행한다
  - build보다 먼저 test와 smoke check를 읽고, 왜 그 순서인지 설명한다
  - [07_cicd/LAB.md](C:\Users\angpa\myProjects\Daily_Work\GitLab-Manual\tutorials\07_cicd\LAB.md)는 실습 보조 체크리스트로만 쓴다
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

## deploy readiness checklist

- 코드 리뷰 완료
- required approvals 완료
- pipeline success
- artifact 확인
- rollback 방법 준비
- 담당자 연락 체계 준비
- 배포 창구와 시간 확인

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

## 다음 장

[08_Capstone_Scenario_and_Role_Based_Playbook.md](./08_Capstone_Scenario_and_Role_Based_Playbook.md) 에서 지금까지 배운 내용을 하나의 종합 시나리오로 묶는다.
