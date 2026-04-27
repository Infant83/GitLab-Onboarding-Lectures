# CH03 Execution Prompt

업로드된 `03_History_Inspection_and_Recovery.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH03 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: History Inspection and Recovery
- 권장 분량: 12 slides
- 강의 시간: 약 1시간
- 목적: 진단과 복구 도구 상자를 갖게 한다
- 핵심 축: `log`, `show`, `diff`, `stash`, `tag`, `revert`, `reset`, `bisect`, `reflog`
- 핵심 자산:
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`
  - `src/permissions.js`
  - `docs/tutorial-guide.md`
  - `notes.txt`

## 반드시 반영할 학습 메시지
- 실수는 정상이고 복구 능력이 실력이다.
- 문제를 보면 파일부터 고치지 말고 상태부터 확정한다.
- shared history에서는 `revert`가 기본이고 `reset`은 개인 로컬 정리에 가깝다.
- 좋은 커밋 품질이 좋은 복구를 만든다.

## 반드시 반영할 시작/종료 상태
- 시작 상태:
  - CH02까지의 커밋이 쌓여 있고 `notes.txt`, `docs/tutorial-guide.md`가 이미 존재
- 새로 추가되는 파일:
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`
- 종료 상태:
  - `revert`와 `reset` 차이를 설명할 수 있음
  - `bisect`와 `reflog`의 역할을 말할 수 있음
  - CH04에서 기준점이 되는 이력을 읽을 수 있음

## 슬라이드 구성
1. 실수는 정상, 복구 능력이 실력이다
2. 기본 진단 루틴
3. `diff`, `log`, `show`를 목적별로 구분하기
4. `log --graph`로 흐름 읽기
5. `stash`: 임시 보관이지만 장기 저장소는 아님
6. `tag`: 기준점 고정하기
7. `revert` vs `reset`
8. `reset --soft / --mixed / --hard`
9. `bisect`: 회귀를 반으로 줄여 찾기
10. `reflog`와 detached HEAD
11. 실패 시나리오 decision matrix
12. 장 정리 + CH04 handoff

## 반드시 포함할 명령어 세트
```bash
git status
git branch -vv
git log --oneline --decorate --graph --all -n 20
git show HEAD
git show <sha> --stat
git diff
git stash push -m "wip before hotfix"
git stash list
git stash show -p stash@{0}
git stash pop
git stash branch recover-wip stash@{0}
git tag v0.1.0
git push origin v0.1.0
git revert <sha>
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git bisect start
git bisect good <sha>
git bisect bad
git bisect reset
git reflog -n 20
git switch -c investigate-detached-head
```

## 반드시 강조할 비교 포인트

* `diff`는 아직 commit되지 않은 차이
* `log`는 흐름
* `show`는 특정 커밋
* `revert`는 shared history 보존
* `reset`은 기준점 재작성
* `reflog`는 로컬 이동 이력이지 shared recovery 대체재가 아님

## 출력 시 주의

* CH03는 “문제 생긴 뒤 무슨 명령을 치나”보다 “지금 어떤 상태인가”를 먼저 묻는 장으로 써라.
* `reset --hard`는 강력하지만 마지막 수단으로 가르쳐라.
* `src/permissions.js`와 `tests/role-policy.test.js` 회귀 예시를 bisect에 연결하라.
* 마지막 슬라이드는 CH04의 branch 전략과 “덜 꼬이게 일하는 법”으로 연결하라.

지금 바로 CH03 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH03 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **History Inspection and Recovery**
* 권장 분량: **12 pages**
* 목적: 진단과 복구 도구 상자를 갖게 한다.
* 핵심 축: `log`, `show`, `diff`, `stash`, `tag`, `revert`, `reset`, `bisect`, `reflog`
* 주요 자산: `docs/release-notes-draft.md`, `tests/role-policy.test.js`, `src/permissions.js`, `docs/tutorial-guide.md`, `notes.txt`

---

## Page 1. 실수는 정상, 복구 능력이 실력이다

* **제목**: Git은 실수를 막기보다 추적·복구하게 만든다
* **takeaway**: 중요한 것은 빨리 발견하고, 정확히 원인을 찾고, 안전하게 복구하는 능력이다.
* **포함**

  * 발견 / 진단 / 복구 3단 구조
  * CH02의 좋은 커밋 습관과 연결
* **시각화**

  * 사고 대응 플로우
* **노트**

  * “문제가 생기면 파일부터 고치지 않는다”
* **연결**

  * 기본 진단 루틴으로 이동

## Page 2. 기본 진단 루틴

* **제목**: 문제 발생 시 먼저 실행할 진단 루틴
* **takeaway**: 무슨 명령을 칠까보다 현재 상태를 먼저 확정해야 한다.
* **포함**

  * `git status`
  * `git branch -vv`
  * `git log --oneline --decorate --graph -n 15`
  * `git show --stat HEAD`
  * `git fetch origin`
  * 각 명령이 답해주는 질문
* **시각화**

  * 명령어 ↔ 질문 표
* **노트**

  * 코드 문제 / 이력 문제 / 권한 문제를 구분하는 첫 단서 설명
* **연결**

  * diff/log/show 역할 분리로 이동

## Page 3. `diff`, `log`, `show`

* **제목**: 세 도구를 목적별로 구분해서 쓰기
* **takeaway**: `diff`는 아직 안 쌓인 변화, `log`는 흐름, `show`는 특정 commit이다.
* **포함**

  * 각 명령의 역할
  * 언제 무엇을 먼저 볼지
* **시각화**

  * 3열 비교표
* **노트**

  * 상태에 따라 show부터 볼지 diff부터 볼지 결정하는 기준
* **연결**

  * graph 읽기로 이동

## Page 4. `log --graph` 읽기

* **제목**: 브랜치 흐름과 merge 흔적을 그래프로 읽기
* **takeaway**: 그래프를 읽으면 어디서 갈라졌고 어디서 합쳐졌는지 보인다.
* **포함**

  * 내 branch와 main이 갈라진 지점
  * merge commit 존재 여부
  * 최근 변경 유형 읽기
* **시각화**

  * 예시 그래프 + 읽는 질문 4개
* **노트**

  * `--all`, author filter가 Maintainer에게 중요한 이유
* **연결**

  * stash로 이동

## Page 5. `stash`

* **제목**: stash는 임시 보관함이지 장기 저장소가 아니다
* **takeaway**: 임시 작업은 숨길 수 있지만, 오래 쌓아두면 나중에 더 비싸다.
* **포함**

  * `git stash push -m`
  * `git stash list`
  * `git stash show -p`
  * `git stash pop`
  * `git stash branch`
  * stash vs commit vs branch 선택 기준
* **시각화**

  * 명령 흐름 + 선택 기준 카드
* **노트**

  * 오래된 stash가 conflict를 부르는 이유
* **연결**

  * tag로 기준점 고정하기로 이동

## Page 6. `tag`

* **제목**: 태그는 릴리즈와 기준점을 고정하는 이름표다
* **takeaway**: tag는 “그때 그 상태”를 다시 찾기 쉽게 만든다.
* **포함**

  * `git tag v0.1.0`
  * `git show v0.1.0 --stat`
  * `git push origin v0.1.0`
  * 교육/배포/데모 기준점
* **시각화**

  * commit 위 tag 아이콘
* **노트**

  * annotated vs lightweight 차이는 발표자 노트에서만 짧게
* **연결**

  * revert vs reset 비교로 이동

## Page 7. `revert` vs `reset`

* **제목**: 무엇을 지키고 무엇을 버릴지 결정하기
* **takeaway**: 공유 이력에는 revert, 개인 로컬 정리에는 reset이 기본 프레임이다.
* **포함**

  * 이력 보존 vs 기준점 재작성
  * shared history에서 revert 우선
  * push 전 개인 정리에서 reset 가능
* **시각화**

  * 2열 비교표
* **노트**

  * “공유 이력을 깬다”가 무슨 뜻인지 다른 사람 기준점 관점으로 설명
* **연결**

  * reset 3종 비교로 이동

## Page 8. `reset --soft / --mixed / --hard`

* **제목**: reset 옵션 차이를 상태와 연결해서 이해하기
* **takeaway**: reset은 무엇을 남기고 무엇을 버리는지 정확히 알아야 쓸 수 있다.
* **포함**

  * commit / staging / working tree 변화 표
  * 대표 사용 시나리오
  * `--hard`는 마지막 수단
* **시각화**

  * matrix 표 + 색상 표시
* **노트**

  * 실제로 헷갈리는 “무엇이 남고 사라지는가”를 반복 설명
* **연결**

  * bisect로 이동

## Page 9. `bisect`

* **제목**: 회귀를 반으로 줄여 찾는 방법
* **takeaway**: bisect는 마법이 아니라 이분 탐색이다.
* **포함**

  * `git bisect start`
  * `git bisect bad`
  * `git bisect good <sha>`
  * 반복 판정
  * `git bisect reset`
  * `src/permissions.js` / `tests/role-policy.test.js` 예시
* **시각화**

  * commit range를 반씩 줄이는 그림
* **노트**

  * 테스트 자동화와 좋은 커밋 품질이 bisect 효율을 높임
* **연결**

  * reflog와 detached HEAD로 이동

## Page 10. `reflog`와 detached HEAD

* **제목**: 길을 잃었을 때 보는 로컬 안전망
* **takeaway**: reflog는 내 로컬 이동 기록이고, detached HEAD는 조사에는 유용하지만 작업 상태로는 위험하다.
* **포함**

  * detached HEAD 의미
  * `git switch main`
  * `git switch -c <new-branch>`
  * `git reflog -n 20`
* **시각화**

  * HEAD 포인터 그림
* **노트**

  * reflog는 shared history 복구를 대신하지 않는다는 점 분리
* **연결**

  * 실패 시나리오 decision matrix로 이동

## Page 11. 실패 시나리오 decision matrix

* **제목**: 상황별 복구 도구 빠르게 고르기
* **takeaway**: commit 전, push 전, 공유 후는 서로 다른 복구 전략을 요구한다.
* **포함**

  * commit 전 파손
  * push 전 commit 실수
  * 공유 후 문제 발견
  * stash 과적체
  * reset 후 위치 상실
  * 상태 / 기본 대응 / 피해야 할 행동
* **시각화**

  * 5행 상황표
* **노트**

  * 파일부터 고치지 말고 상태부터 확정하라는 메시지 반복
* **연결**

  * CH04의 branch 전략으로 이동

## Page 12. 장 정리

* **제목**: 이력은 읽고, 복구는 안전하게
* **takeaway**: CH03은 “문제 후 복구”, CH04는 “애초에 덜 꼬이게 일하는 법”이다.
* **포함**

  * `log/show/diff`
  * `stash/tag`
  * `revert/reset`
  * `bisect/reflog`
* **시각화**

  * 도구 상자형 요약
* **노트**

  * 공유 이력에서는 왜 revert가 기본인지 다시 고정
* **연결**

  * “이제 덜 꼬이게 일하는 branch 전략으로 넘어간다.”
