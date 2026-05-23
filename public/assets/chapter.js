const officialSources = {
  roles: ["Roles and permissions", "https://docs.gitlab.com/user/permissions/"],
  mrAuth: ["Merge request workflows", "https://docs.gitlab.com/user/project/merge_requests/authorization_for_merge_requests/"],
  reviews: ["Merge request reviews", "https://docs.gitlab.com/user/project/merge_requests/reviews/"],
  approvals: ["Merge request approvals", "https://docs.gitlab.com/user/project/merge_requests/approvals/"],
  protectedBranches: ["Protected branches", "https://docs.gitlab.com/user/project/repository/branches/protected/"],
  ciYaml: ["CI/CD YAML reference", "https://docs.gitlab.com/ci/yaml/"]
};

const chapterDetails = {
  ch01: {
    scenario: {
      title: "새 팀원이 첫날 실습 저장소에 들어옵니다",
      body: "빈 GitLab project를 만들고 seed repository를 올립니다. 첫 commit은 Maintainer가 bootstrap으로 처리하고, 이후 Developer는 feature branch와 MR로만 main에 들어갑니다.",
      files: ["README.md", ".gitignore", "public/index.html", "src/permissions.py", "docs/process.md", "docs/system-context.md", "tests/test_permissions.py"],
      roles: ["Owner: project visibility와 member 초대 확인", "Maintainer: seed repo 첫 commit과 보호 정책 확인", "Developer: 이후 feature branch 작업 준비", "Reporter: 저장소 구조와 문서 위치 확인"],
      done: ["origin, main, HEAD, working tree를 한 문장으로 설명", "GitLab 화면에서 Members, Repository, Branches 위치 확인", "첫 commit과 push 결과를 GitLab commit graph에서 확인"]
    },
    handoff: [
      ["Owner", "실습 project 이름, visibility, 초대 범위를 정합니다."],
      ["Maintainer", "seed repo를 올리고 main 보호 여부와 초기 branch 정책을 확인합니다."],
      ["Developer", "bootstrap 이후 feature branch로 작업할 준비를 합니다."],
      ["Reporter", "README와 docs에서 실습 목적과 파일 구조를 읽습니다."]
    ],
    tutorial: [
      {
        title: "환경과 계정 상태를 먼저 봅니다",
        story: "강의 시작 전에 Git과 GitLab 계정이 같은 사람을 가리키는지 확인합니다. 여기서 틀리면 뒤의 commit 작성자와 MR 작성자가 어긋납니다.",
        commands: [
          "git --version",
          "git config --global user.name",
          "git config --global user.email",
          "git config --list --show-origin"
        ],
        gitlab: ["Project > Manage > Members에서 내 role 확인", "Project overview에서 visibility 확인", "Settings > Repository에서 default branch 이름 확인"],
        check: ["터미널의 user.email과 GitLab 계정 이메일이 맞는지 확인", "Guest, Reporter, Developer, Maintainer, Owner 중 내 실습 역할 기록"]
      },
      {
        title: "빈 project와 로컬 폴더를 연결합니다",
        story: "GitLab에서 만든 project는 원격 주소일 뿐입니다. 로컬 작업 폴더와 origin을 연결해야 Git 명령의 방향이 생깁니다.",
        commands: [
          "git clone <project-url> tutorial-collaboration-lab",
          "cd tutorial-collaboration-lab",
          "git remote -v",
          "git branch --show-current",
          "git status"
        ],
        gitlab: ["Code > Clone에서 HTTPS 또는 SSH 주소 복사", "Repository > Branches에서 main 존재 여부 확인"],
        check: ["origin fetch/push 주소가 같은 project를 가리키는지 확인", "현재 branch가 main인지 확인"]
      },
      {
        title: "Maintainer가 seed repository를 첫 commit으로 올립니다",
        story: "뒤 챕터에서 계속 쓸 최소 코드, 문서, 테스트를 한 번에 넣습니다. 실습에서는 이 bootstrap commit만 Maintainer가 main에 올리고, 이후 변경은 MR로만 처리합니다.",
        commands: [
          "git status --short",
          "git add README.md .gitignore public src docs tests",
          "git diff --staged --stat",
          "git commit -m \"ch01: initialize tutorial collaboration seed\"",
          "git push -u origin main"
        ],
        gitlab: ["Repository > Files에서 public, src, docs, tests 폴더 확인", "Repository > Commits에서 첫 commit 메시지 확인", "Settings > Repository에서 main 보호 설정을 이어서 확인"],
        check: ["working tree clean 확인", "GitLab에서 commit 작성자와 push한 branch 확인", "이후 Developer 작업은 feature branch에서 시작한다고 말하기"]
      },
      {
        title: "저장소 지도를 말로 정리합니다",
        story: "이 단계가 지나면 파일 이름을 외우는 것이 아니라, 어디를 고치면 어떤 챕터에서 다시 쓰이는지 설명할 수 있어야 합니다.",
        commands: [
          "git log --oneline --decorate --graph --all",
          "git status",
          "git remote show origin"
        ],
        gitlab: ["Project sidebar에서 Repository, Merge requests, CI/CD, Settings 위치 확인", "Members 화면에서 role이 어디에 표시되는지 확인"],
        check: ["main은 공유 기준선, working tree는 아직 commit 전 변경 위치라고 설명", "docs, src, tests가 이후 챕터에서 각각 어떤 역할을 맡는지 설명"]
      }
    ],
    policy: "CH01의 첫 commit은 bootstrap 예외입니다. 이후 실습 정책은 main protected, direct push 금지, MR 기반 변경입니다.",
    takehome: "GitLab 실습은 명령어보다 저장소 지도와 역할 확인에서 시작합니다.",
    recap: ["권한이 막히면 먼저 내 role과 project 설정을 봅니다.", "첫 commit은 뒤 챕터의 공통 실습 재료입니다.", "main, origin, HEAD, working tree의 위치를 모르면 push와 MR 판단이 흔들립니다."],
    sources: [officialSources.roles, officialSources.protectedBranches]
  },
  ch02: {
    scenario: {
      title: "작은 문서 변경을 commit 단위로 나눕니다",
      body: "CH01 seed repo 위에 notes와 tutorial guide를 추가합니다. 목적은 status, diff, add, commit, push가 각각 무엇을 바꾸는지 손으로 확인하는 것입니다.",
      files: ["notes.txt", "docs/tutorial-guide.md", "README.md", "docs/process.md", "public/index.html", "src/permissions.py"],
      roles: ["Developer: 작은 변경을 branch에 올림", "Reviewer: diff가 리뷰 가능한 크기인지 확인", "Maintainer: main 직접 push 습관이 생기지 않게 확인"],
      done: ["working tree, staging area, commit, remote의 차이 설명", "push 전 diff와 log 확인", "fetch와 pull의 차이 설명"]
    },
    handoff: [
      ["Developer", "작업 전 status, 작업 후 diff, push 전 log를 읽습니다."],
      ["Reviewer", "commit이 리뷰 가능한 단위인지 봅니다."],
      ["Maintainer", "main 보호 흐름을 깨지 않는지 확인합니다."],
      ["Reporter", "변경 목적과 재현 조건을 notes에 남깁니다."]
    ],
    tutorial: [
      {
        title: "작업 branch를 만들고 첫 변경을 봅니다",
        story: "main에 바로 쓰지 않고 feature branch에서 시작합니다. 변경 파일이 생긴 순간 Git은 아직 아무것도 저장하지 않았습니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/ch02-basic-cycle",
          "printf \"training journal\\n\" > notes.txt",
          "git status --short",
          "git diff -- notes.txt"
        ],
        gitlab: ["Repository > Branches에서 아직 새 branch가 보이지 않는 상태 확인", "main이 protected라면 push 대상이 main이 아닌지 확인"],
        check: ["untracked 파일과 modified 파일의 차이 설명", "branch 이름이 작업 목적을 드러내는지 확인"]
      },
      {
        title: "staging area를 명시적으로 씁니다",
        story: "add는 저장이 아니라 다음 commit 후보를 고르는 일입니다. 실수로 올린 파일은 commit 전에 내려놓을 수 있습니다.",
        commands: [
          "git add notes.txt",
          "git diff --staged",
          "git commit -m \"docs: add training journal note\"",
          "mkdir -p docs",
          "printf \"# Tutorial guide\\n\\n- read status before commit\\n\" > docs/tutorial-guide.md",
          "git add docs/tutorial-guide.md",
          "git diff --staged",
          "git restore --staged docs/tutorial-guide.md",
          "git status --short"
        ],
        gitlab: ["아직 push 전이면 GitLab에는 새 commit이 보이지 않는다는 점 확인"],
        check: ["working tree 변경과 staged 변경을 구분", "restore --staged가 파일 내용을 지우지 않는다는 점 확인"]
      },
      {
        title: "commit을 만들고 원격에 올립니다",
        story: "commit은 로컬 이력이고 push는 원격 공유입니다. 두 단계가 분리되어야 리뷰 전 점검이 가능합니다.",
        commands: [
          "git add docs/tutorial-guide.md",
          "git commit -m \"docs: add tutorial guide outline\"",
          "git log --oneline --decorate -5",
          "git push -u origin feature/ch02-basic-cycle"
        ],
        gitlab: ["GitLab에서 새 branch와 commit 2개 확인", "Create merge request 버튼이 보이는지 확인"],
        check: ["push 전후로 로컬 log와 GitLab commit 목록이 맞는지 비교", "MR을 열기 전 commit 메시지가 읽히는지 확인"]
      },
      {
        title: "원격이 앞선 상황을 읽습니다",
        story: "다른 사람이 먼저 push하면 내 로컬 main은 뒤처집니다. pull부터 누르기 전에 fetch로 차이를 봅니다.",
        commands: [
          "git fetch origin",
          "git log --oneline --left-right --graph HEAD...origin/main",
          "git diff HEAD..origin/main --stat",
          "git switch main",
          "git pull --ff-only"
        ],
        gitlab: ["MR diff와 Commits 탭에서 원격 변경 범위 확인"],
        check: ["fetch는 가져오기, pull은 가져온 뒤 현재 branch 반영이라고 설명", "ff-only가 실패하면 왜 자동 병합하지 않는지 설명"]
      }
    ],
    takehome: "좋은 commit은 Git 상태를 읽은 뒤 만들어집니다.",
    recap: ["status는 다음 명령을 고르는 화면입니다.", "add는 commit 후보 선택입니다.", "push 전에는 diff와 log를 먼저 봅니다."],
    sources: [officialSources.roles, officialSources.protectedBranches]
  },
  ch03: {
    scenario: {
      title: "작동하던 권한 로직이 어느 commit에서 깨졌는지 찾습니다",
      body: "작은 정상 변경과 의도적 regression을 섞어 둔 뒤 log, show, bisect, revert를 사용합니다. 공개 이력은 지우지 않고 복구 이력을 남깁니다.",
      files: ["docs/release-notes-draft.md", "tests/test_role_policy.py", "src/permissions.py", "docs/tutorial-guide.md", "notes.txt"],
      roles: ["Developer: 문제 commit을 찾고 복구 MR 작성", "Reviewer: revert diff와 영향 범위 확인", "Maintainer: reset과 revert 사용 지점 구분"],
      done: ["문제 commit을 근거와 함께 지목", "revert commit이 만드는 이력 설명", "공유 branch에서 reset을 피하는 이유 설명"]
    },
    handoff: [
      ["Developer", "테스트 실패를 재현하고 원인 commit을 좁힙니다."],
      ["Reviewer", "복구 MR에서 되돌아가는 줄을 확인합니다."],
      ["Maintainer", "공개 이력 복구 방식을 정합니다."],
      ["Owner", "운영 branch의 이력 보존 원칙을 팀 규칙으로 남깁니다."]
    ],
    tutorial: [
      {
        title: "기준점을 tag로 남깁니다",
        story: "문제가 없던 시점을 이름으로 남기면 bisect와 비교가 쉬워집니다. tag는 강의 중 기준선 역할을 맡습니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git tag v0.1.0",
          "git show v0.1.0 --stat",
          "git log --oneline --decorate -5"
        ],
        gitlab: ["Repository > Tags에서 v0.1.0 확인", "Commits 화면에서 tag가 붙은 commit 확인"],
        check: ["tag가 branch처럼 움직이지 않는 기준점이라는 점 설명"]
      },
      {
        title: "정상 변경과 문제 변경을 구분합니다",
        story: "테스트를 추가하고 정상 commit을 만든 뒤, 같은 파일에 문제를 넣습니다. history inspection은 이 차이를 읽는 연습입니다.",
        commands: [
          "git switch -c feature/ch03-history-lab",
          "mkdir -p tests docs",
          "printf \"# Release notes draft\\n\" > docs/release-notes-draft.md",
          "cat > tests/test_role_policy.py <<'PY'",
          "import unittest",
          "from src.permissions import can_use_sample_action",
          "",
          "class RolePolicyTest(unittest.TestCase):",
          "    def test_owner_and_maintainer_allowed(self):",
          "        self.assertTrue(can_use_sample_action('Owner'))",
          "        self.assertTrue(can_use_sample_action('Maintainer'))",
          "PY",
          "git add docs/release-notes-draft.md tests/test_role_policy.py",
          "git commit -m \"test: add role policy coverage\"",
          "python -m unittest discover -s tests"
        ],
        gitlab: ["MR을 열었다고 가정하고 Commits 탭에서 정상 commit 범위 확인"],
        check: ["테스트 추가 commit과 기능 수정 commit을 분리해야 하는 이유 설명"]
      },
      {
        title: "log와 show로 의심 commit을 읽습니다",
        story: "문제가 보이면 먼저 이력을 읽습니다. reset을 누르기 전에 어떤 commit이 무엇을 바꿨는지 확인합니다.",
        commands: [
          "git log --oneline --graph --decorate --all -12",
          "git show <commit-sha> --stat",
          "git show <commit-sha> -- src/permissions.py",
          "git diff v0.1.0..HEAD -- src/permissions.py"
        ],
        gitlab: ["MR > Changes에서 src/permissions.py 변경만 필터링", "Discussions에 의심 지점과 근거를 남김"],
        check: ["파일 전체가 아니라 문제 줄과 commit 메시지를 함께 봅니다."]
      },
      {
        title: "bisect와 revert로 공개 이력을 복구합니다",
        story: "bisect는 원인 commit을 찾는 도구입니다. 원인을 찾은 뒤 공유 branch에서는 revert로 되돌리는 commit을 만듭니다.",
        commands: [
          "git bisect start",
          "git bisect bad",
          "git bisect good v0.1.0",
          "python -m unittest discover -s tests",
          "git bisect reset",
          "git revert <bad-commit-sha>",
          "python -m unittest discover -s tests",
          "git push -u origin feature/ch03-history-lab"
        ],
        gitlab: ["복구 MR 설명에 bad commit, 재현 명령, revert 결과 기록", "Reviewer는 revert commit의 diff만 따로 확인"],
        check: ["reset은 로컬 정리, revert는 공유 이력 복구라는 차이 설명", "복구 뒤 테스트가 통과하는지 확인"]
      }
    ],
    takehome: "팀 저장소의 복구는 이력을 지우는 일이 아니라 원인과 복구 근거를 남기는 일입니다.",
    recap: ["log는 이력의 목차, show는 commit의 본문입니다.", "bisect는 원인 탐색, revert는 공유 이력 복구입니다.", "공개 branch의 reset은 팀 전체의 기준선을 흔들 수 있습니다."],
    sources: [officialSources.mrAuth, officialSources.approvals]
  },
  ch04: {
    scenario: {
      title: "오래 갈라진 branch를 main과 다시 맞춥니다",
      body: "feature branch 두 개를 만들고 merge와 rebase를 비교합니다. 목적은 그래프 모양보다 협업 비용을 읽는 것입니다.",
      files: ["docs/branch-planning.md", "docs/feature-flags.md", "docs/tutorial-guide.md", "docs/process.md", "src/permissions.py", "tests/test_role_policy.py"],
      roles: ["Developer: branch를 작게 만들고 원격과 자주 맞춤", "Reviewer: 오래 갈라진 branch의 위험 확인", "Maintainer: merge, rebase, squash 정책 결정"],
      done: ["tracking branch와 upstream 설명", "merge와 rebase 결과 그래프 비교", "non-fast-forward 상황에서 fetch 뒤 판단"]
    },
    handoff: [
      ["Developer", "작업 branch를 작게 유지하고 origin/main과 자주 비교합니다."],
      ["Reviewer", "diff가 main과 너무 오래 갈라지지 않았는지 확인합니다."],
      ["Maintainer", "팀의 merge 방식과 squash 정책을 정리합니다."],
      ["Owner", "fork model과 shared repository model 중 운영 기준을 고릅니다."]
    ],
    tutorial: [
      {
        title: "feature branch와 upstream을 연결합니다",
        story: "branch는 로컬 이름이고 upstream은 원격 추적 대상입니다. push -u가 이 연결을 만듭니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/branch-playbook",
          "mkdir -p docs",
          "printf \"# Branch planning\\n\\n- keep branches short\\n\" > docs/branch-planning.md",
          "git add docs/branch-planning.md",
          "git commit -m \"docs: add branch planning note\"",
          "git push -u origin feature/branch-playbook",
          "git branch -vv"
        ],
        gitlab: ["Repository > Branches에서 feature/branch-playbook 확인", "MR 생성 화면에서 source와 target branch 확인"],
        check: ["branch -vv 출력에서 upstream이 보이는지 확인"]
      },
      {
        title: "두 번째 branch로 병렬 변경을 만듭니다",
        story: "현실에서는 한 사람이 하나의 branch만 쓰지 않습니다. 병렬 branch가 생기면 main과의 거리와 충돌 가능성이 생깁니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/feature-flags",
          "mkdir -p src",
          "cat > docs/feature-flags.md <<'MD'",
          "# Feature Flags",
          "",
          "| Flag | Default | Owner |",
          "| --- | --- | --- |",
          "| sample_action | off | Maintainer |",
          "MD",
          "git add docs/feature-flags.md",
          "git commit -m \"docs: add feature flag baseline\"",
          "git push -u origin feature/feature-flags"
        ],
        gitlab: ["두 branch의 MR을 나란히 열고 changed files 범위 비교"],
        check: ["새 파일 추가와 기존 파일 수정의 리뷰 난이도 차이 설명"]
      },
      {
        title: "merge와 rebase를 그래프로 비교합니다",
        story: "merge는 갈라진 사실을 남기고, rebase는 내 commit을 새 기준 위에 다시 얹습니다. 팀 정책에 따라 선택합니다.",
        commands: [
          "git fetch origin",
          "git switch feature/branch-playbook",
          "git merge origin/main",
          "git log --oneline --graph --decorate --all -12",
          "git switch feature/feature-flags",
          "git rebase origin/main",
          "git log --oneline --graph --decorate --all -12"
        ],
        gitlab: ["MR Commits 탭에서 commit 순서 비교", "Squash 옵션이 켜져 있는지 확인"],
        check: ["공유된 branch를 rebase할 때 force push가 왜 위험한지 설명"]
      },
      {
        title: "non-fast-forward를 차분히 처리합니다",
        story: "push가 거절되면 권한 문제가 아닐 수 있습니다. 원격이 앞섰는지, 같은 branch에 다른 commit이 들어왔는지 먼저 봅니다.",
        commands: [
          "git push",
          "git fetch origin",
          "git log --oneline --left-right --graph HEAD...@{u}",
          "git pull --ff-only",
          "git push"
        ],
        gitlab: ["MR에서 branch is out of date 메시지 확인", "Update branch 버튼이 있는 경우 동작 조건 확인"],
        check: ["push 실패 원인을 권한, branch 보호, non-fast-forward로 나눠 말합니다."]
      }
    ],
    takehome: "branch 전략은 그래프를 예쁘게 만드는 일이 아니라 리뷰와 충돌 비용을 줄이는 일입니다.",
    recap: ["upstream을 알면 push와 pull의 대상이 보입니다.", "merge와 rebase는 팀 정책과 branch 공유 여부에 따라 고릅니다.", "push 실패는 원인을 먼저 분류합니다."],
    sources: [officialSources.protectedBranches, officialSources.mrAuth]
  },
  ch05: {
    scenario: {
      title: "MR이 왜 merge되지 않는지 역할별로 분리합니다",
      body: "MR template, CODEOWNERS, protected branch, approval rule을 한 화면의 흐름으로 묶습니다. 실습 정책은 main protected, Allowed to merge = Maintainers, Allowed to push and merge = No one, required approval과 successful pipeline입니다.",
      files: [".gitlab/merge_request_templates/standard.md", "CODEOWNERS", "docs/review-checklist.md", "docs/branch-planning.md", "docs/feature-flags.md"],
      roles: ["Developer: MR 설명과 테스트 근거 작성", "Reviewer: diff, discussion, pipeline 확인", "Maintainer: approval rule과 protected branch 조건 확인", "Owner: 일상 승인보다 예외와 정책 영향 확인"],
      done: ["MR이 막힌 이유를 approval, discussion, pipeline, protected branch로 구분", "CODEOWNERS가 누구를 부르는지 설명", "merge 권한과 review 책임을 분리"]
    },
    handoff: [
      ["Developer", "branch를 push하고 MR 설명에 변경 이유, 테스트, rollback 기준을 씁니다."],
      ["Reviewer", "approve 전 diff와 discussion, pipeline 결과를 봅니다."],
      ["Maintainer", "merge 조건과 protected branch 정책을 확인합니다."],
      ["Owner", "project/group 권한이 운영 원칙과 맞는지 봅니다."]
    ],
    tutorial: [
      {
        title: "MR template과 체크리스트를 추가합니다",
        story: "MR 설명은 코드 제출 양식이 아니라 변경 판단의 기록입니다. template은 매번 빠지는 항목을 줄입니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/mr-standards",
          "mkdir -p .gitlab/merge_request_templates docs",
          "printf \"## 변경 이유\\n\\n## 테스트\\n\\n## Rollback 기준\\n\" > .gitlab/merge_request_templates/standard.md",
          "printf \"# Review checklist\\n\\n- diff\\n- tests\\n- rollback\\n\" > docs/review-checklist.md",
          "git add .gitlab docs/review-checklist.md",
          "git commit -m \"docs: add merge request standards\"",
          "git push -u origin feature/mr-standards"
        ],
        gitlab: ["새 MR을 열고 template이 표시되는지 확인", "Description에 테스트와 rollback 기준 작성"],
        check: ["MR 설명이 변경 이유, 테스트, 복구 기준을 모두 담는지 확인"]
      },
      {
        title: "CODEOWNERS로 리뷰 호출 기준을 만듭니다",
        story: "CODEOWNERS는 사람을 자동으로 부르는 장치입니다. 승인 규칙과 연결하면 특정 경로의 변경은 지정된 사람이 봅니다.",
        commands: [
          "printf \"docs/ @docs-reviewer\\nsrc/ @app-maintainer\\ntests/ @qa-reviewer\\n\" > CODEOWNERS",
          "git add CODEOWNERS",
          "git commit -m \"docs: define code owners for training paths\"",
          "git push"
        ],
        gitlab: ["MR sidebar에서 reviewer 또는 approval rule 대상 확인", "Changes 탭에서 CODEOWNERS 대상 경로 확인"],
        check: ["CODEOWNERS가 권한을 주는 파일이 아니라 리뷰 요청 기준이라는 점 설명"]
      },
      {
        title: "protected branch와 approval rule을 연결해 봅니다",
        story: "protected branch는 설정값으로 동작합니다. 이 실습은 direct push를 막고 Maintainer만 MR merge할 수 있게 둔 팀 정책을 기준으로 읽습니다.",
        commands: [
          "git status",
          "git log --oneline --decorate -5",
          "git push"
        ],
        gitlab: ["Settings > Repository > Protected branches에서 main의 allowed to merge/push 확인", "Settings > Merge requests > Approval rules에서 승인 조건 확인", "MR widget에서 approvals, discussions, pipeline 상태 확인"],
        check: ["Developer direct push 차단, Reviewer의 approve/request changes 책임, Maintainer merge 가능 여부를 각각 분리해 설명"]
      },
      {
        title: "막힌 MR의 원인을 표로 정리합니다",
        story: "merge 버튼이 비활성화된 이유는 하나가 아닙니다. 일반 comment와 unresolved thread, required approval, pipeline, protected branch를 따로 봅니다.",
        commands: [
          "git fetch origin",
          "git log --oneline --left-right --graph HEAD...origin/main",
          "git diff origin/main...HEAD --stat"
        ],
        gitlab: ["MR Overview의 상태 메시지 읽기", "Discussions에서 unresolved 항목 확인", "Pipelines 탭에서 실패 job 확인"],
        check: ["막힌 이유와 다음 담당자를 함께 기록", "unresolved thread가 merge block 신호인지 확인", "권한 문제가 아닌 실패를 권한 요청으로 풀지 않도록 구분"]
      }
    ],
    policy: "Required approval은 GitLab tier와 project 설정에 따라 달라집니다. 이 강의는 approval rule이 켜진 팀 운영을 가정하고, Free/basic 흐름에서는 approval을 리뷰 신호로 읽습니다.",
    takehome: "MR은 merge 버튼 앞의 대기실이 아니라 변경 이유, 검토 근거, 운영 조건을 모으는 장소입니다.",
    recap: ["Reviewer는 책임이고 Maintainer는 권한입니다.", "approval, pipeline, discussion, protected branch는 서로 다른 조건입니다.", "권한을 열기 전에 MR 흐름으로 해결 가능한지 먼저 봅니다."],
    sources: [officialSources.roles, officialSources.mrAuth, officialSources.reviews, officialSources.approvals, officialSources.protectedBranches]
  },
  ch06: {
    scenario: {
      title: "두 사람이 같은 의미 영역을 서로 다르게 고칩니다",
      body: "의도적으로 conflict를 만들고 marker를 읽습니다. 최종 목표는 한쪽을 이기는 것이 아니라 두 변경의 의도를 보존하는 파일을 만드는 것입니다.",
      files: ["variants/process-a-rewrite.md", "variants/process-b-rewrite.md", "variants/page-a.html", "variants/page-b.html", "docs/process.md", "public/index.html"],
      roles: ["Developer A/B: 같은 파일의 같은 구간 수정", "Reviewer: conflict 해결 후 의미가 보존됐는지 확인", "Maintainer: merge 후 문제 발생 시 revert 또는 hotfix 판단"],
      done: ["conflict marker에서 ours/theirs 구분", "해결 뒤 테스트 재실행", "리뷰 코멘트 반영 commit을 같은 MR에 push"]
    },
    handoff: [
      ["Developer A", "process-a와 app-a 기준으로 먼저 MR을 올립니다."],
      ["Developer B", "process-b와 app-b 기준으로 뒤늦게 sync하며 conflict를 만납니다."],
      ["Reviewer", "해결 파일이 A/B 의도를 모두 반영했는지 봅니다."],
      ["Maintainer", "merge 후 문제가 보이면 revert와 hotfix 중 하나를 고릅니다."]
    ],
    tutorial: [
      {
        title: "Developer A의 변경을 먼저 올립니다",
        story: "첫 번째 변경은 문제 없이 MR로 올라갑니다. 나중 conflict 재현을 위해 A의 의도를 분명히 남깁니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/process-a",
          "cp variants/process-a-rewrite.md docs/process.md",
          "cp variants/page-a.html public/index.html",
          "git diff -- docs/process.md public/index.html",
          "git add docs/process.md public/index.html",
          "git commit -m \"docs: revise process for reviewer handoff\"",
          "git push -u origin feature/process-a"
        ],
        gitlab: ["MR 설명에 A 변경 의도와 확인 방법 작성", "Reviewer는 process 단계 번호가 유지됐는지 확인"],
        check: ["A의 변경이 어떤 문제를 해결하는지 한 문장으로 정리"]
      },
      {
        title: "Developer B의 병렬 변경을 만듭니다",
        story: "B는 같은 의미 영역을 다르게 고칩니다. A가 먼저 merge된 뒤 B branch가 main과 충돌합니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/process-b",
          "cp variants/process-b-rewrite.md docs/process.md",
          "cp variants/page-b.html public/index.html",
          "git add docs/process.md public/index.html",
          "git commit -m \"docs: revise process for maintainer handoff\"",
          "git push -u origin feature/process-b"
        ],
        gitlab: ["A MR을 먼저 merge했다고 가정", "B MR에서 branch out of date 또는 conflict 표시 확인"],
        check: ["두 MR이 같은 파일의 같은 의미 영역을 건드렸는지 확인"]
      },
      {
        title: "conflict marker를 읽고 해결합니다",
        story: "marker는 Git이 포기한 지점입니다. 사람이 최종 의도를 다시 작성해야 합니다.",
        commands: [
          "git fetch origin",
          "git switch feature/process-b",
          "git merge origin/main",
          "git status",
          "git diff --name-only --diff-filter=U",
          "git diff",
          "# docs/process.md와 public/index.html에서 <<<<<<<, =======, >>>>>>> 구간을 정리",
          "git add docs/process.md public/index.html",
          "git commit -m \"docs: resolve process handoff conflict\"",
          "git push"
        ],
        gitlab: ["MR Changes에서 conflict 해결 commit 확인", "Discussions에 어떤 의도를 남겼는지 설명"],
        check: ["ours와 theirs를 현재 branch 기준으로 설명", "marker 문자열이 남아 있지 않은지 확인"]
      },
      {
        title: "의미 conflict와 rollback을 토론합니다",
        story: "문법 conflict가 해결돼도 의미가 틀릴 수 있습니다. reviewer는 최종 파일의 운영 의미를 다시 봅니다.",
        commands: [
          "python -m unittest discover -s tests",
          "git grep -n \"<<<<<<<\\|=======\\|>>>>>>>\"",
          "git log --oneline --decorate -6",
          "git revert <merge-commit-sha>"
        ],
        gitlab: ["Reviewer는 resolved discussion을 다시 확인", "Maintainer는 revert MR 또는 hotfix branch 중 하나를 선택"],
        check: ["충돌 해결 후 테스트 재실행", "revert가 필요한 조건과 hotfix가 필요한 조건을 분리"]
      }
    ],
    takehome: "conflict 해결은 한쪽 선택이 아니라 최종 파일의 의미를 다시 쓰는 일입니다.",
    recap: ["marker를 지우는 것만으로 해결이 끝나지 않습니다.", "해결 뒤 test와 리뷰를 다시 통과해야 합니다.", "문제가 merge 뒤 발견되면 revert와 hotfix 판단이 필요합니다."],
    sources: [officialSources.mrAuth, officialSources.approvals]
  },
  ch07: {
    scenario: {
      title: "pipeline 실패를 코드 문제와 운영 문제로 나눕니다",
      body: ".gitlab-ci.yml을 추가하고 test, build, smoke 단계를 실행합니다. 실패가 났을 때 merge 권한 문제가 아니라 원인 분류 문제로 읽습니다.",
      files: [".gitlab-ci.yml", "scripts/check_docs.py", "scripts/smoke_check.py", "tests/test_role_visibility.py", "public/index.html", "docs/feature-flags.md"],
      roles: ["Developer: job log를 읽고 수정 commit push", "Reviewer: 실패가 리뷰 판단에 미치는 영향 기록", "Maintainer: runner, variable, protected branch 조건 확인"],
      done: ["stage와 job 구분", "첫 유의미 에러 찾기", "runner/variable 문제와 코드 문제 분리"]
    },
    handoff: [
      ["Developer", "로컬에서 test, build, smoke를 먼저 실행합니다."],
      ["Reviewer", "실패가 기능 위험인지 운영 환경 문제인지 코멘트로 남깁니다."],
      ["Maintainer", "runner tag, protected variable, branch rule을 확인합니다."],
      ["Owner", "self-managed 운영 정책과 project CI 설정의 책임 경계를 봅니다."]
    ],
    tutorial: [
      {
        title: "로컬 검증 명령을 먼저 고정합니다",
        story: "CI는 로컬에서 모르는 문제를 처음 발견하는 곳이 아닙니다. 강의에서는 로컬 명령과 pipeline job을 나란히 맞춥니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/ci-quality-gate",
          "python -m unittest discover -s tests",
          "python scripts/check_docs.py",
          "python scripts/smoke_check.py"
        ],
        gitlab: ["아직 pipeline 전이며 로컬 실패를 먼저 정리", "MR 설명에 로컬 실행 결과를 기록"],
        check: ["세 명령 중 어느 단계가 어떤 위험을 잡는지 설명"]
      },
      {
        title: ".gitlab-ci.yml에 stage와 job을 씁니다",
        story: "stage는 순서, job은 실제 작업 단위입니다. 각 job은 실패했을 때 담당자가 달라질 수 있습니다.",
        commands: [
          "cat > .gitlab-ci.yml <<'YAML'",
          "stages: [test, build, smoke, deploy]",
          "test:",
          "  image: python:3.12",
          "  script:",
          "    - python -m unittest discover -s tests",
          "build:",
          "  image: python:3.12",
          "  script:",
          "    - python scripts/check_docs.py",
          "smoke:",
          "  image: python:3.12",
          "  script:",
          "    - python scripts/smoke_check.py",
          "YAML"
        ],
        gitlab: ["CI/CD > Pipelines에서 stage 순서 확인", "각 job log에서 script 줄과 실패 줄 확인"],
        check: ["stage 실패가 뒤 stage를 막는다는 점 설명", "첫 번째 유의미 에러와 마지막 요약 에러를 구분"]
      },
      {
        title: "의도적 실패를 만들어 triage합니다",
        story: "실패를 한 번 만들어 봐야 log 읽는 습관이 생깁니다. feature flag 문서나 process 문구를 잘못 바꿔 smoke 실패를 봅니다.",
        commands: [
          "git diff -- docs/feature-flags.md docs/process.md",
          "python scripts/smoke_check.py",
          "git add .gitlab-ci.yml scripts tests",
          "git commit -m \"ci: add quality gate\"",
          "git push -u origin feature/ci-quality-gate"
        ],
        gitlab: ["Pipelines > failed job > raw log 확인", "MR widget에서 pipeline failure가 merge 조건에 미치는 영향 확인"],
        check: ["코드 수정 담당과 runner 설정 담당을 구분", "권한 요청 전에 log 근거를 남김"]
      },
      {
        title: "Pages와 self-managed 운영 제약을 짧게 비교합니다",
        story: "정적 문서를 Pages로 게시한다고 가정하면 artifact 경로와 branch rule이 중요합니다. self-managed에서는 runner와 image 정책도 같이 봅니다.",
        commands: [
          "cat >> .gitlab-ci.yml <<'YAML'",
          "pages:",
          "  stage: deploy",
          "  script:",
          "    - mkdir -p public",
          "  artifacts:",
          "    paths:",
          "      - public",
          "  rules:",
          "    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'",
          "YAML"
        ],
        gitlab: ["Settings > CI/CD에서 runner 상태 확인", "Settings > CI/CD > Variables에서 protected variable 여부 확인", "Deploy > Pages가 보이는 환경인지 확인"],
        check: ["pipeline 실패를 merge 권한 문제와 분리", "protected variable은 protected branch/tag 조건과 연결된다는 점 확인"]
      }
    ],
    takehome: "pipeline 실패는 버튼을 누를 사람이 아니라 원인을 찾을 사람이 필요한 상태입니다.",
    recap: ["stage는 순서, job은 작업 단위입니다.", "job log의 첫 유의미 에러를 찾습니다.", "runner, image, variable, code 실패를 분리합니다."],
    sources: [officialSources.ciYaml, officialSources.protectedBranches]
  },
  ch08: {
    scenario: {
      title: "issue에서 rollback 판단까지 한 번에 연결합니다",
      body: "지금까지 만든 저장소와 운영 규칙을 사용해 capstone feature를 구현합니다. 마지막에는 우리 팀의 기본 GitLab 운영 규칙을 문장으로 남깁니다.",
      files: ["issues/ISSUE-101-sample-action.md", "src/sample_action.py", "tests/test_sample_action.py", "docs/release-decision-log.md", "public/index.html", "docs/feature-flags.md", ".gitlab-ci.yml"],
      roles: ["Guest: 사용 관점의 증상 제보", "Reporter: issue와 재현 조건 작성", "Developer: branch, commit, MR 작성", "Reviewer: 변경 이유와 rollback 기준 확인", "Maintainer: pipeline과 approval 뒤 merge 판단", "Owner: 예외 정책과 권한 영향 확인"],
      done: ["issue, branch, commit, MR, pipeline, merge, rollback 흐름 연결", "역할별 다음 행동 설명", "팀 운영 규칙 초안 작성"]
    },
    handoff: [
      ["Reporter", "ISSUE-101에 요구와 재현 조건을 정리합니다."],
      ["Developer", "issue 번호가 보이는 branch와 commit으로 구현합니다."],
      ["Reviewer", "MR에서 테스트와 rollback 기준을 확인합니다."],
      ["Maintainer", "pipeline과 approval을 확인한 뒤 merge합니다."],
      ["Owner", "평소 MR 승인자가 아니라 visibility, 권한 완화, emergency bypass 같은 예외만 판단합니다."]
    ],
    tutorial: [
      {
        title: "issue를 branch 이름과 작업 범위로 바꿉니다",
        story: "좋은 branch 이름은 이슈와 연결됩니다. capstone에서는 요구사항 문서에서 구현 범위를 뽑아냅니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git switch -c feature/issue-101-sample-action",
          "mkdir -p issues",
          "cat > issues/ISSUE-101-sample-action.md <<'MD'",
          "# ISSUE-101 Sample action visibility",
          "",
          "- Reporter confirms the button should be visible only to Maintainer and Owner.",
          "- Developer updates src/sample_action.py and tests/test_sample_action.py.",
          "- Reviewer checks test output and rollback trigger.",
          "MD",
          "git status --short"
        ],
        gitlab: ["Issues에서 요구사항, 담당자, label, milestone 확인", "MR 생성 전 branch 이름에 issue 번호가 보이는지 확인"],
        check: ["issue의 요구를 구현 파일, 테스트 파일, 문서 파일로 나눠 적습니다."]
      },
      {
        title: "기능과 테스트를 작은 commit으로 연결합니다",
        story: "구현 파일과 테스트 파일은 같은 MR 안에서 서로를 설명합니다. 기능 flag와 app 연결부까지 함께 확인합니다.",
        commands: [
          "mkdir -p src tests",
          "cat > src/sample_action.py <<'PY'",
          "def visible_to(role):",
          "    return role in {\"Maintainer\", \"Owner\"}",
          "PY",
          "cat > tests/test_sample_action.py <<'PY'",
          "import unittest",
          "from src.sample_action import visible_to",
          "",
          "class SampleActionTest(unittest.TestCase):",
          "    def test_visible_to_operator_roles(self):",
          "        self.assertTrue(visible_to(\"Maintainer\"))",
          "        self.assertTrue(visible_to(\"Owner\"))",
          "        self.assertFalse(visible_to(\"Reporter\"))",
          "PY",
          "git diff -- src/sample_action.py tests/test_sample_action.py",
          "git add src/sample_action.py tests/test_sample_action.py",
          "git commit -m \"feat: add sample action\"",
          "python -m unittest discover -s tests"
        ],
        gitlab: ["MR Changes에서 구현과 테스트가 함께 보이는지 확인", "Commit 메시지가 issue 요구와 연결되는지 확인"],
        check: ["테스트 없는 구현, 구현 없는 테스트가 아닌지 확인"]
      },
      {
        title: "MR template에 운영 판단 재료를 채웁니다",
        story: "capstone MR은 코드만 올리지 않습니다. 리뷰어가 판단할 수 있도록 변경 이유, 테스트, rollback 기준을 채웁니다.",
        commands: [
          "mkdir -p docs",
          "cat > docs/release-decision-log.md <<'MD'",
          "# Release Decision Log",
          "",
          "- approval complete",
          "- pipeline passed",
          "- rollback trigger: wrong role visibility",
          "MD",
          "git add docs/release-decision-log.md public/index.html docs/feature-flags.md",
          "git commit -m \"docs: record release decision for sample action\"",
          "git push -u origin feature/issue-101-sample-action"
        ],
        gitlab: ["MR Description에 issue 링크, 테스트 결과, rollback 기준 입력", "Reviewers와 approvers가 올바른지 확인", "Pipeline이 MR에 붙는지 확인"],
        check: ["MR 설명만 읽어도 merge 판단이 가능한지 확인"]
      },
      {
        title: "merge 이후 문제 상황을 받아 복구 판단을 합니다",
        story: "merge가 끝이 아닙니다. 문제가 보이면 revert와 hotfix 중 어느 길이 더 안전한지 판단합니다.",
        commands: [
          "git switch main",
          "git pull --ff-only",
          "git log --oneline --decorate -8",
          "git revert <merge-commit-sha>",
          "git switch -c hotfix/sample-action-guard",
          "python -m unittest discover -s tests"
        ],
        gitlab: ["Deploy 또는 release note에서 영향 범위 확인", "새 revert MR 또는 hotfix MR을 열고 결정 이유 기록"],
        check: ["revert가 빠른 복구인지, hotfix가 더 안전한지 근거로 선택", "Owner가 예외 정책을 승인해야 하는 경우를 분리"]
      }
    ],
    takehome: "좋은 GitLab 운영은 누가 버튼을 눌렀는지가 아니라 왜 그 순서로 처리했는지가 남는 것입니다.",
    recap: ["issue는 branch와 MR의 출발점입니다.", "MR은 구현, 테스트, 운영 판단을 묶습니다.", "merge 뒤에도 rollback 판단과 기록이 남아야 합니다."],
    policy: "Owner는 모든 MR의 상시 승인자가 아닙니다. capstone에서는 외부 협력자 초대, visibility 변경, approval rule 완화, emergency bypass가 생길 때만 개입합니다.",
    sources: [officialSources.roles, officialSources.mrAuth, officialSources.reviews, officialSources.approvals, officialSources.ciYaml]
  }
};

