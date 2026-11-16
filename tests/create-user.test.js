const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../server");

test("POST /users creates a user that can be retrieved and listed", async () => {
  const input = {
    name: "Grace Hopper",
    email: "grace@example.com",
  };

  const created = await request(app).post("/users").send(input);

  assert.equal(created.status, 201);
  assert.ok(Number.isInteger(created.body.id));
  assert.ok(created.body.id > 0);
  assert.deepEqual(created.body, { id: created.body.id, ...input });

  const fetched = await request(app).get(`/users/${created.body.id}`);

  assert.equal(fetched.status, 200);
  assert.deepEqual(fetched.body, created.body);

  const listed = await request(app).get("/users");

  assert.equal(listed.status, 200);
  assert.ok(Array.isArray(listed.body));
  assert.deepEqual(
    listed.body.filter((user) => user.id === created.body.id),
    [created.body]
  );
});
