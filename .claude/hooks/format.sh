#!/usr/bin/env bash
# PostToolUse hook — run Prettier on the file Claude just edited. Hook input
# arrives as JSON on stdin; jq is not assumed to be present, so node (already
# required by this project) does the parsing.
set -u

root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"

file=$(node -e '
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  let p = {};
  try { p = JSON.parse(s || "{}"); } catch (e) { /* no payload, nothing to do */ }
  const f = (p.tool_response && p.tool_response.filePath) ||
    (p.tool_input && p.tool_input.file_path) || "";
  process.stdout.write(f);
});
')

[ -n "$file" ] || exit 0

cd "$root" || exit 0

# Only touch files inside this project — .prettierrc lives here.
case "$file" in
  "$root"/*) ;;
  *) exit 0 ;;
esac

# --ignore-unknown skips file types Prettier has no parser for;
# .prettierignore decides the rest.
if [ -x node_modules/.bin/prettier ]; then
  node_modules/.bin/prettier --write --ignore-unknown "$file"
else
  npx --no-install prettier --write --ignore-unknown "$file"
fi

# Never block the edit: lint errors are reported by `npm run lint` and by CI.
exit 0
