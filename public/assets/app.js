const actionRules = [
  {
    id: "view_repo",
    label: "repository 내용 보기",
    results: {
      guest: ["conditional", "Guest는 project 설정과 visibility에 따라 보이는 범위가 달라집니다.", "필요한 내용이 코드인지, 이슈인지, 문서인지 먼저 확인합니다."],
      reporter: ["allow", "Reporter는 저장소와 pipeline 결과를 읽고 상황을 설명할 수 있습니다.", "읽은 내용을 재현 조건과 함께 정리합니다."],
      developer: ["allow", "Developer는 저장소를 읽고 feature branch에서 작업을 시작할 수 있습니다.", "작업 전 최신 main을 fetch합니다."],
      reviewer: ["conditional", "Reviewer는 접근 권한이 아니라 MR 책임입니다. 실제 열람 가능 여부는 계정 권한을 따릅니다.", "MR diff와 관련 파일을 볼 수 있는지 먼저 확인합니다."],
      maintainer: ["allow", "Maintainer는 project 운영에 필요한 저장소 내용을 볼 수 있습니다.", "설정 변경 전 현재 정책을 확인합니다."],
      owner: ["allow", "Owner는 project/group 범위의 최종 관리 책임을 가집니다.", "열람보다 변경의 영향 범위를 먼저 봅니다."]
    }
  },
  {
    id: "push_feature",
    label: "feature branch에 push",
    results: {
      guest: ["block", "Guest는 코드 변경을 push하는 역할이 아닙니다.", "이슈나 요청 문서로 필요한 변경을 설명합니다."],
      reporter: ["block", "Reporter는 일반적으로 push 권한이 없습니다.", "수정이 필요하면 Developer에게 재현 조건을 넘깁니다."],
      developer: ["allow", "Developer는 non-protected branch에 push하고 MR을 만들 수 있습니다.", "branch 이름과 commit 범위를 작게 유지합니다."],
      reviewer: ["conditional", "Reviewer라는 책임만으로 push 권한이 생기지는 않습니다.", "계정 권한이 Developer 이상인지 확인합니다."],
      maintainer: ["allow", "Maintainer도 feature branch에 push할 수 있습니다.", "운영자는 직접 수정해도 MR 흐름을 남기는 편이 좋습니다."],
      owner: ["allow", "Owner도 push할 수 있지만, 실무 흐름은 역할 분리를 지키는 쪽이 안전합니다.", "필요하면 Maintainer/Developer에게 작업을 위임합니다."]
    }
  },
  {
    id: "push_protected_main",
    label: "protected main에 직접 push",
    results: {
      guest: ["block", "Guest는 protected branch에 push할 수 없습니다.", "권한을 올리기보다 MR 흐름이 맞는지 확인합니다."],
      reporter: ["block", "Reporter는 protected branch에 push할 수 없습니다.", "문제 재현과 영향 설명을 남깁니다."],
      developer: ["block", "Developer는 기본 protected branch 흐름에서 main 직접 push가 막힙니다.", "feature branch로 push하고 MR을 엽니다."],
      reviewer: ["block", "Reviewer 책임만으로 protected branch push 권한이 생기지 않습니다.", "리뷰 코멘트와 승인 기준을 남깁니다."],
      maintainer: ["conditional", "Maintainer도 설정에 따라 push가 막힐 수 있습니다.", "Allowed to push 설정과 emergency 절차를 확인합니다."],
      owner: ["conditional", "Owner라도 protected branch 정책이 우선입니다.", "정책을 바꿀 이유가 있는지 기록하고, 변경 후 원복합니다."]
    }
  },
  {
    id: "create_mr",
    label: "Merge Request 만들기",
    results: {
      guest: ["block", "Guest는 보통 MR을 만드는 역할이 아닙니다.", "이슈로 변경 요청을 남깁니다."],
      reporter: ["conditional", "Reporter는 직접 push가 어려워 MR 흐름이 제한될 수 있습니다.", "fork 허용 여부와 project 정책을 확인합니다."],
      developer: ["allow", "Developer의 기본 협업 경로는 branch push 후 MR 생성입니다.", "MR 설명에 변경 이유, 테스트, rollback 기준을 적습니다."],
      reviewer: ["conditional", "Reviewer도 계정 권한이 있으면 MR을 만들 수 있지만, reviewer 책임과는 별개입니다.", "이번 MR에서 본인이 작성자인지 reviewer인지 구분합니다."],
      maintainer: ["allow", "Maintainer는 MR을 만들 수 있습니다.", "운영 설정 변경도 MR로 남기면 추적하기 쉽습니다."],
      owner: ["allow", "Owner도 MR을 만들 수 있습니다.", "가능하면 구현과 최종 승인을 분리합니다."]
    }
  },
  {
    id: "approve_mr",
    label: "MR 승인",
    results: {
      guest: ["block", "Guest는 MR 승인자로 두기 어렵습니다.", "의견이 있으면 comment로 남깁니다."],
      reporter: ["conditional", "Reporter의 승인 가능 여부는 project와 approval rule에 따라 달라집니다.", "실제 eligible approver인지 확인합니다."],
      developer: ["conditional", "Developer도 reviewer가 될 수 있지만 approval rule의 대상인지 확인합니다.", "자기 MR을 스스로 승인하는 흐름은 피합니다."],
      reviewer: ["conditional", "Reviewer는 MR 책임입니다. approve 가능 여부는 계정 권한과 approval rule을 따릅니다.", "승인 전 diff, test, rollback 기준을 봅니다."],
      maintainer: ["allow", "Maintainer는 일반적으로 승인과 merge 판단을 맡을 수 있습니다.", "승인과 merge가 같은 사람에게 몰리지 않도록 봅니다."],
      owner: ["allow", "Owner도 승인할 수 있지만, 최종 통제권과 코드 리뷰 책임은 구분합니다.", "조직 정책에 맞는 승인자를 세웁니다."]
    }
  },
  {
    id: "merge_mr",
    label: "MR merge",
    results: {
      guest: ["block", "Guest는 MR을 merge하지 않습니다.", "필요한 근거를 comment로 남깁니다."],
      reporter: ["block", "Reporter는 일반적으로 MR merge 권한이 없습니다.", "merge 준비 상태를 정리해 Maintainer에게 넘깁니다."],
      developer: ["conditional", "Developer merge는 protected branch 설정에 따라 달라집니다.", "main이 protected라면 Maintainer merge 흐름을 따릅니다."],
      reviewer: ["conditional", "Reviewer라는 책임은 merge 권한을 뜻하지 않습니다.", "승인과 merge 권한을 분리해서 확인합니다."],
      maintainer: ["allow", "Maintainer는 protected branch flow에서 merge 판단의 중심 역할입니다.", "approval, pipeline, discussion resolve 상태를 확인합니다."],
      owner: ["allow", "Owner도 merge할 수 있지만, 운영상 Maintainer 흐름을 존중하는 편이 좋습니다.", "예외 merge라면 이유를 남깁니다."]
    }
  },
  {
    id: "change_settings",
    label: "approval/protected branch 설정 변경",
    results: {
      guest: ["block", "Guest는 project 설정을 바꾸지 않습니다.", "필요한 정책 변경을 이슈로 요청합니다."],
      reporter: ["block", "Reporter는 project 설정을 바꾸지 않습니다.", "현재 증상과 필요한 정책 변경을 분리해 적습니다."],
      developer: ["block", "Developer는 보통 보호 브랜치와 approval rule을 바꾸지 않습니다.", "설정 문제가 의심되면 Maintainer에게 근거를 넘깁니다."],
      reviewer: ["block", "Reviewer 책임만으로 project 설정을 바꾸지 않습니다.", "리뷰 기준 변경이 필요하면 Maintainer에게 요청합니다."],
      maintainer: ["allow", "Maintainer는 project 운영 설정을 관리합니다.", "변경 이유와 되돌릴 조건을 남깁니다."],
      owner: ["allow", "Owner는 큰 범위의 정책 변경을 승인할 수 있습니다.", "project/group 전체 영향과 권한 남용 위험을 확인합니다."]
    }
  },
  {
    id: "delete_project",
    label: "project 삭제",
    results: {
      guest: ["block", "Guest는 project를 삭제하지 않습니다.", "삭제 요청이 필요하면 근거와 보존 대상부터 정리합니다."],
      reporter: ["block", "Reporter는 project를 삭제하지 않습니다.", "archive가 충분한지 먼저 제안합니다."],
      developer: ["block", "Developer는 project를 삭제하지 않습니다.", "branch 정리나 MR close와 project 삭제를 구분합니다."],
      reviewer: ["block", "Reviewer 책임은 project 삭제와 무관합니다.", "리뷰 대상 범위만 판단합니다."],
      maintainer: ["block", "Maintainer도 보통 project 삭제의 최종 책임자는 아닙니다.", "Owner 승인과 백업 확인이 필요합니다."],
      owner: ["conditional", "Owner는 삭제 권한을 가질 수 있지만 가장 위험한 변경입니다.", "archive, backup, transfer, dependency를 확인한 뒤 진행합니다."]
    }
  }
];

