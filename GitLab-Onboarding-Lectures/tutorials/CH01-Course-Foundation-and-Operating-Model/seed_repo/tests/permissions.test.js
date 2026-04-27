import test from "node:test";
import assert from "node:assert/strict";
import { canUseSampleAction, describeRole } from "../src/permissions.js";

test("Owner can use sample action", () => {
  assert.equal(canUseSampleAction("Owner"), true);
});

test("Maintainer can use sample action", () => {
  assert.equal(canUseSampleAction("Maintainer"), true);
});

test("Developer cannot use sample action by default", () => {
  assert.equal(canUseSampleAction("Developer"), false);
});

test("role descriptions are human readable", () => {
  assert.match(describeRole("Maintainer"), /merge 관리/);
});
