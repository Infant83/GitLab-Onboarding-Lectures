# 14. 역할별 복습 경로, 전체 역량 점검, 다음 확장

## 이 장의 목표

- 교육 전체를 역할별 복습 경로로 다시 정리한다.
- 개발자, 리뷰어, Maintainer, Owner/PM 관점에서 무엇을 우선 익혀야 하는지 정리한다.
- 강의 노트 전체의 실습 범위를 점검하고 다음 확장 방향을 제안한다.

## 역할별 복습 경로

### 개인 개발자 경로

우선순위:

1. `02` 시작 준비와 clone
2. `03` 일일 작업 루틴
3. `04` 기록과 태그
4. `12` 문제 해결

이 경로의 목표:

- 로컬과 원격의 관계를 정확히 이해
- 상태 확인, commit, push, stash, restore에 익숙해짐
- 혼자서도 다시 들어올 수 있는 기록을 남김

### 협업 개발자 경로

우선순위:

1. `05` 브랜치 전략
2. `06` MR과 리뷰 반영
3. `07` conflict 해결과 revert
4. `08` 이슈 분해와 merge 순서

이 경로의 목표:

- feature branch 기반으로 일함
- MR을 설명 가능한 문서처럼 작성함
- conflict를 두려워하지 않고 해결함

### 리뷰어 경로

우선순위:

1. `06` MR과 리뷰 기준
2. `08` 운영 오케스트레이션
3. `09` 저장소 표준
4. `12` 문제 진단

이 경로의 목표:

- 코드만이 아니라 설명, 범위, 확인 방법까지 함께 검토
- 충돌 가능성과 merge 순서를 조기에 감지
- 리뷰를 팀 표준과 연결

### Maintainer 경로

우선순위:

1. `06` 승인과 merge 가능 상태
2. `07` revert와 안전한 복구
3. `09` 팀 규칙 정리
4. `10`~`11` 자동화와 배포
5. `13` 사내 환경 적응

이 경로의 목표:

- 누가 merge할 수 있고 언제 merge해야 하는지 판단
- 정책, 보호 브랜치, pipeline 결과를 해석
- 문제 시 복구 경로를 설계

### Owner 또는 PM 경로

우선순위:

1. `01` 교육 설계와 역할 구조
2. `06` 역할과 권한
3. `08` 협업 운영 설계
4. `09` 저장소 표준
5. `13` 사내 환경 프로파일

이 경로의 목표:

- 팀 운영 관점에서 GitLab 협업 구조 이해
- 권한, 승인, merge 정책의 필요성 이해
- 교육 운영 또는 실제 팀 온보딩 자료로 활용

## 전체 실습에서 다룬 핵심 명령어 복습

| 주제 | 핵심 명령 |
| --- | --- |
| 시작과 연결 | `clone`, `remote -v`, `branch -vv` |
| 상태와 기록 | `status`, `diff`, `add`, `commit`, `log`, `show` |
| 동기화 | `fetch`, `pull`, `push` |
| 분기 | `branch`, `switch`, `checkout` |
| 협업 | `merge`, `rebase`, `stash` |
| 복구와 추적 | `restore`, `revert`, `tag`, `bisect` |

## 전체 실습에서 다룬 핵심 GitLab 개념 복습

- 프로젝트와 원격 저장소
- 역할과 권한
- branch 보호와 merge 책임
- merge request
- review와 approval
- CI/CD pipeline
- 배포 또는 배포 준비 아티팩트

## 전체 역량 점검 질문

아래 질문에 답할 수 있으면 기본 교육 목표는 달성한 것이다.

- `origin`, `main`, `origin/main`의 차이를 설명할 수 있는가?
- `add`, `commit`, `push`가 각각 어느 층위를 바꾸는지 설명할 수 있는가?
- 왜 협업에서는 feature branch와 MR이 필요한가?
- review와 approval의 차이를 설명할 수 있는가?
- conflict가 났을 때 어떤 순서로 해결할 것인가?
- shared branch에서 왜 `revert`가 중요한가?
- pipeline 실패 시 어디부터 볼 것인가?

## 웹페이지형 교육자료 또는 PPT로 바꿀 때 유지할 구조

이 lecture note 세트는 이후 웹 강의나 PPT로 바꿀 때도 같은 구조를 유지하는 것이 좋다.

권장 슬라이드 패턴:

- 문제 제기
- 개념 설명
- 실제 명령어
- 결과 화면
- 자주 나는 오류
- 역할별 관점
- 체크리스트

## 다음 확장 아이디어

- `glab` 또는 GitLab CLI 기반 실습 추가
- MR 템플릿 파일 추가
- CODEOWNERS 또는 approvals 고급 규칙 추가
- Pages 또는 사내 배포 템플릿 추가
- 실제 팀별 sandbox 저장소 자동 생성

## 결과 확인 체크리스트

- 내 역할에 맞는 복습 경로를 고를 수 있다.
- 전체 과정에서 어떤 명령어가 어디서 다뤄졌는지 설명할 수 있다.
- Git과 GitLab 개념이 개인 개발, 협업, 자동화, 운영으로 어떻게 연결되는지 설명할 수 있다.
- 다음 확장 과제가 무엇인지 알고 있다.

## 마지막 정리

이 교육의 목적은 명령어를 많이 외우게 하는 것이 아니다. 아래 세 문장을 실무에서 자연스럽게 행동으로 옮길 수 있게 만드는 것이다.

- 나는 지금 어떤 상태에 있는지 안다.
- 팀은 내 변경을 어떻게 검토하고 반영하는지 안다.
- 문제가 생겼을 때 어디서부터 안전하게 복구해야 하는지 안다.

## 공식 참고 자료

- Git Book:
  - https://git-scm.com/book/en/v2
- GitLab Docs:
  - https://docs.gitlab.com/

## 다음 단계

이제 이 lecture note 세트를 기준으로 다음 작업을 진행한다.

1. 전체 deck 구조를 chapter 단위로 정리
2. LGDisplay 스타일 Skywork PPT 프롬프트 작성
3. 1차 deck 생성
4. source drift, density, audience-fit 관점으로 deck audit

## 심화 부록

실무형 반복 학습을 위해 아래 두 장을 추가 부록으로 사용한다.

- [15_Command_Relationships_and_Diagnostics.md](./15_Command_Relationships_and_Diagnostics.md)
- [16_Group_Workshop_MR_Approval_Conflict_Lab.md](./16_Group_Workshop_MR_Approval_Conflict_Lab.md)