const workflow = [
  ["Issue", "Reporter와 Developer가 요구와 재현 조건을 맞춥니다."],
  ["Branch", "Developer가 작은 feature branch를 만듭니다."],
  ["Commit", "변경 이유가 보이는 commit 단위로 쪼갭니다."],
  ["MR", "Developer가 테스트와 rollback 기준을 적습니다."],
  ["Review", "Reviewer가 diff와 운영 위험을 봅니다."],
  ["Approval", "승인자는 기준 충족 여부를 확인합니다."],
  ["Pipeline", "실패하면 merge보다 원인 확인이 먼저입니다."],
  ["Merge", "Maintainer가 조건을 확인하고 merge합니다."]
];

const learnerChecklist = [
  {
    id: "explain_roles",
    title: "역할 차이를 한 문장으로 설명한다",
    detail: "Guest, Reporter, Developer, Reviewer, Maintainer, Owner의 경계를 말할 수 있다."
  },
  {
    id: "branch_before_push",
    title: "main 대신 feature branch에서 시작한다",
    detail: "protected branch가 막히면 branch를 만들고 MR을 연다."
  },
  {
    id: "read_mr_state",
    title: "MR이 merge되지 않는 이유를 찾는다",
    detail: "approval, unresolved discussion, failed pipeline, protected branch 조건을 따로 본다."
  },
  {
    id: "review_with_reason",
    title: "리뷰 코멘트에 근거를 남긴다",
    detail: "문제 위치, 이유, 제안, 확인할 테스트를 함께 적는다."
  },
  {
    id: "recover_safely",
    title: "공개된 이력은 revert 중심으로 복구한다",
    detail: "reset과 revert의 차이를 알고, 팀 저장소에서는 공개 이력을 함부로 덮지 않는다."
  },
  {
    id: "triage_pipeline",
    title: "pipeline 실패를 merge 권한 문제와 구분한다",
    detail: "실패 로그를 읽고, 코드 수정인지 runner/variable 문제인지 나눈다."
  }
];

