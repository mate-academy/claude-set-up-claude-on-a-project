const express = require("express");

const router = express.Router();

// GET /status — report how long the app has been running, in seconds
router.get("/", (req, res) => {
  res.json({ uptime: process.uptime() });
});

module.exports = router;
