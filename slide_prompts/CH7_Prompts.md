# CH07 Execution Prompt

업로드된 `07_CICD_Quality_Gates_and_Self_Managed_Operations.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH07 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: CI/CD Quality Gates and Self-Managed Operations
- 권장 분량: 11 slides
- 강의 시간: 약 1시간
- 목적: merge 이후 pipeline, quality gate, self-managed 제약을 이해시킨다
- 핵심 축: `.gitlab-ci.yml`, stage/job/artifact, pipeline state, pending, runner/variable, deploy readiness
- 핵심 자산:
  - `.gitlab-ci.yml`
  - `scripts/build-site.js`
  - `scripts/smoke-check.js`
  - `tests/role-visibility-smoke.test.js`

## 반드시 반영할 학습 메시지
- merge는 끝이 아니라 운영 가능 상태의 시작이다.
- green pipeline은 필요조건이지 충분조건이 아니다.
- pending은 종종 코드보다 인프라 문제다.
- self-managed 환경에서는 GitLab 일반론만으로 설명되지 않는 제약이 많다.

## 시작/종료 상태
- 시작 상태:
  - CH06까지의 merge 또는 conflict 해결 결과가 저장소에 반영된 상태
- 새로 추가되는 파일:
  - `.gitlab-ci.yml`
  - `scripts/build-site.js`
  - `scripts/smoke-check.js`
  - `tests/role-visibility-smoke.test.js`
- 종료 상태:
  - test/build/artifact/pending 원인을 최소 1개 이상 설명 가능
  - CH08에서 pipeline 결과를 merge 기준과 연결해 해석 가능

## 슬라이드 구성
1. merge는 끝이 아니다
2. `.gitlab-ci.yml` 읽기
3. Stage / Job / Script / Artifact
4. Pipeline Status 해석
5. 로그 읽는 순서
6. 실습: 실패 주입
7. Artifact와 Report
8. Pending 분석
9. Self-Managed GitLab 추가 관점
10. Deploy Readiness Checklist
11. 장 정리 + CH08 handoff

## 반드시 포함할 구조 예시
```yaml
stages:
  - test
  - build

test_job:
  stage: test
  script:
    - node --test
    - node scripts/smoke-check.js

build_job:
  stage: build
  script:
    - node scripts/build-site.js
  artifacts:
    paths:
      - dist/