const labWorkspaces = {
  ch01: {
    tree: ["README.md", ".gitignore", "public/index.html", "src/permissions.py", "docs/process.md", "docs/system-context.md", "tests/test_permissions.py"],
    files: {
      "README.md": {
        why: "처음 저장소에 들어온 사람이 실습 목적과 실행 순서를 확인하는 입구입니다.",
        content: `# GitLab Training Seed

이 저장소는 GitLab 온보딩 실습을 위한 최소 예제입니다.

## 흐름

1. issue로 요구를 정리한다.
2. feature branch에서 변경한다.
3. MR에서 리뷰, pipeline, rollback 기준을 확인한다.`
      },
      ".gitignore": {
        why: "실습 중 생기는 캐시와 임시 파일을 commit에서 제외합니다.",
        content: `__pycache__/
*.pyc
.venv/
dist/
tmp/`
      },
      "src/permissions.py": {
        why: "역할별 허용 여부를 아주 작은 Python 함수로 표현합니다. 문법보다 입력과 출력이 보이는 것이 중요합니다.",
        content: `ALLOWED_SAMPLE_ACTION_ROLES = {"Owner", "Maintainer"}

def can_use_sample_action(role):
    return role in ALLOWED_SAMPLE_ACTION_ROLES

def describe_role(role):
    descriptions = {
        "Owner": "운영 정책과 rollback 승인까지 포함하는 최상위 권한",
        "Maintainer": "저장소 운영과 merge 관리 책임을 가진 권한",
        "Developer": "샘플 기능 구현과 MR 중심 협업 권한",
    }
    return descriptions.get(role, "열람 중심 또는 제한된 권한")`
      },
      "public/index.html": {
        why: "브라우저로 바로 열 수 있는 가장 단순한 결과물입니다. GitLab Pages와도 자연스럽게 연결됩니다.",
        content: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>GitLab Training Seed</title>
</head>
<body>
  <h1>GitLab Training Seed</h1>
  <p>Issue, branch, MR, review, pipeline 흐름을 연습합니다.</p>
</body>
</html>`
      },
      "tests/test_permissions.py": {
        why: "Python 표준 라이브러리 unittest만 사용합니다. 별도 패키지 설치 없이 권한 규칙을 확인할 수 있습니다.",
        content: `import unittest
from src.permissions import can_use_sample_action

class PermissionTest(unittest.TestCase):
    def test_owner_and_maintainer_allowed(self):
        self.assertTrue(can_use_sample_action("Owner"))
        self.assertTrue(can_use_sample_action("Maintainer"))

if __name__ == "__main__":
    unittest.main()`
      },
      "docs/process.md": {
        why: "팀이 issue부터 MR까지 어떤 순서로 움직이는지 쓰는 문서입니다. CH06에서 충돌 재현 기준으로 씁니다.",
        content: `# Shared Process Steps

1. 참가자는 저장소를 열고 현재 상태를 확인한다.
2. 참가자는 변경 요청 항목을 제출한다.
3. 참가자는 가이드 문서를 읽고 필요한 파일을 수정한다.
4. 참가자는 변경 요약을 제출한다.`
      },
      "docs/system-context.md": {
        why: "이 저장소가 어떤 GitLab 정책을 가정하는지 짧게 기록합니다.",
        content: `# System Context

- default branch: main
- policy: protected main, direct push disabled
- merge path: feature branch -> MR -> review -> pipeline -> Maintainer merge`
      }
    }
  },
  ch02: {
    tree: ["notes.txt", "docs/tutorial-guide.md", "README.md", "docs/process.md", "public/index.html", "src/permissions.py"],
    files: {
      "notes.txt": {
        why: "가장 작은 untracked 파일입니다. add, restore --staged, commit의 차이를 보기 좋습니다.",
        content: `training journal

- 현재 branch를 먼저 확인한다.
- status에서 다음 명령을 고른다.
- push 전에는 diff와 log를 확인한다.`
      },
      "docs/tutorial-guide.md": {
        why: "문서 변경 commit을 만들고 MR에서 Reviewer가 읽을 수 있는 범위를 확인합니다.",
        content: `# Tutorial Guide Draft

## Purpose

실습 참여자가 기본 Git / GitLab 흐름을 점검할 때 참고할 안내 문서를 한 페이지로 정리한다.

## Checklist

- 현재 브랜치 확인
- 기본 문서 위치 확인
- 테스트 파일 위치 확인
- 샘플 동작 권한 규칙 확인`
      }
    }
  },
  ch03: {
    tree: ["docs/release-notes-draft.md", "tests/test_role_policy.py", "src/permissions.py", "docs/tutorial-guide.md", "notes.txt"],
    files: {
      "tests/test_role_policy.py": {
        why: "bisect와 revert의 기준이 되는 실패/성공 신호입니다. Python unittest만 사용합니다.",
        content: `import unittest
from src.permissions import can_use_sample_action

class RolePolicyTest(unittest.TestCase):
    def test_owner_and_maintainer_allowed(self):
        self.assertTrue(can_use_sample_action("Owner"))
        self.assertTrue(can_use_sample_action("Maintainer"))

    def test_developer_and_guest_blocked(self):
        self.assertFalse(can_use_sample_action("Developer"))
        self.assertFalse(can_use_sample_action("Guest"))

if __name__ == "__main__":
    unittest.main()`
      },
      "docs/release-notes-draft.md": {
        why: "tag 기준점과 release note 초안을 연결해 history를 읽는 연습에 씁니다.",
        content: `# Release Notes Draft

## v0.1.0

- seed repository initialized
- role policy test baseline added
- recovery practice starts from this checkpoint`
      },
      "src/permissions.py": {
        why: "정상 commit과 regression commit의 차이를 show와 diff로 확인할 파일입니다.",
        content: `def can_use_sample_action(role):
    return role in {"Owner", "Maintainer"}

# regression 예시:
# return True 로 바뀌면 Developer와 Guest 테스트가 실패한다.`
      }
    }
  },
  ch04: {
    tree: ["docs/branch-planning.md", "docs/feature-flags.md", "docs/tutorial-guide.md", "docs/process.md", "tests/test_role_policy.py"],
    files: {
      "docs/branch-planning.md": {
        why: "branch 이름, 수명, force push 기준을 팀 규칙으로 정리합니다.",
        content: `# Branch Planning Memo

## Branch Naming

- feature/sample-action
- fix/tutorial-copy
- docs/process-clarification
- hotfix/action-permission

## Working Rules

- branch는 목적 하나만 담는다.
- branch 수명은 가능한 짧게 유지한다.
- merge 전에 fetch -> branch -vv -> log --graph를 확인한다.
- shared branch에서는 force push를 기본 전략으로 삼지 않는다.`
      },
      "docs/feature-flags.md": {
        why: "JSON 대신 표 형태의 Markdown으로 기능 on/off 기준을 기록합니다.",
        content: `# Feature Flags

| Flag | Default | Owner |
| --- | --- | --- |
| sample_action | off | Maintainer |

## Notes

- 실습 중에는 문서를 수정해 MR diff와 review 흐름을 확인한다.`
      }
    }
  },
  ch05: {
    tree: [".gitlab/merge_request_templates/standard.md", "CODEOWNERS", "docs/review-checklist.md", "docs/branch-planning.md", "docs/feature-flags.md"],
    files: {
      ".gitlab/merge_request_templates/standard.md": {
        why: "MR 작성자가 변경 이유, 테스트, rollback 기준을 빠뜨리지 않게 돕습니다.",
        content: `## 목적

- 이 변경으로 해결하려는 문제를 한 문장으로 적는다.

## 변경 범위

- HTML:
- Docs:
- Python:
- Config:

## 테스트

- [ ] python -m unittest discover -s tests 실행
- [ ] public/index.html 화면 확인
- [ ] 관련 문서 확인

## 배포 영향

- 사용자 영향:
- 롤백 기준:`
      },
      "CODEOWNERS": {
        why: "경로별로 누가 리뷰 신호를 받아야 하는지 GitLab에 알려줍니다.",
        content: `docs/ @docs-reviewer
public/ @ui-reviewer
src/ @python-reviewer
tests/ @qa-reviewer
.gitlab/ @maintainer-team`
      },
      "docs/review-checklist.md": {
        why: "Reviewer가 approve 전 확인할 기준을 문서로 남깁니다.",
        content: `# Review Checklist

- MR 설명에 변경 이유가 있는가
- Markdown/HTML/Python diff가 MR 목적과 맞는가
- python -m unittest discover -s tests 결과가 남아 있는가
- rollback 기준이 실제로 실행 가능한가
- unresolved discussion이 남아 있지 않은가`
      }
    }
  },
  ch06: {
    tree: ["variants/process-a-rewrite.md", "variants/process-b-rewrite.md", "variants/page-a.html", "variants/page-b.html", "docs/process.md", "public/index.html"],
    files: {
      "variants/process-a-rewrite.md": {
        why: "Developer A가 Reviewer handoff를 강조해 고친 버전입니다.",
        content: `# Shared Process Steps

1. 참가자는 저장소를 열고 현재 상태를 확인한다.
2. 참가자는 변경 요청 항목을 제출한 뒤 Reviewer 확인을 받고 다음 단계로 진행한다.
3. 참가자는 가이드 문서를 읽고 필요한 파일을 수정한다.
4. 참가자는 변경 요약을 제출한다.`
      },
      "variants/page-a.html": {
        why: "A가 HTML 안내 문구를 바꾼 버전입니다. 화면 문구 충돌을 이해하기 쉽습니다.",
        content: `<section>
  <h1>Reviewer handoff</h1>
  <p>MR은 Reviewer 확인 뒤 Maintainer에게 넘어갑니다.</p>
</section>`
      },
      "variants/page-b.html": {
        why: "B가 같은 위치를 Maintainer 승인 중심으로 바꾼 버전입니다.",
        content: `<section>
  <h1>Maintainer approval</h1>
  <p>MR은 Maintainer 승인 상태를 확인한 뒤 merge됩니다.</p>
</section>`
      },
      "docs/process.md": {
        why: "merge conflict marker가 들어갔다가 사람이 최종 문장으로 다시 정리할 파일입니다.",
        content: `\u003c\u003c\u003c\u003c\u003c\u003c\u003c HEAD
2. 참가자는 변경 요청 항목을 제출한 뒤 Reviewer 확인을 받고 다음 단계로 진행한다.
\u003d\u003d\u003d\u003d\u003d\u003d\u003d
2. 참가자는 변경 요청 항목을 제출한 뒤 Maintainer 승인 상태를 확인하고 다음 단계로 진행한다.
\u003e\u003e\u003e\u003e\u003e\u003e\u003e origin/main`
      }
    }
  },
  ch07: {
    tree: [".gitlab-ci.yml", "scripts/check_docs.py", "scripts/smoke_check.py", "tests/test_role_visibility.py", "public/index.html", "docs/feature-flags.md"],
    files: {
      ".gitlab-ci.yml": {
        why: "GitLab pipeline이 Python test와 문서 점검을 어떤 순서로 실행하는지 정의합니다.",
        content: `stages:
  - test
  - docs

test_job:
  stage: test
  image: python:3.12
  script:
    - python -m unittest discover -s tests

docs_job:
  stage: docs
  image: python:3.12
  script:
    - python scripts/check_docs.py
    - python scripts/smoke_check.py`
      },
      "scripts/smoke_check.py": {
        why: "테스트가 놓칠 수 있는 문서 구조와 정책 문구를 가볍게 확인합니다.",
        content: `from pathlib import Path

process_doc = Path("docs/process.md").read_text(encoding="utf-8")
feature_doc = Path("docs/feature-flags.md").read_text(encoding="utf-8")

if "1." not in process_doc or "4." not in process_doc:
    raise SystemExit("process steps must keep numbered structure")

if "sample_action" not in feature_doc:
    raise SystemExit("feature flag document must mention sample_action")

print("smoke check passed")`
      },
      "tests/test_role_visibility.py": {
        why: "pipeline에서 역할별 기능 노출 규칙을 빠르게 확인합니다.",
        content: `import unittest
from src.permissions import can_use_sample_action

class RoleVisibilityTest(unittest.TestCase):
    def test_developer_does_not_see_sample_action(self):
        self.assertFalse(can_use_sample_action("Developer"))`
      }
    }
  },
  ch08: {
    tree: ["issues/ISSUE-101-sample-action.md", "src/sample_action.py", "tests/test_sample_action.py", "docs/release-decision-log.md", "public/index.html", "docs/feature-flags.md", ".gitlab-ci.yml"],
    files: {
      "issues/ISSUE-101-sample-action.md": {
        why: "capstone의 출발점입니다. branch 이름, commit 범위, MR 설명이 이 문서에서 나옵니다.",
        content: `# ISSUE-101 Sample Action Visibility

## Background

실습용 저장소에서 역할별 샘플 동작 버튼 노출 여부를 명확히 확인하고 싶다.

## Requirements

- Owner, Maintainer에게만 샘플 동작을 노출한다.
- Developer, Guest는 버튼을 보지 못해야 한다.
- feature flag로 기능 on/off가 가능해야 한다.
- 테스트와 MR evidence가 함께 제출되어야 한다.

## Rollback Trigger

- 권한 없는 역할에 샘플 동작 노출이 확인될 때
- pipeline은 성공했지만 운영 정책과 다른 동작이 확인될 때`
      },
      "src/sample_action.py": {
        why: "요구사항을 실제 동작으로 옮긴 파일입니다. 함수 하나와 dictionary 하나만 씁니다.",
        content: `from src.permissions import can_use_sample_action

def get_sample_action_state(role, feature_flags):
    feature_enabled = feature_flags.get("sample_action", False)
    has_role_access = can_use_sample_action(role)

    return {
        "role": role,
        "feature_enabled": feature_enabled,
        "has_role_access": has_role_access,
        "visible": feature_enabled and has_role_access,
    }`
      },
      "docs/release-decision-log.md": {
        why: "merge 이후 문제가 생겼을 때 revert와 hotfix 판단 근거를 남깁니다.",
        content: `# Release Decision Log

## Merge Criteria

- approval complete
- pipeline passed
- rollback trigger written

## Rollback Decision

- revert: 권한 없는 역할에 버튼이 보일 때
- hotfix: 노출 조건은 맞지만 문구나 표시 위치만 잘못됐을 때`
      }
    }
  }
};

