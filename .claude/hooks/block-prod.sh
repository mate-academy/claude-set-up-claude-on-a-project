#!/usr/bin/env bash
# PreToolUse hook — refuse a Bash command that points at production before it
# runs, so nothing ever connects. Input arrives as JSON on stdin; node does the
# parsing and matching (jq is not installed here).
set -u

node -e '
// Each rule: [pattern, what it matched]. Add project-specific ones here.
const RULES = [
  [/--env(?:ironment)?[=\s]+["'"'"']?prod/i, "an --env=prod flag"],
  [/\bNODE_ENV[=\s]+["'"'"']?prod/i, "NODE_ENV=production"],
  [/--profile[=\s]+["'"'"']?prod/i, "an --aws --profile=prod flag"],
  [/--context[=\s]+["'"'"']?prod/i, "a kubectl --context=prod flag"],
  [/(?:postgres|postgresql|mysql|mongodb)(?:\+srv)?:\/\/[^\s"'"'"']*prod/i, "a production database URL"],
  [/\b(?:DATABASE_URL|DB_HOST|DB_URL)[=\s]+["'"'"']?[^\s"'"'"']*prod/i, "a production database variable"],
  [/--host[=\s]+["'"'"']?[^\s"'"'"']*\bprod/i, "a production host"],
];

let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  let payload = {};
  try { payload = JSON.parse(s || "{}"); } catch (e) { /* no payload, allow */ }
  const command = (payload.tool_input && payload.tool_input.command) || "";

  const hit = RULES.find(([pattern]) => pattern.test(command));
  if (!hit) process.exit(0); // silence means "no opinion" — other rules decide

  const reason =
    "Blocked by the block-prod hook: this command contains " + hit[1] +
    ", which targets production. Nothing was run and no connection was opened. " +
    "If this is genuinely intended, the user must run it themselves or remove " +
    "the marker from the command.";

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
    systemMessage: "Blocked a command targeting production (" + hit[1] + ").",
  }));
});
'
