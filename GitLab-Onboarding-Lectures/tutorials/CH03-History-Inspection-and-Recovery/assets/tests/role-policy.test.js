import test from "node:test";
import assert from "node:assert/strict";
import { canUseSampleAction } from "../src/permissions.js";

test("Owner and Maintainer can use the sample action", () => {
  assert.equal(canUseSampleAction("Owner"), true);
  assert.equal(canUseSampleAction("Maintainer"), true);
});

test("Developer and Guest cannot use the sample action by default", () => {
  assert.equal(canUseSampleAction("Developer"), false);
  assert.equal(canUseSampleAction("Guest"), false);
});
