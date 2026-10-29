import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../server";

test("GET /status returns the app uptime", async () => {
  const res = await request(app).get("/status");

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
  assert.strictEqual(typeof res.body.uptimeSeconds, "number");
  assert.ok(res.body.uptimeSeconds >= 0);
  assert.ok(!Number.isNaN(Date.parse(res.body.startedAt)));
});
