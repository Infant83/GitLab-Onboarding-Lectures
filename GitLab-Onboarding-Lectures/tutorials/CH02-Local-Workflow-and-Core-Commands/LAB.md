# CH02 Tutorial Lab

## 목적

CH01에서 만든 seed repo에 가장 기본적인 실습 파일을 추가하고, `status -> diff -> add -> commit -> push` 루프를 반복한다.

## 이번 장에서 새로 추가하는 파일

- `notes.txt`
- `docs/tutorial-guide.md`

## 이전 챕터에서 이어받는 파일

- `README.md`
- `docs/process.md`
- `src/app.txt`
- `src/permissions.js`

## 권장 실습 순서

1. `notes.txt`만 먼저 추가하고 commit한다.
2. `docs/tutorial-guide.md`를 추가하되, 일부만 staging했다가 되돌리는 연습을 한다.
3. `fetch`와 `pull` 차이는 다른 팀원의 commit을 받은 뒤 비교한다.

```bash
git status
git diff
git add notes.txt
git commit -m "docs: add training journal note"
git add docs/tutorial-guide.md
git diff --staged
git restore --staged docs/tutorial-guide.md
```

## 강의 연결 포인트

- `notes.txt`는 CH02의 첫 commit cycle과 잘못 add했을 때 복구 연습에 쓴다.
- `docs/tutorial-guide.md`는 CH04 branch 전략과 CH05 MR 설명 범위 예시에 계속 사용한다.
