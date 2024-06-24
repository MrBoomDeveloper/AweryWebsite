/**
 * This script is being used by hosting.
 * We can't use typescript here :(
 */

import { spawn } from "child_process";

const process = spawn("npm", ["run", "prod"]);

process.stdout.on("data", data => {
	console.info(data.toString());
});

process.stderr.on("data", data => {
	console.error(data.toString());
});

process.on("close", () => {
	console.info(`Process finished with exit code ${process.exitCode}`);
	process.exit();
});