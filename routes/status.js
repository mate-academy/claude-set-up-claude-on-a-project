const express = require("express");

const router = express.Router();

// GET /status — reports how long the process has been running, in seconds
router.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

module.exports = router;
