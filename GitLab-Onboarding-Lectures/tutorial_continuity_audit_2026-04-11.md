# Tutorial Continuity Audit 2026-04-11

## Scope

- 대상: `GitLab-Onboarding-Lectures`의 CH01~CH08 lecture note, tutorials, README
- 방식: 로컬 seed repo 기반 연속 실행 + OpenProject 연결 확인 + GitLab 인증 전제 점검
- 기준 날짜: 2026-04-11

## Quality Bar

- CH01 seed에서 시작한 저장소가 CH08 capstone까지 중단 없이 이어져야 한다
- 각 장의 실습 파일이 다음 장의 입력 자산과 모순되지 않아야 한다
- Git / GitLab / 협업 역할 설명이 tutorial과 lecture note 사이에서 drift 없이 이어져야 한다
- 실제 교육 중 자주 터질 운영체제/환경 이슈는 명시적으로 조치가 있어야 한다

## What Was Verified

### OpenProject

- `OPENPROJECT_BASE_URL`은 `https://infant.tailcb5184.ts.net:8443/` 기준으로 확인했다
- API 인증은 정상 동작했고 `whoami`는 `hyun-jung.kim` 계정으로 응답했다
- 프로젝트 목록과 work package 조회가 가능했고, GitLab 연계 링크가 노출되는 work package도 확인했다

### GitLab

- 브라우저 기준 `gitlab.com` 공개 프로필 조회는 가능했다
- 실제 project 생성, MR, approval, protected branch, Pages, Wiki 검증은 로그인 세션 부재로 미완료다
- 따라서 이번 pass는 로컬 Git 흐름 + GitLab 운영 시나리오 정합성에 초점을 맞췄다

### CH01 -> CH08 local chain

- CH01 seed repo 생성, 초기 commit, `origin/main` push
- CH02 로컬 변경 추가와 commit cycle
- CH03 test failure 유도 후 `git revert`
- CH04 branch, merge, rebase 연속 검증
- CH05 MR policy 자산 추가
- CH06 의도적 conflict 발생 및 수동 해결
- CH07 `node --test`, `node scripts/build-site.js`, `node scripts/smoke-check.js`
- CH08 capstone 자산 추가 후 재검증

최종 재검증 임시 저장소:

- `output/tutorial_audit_2026-04-11_r4/workspace/tutorial-collaboration-lab`

## Findings

### High 1. CH06 variant가 CH07 smoke-check를 깨뜨리던 구조 불일치

- 이전 상태에서 `process-a-rewrite.md`, `process-b-rewrite.md`는 2단계 문장만 가진 짧은 조각이었다
- 실습자가 파일 전체를 교체하면 `docs/process.md`의 1~4단계 구조가 사라졌고, CH07 `scripts/smoke-check.js`는 이를 실패로 판단했다
- 실제 로컬 연속 실행에서 이 문제가 재현되었다

조치:

- CH06 variant를 `docs/process.md` 전체 대체본으로 변경했다
- CH06 LAB / CH06 lecture note / CH07 LAB / CH07 lecture note에 “2단계 충돌이 핵심이지만 1,3,4단계 구조는 유지해야 한다”는 규칙을 추가했다

상태:

- 수정 후 CH06 conflict -> CH07 smoke-check -> CH08 capstone 흐름이 로컬에서 통과했다

### High 2. tutorial source tree에 `desktop.ini`가 섞여 있던 Windows 오염

- `tutorials/` 하위 다수 폴더에 `desktop.ini`가 존재했다
- seed repo 복사 후 이 파일들이 commit에 포함될 수 있었고, 일부 환경에서는 `.git/refs` 내부 `desktop.ini`로 이어져 `bad object`/`broken ref`를 유발한다

조치:

- `tutorials/` 하위 `desktop.ini`를 제거했다
- root `.gitignore`를 추가해 `desktop.ini`, `Thumbs.db`를 무시하게 했다
- CH01 seed repo `.gitignore`에 `desktop.ini`를 추가했다
- CH01 tutorial / lecture note에 Windows 전용 troubleshooting을 추가했다

상태:

- source tree 오염은 제거됨
- 다만 실습 PC에서 Windows가 `.git` 내부까지 `desktop.ini`를 생성하는 특수 사례는 여전히 있을 수 있으므로, CH01 문서에 정리 명령을 남겨 두었다

### Medium 1. GitLab 실제 운영 기능 검증은 인증 필요

- 강의 자료는 MR, approval, protected branch, Pages, Wiki, webhook/OpenProject 연계를 다룬다
- 로컬 연속 실행만으로는 GitLab 정책 UI와 권한 enforcement를 끝까지 검증할 수 없다

조치:

- README에 GitLab 로그인 세션 또는 token이 있어야 하는 범위를 명시했다

권고:

- 다음 pass에서 `gitlab.com/Infant83` 계정으로 테스트 프로젝트를 만들고 CH05~CH08의 GitLab 고유 기능을 실제로 확인한다

## Result

- 로컬 기준 CH01~CH08 tutorial chain은 현재 연결성 있게 동작한다
- CH06/CH07의 가장 큰 연속성 결함은 해소됐다
- Windows 환경에서 자주 발생하는 숨김 파일 오염에 대한 조치가 문서화됐다
- GitLab 실제 UI/권한 검증은 별도 인증 pass가 남아 있다
