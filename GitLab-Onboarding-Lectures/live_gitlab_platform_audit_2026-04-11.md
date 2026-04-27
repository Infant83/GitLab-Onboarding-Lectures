# Live GitLab Platform Audit 2026-04-11

## Scope

- 대상 계정: `https://gitlab.com/Infant83`
- 검증 프로젝트: `Infant83/tutorial-collaboration-lab-live-audit-20260411-084517`
- 기준 프로젝트 URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517`
- 목적: CH01~CH08 tutorial 중 GitLab 고유 기능을 실제 SaaS GitLab에서 검증하고, self-managed 교육 포인트와 차이를 정리한다

## Verified

### CH01 seed push

- empty private project 생성 성공
- seed repo 초기 commit push 성공
- baseline commit:
  - `ch01: initialize tutorial collaboration seed`
  - `ch02: add local workflow practice files`
  - `ch03: add history inspection assets`
  - `ch04: add branch planning and feature flags`
- tag `v0.1.0` push 성공

### CH05 review / protected branch / wiki

- MR 1 생성 및 merge 성공
  - `CH05 live audit: review policy assets`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/merge_requests/1`
- approval state 조회 결과, 별도 approval rule은 없었음
- 새 private 프로젝트의 기본 `main` branch는 이미 protected 상태였고 push / merge 기준은 `Maintainers`로 설정되어 있었음
- wiki page 생성 성공
  - slug: `Live-Audit-Notes`

### CH06 conflict reproduction

- MR 2 생성 후 merge 성공
  - `CH06 live audit: developer A policy update`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/merge_requests/2`
- MR 3 생성 직후에는 mergeable
  - `CH06 live audit: developer B conflicting policy update`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/merge_requests/3`
- MR 2 merge 후 MR 3 상태가 실제로 `detailed_merge_status=conflict`, `has_conflicts=true`로 전환됨
- 로컬에서 conflict 해결 후 branch push하자 MR 3이 다시 `mergeable`로 복귀했고, merge 성공

### CH07 pipeline

- MR 4 생성 및 merge 성공
  - `CH07 live audit: CI quality gates`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/merge_requests/4`
- branch pipeline 성공
  - pipeline: `2445393071`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/pipelines/2445393071`
- job 성공 확인:
  - `test_job`
  - `build_job`
- GitLab.com shared runner가 기본 활성화되어 추가 runner 설정 없이 실행됨

### Pages extension

- MR 5 생성 및 merge 성공
  - `CH07 live audit: Pages deployment job`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/merge_requests/5`
- main pipeline 성공
  - pipeline: `2445396485`
  - URL: `https://gitlab.com/Infant83/tutorial-collaboration-lab-live-audit-20260411-084517/-/pipelines/2445396485`
- job 성공 확인:
  - `test_job`
  - `build_job`
  - `deploy_pages`
- Pages API 확인 결과:
  - deployed url: `https://tutorial-collaboration-lab-live-audit-20260411-084517-61a61e.gitlab.io`
  - `root_directory=dist`
- 단, project `pages_access_level=private` 상태에서는 비인증 직접 접근 시 로그인/보호 화면으로 유도되었음

## OpenProject Check

- `OPENPROJECT_BASE_URL` 기준 `https://infant.tailcb5184.ts.net:8443/`
- API `whoami` 성공
- 프로젝트 목록 조회 성공
- 교육 문맥상 관련성이 높은 프로젝트:
  - `Git-MLOps 플랫폼 운영`
  - `MLOps-Pilot 운영`
  - `TechReview`
- `TechReview` 프로젝트의 work package `43` 조회 성공
- work package `43`에서 아래 링크 지점 확인:
  - `gitlab_issues`
  - `gitlab_merge_requests`
  - `atom`
- work package comment API write 성공:
  - `POST /api/v3/work_packages/43/activities`
  - 생성 activity: `175`
- 생성된 activity `175` direct readback 성공
- work package activities collection 재조회 성공:
  - `count=5`
  - 새 comment 포함 확인
- GitLab live audit 프로젝트에 OpenProject webhook 등록 성공
  - project hook id: `75245649`
  - registered event types: `push`, `merge_request`, `issue`, `note`, `pipeline`
- smoke branch / MR 생성 후 GitLab webhook event log 확인:
  - `push_hooks` -> `200`
  - `merge_request_hooks` -> `200`
  - `pipeline_hooks` -> `200`
- OpenProject activity 실제 생성 확인:
  - activity `177`: `MR Opened`
  - activity `178`: `Pushed in refs/heads/main`
  - activity `179`: `MR Merged`
- webhook 검증 후 hook는 삭제해 정리 완료
- 단, linked GitLab endpoint는 현재 계정 기준 열람 실패:
  - `GET /api/v3/work_packages/43/gitlab_issues` -> `403 MissingPermission`
  - `GET /api/v3/work_packages/43/gitlab_merge_requests` -> `403 MissingPermission`
