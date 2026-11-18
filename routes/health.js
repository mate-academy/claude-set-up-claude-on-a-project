const express = require("express");

const router = express.Router();

const API_NAME = process.env.API_NAME || "users-api";

// GET /health — simple liveness check, tagged with the API's name
router.get("/", (req, res) => {
  res.json({ status: "ok", name: API_NAME });
});

module.exports = router;
