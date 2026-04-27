# 13. 사내 GitLab 환경에 맞춰 바꾸는 체크리스트

## 이 장의 목표

- GitLab.com 기준 예제를 사내 self-managed GitLab에 맞게 치환하는 포인트를 이해한다.
- 기본 브랜치, 권한, 승인 정책, runner, 배포 방식 차이를 점검한다.
- fork 사용 가능 여부, 보호 브랜치 정책, 배포 인프라 차이를 문서에 반영할 수 있다.

## 왜 별도 장이 필요한가?

교육 자료는 보통 공개 예제를 기준으로 만들기 쉽다. 하지만 실제 조직 환경은 아래가 다를 수 있다.

- GitLab 주소
- 인증 방식
- 기본 브랜치 이름
- 권한과 승인 정책
- runner 사용 여부
- Pages 사용 가능 여부
- 외부 네트워크 접근 제한

즉, 좋은 강의 노트는 기술 개념뿐 아니라 환경 차이까지 흡수해야 한다.

## 먼저 점검해야 할 6가지

### 1. GitLab 주소와 인증 방식

예시:

- 공개 GitLab.com
- 사내 self-managed URL
- SSO, LDAP, PAT, SSH key 등 인증 방식

### 2. 기본 브랜치 이름

- `main`
- `master`
- 조직 규칙에 따른 별도 이름

모든 실습 명령은 실제 기본 브랜치 이름에 맞게 바뀌어야 한다.

### 3. 권한 체계와 보호 브랜치 정책

확인 질문:

- Developer가 기본 브랜치에 direct push 가능한가?
- Maintainer만 merge 가능한가?
- approval은 몇 명 필요한가?

### 4. fork 허용 여부

일부 사내 환경은 fork를 막거나 제한한다.

교육 반영 방식:

- 공유 저장소 모델만 사용할지
- fork 모델을 개념 설명만 할지
- 외부 협업 예시를 별도로 둘지

### 5. runner 사용 가능 여부

확인 질문:

- shared runner가 있는가?
- 그룹 runner만 있는가?
- shell runner인지 docker runner인지

### 6. 배포 방식

가능한 예:

- GitLab Pages
- 사내 정적 서버
- artifact 전달형 배포
- 운영팀 수동 배포

## 문서 치환 포인트

### `02_Getting_Started.md`

- clone URL 예시 변경
- 인증 방식 설명 변경
- 기본 브랜치 이름 변경

### `05`~`09`

- 권한/승인/보호 브랜치 정책 설명 변경
- fork 가능 여부 반영
- merge 권한 주체 조정

### `10`~`11`

- runner 환경과 배포 방식 반영
- Pages 불가 시 artifact 또는 내부 배포 절차로 변경

## 사내 적용 전 확인 질문

- 교육생이 직접 프로젝트를 만들 수 있는가?
- 교육용 그룹 또는 샌드박스가 있는가?
- Maintainer 역할을 누가 맡는가?
- 리뷰와 승인을 실제로 시뮬레이션할 수 있는가?
- 파이프라인 실습에 쓸 runner가 있는가?
- 배포 결과를 볼 수 있는 환경이 있는가?

## 최소 환경 프로파일 양식

아래 템플릿을 팀별로 채우면 이후 문서 수정이 빨라진다.

```md
# GitLab Environment Profile

- GitLab URL:
- 인증 방식:
- 기본 브랜치 이름:
- 교육용 프로젝트 생성 가능 여부:
- Developer direct push 허용 여부:
- Maintainer merge 정책:
- Approval 필요 수:
- Fork 허용 여부:
- Shared runner 사용 가능 여부:
- 배포 방식:
```

## 교육 운영 팁

- 문서 안의 예시 명령을 실제 환경 이름으로 바꿔 둔다.
- 실습 전에 branch 정책과 runner 상태를 먼저 검증한다.
- 배포가 불가능한 환경이라면 11장을 "배포 준비 아티팩트 생성" 중심으로 재설계한다.

## 결과 확인 체크리스트

- GitLab 주소와 인증 방식을 확인했다.
- 기본 브랜치 이름을 확인했다.
- 권한/승인/보호 브랜치 정책을 확인했다.
- fork 허용 여부를 확인했다.
- runner와 배포 방식 정보를 확인했다.
- 환경 프로파일 초안을 작성했다.

## 공식 참고 자료

- GitLab Docs, Roles and permissions:
  - https://docs.gitlab.com/user/permissions/
- GitLab Docs, Protected branches:
  - https://docs.gitlab.com/user/project/repository/branches/protected/
- GitLab Docs, CI/CD:
  - https://docs.gitlab.com/ci/

## 다음 장

[14_Learning_Routes_for_Developer_and_PM.md](./14_Learning_Routes_for_Developer_and_PM.md)에서는 개발자, 리뷰어, maintainer, owner 또는 PM 관점에서 어떤 순서로 복습하고 심화하면 되는지 정리한다.
