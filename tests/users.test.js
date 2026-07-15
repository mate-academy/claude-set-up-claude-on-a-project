const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /health returns ok", async () => {
  const res = await request(app).get("/health");

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
});

test("GET /users returns a list of users", async () => {
  const res = await request(app).get("/users");

  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 1);
});

test("GET /users/:id returns 404 for a user that does not exist", async () => {
  const res = await request(app).get("/users/9999");

  assert.strictEqual(res.status, 404);
});

test("POST /users with no body returns 400", async () => {
  const res = await request(app).post("/users").send({});

  assert.strictEqual(res.status, 400);
});

test("PUT /users/:id updates an existing user", async () => {
  const res = await request(app)
    .put("/users/1")
    .send({ name: "Ada L.", email: "ada@new.example.com" });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.id, 1);
  assert.strictEqual(res.body.name, "Ada L.");
  assert.strictEqual(res.body.email, "ada@new.example.com");
});

test("PUT /users/:id returns 404 for a user that does not exist", async () => {
  const res = await request(app)
    .put("/users/9999")
    .send({ name: "Nobody", email: "nobody@example.com" });

  assert.strictEqual(res.status, 404);
});

test("PUT /users/:id with no body returns 400", async () => {
  const res = await request(app).put("/users/1").send({});

  assert.strictEqual(res.status, 400);
});