async function loadChapters() {
  const response = await fetch("../../data/chapters.json");
  if (!response.ok) throw new Error("chapters.json load failed");
  return response.json();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items, mapper) {
  return items.map(mapper).join("");
}

function renderBullets(items) {
  if (!items || items.length === 0) return "";
  return `<ul>${renderList(items, (item) => `<li>${escapeHtml(item)}</li>`)}</ul>`;
}

function renderActionCard(title, items) {
  if (!items || items.length === 0) return "";
  return `
    <div class="action-card">
      <strong>${escapeHtml(title)}</strong>
      ${renderBullets(items)}
    </div>
  `;
}

function renderPolicyNote(policy) {
  if (!policy) return "";
  return `
    <div class="policy-note">
      <strong>실습 가정</strong>
      <span>${escapeHtml(policy)}</span>
    </div>
  `;
}

function commandGuide(command) {
  const text = command.trim();
  const guides = [
    [/^git --version$/, "git version 2.45.0", "Git이 설치되어 있고 터미널에서 실행되는지 확인합니다. 버전 숫자보다 명령이 정상 실행되는지가 중요합니다."],
    [/^git config --global user.name$/, "Hong Gil Dong", "commit 작성자 이름을 확인합니다. GitLab 계정과 다르면 MR에서 작성자 추적이 어긋날 수 있습니다."],
    [/^git config --global user.email$/, "hong@example.com", "commit 작성자 이메일을 확인합니다. GitLab 계정 이메일 또는 verified email과 맞춰 둡니다."],
    [/^git config --list --show-origin$/, "file:C:/Users/user/.gitconfig user.name=Hong Gil Dong\nfile:C:/Users/user/.gitconfig user.email=hong@example.com", "설정값이 어느 파일에서 왔는지 봅니다. global, system, local 설정이 섞였을 때 원인을 찾기 좋습니다."],
    [/^git clone /, "Cloning into 'tutorial-collaboration-lab'...\nReceiving objects: 100% (24/24), done.", "GitLab 원격 project를 로컬 폴더로 복제합니다. 이때 origin remote가 자동으로 생깁니다."],
    [/^cd /, "현재 작업 폴더가 실습 저장소로 이동했습니다.", "이후 명령이 어느 저장소에 적용되는지 정합니다. Git 명령 오류의 상당수는 폴더를 잘못 잡아서 생깁니다."],
    [/^git remote -v$/, "origin  https://gitlab.example.com/group/tutorial-collaboration-lab.git (fetch)\norigin  https://gitlab.example.com/group/tutorial-collaboration-lab.git (push)", "로컬 저장소가 어느 GitLab project와 연결되어 있는지 확인합니다."],
    [/^git branch --show-current$/, "main", "현재 branch 이름만 확인합니다. push, commit, merge가 어느 branch에 적용될지 먼저 봅니다."],
    [/^git status --short$/, "?? notes.txt\n?? docs/tutorial-guide.md", "짧은 status입니다. ??는 아직 Git이 추적하지 않는 파일, M은 수정된 파일을 뜻합니다."],
    [/^git status$/, "On branch feature/tutorial\nChanges not staged for commit:\n  modified: docs/process.md\nUntracked files:\n  notes.txt", "working tree와 staging area 상태를 설명합니다. 다음 명령을 고르는 출발점입니다."],
    [/^git diff --staged/, " README.md | 4 ++++\n docs/process.md | 3 +++\n 2 files changed, 7 insertions(+)", "다음 commit에 들어갈 변경만 봅니다. Reviewer가 읽을 diff를 미리 점검하는 단계입니다."],
    [/^git diff( |$)/, "diff --git a/docs/process.md b/docs/process.md\n+2. 참가자는 변경 요청 항목을 제출한 뒤 Reviewer 확인을 받는다.", "아직 commit하지 않은 변경 내용을 줄 단위로 확인합니다."],
    [/^git add /, "staged: 선택한 파일이 다음 commit 후보에 올라갔습니다.", "파일을 저장하는 명령이 아니라 다음 commit에 포함할 변경을 고르는 명령입니다."],
    [/^git restore --staged /, "unstaged: 파일 내용은 그대로 두고 staging area에서만 내렸습니다.", "실수로 add한 파일을 commit 후보에서 빼는 명령입니다. working tree의 실제 내용은 지우지 않습니다."],
    [/^git commit -m /, "[feature/tutorial 3f2a91b] commit created\n 2 files changed, 12 insertions(+)", "staged 변경을 하나의 로컬 이력으로 묶습니다. 메시지는 MR에서 리뷰어가 처음 읽는 맥락입니다."],
    [/^git push -u /, "remote: Create merge request for feature/tutorial\nbranch 'feature/tutorial' set up to track 'origin/feature/tutorial'.", "-u는 이 로컬 branch와 원격 branch의 추적 관계를 만듭니다. 이후 push/pull 대상이 명확해집니다."],
    [/^git push$/, "Everything up-to-date", "현재 branch의 commit을 upstream에 보냅니다. 실패하면 권한, protected branch, non-fast-forward를 나눠 봅니다."],
    [/^git fetch /, "From gitlab.example.com:group/tutorial\n   a12b3c4..d56e7f8  main -> origin/main", "원격 변경을 가져오지만 현재 working tree에는 반영하지 않습니다. 비교를 먼저 할 수 있습니다."],
    [/^git pull --ff-only$/, "Updating a12b3c4..d56e7f8\nFast-forward", "원격 변경을 현재 branch에 반영하되, 자동 merge commit이 필요한 상황이면 멈춥니다."],
    [/^git switch -c /, "Switched to a new branch 'feature/example'", "새 branch를 만들고 그 branch로 이동합니다. main이 아니라 작업 branch에서 변경을 시작합니다."],
    [/^git switch /, "Switched to branch 'main'", "작업 대상을 다른 branch로 바꿉니다. 이동 전 working tree가 깨끗한지 확인하는 습관이 필요합니다."],
    [/^git log /, "* 3f2a91b (HEAD -> feature/tutorial) docs: add tutorial guide\n* a12b3c4 (origin/main, main) ch01: initialize tutorial collaboration seed", "commit 이력을 시간순으로 읽습니다. graph 옵션은 branch가 어떻게 갈라졌는지 보여줍니다."],
    [/^git show /, "commit 3f2a91b\nAuthor: Hong Gil Dong\n\n docs/process.md | 2 ++", "commit 하나의 메시지와 변경 내용을 펼쳐 봅니다. 문제 commit을 설명할 때 씁니다."],
    [/^git tag /, "tag 'v0.1.0' created at current HEAD", "현재 commit에 이름표를 붙입니다. 문제 없는 기준점을 남길 때 유용합니다."],
    [/^git bisect /, "Bisecting: 2 revisions left to test", "좋은 commit과 나쁜 commit 사이를 반씩 줄이며 원인을 찾습니다."],
    [/^git revert /, "[feature/recovery 9ac2d1e] Revert selected commit", "기존 commit을 지우지 않고 반대 변경을 새 commit으로 남깁니다. 공유 이력 복구에 적합합니다."],
    [/^git merge /, "Auto-merging docs/process.md\nCONFLICT (content): Merge conflict in docs/process.md", "두 이력을 합칩니다. 같은 줄을 다르게 고쳤다면 사람이 conflict를 해결해야 합니다."],
    [/^git rebase /, "Successfully rebased and updated refs/heads/feature/example.", "내 commit을 새 기준 위에 다시 쌓습니다. 이미 공유한 branch에서는 신중하게 씁니다."],
    [/^git grep /, "검색 결과 없음", "저장소 안에서 문자열을 찾습니다. conflict marker가 남았는지 확인할 때 유용합니다."],
    [/^python -m unittest discover -s tests$/, "Ran 2 tests in 0.001s\n\nOK", "Python 표준 테스트를 실행합니다. tests 폴더 아래의 테스트 파일을 찾아 역할 규칙을 확인합니다."],
    [/^python scripts\/check_docs\.py$/, "docs check passed", "Markdown과 HTML 파일이 실습 기준을 만족하는지 확인합니다."],
    [/^python scripts\/smoke_check\.py$/, "smoke check passed", "전체 테스트보다 가벼운 운영 전제 확인입니다. 문서 구조나 feature flag 문구 같은 조건을 빠르게 봅니다."],
    [/^mkdir -p /, "directory ready", "필요한 폴더가 없으면 만들고, 이미 있으면 그대로 둡니다. PowerShell에서는 New-Item -ItemType Directory -Force <path>로 바꿀 수 있습니다."],
    [/^printf /, "file content written", "실습용 문구를 파일에 씁니다. PowerShell에서는 Set-Content 또는 @' ... '@ | Set-Content <file> 형식으로 바꿉니다."],
    [/^cp /, "file copied", "강의 자산을 실습 저장소의 대상 경로로 복사합니다. PowerShell에서는 Copy-Item <source> <target>을 씁니다."],
    [/^cat >|^cat >>/, "입력 블록을 파일에 기록합니다.", "here-document로 여러 줄 파일을 한 번에 만듭니다. PowerShell에서는 @' ... '@ | Set-Content <file> 또는 Add-Content로 바꿉니다."]
  ];

  const found = guides.find(([pattern]) => pattern.test(text));
  if (found) return { output: found[1], meaning: found[2] };
  if (text.startsWith("#")) return { output: "터미널에 실행하지 않는 설명 줄입니다.", meaning: "강사가 편집 지점을 알려주기 위해 넣은 주석입니다." };
  if (/^[A-Za-z0-9_.-]+:/.test(text) || text.startsWith("  ") || text === "YAML") {
    return { output: "파일에 들어가는 내용입니다.", meaning: "앞의 cat 명령과 함께 쓰는 설정 본문입니다. 터미널 명령이 아니라 파일 내용으로 읽습니다." };
  }
  return {
    output: "명령이 정상 실행되면 다음 상태로 넘어갑니다.",
    meaning: "이 줄은 실습 흐름 안에서 상태를 바꾸는 명령입니다. 실행 전후로 status, diff, GitLab 화면을 함께 확인합니다."
  };
}

