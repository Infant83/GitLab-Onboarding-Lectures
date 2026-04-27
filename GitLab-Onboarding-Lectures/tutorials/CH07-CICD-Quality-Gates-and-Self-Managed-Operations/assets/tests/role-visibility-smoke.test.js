import test from "node:test";
import assert from "node:assert/strict";
import { canUseSampleAction } from "../src/permissions.js";

test("Guest cannot use the sample action", () => {
  assert.equal(canUseSampleAction("Guest"), false);
});

test("Developer still cannot use the sample action by default", () => {
  assert.equal(canUseSampleAction("Developer"), false);
});
