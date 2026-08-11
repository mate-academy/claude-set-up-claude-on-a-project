const express = require("express");
const claude = require("../services/claude");

const router = express.Router();

// POST /claude — proxy a prompt to Anthropic Claude
router.post("/", async (req, res) => {
  const { prompt, maxTokens, temperature } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }

  try {
    const text = await claude.generate(prompt, { maxTokens, temperature });
    res.json({ text });
  } catch (err) {
    console.error("Claude error:", err && err.message ? err.message : err);
    res.status(502).json({ error: "Failed to generate text from Claude", details: err.message });
  }
});

module.exports = router;
