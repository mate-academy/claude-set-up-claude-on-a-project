const express = require("express");

const router = express.Router();

// GET /status — liveness plus how long this process has been running
router.get("/", (req, res) => {
  const uptime = process.uptime();

  res.json({
    status: "ok",
    uptime: Number(uptime.toFixed(3)),
    startedAt: new Date(Date.now() - uptime * 1000).toISOString(),
  });
});

module.exports = router;
