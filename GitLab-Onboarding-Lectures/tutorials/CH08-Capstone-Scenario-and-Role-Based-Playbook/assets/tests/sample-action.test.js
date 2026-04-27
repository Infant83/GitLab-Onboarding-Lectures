import test from "node:test";
import assert from "node:assert/strict";
import { getSampleActionState } from "../src/sample-action.js";

const enabledFlags = { sampleActionEnabled: true };
const disabledFlags = { sampleActionEnabled: false };

test("Owner can use the sample action when feature flag is enabled", () => {
  const result = getSampleActionState("Owner", enabledFlags);
  assert.equal(result.visible, true);
});

test("Maintainer can use the sample action when feature flag is enabled", () => {
  const result = getSampleActionState("Maintainer", enabledFlags);
  assert.equal(result.visible, true);
});

test("Developer cannot use the sample action even when feature flag is enabled", () => {
  const result = getSampleActionState("Developer", enabledFlags);
  assert.equal(result.visible, false);
});

test("no one uses the sample action when feature flag is disabled", () => {
  const result = getSampleActionState("Owner", disabledFlags);
  assert.equal(result.visible, false);
});
