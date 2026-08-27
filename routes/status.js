const express = require("express");

const router = express.Router();

// GET /status — process uptime, in seconds
router.get("/", (req, res) => {
  res.json({ uptime: process.uptime() });
});

module.exports = router;
