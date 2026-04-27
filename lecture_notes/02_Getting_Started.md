# 02. 시작 준비: GitLab 프로젝트 만들기와 첫 `clone`

## 이 장의 목표

- 연습용 GitLab 프로젝트를 만들고 로컬 작업 환경과 연결한다.
- `repository`, `origin`, `main`, `working tree`의 관계를 실제로 확인한다.
- `clone -> status -> add -> commit -> push`의 첫 사이클을 정확하게 실행한다.
- 이후 장의 실습이 가능한 최소 웹 프로젝트 뼈대를 만든다.

## 선행 개념

- [01_Why_GitLab_MLOps.md](./01_Why_GitLab_MLOps.md) 에서 교육 흐름과 역할 구조를 이해했다.
- 아직 Git에 익숙하지 않아도 괜찮지만, `repository`, `commit`, `push`라는 단어가 낯설지 않은 상태면 좋다.

## 준비물

- Git이 설치된 PC
- GitLab 계정
- 텍스트 편집기 또는 IDE
- 웹 브라우저
- 팀 실습인 경우 프로젝트 생성 권한이 있는 사람 한 명

## 이 장의 핵심 개념

이 장에서 반드시 머릿속에 넣어야 할 구조는 아래 하나다.

```text
GitLab project (remote repository)
        ^
        | push / fetch / pull
        v
local repository (.git)
        ^
        | add / commit
        v
working tree (내가 지금 수정하는 파일)
```

즉, 내가 파일을 저장했다고 GitLab이 바로 바뀌는 것은 아니다. 로컬 파일 수정, staging, commit, push는 각각 다른 단계다.

## 실습 시나리오

이번 장에서는 `오늘의 팀 간식 추천기`라는 연습용 프로젝트를 새로 만든다. 목표는 완성된 앱이 아니라 `Git과 GitLab이 처음 연결되는 경험`을 정확하게 만드는 것이다.

### 권장 프로젝트 이름

- 프로젝트 표시 이름: `today-snack-lab`
- 저장소 URL 예시: `https://gitlab.example.com/education/today-snack-lab.git`
- 로컬 폴더 이름: `today-snack-lab`

## 실습 1. GitLab에서 빈 프로젝트 만들기

### UI에서 확인할 항목

- Project name
- Visibility level
- Initialize repository with a README 여부
- Default branch 이름

### 교육용 권장값

- Visibility: 내부 교육 환경 기준에 맞게 `Private` 또는 `Internal`
- Initialize with README: `끄기`
- Default branch: 가능하면 `main`

README를 자동 생성하지 않는 이유는 초보자가 첫 `clone` 이후 실제로 어떤 파일이 생기고 어떤 commit이 생기는지 명확하게 보기 위함이다.

## 실습 2. 로컬에 `clone` 하기

먼저 작업할 부모 폴더로 이동한 뒤 아래 명령을 실행한다.

```bash
git clone <repository-url>
cd today-snack-lab
```

### 명령이 의미하는 것

- `git clone`은 원격 저장소의 내용을 로컬로 복사한다.
- 동시에 `.git` 디렉터리를 만들고, 기본 remote 이름을 보통 `origin`으로 설정한다.
- 원격의 기본 브랜치를 기준으로 로컬 작업 브랜치를 준비한다.

### 바로 확인할 명령

```bash
git remote -v
git branch -vv
git status
```

### 기대 결과

- `git remote -v` 에서 `origin`이 보인다.
- `git branch -vv` 에서 현재 브랜치가 보인다.
- `git status` 는 `nothing to commit, working tree clean` 또는 비슷한 메시지를 보여 준다.

## 실습 3. 최소 웹 프로젝트 뼈대 만들기

아래 3개 파일을 생성한다.

### `index.html`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>오늘의 팀 간식 추천기</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="app">
      <p class="eyebrow">Git / GitLab 실습 프로젝트</p>
      <h1>오늘의 팀 간식 추천기</h1>
      <p id="snack-name">아직 추천 전입니다.</p>
      <p id="snack-reason">버튼을 눌러 오늘의 간식을 받아 보세요.</p>
      <button id="recommend-button" type="button">간식 추천 받기</button>
    </main>
    <script src="./app.js"></script>
  </body>
</html>
```

### `styles.css`

```css
body {
  margin: 0;
  font-family: "Malgun Gothic", sans-serif;
  background: #f7f7f7;
  color: #1f1f1f;
}

.app {
  width: min(680px, calc(100% - 48px));
  margin: 64px auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
}

.eyebrow {
  color: #a50034;
  font-weight: 700;
}

button {
  padding: 12px 18px;
  border: 0;
  border-radius: 999px;
  background: #a50034;
  color: white;
  cursor: pointer;
}
```

### `app.js`

```javascript
const snacks = [
  { name: "초코 쿠키", reason: "짧은 집중 회복이 필요할 때 무난합니다." },
  { name: "견과 믹스", reason: "오래 버텨야 하는 회의 전에는 안정적입니다." },
  { name: "요거트", reason: "가볍게 먹고 다시 일하기 좋습니다." },
];

const nameElement = document.querySelector("#snack-name");
const reasonElement = document.querySelector("#snack-reason");
const buttonElement = document.querySelector("#recommend-button");

