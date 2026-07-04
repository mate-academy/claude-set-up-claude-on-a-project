const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /status returns ok", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
});

test("GET /status reports a numeric uptime", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(typeof res.body.uptime, "number");
  assert.ok(res.body.uptime >= 0);
});

test("GET /status reports a human-readable uptime", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(typeof res.body.uptimeHuman, "string");
  assert.ok(res.body.uptimeHuman.length > 0);
});