- 추가 확인:
  - `GET /api/v3/memberships?filters=[project=12, principal=5]` -> `count=0`
  - 즉 현재 계정은 관리자 권한으로 work package 접근은 가능하지만, direct project membership이나 GitLab linked data 열람 권한은 별도일 가능성이 높다
- UI feed route `https://infant.tailcb5184.ts.net:8443/work_packages/43.atom`에 API key Basic 인증으로 접근 시 로그인 HTML이 반환되었음
- 따라서 API 인증과 UI/feed 인증은 별도이며, feed 소비는 별도 인증 방식 또는 세션 정책 확인이 필요함

## Findings

### High 1. Windows `desktop.ini`가 `.git` 내부까지 오염됨

- live GitLab 검증 중에도 `.git/refs`, `.git/objects`, `.git/logs` 아래 `desktop.ini`가 대량 생성되었다
- 실제로 `git pull` 시 `fatal: bad object refs/desktop.ini`가 재현되었다
- 교육자료에서 Windows 전용 troubleshooting을 빼면 실습이 끊길 가능성이 높다

### High 2. CH06 conflict 흐름은 GitLab에서도 그대로 재현 가능

- 동일 기반에서 갈라진 두 MR 중 A를 먼저 merge하면, B는 실제로 conflict 상태가 된다
- 따라서 CH06 tutorial의 핵심 시나리오는 문서상 가정이 아니라 실플랫폼에서도 성립한다

### Medium 1. GitLab.com과 self-managed의 초기 상태 차이가 크다

- GitLab.com private project는 기본 protected `main`, shared runner enabled, wiki enabled 상태였다
- self-managed에서는 이 세 가지가 모두 비어 있거나 운영팀 승인 대상일 수 있다
- 따라서 교육 시 “GitLab.com에서 바로 되던 것”을 self-managed 일반론으로 설명하면 drift가 생긴다

### Medium 2. private Pages는 배포 성공과 접근 가능성이 별개다

- Pages job success는 배포 artifact 생성과 publish 완료를 뜻한다
- 그러나 private visibility에서는 URL 접근이 로그인 정책에 종속된다
- 교육자료에는 `deploy success != public readability`를 분리해서 설명할 필요가 있다

### Medium 3. OpenProject 연동 지점 존재와 실제 열람 가능성은 별개다

- work package에 GitLab issue / MR 링크 지점이 노출되어 있어도, 현재 역할에 따라 실제 endpoint 조회는 `403 MissingPermission`이 될 수 있다
- 반대로 webhook delivery와 activity 생성은 정상이어도 linked GitLab endpoint는 계속 막혀 있을 수 있다
- 이번 인스턴스에서는 관리자 계정이면서도 direct membership 조회는 비어 있었으므로, "프로젝트 접근 가능"과 "GitLab linked tab/API 열람 가능"을 같은 레이어로 보면 안 된다
- 따라서 교육자료에는 “연동 메뉴가 보인다 = 데이터가 읽힌다”로 가르치면 안 된다
- linked tab, API endpoint, webhook delivery, 권한 모델을 분리해서 점검해야 한다

### Medium 4. API 인증과 UI feed 인증은 같은 것으로 보면 안 된다

- 현재 인스턴스에서 work package `atom` 링크는 존재했지만, UI route에 API key Basic 인증으로 접근했을 때는 로그인 페이지가 반환되었다
- RSS/Atom 소비는 API 토큰만으로 충분하지 않을 수 있으므로, 실제 배포 환경에서는 feed token 또는 브라우저 세션 기반 인증 정책을 따로 확인해야 한다

## Material Updates Applied

- CH05 lecture note:
  - GitLab.com 새 private 프로젝트의 기본 protected branch 실측 메모 추가
  - OpenProject linked endpoint / activity write-readback / permission 차이 실측 메모 추가
- CH07 lecture note:
  - GitLab.com shared runner 기본 동작 실측 메모 추가
  - private Pages 접근 제약 실측 메모 추가
  - OpenProject Atom/UI 인증 차이, webhook `200` delivery, linked endpoint permission 실측 메모 추가

## Residual Gaps

- OpenProject와 GitLab의 webhook 기반 실시간 연동은 실제 delivery와 work package activity 반영까지 검증했다
- 다만 OpenProject `Show GitLab content` 계열 권한이 현재 역할에 부여되지 않아 linked GitLab endpoint(`gitlab_merge_requests`, `gitlab_issues`)의 상세 열람까지는 검증하지 못했다
- RSS / Atom feed는 링크 존재와 인증 차이까지는 확인했지만, feed token 또는 세션 기반 정상 소비 경로까지는 검증하지 않았다
- live audit 프로젝트는 temporary project이므로 필요 시 정리 대상이다
