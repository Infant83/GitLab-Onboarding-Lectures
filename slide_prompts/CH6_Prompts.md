# CH06 Execution Prompt

업로드된 `06_Team_Collaboration_Conflict_and_Rollback_Lab.md`, `README.md`, `tutorial_alignment_audit.md`를 바탕으로
CH06 슬라이드 초안을 생성하라.

## 챕터 정보
- 챕터명: Team Collaboration, Conflict, and Rollback Lab
- 권장 분량: 13 slides
- 강의 시간: 약 1시간
- 목적: 실제 conflict를 만들고 해결하고 revert까지 경험하게 한다
- 핵심 축: role play, conflict marker, abort, semantic conflict, revert
- 핵심 자산:
  - `docs/process.md`
  - `src/app.txt`
  - `process-a-rewrite.md`
  - `process-b-rewrite.md`
  - `app-a.txt`
  - `app-b.txt`

## 반드시 반영할 학습 메시지
- CH06은 명령어 장이 아니라 조별 역할극 기반 협업 실습이다.
- conflict는 실패가 아니라 정상적인 협업 이벤트다.
- marker를 지우는 것만으로 해결되지 않는다.
- shared history에서의 기본 복구는 revert다.

## 권장 조 구성
- Owner 1명
- Maintainer 1명
- Developer A 1명
- Developer B 1명
- 가능하면 Guest 참관 1명 추가

## 시작/종료 상태
- 시작 상태:
  - CH05까지의 저장소와 GitLab 프로젝트 유지
  - MR template, review checklist, `docs/process.md`, `src/app.txt` 이미 존재
- 종료 상태:
  - 최소 1회 실제 conflict 해결
  - 최소 1회 abort 경험
  - 최소 1회 revert 설명 또는 수행
  - CH07에서 pipeline 관점 검증 가능한 merge 상태 확보

## 슬라이드 구성
1. 이 장은 팀 협업 랩이다
2. 시나리오 맵: 어떤 파일이 왜 충돌하도록 설계되었는가
3. Stage 1~3: 병렬 작업 시작과 Developer A의 선행 MR
4. Developer B의 MR과 conflict 발생
5. 해결 전 진단
6. Conflict Marker 읽기
7. Conflict Resolution의 본질
8. 해결 후 검증
9. 너무 복잡하면 중단한다: abort
10. 의미 충돌
11. 공유 이력에서의 복구: revert
12. conflict가 자주 나는 진짜 원인과 예방
13. retrospective + CH07 handoff

## 반드시 포함할 명령어 세트
```bash
git switch main
git pull
git switch -c feature/process-a
git switch -c feature/process-b
git status
git add docs/process.md
git add src/app.txt
git commit -m "docs: clarify shared process"
git push -u origin feature/process-a
git push -u origin feature/process-b
git fetch origin
git branch -vv
git log --oneline --decorate --graph --all -n 20
git merge origin/main
git diff
git diff --staged
git merge --abort
git rebase --abort
git revert <sha>
git push origin main
```

## 반드시 반영할 자산 흐름

* Developer A는 `process-a-rewrite.md`, `app-a.txt`를 반영
* Developer B는 `process-b-rewrite.md`, `app-b.txt`를 반영
* 같은 의미 영역을 다르게 수정해 semantic conflict 가능성을 남김

## 반드시 강조할 포인트

* 줄 충돌과 의미 충돌은 다르다
* `<<<<<<<`, `=======`, `>>>>>>>`는 양쪽 맥락을 읽는 표식이다
* 해결 후 `git diff`, `git diff --staged`, 테스트, MR description 업데이트가 필요하다
* `merge --abort` / `rebase --abort`는 실패가 아니라 안전 복귀다
* rollback은 `reset --hard`가 아니라 `revert` 중심으로 설명

## 출력 시 주의

* CH06은 hands-on 중심으로 써라.
* 슬라이드 본문에도 단계별 명령과 관찰 포인트를 충분히 넣어라.
* Developer / Maintainer / Owner가 각각 무엇을 판단하는지 분명히 드러내라.
* 마지막 슬라이드는 “사람 간 정합성”에서 “자동 검증과 운영 정합성”으로 넘어가며 CH07에 연결하라.

지금 바로 CH06 전체 슬라이드 초안을 생성하라.

