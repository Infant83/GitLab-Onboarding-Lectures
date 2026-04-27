# 10. 3단계 시작: GitLab CI 기초와 첫 파이프라인

## 이 장의 목표

- 왜 협업 뒤에 자동화를 붙이는지 이해한다.
- `.gitlab-ci.yml`의 최소 구조를 읽고 직접 작성한다.
- MR과 pipeline의 관계를 설명할 수 있다.
- 파이프라인 성공, 실패, runner 부재 같은 기본 상태를 해석할 수 있다.

## 선행 개념

- branch, MR, review, approval, conflict 해결, 저장소 표준을 경험했다.
- 사람 기준의 리뷰와 승인 흐름을 이해한다.

## 왜 지금 자동화를 붙이나?

자동화는 사람의 판단을 완전히 대체하지 않는다. 대신 사람이 반복적으로 확인하던 항목을 일관되게 수행하도록 돕는다.

예를 들어 이 프로젝트에서는 아래를 자동화하기 좋다.

- 필수 파일 존재 여부
- 정적 리소스 복사
- 배포용 폴더 생성
- merge 전에 기본 검증 실행

## GitLab CI를 어떻게 이해해야 하나?

- `.gitlab-ci.yml` 은 GitLab이 읽는 자동화 정의 파일이다.
- push, branch, merge request, 기본 브랜치 반영 같은 이벤트를 계기로 job이 실행될 수 있다.
- job은 stage별로 나뉘고, 성공/실패 상태를 남긴다.

## 실습 시나리오

정적 웹 프로젝트에 대해 최소한의 검증과 배포 준비 job을 만든다.

- `validate` stage: 필수 파일 존재 여부 확인
- `package` stage: `dist/` 폴더 생성

## 실습 1. CI용 브랜치 생성

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c chore/add-basic-ci
```

## 실습 2. `.gitlab-ci.yml` 작성

```yaml
stages:
  - validate
  - package

validate_required_files:
  stage: validate
  script:
    - test -f index.html
    - test -f styles.css
    - test -f app.js

package_site:
  stage: package
  script:
    - mkdir -p dist
    - cp index.html styles.css app.js dist/
  artifacts:
    paths:
      - dist/
```

### 각 부분의 의미

- `stages`: job 실행 단계 이름
- `validate_required_files`: 첫 번째 job 이름
- `script`: 실제 실행 명령
- `artifacts`: 다음 확인 또는 배포에 쓸 결과물

## 실습 3. commit 과 push

```bash
git add .gitlab-ci.yml
git commit -m "Add basic GitLab CI pipeline"
git push -u origin chore/add-basic-ci
```

## 실습 4. MR 생성과 pipeline 확인

MR을 만든 뒤 아래를 확인한다.

- pipeline이 자동으로 시작되는가
- 각 stage가 어떤 순서로 도는가
- 실패 시 어느 job에서 멈췄는가

## 성공 상태를 어떻게 읽나?

- `validate` 성공
- `package` 성공
- artifacts 생성
- MR에서 merge 근거가 하나 더 생김

## 실패 상태를 어떻게 읽나?

### 대표 실패 원인

- `.gitlab-ci.yml` 문법 오류
- runner가 없음
- 파일 경로 오타
- 스크립트 명령이 환경과 맞지 않음

### 먼저 볼 위치

- 파이프라인 목록
- 실패한 job 로그
- `.gitlab-ci.yml` 내용

## 사람 검토와 자동 검증의 역할 분리

### 사람이 잘 보는 것

- 요구사항 적합성
- 문구/UX 품질
- 변경 목적과 범위

### 자동화가 잘 보는 것

- 필수 파일 존재
- 반복 가능한 명령 실행
- 매번 같은 방식의 검사

둘은 경쟁 관계가 아니라 보완 관계다.

## 자주 발생하는 오류와 조치

### runner가 없어서 pending 상태입니다

조치:

- GitLab 프로젝트 또는 그룹에 사용 가능한 runner가 있는지 확인
- self-managed 환경이면 관리자와 runner 연결 상태 점검

### YAML 문법 오류가 납니다

조치:

- 들여쓰기 확인
- key 이름 중복 확인
- GitLab CI Lint 도구 사용 고려

### job은 성공했는데 결과물을 못 찾겠습니다

조치:

- `artifacts.paths` 설정 확인
- job 로그에서 실제 생성 경로 확인

## 결과 확인 체크리스트

- CI용 브랜치를 만들었다.
- `.gitlab-ci.yml`을 작성했다.
- commit, push, MR 생성 후 pipeline을 확인했다.
- 성공과 실패 상태를 구분할 수 있다.
- 사람 리뷰와 자동 검증의 차이를 설명할 수 있다.

## 공식 참고 자료

- GitLab Docs, CI/CD:
  - https://docs.gitlab.com/ci/
- GitLab Docs, `.gitlab-ci.yml` syntax:
  - https://docs.gitlab.com/ci/yaml/

## 다음 장

[11_MLOps_Expansion_Path.md](./11_MLOps_Expansion_Path.md)에서는 이 파이프라인을 배포 또는 배포 준비 단계까지 확장해서, merge 이후 결과를 실제 사용자 관점과 연결한다.