function commandKind(command) {
  const text = command.trim();
  if (text.startsWith("#")) return "note";
  if (/^[A-Za-z0-9_.-]+:/.test(text) || text.startsWith("  ") || text === "YAML" || text === "PY" || text === "MD" || text === "") return "file";
  return "command";
}

function renderCommandRunner(commands, stepIndex) {
  if (!commands || commands.length === 0) return "";
  const firstCommand = commands.find((command) => commandKind(command) === "command") || commands[0];
  const firstGuide = commandGuide(firstCommand);
  return `
    <div class="command-runner" data-step-index="${stepIndex}">
      <div class="command-list" aria-label="명령어 선택">
        ${renderList(commands, (command, commandIndex) => {
          const guide = commandGuide(command);
          const kind = commandKind(command);
          if (kind !== "command") {
            return `
              <div class="command-line command-line-static kind-${kind}">
                <span>${kind === "file" ? "파일 내용" : "설명"}</span>
                <code>${escapeHtml(command || "빈 줄")}</code>
              </div>
            `;
          }
          return `
            <button class="command-line ${command === firstCommand ? "active" : ""}" type="button"
              data-command="${escapeHtml(command)}"
              data-output="${escapeHtml(guide.output)}"
              data-meaning="${escapeHtml(guide.meaning)}"
              aria-current="${command === firstCommand ? "true" : "false"}">
              <code>${escapeHtml(command)}</code>
            </button>
          `;
        })}
      </div>
      <div class="command-detail" aria-live="polite">
        <p class="section-label">예상 출력</p>
        <pre class="command-output"><code>${escapeHtml(firstGuide.output)}</code></pre>
        <p class="section-label">이 명령의 의미</p>
        <p class="command-meaning">${escapeHtml(firstGuide.meaning)}</p>
      </div>
    </div>
  `;
}

