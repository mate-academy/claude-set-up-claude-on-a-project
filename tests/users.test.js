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

test("POST /users with a valid body creates a user", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "Grace Hopper", email: "grace@example.com" });

  assert.strictEqual(res.status, 201);
  assert.ok(typeof res.body.id === "number");
  assert.strictEqual(res.body.name, "Grace Hopper");
  assert.strictEqual(res.body.email, "grace@example.com");
});

test("POST /users trims surrounding whitespace before storing", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "  Katherine Johnson  ", email: "  katherine@example.com  " });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.name, "Katherine Johnson");
  assert.strictEqual(res.body.email, "katherine@example.com");
});

test("POST /users rejects a non-string name", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: 123, email: "num@example.com" });

  assert.strictEqual(res.status, 400);
});

test("POST /users rejects a whitespace-only name", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "   ", email: "blank@example.com" });

  assert.strictEqual(res.status, 400);
});

test("POST /users rejects a malformed email", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "Bob", email: "not-an-email" });

  assert.strictEqual(res.status, 400);
});

test("POST /users rejects a name longer than 100 characters", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "a".repeat(101), email: "long@example.com" });

  assert.strictEqual(res.status, 400);
});

test("POST /users rejects a duplicate email with 409", async () => {
  await request(app)
    .post("/users")
    .send({ name: "First", email: "dupe@example.com" });

  const res = await request(app)
    .post("/users")
    .send({ name: "Second", email: "dupe@example.com" });

  assert.strictEqual(res.status, 409);
});
