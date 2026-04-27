# CH03 Page-Level Prompt

이 문서는 `CH03-History-Inspection-and-Recovery_lecture-note.md`를 source of truth로 사용하는 CH03 전용 page prompt다.

## 챕터 개요

- 챕터명: `History Inspection and Recovery`
- 권장 분량: `14 pages`
- 목적: 진단과 복구 도구 상자를 익힌다.
- 핵심 축:
  - `diff`, `log`, `show`
  - `stash`
  - `tag`
  - `revert` vs `reset`
  - `reset --soft / --mixed / --hard`
  - `bisect`
  - `reflog`
  - detached HEAD
- 주요 자산:
  - `docs/release-notes-draft.md`
  - `tests/role-policy.test.js`
  - `src/permissions.js`
  - `docs/tutorial-guide.md`
  - `notes.txt`

## CH03 고유 규칙

- CH03는 “문제가 생기면 무슨 명령을 치나”보다 “지금 어떤 상태인가”를 먼저 묻게 만들어야 한다.
- `revert`와 `reset`은 반드시 비교표로 보여 준다.
- `reset --hard`는 강력하지만 마지막 수단으로 가르친다.
- `bisect`는 `src/permissions.js`와 `tests/role-policy.test.js` 회귀 예시로 연결한다.
- `reflog`는 shared history 복구 대체재가 아니라 로컬 이동 기록 안전망으로 설명한다.

## 페이지 구성

### Page 1
- 슬라이드 제목: `이력을 읽고 안전하게 복구하는 방법`
- 페이지 목적: cover + introduction
- 핵심 takeaway: 실수는 정상이며, 복구 능력과 이력 해석 능력이 실전 품질을 좌우한다.
- 반드시 포함할 내용:
  - 챕터 제목
  - 대표 이미지 또는 incident / history visual
  - 발표자명 / 발표부서 / 발표일자
  - preview topic 4개
    - 진단 루틴
    - stash / tag
    - revert vs reset
    - bisect / reflog
- 시각화 방식: cover hero + preview + CH03 강조 미니맵
- 정보 밀도 가이드: cover라도 preview와 발표 정보는 비워 두지 않는다.
- 발표자 보강 포인트: CH02에서 잘 쌓은 이력이 CH03에서 읽기 쉬운 자산이 된다는 점을 강조한다.
- 실습 / 토론 cue: `문제가 생기면 가장 먼저 보는 명령은 무엇인가?`
- 다음 페이지 연결: `먼저 진단 기본 루틴을 고정한다.`

### Page 2
- 슬라이드 제목: `문제가 생기면 먼저 상태부터 확정한다`
- 페이지 목적: 진단 기본 루틴 제시
- 핵심 takeaway: 복구 명령보다 먼저 현재 상태를 확정해야 한다.
- 반드시 포함할 내용:
  - `git status`
  - `git branch -vv`
  - `git log --oneline --decorate --graph -n 15`
  - `git show --stat HEAD`
  - `git fetch origin`
  - 각 명령이 답하는 질문
- 시각화 방식: command-to-question table
- 정보 밀도 가이드: 명령 5개 + 질문 5개
- 발표자 보강 포인트: 코드 문제, 이력 문제, 권한 문제를 첫 단계에서 구분하려는 습관을 설명한다.
- 실습 / 토론 cue: `지금 어느 브랜치인지 모르면 왜 복구가 위험해지는가?`
- 다음 페이지 연결: `이제 diff, log, show를 목적별로 구분한다.`

### Page 3
- 슬라이드 제목: `diff, log, show를 목적별로 구분하기`
- 페이지 목적: 세 도구의 역할 차이를 명확히 한다.
- 핵심 takeaway: `diff`는 아직 쌓이지 않은 차이, `log`는 흐름, `show`는 특정 커밋이다.
- 반드시 포함할 내용:
  - `git diff`
  - `git log --oneline --decorate --graph`
  - `git show HEAD`
  - 어떤 질문에 어떤 명령을 쓰는가