const state = {
  role: "developer",
  action: "push_protected_main",
  scenario: "protected-main-push"
};

const $ = (selector) => document.querySelector(selector);

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path} load failed`);
  return response.json();
}

function makeChapterLink(id) {
  return `chapters/${id}/`;
}

function renderRoleSwitcher(roles) {
  const switcher = $("#roleSwitcher");
  const roleSelect = $("#roleSelect");
  switcher.innerHTML = "";
  roleSelect.innerHTML = "";

  roles.forEach((role) => {
    const button = document.createElement("button");
    button.className = "role-button";
    button.type = "button";
    button.textContent = role.label;
    button.dataset.role = role.id;
    button.addEventListener("click", () => setRole(role.id, roles));
    switcher.appendChild(button);

    const option = document.createElement("option");
    option.value = role.id;
    option.textContent = role.label;
    roleSelect.appendChild(option);
  });

  roleSelect.addEventListener("change", (event) => setRole(event.target.value, roles));
}

function renderActions() {
  const actionSelect = $("#actionSelect");
  actionSelect.innerHTML = "";
  actionRules.forEach((action) => {
    const option = document.createElement("option");
    option.value = action.id;
    option.textContent = action.label;
    actionSelect.appendChild(option);
  });
  actionSelect.addEventListener("change", (event) => {
    state.action = event.target.value;
    renderPermission();
  });
}

function setRole(roleId, roles) {
  state.role = roleId;
  $("#roleSelect").value = roleId;
  renderCurrentRole(roles);
  renderPermission();
  renderWorkflow();

  document.querySelectorAll(".role-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === roleId);
  });
}

function renderCurrentRole(roles) {
  const role = roles.find((item) => item.id === state.role);
  if (!role) return;

  $("#currentRoleName").textContent = role.label;
  $("#currentRoleSummary").textContent = role.summary;

  const tags = $("#currentRoleTags");
  tags.innerHTML = "";
  role.habits.forEach((habit) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = habit;
    tags.appendChild(span);
  });
}

function renderPermission() {
  const action = actionRules.find((item) => item.id === state.action);
  if (!action) return;
  $("#actionSelect").value = state.action;

  const [status, message, next] = action.results[state.role];
  const statusLabel = {
    allow: "허용",
    conditional: "조건부",
    block: "차단"
  }[status];

  $("#permissionResult").innerHTML = `
    <span class="result-status status-${status}">${statusLabel}</span>
    <p class="result-copy">${message}</p>
    <p class="result-next">다음 행동: ${next}</p>
  `;
}

function renderChapters(chapters) {
  const grid = $("#chapterGrid");
  grid.innerHTML = "";

  chapters.forEach((chapter) => {
    const article = document.createElement("article");
    article.className = "chapter-card";
    article.innerHTML = `
      <div class="chapter-number">${chapter.number}</div>
      <h3>${chapter.title}</h3>
      <p>${chapter.focus}</p>
      <div class="chapter-meta">
        <p><strong>목표:</strong> <span>${chapter.objective || chapter.focus}</span></p>
        <p><strong>실습:</strong> <span>${chapter.lab}</span></p>
        <p><strong>완료:</strong> <span>${chapter.exitCheck || chapter.interaction}</span></p>
      </div>
      <div class="chapter-links">
        <a class="mini-link" href="${makeChapterLink(chapter.id)}">챕터 열기</a>
      </div>
    `;
    grid.appendChild(article);
  });
}

function renderLearnerChecklist() {
  const checklist = $("#learnerChecklist");
  const reset = $("#resetChecklist");
  if (!checklist || !reset) return;

  const saved = JSON.parse(localStorage.getItem("gitlab-onboarding-checklist") || "{}");
  checklist.innerHTML = "";

  learnerChecklist.forEach((item) => {
    const label = document.createElement("label");
    label.className = "check-item";
    label.innerHTML = `
      <input type="checkbox" value="${item.id}" ${saved[item.id] ? "checked" : ""}>
      <span>
        <strong>${item.title}</strong>
        <span>${item.detail}</span>
      </span>
    `;

    label.querySelector("input").addEventListener("change", (event) => {
      saved[item.id] = event.target.checked;
      localStorage.setItem("gitlab-onboarding-checklist", JSON.stringify(saved));
    });

    checklist.appendChild(label);
  });

  reset.addEventListener("click", () => {
    localStorage.removeItem("gitlab-onboarding-checklist");
    renderLearnerChecklist();
  });
}

function renderScenarios(scenarios) {
  const scenarioSelect = $("#scenarioSelect");
  scenarioSelect.innerHTML = "";

  scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.title;
    scenarioSelect.appendChild(option);
  });

  scenarioSelect.addEventListener("change", (event) => {
    state.scenario = event.target.value;
    renderScenarioDetail(scenarios);
  });

  renderScenarioDetail(scenarios);
}

function renderScenarioDetail(scenarios) {
  const scenario = scenarios.find((item) => item.id === state.scenario) || scenarios[0];
  if (!scenario) return;

  $("#scenarioSelect").value = scenario.id;
  $("#scenarioTitle").textContent = scenario.title;
  $("#scenarioContext").textContent = scenario.context;
  $("#scenarioFeedback").textContent = "";

  const choices = $("#scenarioChoices");
  choices.innerHTML = "";
  scenario.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      const label = choice.tone === "correct" ? "좋은 선택" : choice.tone === "risky" ? "주의 필요" : "다시 판단";
      $("#scenarioFeedback").textContent = `${label}: ${choice.feedback}`;
    });
    choices.appendChild(button);
  });
}

function renderWorkflow() {
  const board = $("#workflowBoard");
  const currentByRole = {
    guest: "Issue",
    reporter: "Issue",
    developer: "Branch",
    reviewer: "Review",
    maintainer: "Merge",
    owner: "Approval"
  };

  board.innerHTML = "";
  workflow.forEach(([title, copy]) => {
    const item = document.createElement("li");
    item.className = "workflow-step";
    item.classList.toggle("current", currentByRole[state.role] === title);
    item.innerHTML = `<strong>${title}</strong><span>${copy}</span>`;
    board.appendChild(item);
  });
}

async function init() {
  try {
    const [roles, chapters, scenarios] = await Promise.all([
      loadJson("data/roles.json"),
      loadJson("data/chapters.json"),
      loadJson("data/scenarios.json")
    ]);

    renderRoleSwitcher(roles);
    renderActions();
    renderChapters(chapters);
    renderScenarios(scenarios);
    renderWorkflow();
    renderLearnerChecklist();
    setRole(state.role, roles);
  } catch (error) {
    const content = $("#content");
    content.insertAdjacentHTML(
      "afterbegin",
      `<div class="page-shell result-box"><span class="result-status status-block">로드 실패</span><p class="result-copy">${error.message}</p></div>`
    );
  }
}

init();
