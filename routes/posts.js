const express = require("express");
const store = require("../db/store");

const router = express.Router();

// GET /posts — list every post
router.get("/", (req, res) => {
  res.json(store.getAllPosts());
});

// GET /posts/:id — fetch a single post, or 404 if it doesn't exist
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = store.getPostById(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

// POST /posts — create a post; title and body are required
router.post("/", (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }

  const post = store.createPost({ title, body });
  res.status(201).json(post);
});

module.exports = router;