## slide_instructions.md 기반 상세 페이지 지시

아래 내용은 `slide_instructions.md`의 CH06 섹션을 그대로 옮긴 page-by-page 상세 지시다.


## 챕터 개요

* 챕터명: **Team Collaboration, Conflict, and Rollback Lab**
* 권장 분량: **13 pages**
* 목적: 실제 conflict를 만들고 해결하고 revert까지 경험하게 한다.
* 핵심 축: role play, conflict marker, abort, semantic conflict, revert
* 주요 자산: `docs/process.md`, `src/app.txt`, `process-a-rewrite.md`, `process-b-rewrite.md`, `app-a.txt`, `app-b.txt`

---

## Page 1. 이 장은 팀 협업 랩이다

* **제목**: 이번 장은 “팀이 함께 GitLab로 일하는 장”이다
* **takeaway**: CH06은 명령어 장이 아니라 조별 역할극 기반 협업 실습이다.
* **포함**

  * Owner 1, Maintainer 1, Developer A/B 구성
  * 병렬 작업 → MR → conflict → merge → revert 흐름
* **시각화**

  * 사람 아이콘 + 흐름도
* **노트**

  * Guest는 참관용으로만 가능
* **연결**

  * 시나리오 파일과 충돌 의도 설명으로 이동

## Page 2. 시나리오 맵

* **제목**: 어떤 파일이 왜 충돌하도록 설계되었는가
* **takeaway**: conflict는 같은 줄보다 같은 의미 영역을 다르게 수정할 때 더 중요해진다.
* **포함**

  * `docs/process.md`
  * `src/app.txt`
  * rewrite / variant 파일들
  * 줄 충돌 vs 의미 충돌
* **시각화**

  * 파일 맵 + 변경 의도 표
* **노트**

  * semantic conflict를 미리 심어두기
* **연결**

  * branch 생성과 Developer A MR 흐름으로 이동

## Page 3. Stage 1~3: 병렬 작업 시작

* **제목**: 두 개의 feature branch와 Developer A의 선행 MR
* **takeaway**: 먼저 merge된 작업이 나중 branch에 conflict를 만들어낸다.
* **포함**

  * A/B 각각 `git switch main`, `git pull`, `git switch -c ...`
  * Developer A 수정/commit/push/MR/리뷰/승인/merge
* **시각화**

  * swimlane diagram
* **노트**

  * A가 먼저 merge돼야 B의 conflict가 의미 있게 발생함
* **연결**

  * Developer B MR과 conflict 발생으로 이동

## Page 4. Developer B MR과 Conflict 발생

* **제목**: GitLab에서 conflict가 드러나는 순간
* **takeaway**: conflict는 실패가 아니라 정상적인 협업 이벤트다.
* **포함**

  * B의 수정 / commit / push / MR
  * GitLab conflict 경고
  * merge 버튼 비활성 가능성
* **시각화**

  * MR 배너 placeholder
* **노트**

  * “충돌이 생겼다 = 팀 작업이 실제로 진행되고 있다”는 프레임
* **연결**

  * 로컬 진단으로 이동

## Page 5. 해결 전 진단

* **제목**: conflict를 보자마자 파일부터 열지 않는다
* **takeaway**: 먼저 이력과 추적 관계를 읽고 충돌의 맥락을 확정한다.
* **포함**

  * `git fetch origin`
  * `git branch -vv`
  * `git log --oneline --decorate --graph --all -n 20`
  * 무엇이 먼저 main에 들어갔는지 읽는 질문
* **시각화**

  * 명령 / 읽는 포인트 / 해결 전 질문 표
* **노트**

  * 줄 충돌인지 요구사항 충돌인지 구분시키기
* **연결**

  * conflict marker anatomy로 이동

## Page 6. Conflict Marker 읽기

* **제목**: `<<<<<<<`, `=======`, `>>>>>>>`를 의미로 읽기
* **takeaway**: marker는 기계적으로 지우는 것이 아니라 양쪽 변경의 맥락을 읽기 위한 표식이다.
* **포함**

  * 각 marker 의미
  * `HEAD`와 `origin/main` 위치
  * 한쪽 선택만이 아니라 재작성 가능
* **시각화**

  * conflict snippet + 해설 callout
