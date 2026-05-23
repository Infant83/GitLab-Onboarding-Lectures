# CH03 Tutorial Lab

## 목적

이 장에서는 CH01~CH02에서 만든 저장소를 바탕으로 history inspection과 recovery 연습을 한다. 새 파일은 적게 추가하고, 기존 파일에 여러 작은 commit을 쌓아 `show`, `tag`, `revert`, `bisect` 흐름을 연습한다.

## 이번 장에서 새로 추가하는 파일

- `docs/release-notes-draft.md`
- `tests/test_role_policy.py`

## 이전 챕터에서 이어받는 파일

- `src/permissions.py`
- `docs/tutorial-guide.md`
- `notes.txt`

## 권장 실습 시나리오

1. `docs/release-notes-draft.md`를 추가하고 tag 연습을 한다.
2. `tests/test_role_policy.py`를 추가한 뒤 `src/permissions.py`를 한 번 정상 수정한다.
3. 같은 파일에 일부러 regression을 넣고 test를 깨뜨린다.
4. `git log`, `git show`, `git revert`, `git bisect`로 원인을 찾는다.

```bash
git tag v0.1.0
git show v0.1.0 --stat
python -m unittest discover -s tests
git revert <bad-commit-sha>
```

## 강의 연결 포인트

- CH04에서는 여기서 쌓인 이력을 바탕으로 branch sync 차이를 읽는다.
- CH07에서는 이 테스트 파일을 pipeline에 포함해 quality gate로 활용한다.