function workspaceFor(id, detail) {
  if (labWorkspaces[id]) return labWorkspaces[id];
  const files = Object.fromEntries(
    detail.scenario.files.map((path) => [
      path,
      {
        why: "이 챕터의 실습 흐름에서 직접 확인할 파일입니다.",
        content: `${path}\n\n실습 중 이 파일의 변경 전후를 diff와 MR Changes 화면에서 비교합니다.`
      }
    ])
  );
  return { tree: detail.scenario.files, files };
}

function renderWorkspaceExplorer(workspace) {
  const filePaths = Object.keys(workspace.files);
  const firstPath = filePaths[0];
  const firstFile = workspace.files[firstPath];
  return `
    <article class="chapter-block workspace-lab">
      <div>
        <p class="section-label">실습 파일 탐색</p>
        <h2>파일을 눌러 실제로 다룰 문구를 먼저 봅니다.</h2>
        <p>왼쪽은 이번 장에서 만지는 파일 구조입니다. 파일을 선택하면 내용, 역할, 확인 포인트가 오른쪽에 열립니다.</p>
      </div>
      <div class="workspace-grid">
        <div class="file-tree" aria-label="실습 파일 목록">
          ${renderList(workspace.tree, (path) => {
            const file = workspace.files[path];
            return `
              <button class="file-node ${path === firstPath ? "active" : ""}" type="button"
                data-file-path="${escapeHtml(path)}"
                data-file-why="${escapeHtml(file?.why || "이 경로는 이번 장의 실습 흐름에서 확인합니다.")}"
                data-file-content="${escapeHtml(file?.content || `${path}\n\n이 파일은 GitLab Changes 화면과 로컬 diff에서 확인합니다.`)}"
                aria-current="${path === firstPath ? "true" : "false"}">
                ${escapeHtml(path)}
              </button>
            `;
          })}
        </div>
        <div class="file-preview" aria-live="polite">
          <div class="file-preview-head">
            <strong data-file-title>${escapeHtml(firstPath)}</strong>
            <span data-file-why-target>${escapeHtml(firstFile.why)}</span>
          </div>
          <pre class="file-content"><code data-file-content-target>${escapeHtml(firstFile.content)}</code></pre>
        </div>
      </div>
    </article>
  `;
}

