# 11. 3단계 실습: 배포까지 연결하는 GitLab CD와 결과 검증

## 이 장의 목표

- 기본 검증 파이프라인을 배포 또는 배포 준비 흐름으로 확장한다.
- `main` 반영 이후 결과가 어떻게 실제 화면으로 이어지는지 이해한다.
- 배포 이후 확인 항목과 rollback 관점을 연결한다.
- 왜 이 장 파일명에 `MLOps`가 남아 있는지 교육 구조 관점에서 이해한다.

## 선행 개념

- [10_Automation_Basics.md](./10_Automation_Basics.md)에서 첫 GitLab CI 파이프라인을 작성했다.
- MR과 pipeline의 관계를 이해했다.

## 이 장의 핵심 메시지

코드가 merge되었다고 끝난 것이 아니다. 실제 사용자 관점에서는 "배포 가능한가", "배포 후 화면이 맞는가", "문제 시 되돌릴 수 있는가"까지가 작업 완료다.

## 실습 시나리오

정적 웹 프로젝트를 `public/` 또는 `dist/` 아티팩트로 묶고, 기본 브랜치 반영 시 배포 준비 또는 GitLab Pages 스타일 배포 흐름을 만든다.

## 실습 1. 배포용 브랜치 준비

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c chore/add-deploy-stage
```

## 실습 2. 배포 준비 job 추가

아래 예시는 GitLab Pages 스타일의 단순 예시다.

```yaml
stages:
  - validate
  - package
  - deploy

validate_required_files:
  stage: validate
  script:
    - test -f index.html
    - test -f styles.css
    - test -f app.js

package_site:
  stage: package
  script:
    - mkdir -p public
    - cp index.html styles.css app.js public/
  artifacts:
    paths:
      - public/

pages:
  stage: deploy
  script:
    - echo "Publishing static site"
  artifacts:
    paths:
      - public/
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
```

### 교육 포인트

- 배포 job은 모든 브랜치에서 무조건 돌 필요가 없다.
- 보통 기본 브랜치 반영 시점에만 배포하거나, 특정 환경 조건에서만 실행한다.
- 실제 회사 환경에서는 Pages가 아니라 별도 서버, 스토리지, 내부 배포 스크립트를 쓸 수 있다.

## 실습 3. MR 생성과 merge 후 배포 확인

MR을 생성하고, 리뷰와 승인 후 `main`에 merge한다. 이후 아래를 확인한다.

- `main` 브랜치에서 deploy job이 실행되었는가
- 배포 결과 URL 또는 아티팩트를 확인할 수 있는가
- 실제 화면에서 변경이 반영되었는가

## 배포 후 확인해야 할 것

- 페이지가 열리는가
- 버튼이 동작하는가
- 변경된 문구가 실제 배포 결과에 보이는가
- 오래된 캐시 때문에 이전 화면을 보고 있지는 않은가

## 문제가 생기면 어떻게 하나?

### 상황 A. pipeline은 성공했는데 화면이 예전과 같음

가능한 원인:

- 브라우저 캐시
- deploy 대상 경로 불일치
- Pages 또는 정적 호스팅 반영 지연

### 상황 B. `main` merge 후 deploy job 실패

가능한 원인:

- `public/` 또는 `dist/` 생성 실패
- 배포 대상 정책 또는 권한 문제
- self-managed 환경의 runner 또는 배포 인프라 오류

### 첫 대응 원칙

- job 로그 확인
- 이전 정상 배포와 diff 비교
- 필요 시 마지막 정상 commit 기준 `revert`

## 3인 팀은 배포 단계에서 어떻게 움직이나?

### 개발자

- 배포에 필요한 파일 구조와 pipeline 정의 작성
- 배포 후 기능 확인

### 리뷰어

- 배포 결과 화면과 MR 설명이 일치하는지 점검
- "코드상 맞아 보인다"가 아니라 "실제 결과가 맞다"를 확인

### 승인자 또는 Maintainer

- 배포가 기본 브랜치 merge 조건과 연결되는지 판단
- 문제 시 rollback 경로와 책임자를 명확히 함

## 왜 이 장 이름에 `MLOps`가 남아 있나?

이 교육은 원래 GitLab을 더 넓은 운영 체계, 즉 개발 협업과 자동화와 배포를 잇는 플랫폼으로 이해시키는 목표에서 시작했다. 지금 예제는 정적 웹 프로젝트지만, 핵심 메시지는 동일하다.

- 변경을 안전하게 기록한다.
- 팀 기준으로 검토한다.
- 반복 검증을 자동화한다.
- 결과를 실제 서비스 또는 산출물로 연결한다.

이 구조는 웹, 앱, 데이터, ML 프로젝트에도 공통적으로 적용된다.

## 결과 확인 체크리스트

- deploy stage를 추가했다.
- 기본 브랜치에서만 배포되는 규칙을 이해했다.
- merge 후 deploy 결과를 확인했다.
- 배포 후 확인 항목과 rollback 관점을 연결할 수 있다.

## 공식 참고 자료

- GitLab Docs, GitLab Pages:
  - https://docs.gitlab.com/user/project/pages/
- GitLab Docs, CI/CD:
  - https://docs.gitlab.com/ci/

## 다음 장

[12_Troubleshooting_and_FAQ.md](./12_Troubleshooting_and_FAQ.md)에서는 지금까지의 전체 실습에서 자주 막히는 문제를 증상별로 정리하고, `bisect` 같은 진단 도구까지 포함해 실전 대응 가이드를 만든다.
