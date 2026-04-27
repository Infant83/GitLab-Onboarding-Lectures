import { canUseSampleAction } from "./permissions.js";

export function getSampleActionState(role, featureFlags) {
  const featureEnabled = Boolean(featureFlags?.sampleActionEnabled);
  const hasRoleAccess = canUseSampleAction(role);

  return {
    role,
    featureEnabled,
    hasRoleAccess,
    visible: featureEnabled && hasRoleAccess
  };
}
