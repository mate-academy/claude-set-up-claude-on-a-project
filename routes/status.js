const express = require("express");

const router = express.Router();

// GET /status — how long the process has been running, in seconds
router.get("/", (req, res) => {
  res.json({ uptime: process.uptime() });
});

module.exports = router;
