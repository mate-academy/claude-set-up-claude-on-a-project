import express from "express";

const router = express.Router();

// GET /status — reports how long the app has been running
router.get("/", (req, res) => {
  const uptimeSeconds = process.uptime();
  const startedAt = new Date(Date.now() - uptimeSeconds * 1000).toISOString();

  res.json({ status: "ok", uptimeSeconds, startedAt });
});

export default router;