```

## 반드시 반영할 실습 포인트

* hands-on은 `test -> build` 두 단계로 진행
* deploy는 개념 설명만 하고 실제 hands-on은 build 산출물까지
* `role-visibility-smoke.test.js`와 `scripts/smoke-check.js`의 차이를 설명
* 실패 주입:

  * 없는 파일 참조
  * expected 값 변경
  * 스크립트 오타
  * `src/feature-flags.json` 키 변경
* pending 원인:

  * runner 없음
  * tag 불일치
  * protected runner 조건
  * variable 접근 제한
  * manual job 오해

## 반드시 포함할 자산명

* `.gitlab-ci.yml`
* `scripts/build-site.js`
* `scripts/smoke-check.js`
* `tests/role-visibility-smoke.test.js`

## 출력 시 주의

* CH07은 CI/CD 입문 장이 아니라 “merge 이후 운영 가능 상태를 읽는 장”으로 써라.
* status 색깔 나열로 끝내지 말고, 다음에 해야 할 질문을 반드시 붙여라.
* self-managed 제약은 발표자 노트에서 특히 분리해라.
* 마지막 슬라이드는 CH08의 issue -> branch -> MR -> pipeline -> rollback 종합 시나리오로 연결하라.

지금 바로 CH07 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH07 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **CI/CD Quality Gates and Self-Managed Operations**
* 권장 분량: **11 pages**
* 목적: merge 이후 pipeline, quality gate, self-managed 운영 제약을 이해시킨다.
* 핵심 축: `.gitlab-ci.yml`, stage/job/artifact, pipeline state, pending, runner/variable, deploy readiness
* 주요 자산: `.gitlab-ci.yml`, `scripts/build-site.js`, `scripts/smoke-check.js`, `tests/role-visibility-smoke.test.js`

---

## Page 1. merge는 끝이 아니다

* **제목**: merge는 운영 가능 상태의 시작이다
* **takeaway**: 사람 간 정합성 뒤에는 자동 검증과 운영 정합성이 따라와야 한다.
* **포함**

  * CH06 conflict 해결과 CH07 pipeline의 연결
  * merge → pipeline → quality gate → deploy readiness
* **시각화**

  * 흐름도
* **노트**

  * “green pipeline은 필요조건이지 충분조건은 아니다”
* **연결**

  * `.gitlab-ci.yml` 구조로 이동

## Page 2. `.gitlab-ci.yml` 읽기

* **제목**: YAML을 문법이 아니라 검증 설계도로 읽기
* **takeaway**: CI 파일은 무엇을 어떤 순서로 자동 검증할지 적어둔 운영 문서다.
* **포함**

  * `stages`
  * `job`
  * `script`
  * `artifacts`
  * `rules` 위치
* **리서치**

  * GitLab CI YAML reference
* **시각화**

  * YAML 구조 맵
* **노트**

  * CI Lint는 발표자 노트에서만 짧게
* **연결**

  * 핵심 구성요소 상세로 이동

## Page 3. Stage / Job / Script / Artifact

* **제목**: 파이프라인의 핵심 구성요소 4가지
* **takeaway**: 순서, 작업 단위, 실행 내용, 남는 결과물을 분리해서 봐야 한다.
* **포함**

  * stages = 순서
  * jobs = 작업 단위
  * script = 실행 명령
  * artifacts = 결과물
  * `build-site.js`, `smoke-check.js`, `role-visibility-smoke.test.js` 연결 예
* **시각화**

  * 4칸 카드
* **노트**

  * test → build 순서가 자연스러운 이유 설명
* **연결**

  * pipeline status로 이동

## Page 4. Pipeline Status 해석

* **제목**: success / failed / pending / canceled를 다르게 읽기
* **takeaway**: 상태 색깔 하나만 보고 결론 내리면 안 된다.
* **포함**

  * success
  * failed
  * pending
  * canceled
  * 다음에 해야 할 질문
* **시각화**

  * 상태 카드 4개
* **노트**

  * pending은 코드 문제가 아닐 수도 있음을 강조
* **연결**

  * 로그 읽는 순서로 이동

## Page 5. 로그 읽는 순서

* **제목**: 마지막 줄보다 첫 유의미 에러 줄을 찾기
* **takeaway**: 로그는 “어디서 처음 깨졌는가”를 찾는 방식으로 읽어야 한다.
* **포함**

  * 최신 pipeline인지 확인
  * 어느 stage/job이 실패했는지
  * 첫 의미 있는 실패 줄 찾기
  * artifact/report 확인
  * 코드 문제 vs 환경 문제 분류
* **시각화**

  * numbered checklist + log placeholder
* **노트**

  * flaky test와 deterministic failure 구분
* **연결**

  * 실패 주입 실습으로 이동

## Page 6. 실습: 실패 주입

* **제목**: pipeline 실패를 분류 문제로 학습하기
* **takeaway**: 실패는 겁낼 대상이 아니라 “어느 레이어에서 깨졌는가”를 분류하는 연습 재료다.
* **포함**

  * 없는 파일 참조
  * expected 값 변경
  * 스크립트 오타
  * `src/feature-flags.json` 키 변경
  * 어느 stage/job이 왜 실패했는지 질문
* **시각화**

  * 상단 실패 주입 예시, 하단 분석 질문
* **노트**

  * 로컬에서는 안 보이고 CI에서만 드러나는 이유 설명
* **연결**

  * artifact / report로 이동

## Page 7. Artifact와 Report

* **제목**: 배지보다 증거 묶음을 확인하라
* **takeaway**: pipeline 결과는 성공/실패 색깔이 아니라 남겨진 증거까지 봐야 읽힌다.
* **포함**

  * build 결과물
  * 테스트 리포트
  * coverage
  * lint output
  * 언제 무엇을 보는가
* **시각화**

  * artifact 유형별 표
* **노트**

  * 성공이어도 artifact를 열어봐야 하는 경우 설명
* **연결**

  * pending 분석으로 이동

## Page 8. Pending 분석

* **제목**: pending은 종종 코드보다 인프라 문제다
* **takeaway**: pending을 코드 실패로 오해하면 대응이 틀어진다.
* **포함**

  * runner 없음
  * tag 불일치
  * protected runner 조건
  * variable 접근 제한
  * manual job 오해
* **리서치**

  * protected resources, runners, variables
* **시각화**

  * 원인 / 확인 위치 / 조치 방향 표
* **노트**

  * self-managed 환경에서 pending이 더 인프라 이슈와 연결된다는 설명
* **연결**

  * self-managed 제약으로 이동

## Page 9. Self-Managed GitLab 추가 관점

* **제목**: self-managed 환경에서 추가로 봐야 하는 것
* **takeaway**: self-managed에서는 GitLab 일반론만으로 설명되지 않는 인프라 제약이 많다.
* **포함**

  * shared/group runner
  * internet egress 제한
  * registry 접근
  * protected variables
  * shell vs docker runner
  * 내부망 배포
  * proxy/certificate 문제
* **시각화**

  * 운영 체크포인트 matrix
* **노트**

  * “로컬에서는 되는데 CI에서는 안 되는” 전형적 원인 설명
* **연결**

  * deploy readiness checklist로 이동

## Page 10. Deploy Readiness Checklist

* **제목**: green이어도 바로 배포하지 않는 이유
* **takeaway**: deploy-ready는 pipeline success보다 더 넓은 판단이다.
* **포함**

  * 코드 리뷰 완료
  * required approvals 완료
  * pipeline success
  * artifact 확인
  * rollback 준비
  * 연락 체계
  * 배포 창구 / 시간 확인
* **시각화**

  * checklist
* **노트**

  * Owner와 Maintainer가 각각 무엇을 보는지 분리 설명
* **연결**

  * CH08 end-to-end로 이동

## Page 11. 장 정리

* **제목**: 사람 간 정합성 + 자동 검증 = 운영 가능 상태
* **takeaway**: CH07은 merge 이후를 운영 관점에서 읽게 만든다.
* **포함**

  * `.gitlab-ci.yml`
  * pipeline status
  * artifact
  * pending 원인
  * self-managed 제약
  * deploy readiness
* **시각화**

  * MR → pipeline → deploy/rollback 아이콘 흐름
* **노트**

  * CH08은 종합 시나리오라고 예고
* **연결**

  * issue부터 rollback까지 한 번에 수행하는 장으로 이동