- 시각화 방식: 3열 비교표
- 정보 밀도 가이드: 역할, 질문, 산출물, 대표 사용 시점까지 넣는다.
- 발표자 보강 포인트: 상태에 따라 show부터 볼지 diff부터 볼지 달라진다는 점을 설명한다.
- 실습 / 토론 cue: `최근 커밋이 무엇을 바꿨는지 보고 싶을 때 diff와 show 중 무엇을 먼저 쓰는가?`
- 다음 페이지 연결: `이제 graph를 읽는 감각으로 확장한다.`

### Page 4
- 슬라이드 제목: `log --graph로 branch 흐름 읽기`
- 페이지 목적: merge와 갈라짐을 읽는 방법 설명
- 핵심 takeaway: graph를 읽으면 어디서 갈라졌고 어디서 합쳐졌는지 보인다.
- 반드시 포함할 내용:
  - 내 branch와 main이 갈라진 지점
  - merge commit 존재 여부
  - 최근 변경 유형 읽기
  - `--all`의 의미
- 시각화 방식: example graph + reading questions
- 정보 밀도 가이드: 그래프 예시와 질문 4개 이상
- 발표자 보강 포인트: CH04 branch 전략을 이해하려면 graph를 읽을 줄 알아야 한다고 연결한다.
- 실습 / 토론 cue: `갈라진 지점과 merge 지점을 어떻게 말로 설명할 수 있는가?`
- 다음 페이지 연결: `특정 커밋 하나를 자세히 검토하는 show로 이동한다.`

### Page 5
- 슬라이드 제목: `특정 커밋을 검토할 때 show를 어떻게 읽는가`
- 페이지 목적: 커밋 단위 검토 습관을 가르친다.
- 핵심 takeaway: 좋은 커밋은 `show`로 읽기 쉽고, 나쁜 커밋은 복구 비용이 크다.
- 반드시 포함할 내용:
  - `git show HEAD`
  - `git show <sha> --stat`
  - 검토 질문
    - 어떤 파일을 바꿨는가
    - 변경 규모가 적절한가
    - rollback 단위로 괜찮은가
- 시각화 방식: command block + review question card
- 정보 밀도 가이드: 질문 3개 이상
- 발표자 보강 포인트: review와 recovery 모두 commit 단위 품질에 달려 있다고 설명한다.
- 실습 / 토론 cue: `이 커밋이 revert하기 좋은 단위인지 어떻게 판단하는가?`
- 다음 페이지 연결: `이제 임시 작업을 옮기는 stash를 본다.`

### Page 6
- 슬라이드 제목: `stash는 임시 보관함이지 장기 저장소가 아니다`
- 페이지 목적: stash 사용과 branch 대안을 설명
- 핵심 takeaway: 급히 이동해야 할 때 stash는 유용하지만, 장기 보관은 branch가 더 낫다.
- 반드시 포함할 내용:
  - `git stash push -m "wip before hotfix"`
  - `git stash list`
  - `git stash show -p stash@{0}`
  - `git stash pop`
  - `git stash branch recover-wip stash@{0}`
  - stash vs commit vs branch 선택 기준
- 시각화 방식: stash flow + decision card
- 정보 밀도 가이드: 명령 5개 + 선택 기준 3개 이상
- 발표자 보강 포인트: 오래된 stash가 conflict를 만들기 쉽다는 점을 설명한다.
- 실습 / 토론 cue: `stash 대신 branch가 더 나은 상황은 언제인가?`
- 다음 페이지 연결: `이제 기준점을 고정하는 tag로 이동한다.`

