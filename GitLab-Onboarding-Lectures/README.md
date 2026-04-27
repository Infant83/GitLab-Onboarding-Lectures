# GitLab-Onboarding-Lectures

이 폴더는 Git / GitLab 8챕터 강의의 정리된 작업 루트다. 앞으로의 기준 구조는 `루트 lecture note + tutorials/ + slide_output/`이다.

## 현재 기준 구조

```text
GitLab-Onboarding-Lectures/
├─ README.md
├─ CH01-Course-Foundation-and-Operating-Model_lecture-note.md
├─ CH02-Local-Workflow-and-Core-Commands_lecture-note.md
├─ CH03-History-Inspection-and-Recovery_lecture-note.md
├─ CH04-Branch-Strategy-and-Sync-Decisions_lecture-note.md
├─ CH05-GitLab-Project-Structure-Permissions-and-MR_lecture-note.md
├─ CH06-Team-Collaboration-Conflict-and-Rollback-Lab_lecture-note.md
├─ CH07-CICD-Quality-Gates-and-Self-Managed-Operations_lecture-note.md
├─ CH08-Capstone-Scenario-and-Role-Based-Playbook_lecture-note.md
├─ CH01-Course-Foundation-and-Operating-Model.pptx / .pdf   <- 생성 후 배치
├─ CH02-... .pptx / .pdf                                   <- 생성 후 배치
├─ tutorials/
│  ├─ CH01-Course-Foundation-and-Operating-Model/
│  ├─ CH02-Local-Workflow-and-Core-Commands/
│  └─ ...
├─ slide_output/
│  ├─ CH01-Course-Foundation-and-Operating-Model/
│  ├─ CH02-Local-Workflow-and-Core-Commands/
│  └─ ...
```

## Source of Truth

- 챕터별 lecture note 원본은 기존 `CH??*/upload_pack/CH??_lecture_note.md`에서 승격한 루트 `*_lecture-note.md`
- 실습 자산 원본은 `tutorials/CH??-.../`
- 챕터별 생성 결과, 링크, 리뷰 흔적은 `slide_output/CH??-.../`
- 최종 발표용 `pptx`와 `pdf`는 루트에 모아 둔다

## 슬라이드 제작 원칙

- 챕터 슬라이드는 해당 챕터 lecture note를 기본 source of truth로 삼는다
- 다른 챕터와의 연속성, 용어 일관성, page-level 구성은 8개 lecture note 전체를 함께 참고해 보강한다
- lecture note에 빈틈이 있을 때만 심층 리서치를 사용해 보강한다
- 템플릿은 `skywork-ppt-workflow` 스킬의 `LGD_Template.pptx`를 기본으로 사용한다

## 정리 상태

- `tutorial/`은 모두 `tutorials/`로 이동 완료
- `output/`은 모두 `slide_output/`로 이동 완료
- 루트 lecture note 8종 생성 완료
- 구 chapter-pack과 `_shared`는 제거 완료

## 실습 검증 메모

- 2026-04-11 기준 로컬 연속 실행 audit에서 CH01 seed -> CH08 capstone 흐름을 재검증했다.
- CH06 conflict variant는 CH07 `smoke-check.js`와 모순되지 않도록 수정되었다. 이제 `docs/process.md`의 1~4 단계 구조를 유지한 채 2단계 정책만 충돌시키도록 설계된다.
- 튜토리얼 소스 트리에 섞여 있던 `desktop.ini`는 제거했고, seed repo `.gitignore`에 재발 방지를 추가했다.
- GitLab UI 기반의 실제 MR / approval / protected branch / Pages / Wiki 검증은 로그인 세션 또는 token이 있어야 완결된다. 현재 자료는 로컬 Git 흐름과 GitLab 운영 시나리오 관점에서 정합성을 우선 맞춘 상태다.
