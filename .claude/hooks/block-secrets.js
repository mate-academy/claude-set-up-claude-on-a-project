#!/usr/bin/env node
// PreToolUse hook for the Bash tool: block commands that would read or print secrets.
// Wired up in .claude/settings.json. Exit 2 = block the command and show stderr to Claude.
// Exit 0 = let the normal permission rules decide.

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let command = "";
  try {
    command = JSON.parse(raw).tool_input?.command ?? "";
  } catch {
    process.exit(0);
  }

  const patterns = [
    // Any .env file: .env, .env.local, .env.production ... (but not process.env or dotenv)
    /(^|[^A-Za-z0-9_])\.env([^A-Za-z0-9_]|$)/,
    // Dumping the whole environment
    /\bprintenv\b/,
    /(^|[;&|(\s]|\$\()(env|set)(\s*[;&|)]|\s*$)/,
    /(^|[;&|(\s])(export|declare)\s+-p\b/,
    /process\.env(?![.A-Za-z0-9_])/,
    // Expanding a shell variable whose name looks like a secret
    /\$\{?[A-Za-z0-9_]*(KEY|SECRET|TOKEN|PASSWORD|PASSWD|CREDENTIAL|DATABASE_URL|CONNECTION_STRING)/i,
  ];

  const hit = patterns.find((re) => re.test(command));
  if (hit) {
    console.error(
      `Blocked by .claude/hooks/block-secrets.js: this command could read or print secrets (matched ${hit}). ` +
        "Do not read .env files or dump environment variables."
    );
    process.exit(2);
  }
  process.exit(0);
});
