const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /status returns uptime in seconds", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(res.status, 200);
  assert.match(res.headers["content-type"], /application\/json/);
  assert.strictEqual(typeof res.body.uptime, "number");
  assert.ok(res.body.uptime >= 0);
});

test("GET /status uptime increases over time", async () => {
  const first = await request(app).get("/status");
  await new Promise((resolve) => setTimeout(resolve, 20));
  const second = await request(app).get("/status");

  assert.ok(second.body.uptime > first.body.uptime);
});
