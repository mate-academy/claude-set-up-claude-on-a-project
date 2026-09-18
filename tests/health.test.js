const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /health returns 200 with status ok", async () => {
  const res = await request(app).get("/health");

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
});

test("GET /health responds with JSON", async () => {
  const res = await request(app).get("/health");

  assert.match(res.headers["content-type"], /application\/json/);
});

test("GET /health returns only the status field", async () => {
  const res = await request(app).get("/health");

  assert.deepStrictEqual(Object.keys(res.body), ["status"]);
});

test("GET /health is stable across repeated calls", async () => {
  const first = await request(app).get("/health");
  const second = await request(app).get("/health");

  assert.deepStrictEqual(second.body, first.body);
});

test("HEAD /health returns 200 with an empty body", async () => {
  const res = await request(app).head("/health");

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, {});
});

test("POST /health returns 404 — the route is read-only", async () => {
  const res = await request(app).post("/health").send({ status: "down" });

  assert.strictEqual(res.status, 404);
});

test("GET /health/anything returns 404", async () => {
  const res = await request(app).get("/health/anything");

  assert.strictEqual(res.status, 404);
});
