# CH01 Tutorial Lab

## 목적

이 장의 목표는 GitLab 실습용 seed repository를 만드는 것이다. 이후 챕터는 모두 이 저장소를 이어서 사용한다.

## 이번 장에서 새로 만드는 파일

- `README.md`
- `.gitignore`
- `package.json`
- `public/index.html`
- `src/app.js`
- `src/app.txt`
- `src/permissions.js`
- `docs/process.md`
- `docs/system-context.md`
- `tests/permissions.test.js`

## 진행 방식

1. GitLab에서 빈 프로젝트 `tutorial-collaboration-lab`을 만든다.
2. 이 폴더의 `seed_repo` 내용을 프로젝트 루트에 복사한다.
3. 아래 순서로 첫 commit을 만든다.

```bash
git status
git add README.md .gitignore package.json
git add public src docs tests
git commit -m "ch01: initialize tutorial collaboration seed"
git push -u origin main
```

## 강의 연결 포인트

- CH02에서는 `notes.txt`, `docs/tutorial-guide.md`를 추가해 기본 commit cycle을 연습한다.
- CH03에서는 `src/permissions.js`와 tests를 바탕으로 tag, revert, bisect를 연습한다.
- CH06에서는 `docs/process.md`, `src/app.txt`를 의도적으로 충돌시킨다.
- CH07에서는 이 seed repo 위에 `.gitlab-ci.yml`과 scripts를 올린다.

## 확인 질문

- 왜 CH01에서 seed repo를 너무 크게 만들지 않는가
- 왜 UI, docs, tests를 모두 최소 형태로 같이 두는가
- 이후 챕터가 이 파일들을 어떻게 재사용하는가

## Windows 환경 주의

- 일부 Windows 환경에서는 `desktop.ini`가 작업 폴더나 드물게 `.git` 내부 `refs/` 아래에 생성되어 `bad object refs/desktop.ini`, `broken ref refs/tags/desktop.ini` 같은 오류를 만들 수 있다.
- 작업 트리 루트의 `desktop.ini`는 `.gitignore`로 막았지만, `.git` 내부에 생긴 경우에는 직접 삭제해야 한다.

```powershell
Get-ChildItem -LiteralPath .git -Recurse -Force -Filter desktop.ini | Remove-Item -Force
```

- 이 오류가 보이면 Explorer가 저장소 내부를 열어 둔 상태인지 먼저 확인하고, 위 정리 후 `git status`, `git fsck`로 다시 점검한다.
