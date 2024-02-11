import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const execAsync = promisify(exec);

if (!existsSync(join(rootDir, "common.js"))) {
  await execAsync("npm run tsc");
  await execAsync("npm run esm");
}
