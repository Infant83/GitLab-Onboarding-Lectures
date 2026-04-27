import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const featureFlags = JSON.parse(await readFile("src/feature-flags.json", "utf8"));
const processDoc = await readFile("docs/process.md", "utf8");

assert.equal(typeof featureFlags.sampleActionEnabled, "boolean", "sampleActionEnabled flag must be boolean");
assert.match(processDoc, /1\./, "process document must contain step 1");
assert.match(processDoc, /2\./, "process document must contain step 2");
assert.match(processDoc, /3\./, "process document must contain step 3");
assert.match(processDoc, /4\./, "process document must contain step 4");

console.log("smoke check passed");
