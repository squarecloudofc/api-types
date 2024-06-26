import { exec } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const execAsync = promisify(exec);

/**
 * @param {string} path
 * @param {string} version
 */
const fileToESMWrapperCall = (path, version) =>
	execAsync(
		`npx gen-esm-wrapper "${join(rootDir, path, `${version}.js`)}" "${join(rootDir, path, `${version}.mjs`)}"`,
	);

await Promise.allSettled(
	...["v2"].map((version) => [
		fileToESMWrapperCall(`payloads/${version}`, "index"),
		fileToESMWrapperCall(`rest/${version}`, "index"),
		fileToESMWrapperCall("", version),
	]),
	fileToESMWrapperCall("", "utils"),
);