function renderTutorialStep(step, index) {
  return `
    <section class="tutorial-step">
      <div class="step-copy">
        <p class="section-label">Step ${index + 1}</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.story)}</p>
      </div>
      <div class="step-actions">
        ${renderCommandRunner(step.commands, index)}
        ${renderActionCard("GitLab 화면에서 볼 것", step.gitlab)}
        ${renderActionCard("확인 기준", step.check)}
      </div>
    </section>
  `;
}

function renderSourceLinks(sources) {
  if (!sources || sources.length === 0) return "";
  return `
    <div class="source-links" aria-label="공식 문서">
      ${renderList(sources, ([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`)}
    </div>
  `;
}

function hydrateWorkspaceExplorer(root) {
  root.querySelectorAll(".workspace-lab").forEach((workspace) => {
    const title = workspace.querySelector("[data-file-title]");
    const why = workspace.querySelector("[data-file-why-target]");
    const content = workspace.querySelector("[data-file-content-target]");
    workspace.querySelectorAll(".file-node").forEach((button) => {
      button.addEventListener("click", () => {
        workspace.querySelectorAll(".file-node").forEach((node) => {
          const active = node === button;
          node.classList.toggle("active", active);
          node.setAttribute("aria-current", String(active));
        });
        title.textContent = button.dataset.filePath;
        why.textContent = button.dataset.fileWhy;
        content.textContent = button.dataset.fileContent;
      });
    });
  });
}

function hydrateCommandRunners(root) {
  root.querySelectorAll(".command-runner").forEach((runner) => {
    const output = runner.querySelector(".command-output code");
    const meaning = runner.querySelector(".command-meaning");
    runner.querySelectorAll(".command-line").forEach((button) => {
      button.addEventListener("click", () => {
        runner.querySelectorAll(".command-line").forEach((line) => {
          const active = line === button;
          line.classList.toggle("active", active);
          if (line.tagName === "BUTTON") line.setAttribute("aria-current", String(active));
        });
        output.textContent = button.dataset.output;
        meaning.textContent = button.dataset.meaning;
      });
    });
  });
}

async function initChapter() {
  const id = document.body.dataset.chapter;
  const root = document.querySelector("#chapterRoot");
  try {
    const chapters = await loadChapters();
    const chapter = chapters.find((item) => item.id === id);
    const detail = chapterDetails[id];

    if (!chapter || !detail) throw new Error(`chapter not found: ${id}`);

    document.title = `${chapter.number}. ${chapter.title} | GitLab Onboarding`;
    const workspace = workspaceFor(id, detail);

    root.innerHTML = `
      <section class="page-shell chapter-page">
        <a class="breadcrumb" href="../../index.html#chapters">실습 챕터로 돌아가기</a>
        <div class="chapter-hero">
          <aside class="chapter-side">
            <div class="chapter-number">${escapeHtml(chapter.number)}</div>
            <p class="section-label">Chapter ${escapeHtml(chapter.number)}</p>
            <h1>${escapeHtml(chapter.title)}</h1>
            <p class="supporting">${escapeHtml(chapter.focus)}</p>
            ${renderSourceLinks(detail.sources)}
          </aside>
          <div class="chapter-main">
            <article class="chapter-block">
              <p class="section-label">이번 장의 상황</p>
              <h2>${escapeHtml(detail.scenario.title)}</h2>
              <p>${escapeHtml(detail.scenario.body)}</p>
              ${renderPolicyNote(detail.policy)}
              <div class="chapter-brief">
                <div class="brief-item">
                  <strong>사용 파일</strong>
                  <span>${escapeHtml(detail.scenario.files.join(", "))}</span>
                </div>
                <div class="brief-item">
                  <strong>역할</strong>
                  <span>${escapeHtml(detail.scenario.roles.join(" / "))}</span>
                </div>
                <div class="brief-item">
                  <strong>완료 기준</strong>
                  <span>${escapeHtml(detail.scenario.done.join(" / "))}</span>
                </div>
              </div>
            </article>

            ${renderWorkspaceExplorer(workspace)}

            <article class="chapter-block">
              <p class="section-label">역할별 핸드오프</p>
              <h2>같은 작업을 역할별 책임으로 나눕니다.</h2>
              <div class="handoff-grid">
                ${renderList(detail.handoff, ([role, text]) => `
                  <div class="handoff-card">
                    <strong>${escapeHtml(role)}</strong>
                    <span>${escapeHtml(text)}</span>
                  </div>
                `)}
              </div>
            </article>

            <article class="chapter-block">
              <p class="section-label">Hands-on Tutorial</p>
              <h2>터미널과 GitLab 화면을 번갈아 확인합니다.</h2>
              <div class="tutorial-grid">
                ${renderList(detail.tutorial, renderTutorialStep)}
              </div>
            </article>

            <article class="chapter-block">
              <p class="section-label">핵심 정리</p>
              <h2>${escapeHtml(detail.takehome)}</h2>
              <ul class="chapter-list">
                ${renderList(detail.recap, (text) => `<li>${escapeHtml(text)}</li>`)}
              </ul>
            </article>
          </div>
        </div>
      </section>
    `;
    hydrateWorkspaceExplorer(root);
    hydrateCommandRunners(root);
  } catch (error) {
    root.innerHTML = `
      <section class="page-shell chapter-page">
        <a class="breadcrumb" href="../../index.html#chapters">실습 챕터로 돌아가기</a>
        <div class="result-box">
          <span class="result-status status-block">로드 실패</span>
          <p class="result-copy">${escapeHtml(error.message)}</p>
        </div>
      </section>
    `;
  }
}

initChapter();
