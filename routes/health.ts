import express from "express";

const router = express.Router();

// GET /health — simple liveness check
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
