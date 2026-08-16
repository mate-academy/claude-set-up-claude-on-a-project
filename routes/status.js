const express = require("express");

const router = express.Router();

// GET /status — liveness plus how long this process has been running
router.get("/", (req, res) => {
  res.json({ status: "ok", uptime: Number(process.uptime().toFixed(3)) });
});

module.exports = router;