### Page 7
- 슬라이드 제목: `tag는 기준점을 고정하는 이름표다`
- 페이지 목적: tag의 실무 의미 정리
- 핵심 takeaway: tag는 배포, 교육, 데모, rollback 기준점을 다시 찾기 쉽게 만든다.
- 반드시 포함할 내용:
  - `git tag v0.1.0`
  - `git show v0.1.0 --stat`
  - `git push origin v0.1.0`
  - release point와 tag의 관계
- 시각화 방식: commit timeline + tag icon
- 정보 밀도 가이드: tag를 쓰는 이유 3개 이상
- 발표자 보강 포인트: tag를 임의 메모가 아니라 기준점 관리 도구로 설명한다.
- 실습 / 토론 cue: `release 기준점을 tag 없이 관리하면 어떤 문제가 생기는가?`
- 다음 페이지 연결: `이제 revert와 reset을 비교해 복구 전략을 나눈다.`

### Page 8
- 슬라이드 제목: `shared history에는 revert, 개인 정리에는 reset`
- 페이지 목적: revert와 reset의 역할 차이 설명
- 핵심 takeaway: 협업 브랜치에서는 history 보존이 우선이고, 개인 로컬 정리는 reset이 가능하다.
- 반드시 포함할 내용:
  - `git revert <sha>`
  - `git reset --soft HEAD~1`
  - shared history 보존
  - 기준점 재작성
  - 다른 사람 기준점에 미치는 영향
- 시각화 방식: 2열 비교표
- 정보 밀도 가이드: 비교 항목 최소 4개
- 발표자 보강 포인트: “공유 이력을 깬다”는 말을 실제 협업 영향으로 번역해 설명한다.
- 실습 / 토론 cue: `왜 revert가 기본이고 reset이 예외인가?`
- 다음 페이지 연결: `reset 옵션 차이를 상태와 연결해 더 자세히 본다.`

### Page 9
- 슬라이드 제목: `reset --soft / --mixed / --hard를 상태와 연결해 이해하기`
- 페이지 목적: reset 옵션의 결과 차이 설명
- 핵심 takeaway: reset은 commit, staging, working tree 중 무엇을 남기고 무엇을 버리는지 정확히 알고 써야 한다.
- 반드시 포함할 내용:
  - `--soft`
  - `--mixed`
  - `--hard`
  - 각 옵션의 상태 변화
  - 대표 사용 시나리오
- 시각화 방식: state matrix
- 정보 밀도 가이드: 옵션 3개 x 상태 3개 표를 분명히 만든다.
- 발표자 보강 포인트: `--hard`는 마지막 수단이라는 메시지를 강하게 넣는다.
- 실습 / 토론 cue: `commit만 취소하고 staging은 살리고 싶을 때 어떤 옵션을 쓰는가?`
- 다음 페이지 연결: `길을 잃었을 때 보는 reflog와 detached HEAD로 이동한다.`

### Page 10
- 슬라이드 제목: `reflog와 detached HEAD는 길을 잃었을 때의 안전망이다`
- 페이지 목적: local movement trace를 설명한다.
- 핵심 takeaway: reflog는 로컬 이동 기록이고, detached HEAD는 조사에는 유용하지만 장기 작업 상태로는 위험하다.
- 반드시 포함할 내용:
  - detached HEAD 의미
  - `git switch main`
  - `git switch -c investigate-detached-head`
  - `git reflog -n 20`
  - reflog의 한계
- 시각화 방식: HEAD pointer diagram
- 정보 밀도 가이드: detached HEAD와 reflog를 같은 페이지에서 연결하되 역할은 분리해 설명한다.
- 발표자 보강 포인트: reflog는 shared history 복구를 대신하지 않는다는 점을 분명히 한다.
- 실습 / 토론 cue: `reflog가 필요한 대표 상황은 무엇인가?`
- 다음 페이지 연결: `이제 회귀가 어느 커밋에서 시작됐는지 찾는 bisect로 넘어간다.`

