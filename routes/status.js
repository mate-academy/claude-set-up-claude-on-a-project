const express = require("express");

const router = express.Router();

// Turn a number of seconds into a compact human-readable string,
// dropping leading zero units (e.g. "45s", "2m 3s", "1h 5m 2s").
function formatUptime(seconds) {
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (hours || minutes) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(" ");
}

// GET /status — report process uptime
router.get("/", (req, res) => {
  const uptime = process.uptime();
  res.json({ status: "ok", uptime, uptimeHuman: formatUptime(uptime) });
});

module.exports = router;
