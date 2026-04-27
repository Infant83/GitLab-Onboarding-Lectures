import { mkdir, readFile, writeFile } from "node:fs/promises";
import { canUseSampleAction } from "../src/permissions.js";

const html = await readFile("public/index.html", "utf8");

const visibilityTable = {
  Owner: canUseSampleAction("Owner"),
  Maintainer: canUseSampleAction("Maintainer"),
  Developer: canUseSampleAction("Developer"),
  Guest: canUseSampleAction("Guest")
};

await mkdir("dist", { recursive: true });
await writeFile("dist/index.html", html, "utf8");
await writeFile("dist/role-matrix.json", JSON.stringify(visibilityTable, null, 2), "utf8");

console.log("build complete");
