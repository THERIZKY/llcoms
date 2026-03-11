import "dotenv/config";
import { spawn } from "node:child_process";

function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Command gagal dijalankan: ${command} ${args.join(" ")} (exit ${code ?? "null"})`,
        ),
      );
    });
  });
}

async function main() {
  if (process.platform === "win32") {
    await runCommand("cmd.exe", ["/c", "npx prisma migrate deploy"]);
  } else {
    await runCommand("npx", ["prisma", "migrate", "deploy"]);
  }

  await runCommand(process.execPath, ["--import", "tsx", "./prisma/seed.ts"]);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
