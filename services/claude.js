const axios = require("axios");

const API_BASE = process.env.CLAUDE_API_BASE || "https://api.anthropic.com";
const MODEL = process.env.CLAUDE_MODEL || "claude-2.1";
const API_KEY = process.env.CLAUDE_API_KEY;

if (!API_KEY) {
  // Defer throwing so tests that don't use Claude can still import modules.
  // Individual functions will throw if the key is missing at call time.
}

async function generate(prompt, opts = {}) {
  if (!API_KEY) throw new Error("CLAUDE_API_KEY is not set in environment");

  const body = {
    model: MODEL,
    prompt,
    max_tokens_to_sample: opts.maxTokens || 256,
    temperature: typeof opts.temperature === "number" ? opts.temperature : 0.2,
  };

  const url = `${API_BASE}/v1/complete`;

  const res = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    timeout: opts.timeout || 10000,
  });

  // Attempt to return the text portion of the response.
  if (res.data && res.data.completion) return res.data.completion;
  return res.data;
}

module.exports = { generate };
