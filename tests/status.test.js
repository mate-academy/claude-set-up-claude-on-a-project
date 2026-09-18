const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /status returns ok with an uptime", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
  assert.strictEqual(typeof res.body.uptime, "number");
  assert.ok(res.body.uptime >= 0);
});

test("GET /status reports a startedAt in the past", async () => {
  const res = await request(app).get("/status");
  const startedAt = Date.parse(res.body.startedAt);

  assert.ok(!Number.isNaN(startedAt));
  assert.ok(startedAt <= Date.now());
});

test("GET /status uptime does not go backwards", async () => {
  const first = await request(app).get("/status");
  const second = await request(app).get("/status");

  assert.ok(second.body.uptime >= first.body.uptime);
});
