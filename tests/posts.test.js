const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /posts returns a list of posts", async () => {
  const res = await request(app).get("/posts");

  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 1);
});

test("GET /posts/:id returns a single post", async () => {
  const list = await request(app).get("/posts");
  const [first] = list.body;

  const res = await request(app).get(`/posts/${first.id}`);

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, first);
});

test("GET /posts/:id returns 404 for a post that does not exist", async () => {
  const res = await request(app).get("/posts/9999");

  assert.strictEqual(res.status, 404);
  assert.strictEqual(res.body.error, "Post not found");
});

test("GET /posts/:id returns 404 for a non-numeric id", async () => {
  const res = await request(app).get("/posts/abc");

  assert.strictEqual(res.status, 404);
});

test("POST /posts creates a post and returns 201", async () => {
  const res = await request(app)
    .post("/posts")
    .send({ title: "A new post", body: "Written by the test." });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.title, "A new post");
  assert.strictEqual(res.body.body, "Written by the test.");
  assert.strictEqual(typeof res.body.id, "number");
});

test("POST /posts adds the created post to the list", async () => {
  const created = await request(app)
    .post("/posts")
    .send({ title: "Listed post", body: "Should show up in GET /posts." });

  const list = await request(app).get("/posts");
  const found = list.body.find((post) => post.id === created.body.id);

  assert.deepStrictEqual(found, created.body);
});

test("POST /posts with no body returns 400", async () => {
  const res = await request(app).post("/posts").send({});

  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.error, "title and body are required");
});

test("POST /posts without a body field returns 400", async () => {
  const res = await request(app).post("/posts").send({ title: "Title only" });

  assert.strictEqual(res.status, 400);
});