### Page 11
- 슬라이드 제목: `bisect는 회귀를 반으로 줄여 찾는 도구다`
- 페이지 목적: bisect의 개념 설명
- 핵심 takeaway: bisect는 마법이 아니라 이분 탐색이며, 좋은 커밋과 테스트가 있어야 빨라진다.
- 반드시 포함할 내용:
  - `git bisect start`
  - `git bisect bad`
  - `git bisect good <sha>`
  - 중간 판정
  - `git bisect reset`
- 시각화 방식: commit range halving diagram
- 정보 밀도 가이드: 단계 5개를 순서대로 보여 준다.
- 발표자 보강 포인트: test 자동화가 bisect 효율을 얼마나 높이는지 설명한다.
- 실습 / 토론 cue: `bisect가 잘 되려면 어떤 커밋 습관이 필요한가?`
- 다음 페이지 연결: `튜토리얼 자산을 이용한 회귀 예시로 구체화한다.`

### Page 12
- 슬라이드 제목: `permissions.js 회귀를 bisect로 좁혀 보기`
- 페이지 목적: tutorial 자산과 bisect를 연결한다.
- 핵심 takeaway: 구체적 테스트와 회귀 예시가 있으면 bisect는 매우 실무적인 도구가 된다.
- 반드시 포함할 내용:
  - `src/permissions.js` 변경
  - `tests/role-policy.test.js` 실패
  - known-good / bad commit 설정
  - bisect 결과 해석
- 시각화 방식: file + test + commit range narrative
- 정보 밀도 가이드: 사례, 명령, 기대 결과를 모두 넣는다.
- 발표자 보강 포인트: CH02의 좋은 commit 품질과 CH03 bisect 속도를 연결한다.
- 실습 / 토론 cue: `테스트가 없으면 bisect가 어떻게 느려지는가?`
- 다음 페이지 연결: `이제 실제로 자주 만나는 실패 시나리오를 한 번에 정리한다.`

### Page 13
- 슬라이드 제목: `상황별 복구 도구를 빠르게 고르는 decision matrix`
- 페이지 목적: failure scenario를 표로 통합
- 핵심 takeaway: commit 전, push 전, 공유 후, stash overload, reset loss는 서로 다른 대응을 요구한다.
- 반드시 포함할 내용:
  - 잘못된 파일 파손
  - stash 과적체
  - detached HEAD
  - reset 후 위치 상실
  - 상태 / 기본 대응 / 피해야 할 행동
- 시각화 방식: 5행 이상 failure matrix
- 정보 밀도 가이드: 상황, 신호, 기본 대응, 금지 행동 4열 이상
- 발표자 보강 포인트: 파일부터 고치지 말고 상태부터 확정하는 원칙을 다시 반복한다.
- 실습 / 토론 cue: `지금 상황이 commit 전인지, push 전인지, 공유 후인지 먼저 답해 보라.`
- 다음 페이지 연결: `마지막으로 CH03 도구 상자를 정리하고 CH04로 넘긴다.`

### Page 14
- 슬라이드 제목: `CH03 요약: 이력은 읽고, 복구는 안전하게`
- 페이지 목적: CH03 정리와 CH04 handoff
- 핵심 takeaway: CH03은 복구 도구 상자를 갖게 만들고, CH04는 애초에 덜 꼬이게 일하는 branch 전략으로 이어진다.
- 반드시 포함할 내용:
  - `diff / log / show`
  - `stash / tag`
  - `revert / reset`
  - `bisect / reflog`
  - CH04 handoff: branch, switch, merge, rebase
- 시각화 방식: toolbox summary
- 정보 밀도 가이드: 도구 5개 이상 묶어서 정리
- 발표자 보강 포인트: shared history에서는 revert가 기본이라는 메시지를 최종 고정한다.
- 실습 / 토론 cue: `지금부터 가장 먼저 습관화할 복구 도구는 무엇인가?`
- 다음 페이지 연결: `다음 장에서는 덜 꼬이게 일하는 branch 전략과 sync 의사결정을 다룬다.`
