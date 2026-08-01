const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /orders returns a list of orders", async () => {
  const res = await request(app).get("/orders");

  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 1);
});

test("GET /orders/:id returns 404 for an order that does not exist", async () => {
  const res = await request(app).get("/orders/9999");

  assert.strictEqual(res.status, 404);
});

test("POST /orders with no body returns 400", async () => {
  const res = await request(app).post("/orders").send({});

  assert.strictEqual(res.status, 400);
});

test("POST /orders with valid data creates an order", async () => {
  const res = await request(app)
    .post("/orders")
    .send({ userId: 1, item: "Mouse", quantity: 3 });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.item, "Mouse");
  assert.strictEqual(res.body.quantity, 3);
  assert.strictEqual(res.body.status, "pending");
  assert.ok(res.body.id);
});
