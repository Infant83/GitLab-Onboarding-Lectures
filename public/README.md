# GitLab Onboarding Interactive Pages

이 폴더는 기존 `GitLab-Onboarding-Lectures` 강의 패키지를 GitHub Pages로 보여주기 위한 정적 사이트다.

## 로컬 실행

```powershell
cd public
python -m http.server 4173
```

브라우저에서 `http://localhost:4173/`를 연다.

## 배포

repo root의 `.github/workflows/pages.yml`이 이 폴더를 GitHub Pages artifact로 업로드한다. GitHub 저장소 Settings -> Pages에서 Source를 `GitHub Actions`로 선택하면 `main` push 때 배포된다.

예상 URL:

```text
https://infant83.github.io/GitLab-Onboarding-Lectures/
```

## 구조

```text
public/
├─ index.html
├─ chapters/
│  ├─ ch01/
│  └─ ...
├─ assets/
│  ├─ styles.css
│  ├─ app.js
│  └─ chapter.js
├─ data/
│  ├─ chapters.json
│  ├─ roles.json
│  └─ scenarios.json
└─ audits/
   └─ AUDIT_GATES.md
```

## 기준

- 디자인 톤: <https://infant83.github.io/>
- 학습 구조: 역할 선택, 권한 실험, 챕터 실습, MR workflow, audit gate
- 문체: 번역체와 AI식 표현을 줄이고, 실제 강사가 말할 수 있는 행동 중심 한국어
