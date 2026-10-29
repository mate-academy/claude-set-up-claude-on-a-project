import express from "express";
import * as store from "../db/store";

const router = express.Router();

// GET /users — list every user
router.get("/", (req, res) => {
  res.json(store.getAllUsers());
});

// GET /users/:id — fetch a single user, or 404 if it doesn't exist
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = store.getUserById(id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

// POST /users — create a user; name and email are required
router.post("/", (req, res) => {
  const { name, email } = (req.body ?? {}) as Partial<store.NewUser>;

  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  const user = store.createUser({ name, email });
  res.status(201).json(user);
});

export default router;