* **노트**

  * marker를 지우는 것이 곧 해결은 아니라는 점 강조
* **연결**

  * 해결 원칙으로 이동

## Page 7. Conflict Resolution의 본질

* **제목**: 텍스트 병합이 아니라 요구사항 재결정이다
* **takeaway**: conflict 해결은 코드 편집이 아니라 최종 요구사항을 다시 결정하는 과정이다.
* **포함**

  * Developer: 수정
  * Maintainer: 기준 제시
  * Owner: 운영 영향 판단
  * 새 문장으로 재작성 가능
* **시각화**

  * 역할별 질문 카드
* **노트**

  * 양쪽 변경 중 하나만 살리는 것이 정답이 아닐 수 있음을 설명
* **연결**

  * 해결 후 검증으로 이동

## Page 8. 해결 후 검증

* **제목**: conflict는 합쳤다가 아니라 검증했다까지 가야 끝난다
* **takeaway**: 줄 충돌이 없어져도 기능과 의미가 맞는지 다시 확인해야 한다.
* **포함**

  * `git diff`
  * `git diff --staged`
  * 필요한 테스트
  * MR description 업데이트
* **시각화**

  * 체크리스트형 레이아웃
* **노트**

  * “conflict는 없어졌지만 기능은 깨진 상태”가 남을 수 있음을 강조
* **연결**

  * abort 도구로 이동

## Page 9. 너무 복잡하면 중단한다

* **제목**: `merge --abort`와 `rebase --abort`
* **takeaway**: abort는 실패가 아니라 안전 상태 복귀다.
* **포함**

  * `git merge --abort`
  * `git rebase --abort`
  * 언제 abort를 고려할까
* **시각화**

  * 2열 비교 + 되감기 아이콘
* **노트**

  * 무리하게 해결하다 더 망치기 전에 중단하고 협의하는 것이 성숙한 선택
* **연결**

  * semantic conflict로 이동

## Page 10. 의미 충돌

* **제목**: conflict는 해결됐지만 의미는 틀릴 수 있다
* **takeaway**: 줄 기준 병합과 요구사항 기준 정합성은 다른 문제다.
* **포함**

  * 텍스트 충돌 vs 의미 충돌
  * 리뷰 코멘트 / 이슈 / 상대 MR 설명까지 읽어야 하는 이유
* **시각화**

  * 퍼즐 메타포 2열 비교
* **노트**

  * 문장 하나를 합쳤는데도 정책이 바뀔 수 있는 예시
* **연결**

  * revert로 이동

## Page 11. 공유 이력에서의 복구

* **제목**: 왜 `revert`가 기본 복구 경로인가
* **takeaway**: 공유 이력을 보존하면서 기준점을 회복하는 것이 협업에서 더 안전하다.
* **포함**

  * `git log --oneline`
  * `git revert <sha>`
  * `git push origin main`
  * reset이 기본이 아닌 이유
* **시각화**

  * 안전 복구 흐름도
* **노트**

  * Owner의 승인과 운영 영향 판단 연결
* **연결**

  * conflict의 근본 원인으로 이동

## Page 12. conflict가 자주 나는 진짜 원인

* **제목**: conflict는 개인 실수보다 작업 설계 문제일 때가 많다
* **takeaway**: 오래된 branch, 거친 작업 분해, 긴 MR 수명이 충돌을 키운다.
* **포함**

  * 오래된 branch
  * 같은 파일 동시 수정
  * unrelated changes
  * 요구사항 해석 차이
  * 원인 / 예방 짝지음
* **시각화**

  * 원인 → 예방 화살표 표
* **노트**

  * Maintainer가 merge 순서와 작업 분해를 설계해야 함
* **연결**

  * retrospective로 이동

## Page 13. Retrospective

* **제목**: 역할별로 무엇을 배웠는가
* **takeaway**: conflict 실습은 기술보다 역할별 판단 차이를 드러내는 장이다.
* **포함**

  * Owner / Maintainer / Developer 회고 질문
  * 오늘 산출물: MR 2건, conflict 해결 기록, revert 기록
* **시각화**

  * 역할별 회고 카드
* **노트**

  * 다음 장은 사람 간 정합성에서 자동 검증으로 확장된다고 설명
* **연결**

  * CH07 CI/CD로 이동
