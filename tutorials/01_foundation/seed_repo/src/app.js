import { canUseSampleAction, describeRole } from "./permissions.js";

export function renderTutorialSummary(role = "Guest") {
  const actionState = canUseSampleAction(role) ? "enabled" : "hidden";

  return [
    `Role: ${role}`,
    `Summary: ${describeRole(role)}`,
    `Sample action: ${actionState}`
  ].join("\n");
}