buttonElement.addEventListener("click", () => {
  const picked = snacks[Math.floor(Math.random() * snacks.length)];
  nameElement.textContent = picked.name;
  reasonElement.textContent = picked.reason;
});
```

## 실습 4. 브라우저에서 결과 확인하기

### 가장 단순한 확인 방법

- `index.html`을 브라우저에서 연다.
- 버튼을 눌렀을 때 추천 이름과 이유가 바뀌는지 본다.

### 여기서 배우는 점

- Git 작업은 코드 수정으로 끝나지 않는다.
- `commit` 전에 결과를 확인하는 습관이 매우 중요하다.

## 실습 5. 첫 상태 확인

```bash
git status
git diff
```

### 왜 둘 다 보나?

- `status`는 어떤 파일이 바뀌었는지 요약해서 보여 준다.
- `diff`는 실제로 어떤 줄이 달라졌는지 보여 준다.

### 기대 결과

- 새로 만든 3개 파일이 untracked 또는 변경 파일로 보인다.
- diff에서 작성한 내용이 텍스트 차이로 보인다.

## 실습 6. 첫 `add` 와 `commit`

```bash
git add index.html styles.css app.js
git status
git commit -m "Create initial snack recommendation app"
```

### 이 단계의 의미

- `git add` 는 "이 파일들을 다음 commit 후보로 올려두겠다"는 뜻이다.
- `git commit` 은 staging area에 올라간 내용을 하나의 이력으로 남긴다.

### commit 직후 확인

```bash
git log --oneline --decorate --graph -n 3
git show --stat HEAD
```

### 기대 결과

- 방금 만든 commit 하나가 보인다.
- `show --stat` 에서 어떤 파일이 몇 줄 바뀌었는지 확인할 수 있다.

## 실습 7. 원격에 첫 `push`

```bash
git push -u origin main
```

### 왜 `-u`를 붙이나?

- 현재 로컬 브랜치와 원격 브랜치를 tracking 관계로 연결하기 위해서다.
- 이후에는 `git push`, `git pull`만으로도 동작이 쉬워진다.

### push 후 확인

- GitLab UI에서 파일 3개가 보이는지 확인한다.
- Commit 탭 또는 History에서 방금 commit이 보이는지 확인한다.

## `origin` 과 `main` 을 어떻게 이해해야 하나?

- `origin`: 내 로컬 저장소가 기본적으로 연결된 원격 저장소 이름
- `main`: 기본 작업 브랜치 이름인 경우가 많음
- `origin/main`: 원격 저장소의 기본 브랜치 상태를 가리키는 참조

초보자는 아래 문장을 정확히 말할 수 있어야 한다.

- "나는 지금 로컬의 `main` 브랜치에서 작업 중이다."
- "그 브랜치는 원격의 `origin/main`과 연결되어 있다."

## 자주 발생하는 오류와 조치

### `git clone` 이 실패합니다

원인 예시:

- URL 오타
- 프로젝트 접근 권한 없음
- 사내 GitLab VPN 또는 네트워크 미연결

조치:

- GitLab UI에서 Clone URL을 다시 복사
- 브라우저 로그인 상태와 프로젝트 권한 확인
- 사내망 또는 VPN 상태 점검

### `git push -u origin main` 이 실패합니다

원인 예시:

- 인증 실패
- 기본 브랜치 이름이 `main`이 아님
- 보호 브랜치 정책으로 direct push가 막힘

조치:

```bash
git branch -vv
git remote -v
```

- 현재 브랜치 이름 확인
- GitLab 프로젝트의 기본 브랜치 이름 확인
- direct push 금지 정책이면 이후 장처럼 feature branch + MR 흐름으로 전환

### 버튼이 동작하지 않습니다

원인 예시:

- `app.js` 경로 오타
- 버튼 `id` 불일치
- 브라우저 캐시 또는 저장 누락

조치:

- `index.html`의 script 경로 확인
- `querySelector` 대상과 HTML `id`가 같은지 확인
- 파일 저장 후 새로고침

## 팀 실습 관점에서 이 장이 중요한 이유

이 장은 혼자 하는 작업 같지만, 사실 이후 협업의 모든 출발점이다.

- 모든 팀원은 동일한 프로젝트를 `clone`할 수 있어야 한다.
- 모든 팀원은 자신의 로컬이 원격과 어떻게 연결되는지 설명할 수 있어야 한다.
- 첫 commit과 첫 push를 제대로 이해해야 이후 branch와 MR도 흔들리지 않는다.

## 결과 확인 체크리스트

- GitLab 프로젝트를 만들었다.
- 로컬에서 `git clone`에 성공했다.
- `git remote -v`에서 `origin`을 확인했다.
- HTML/CSS/JS 최소 프로젝트를 생성했다.
- `git status`, `git diff`, `git add`, `git commit`, `git push`를 실행했다.
- GitLab UI에서 첫 commit과 파일 목록을 확인했다.

## 공식 참고 자료

- Git Book, Getting Started:
  - https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- Git Book, Working with Remotes:
  - https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes
- GitLab Docs, Projects:
  - https://docs.gitlab.com/user/project/

## 다음 장

[03_Daily_Workflow.md](./03_Daily_Workflow.md)에서는 이 프로젝트를 계속 수정하면서 `status`, `diff`, `add`, `commit`, `show`, `log`, `push`, `pull`, `fetch`, `stash`의 관계를 실전 흐름으로 익힌다.
