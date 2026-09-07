const express = require("express");
const store = require("../db/store");

const router = express.Router();

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate a signup payload. Returns { error } on the first failed rule, or
// { value: { name, email } } with trimmed values when everything checks out.
function validateSignup(body) {
  const { name, email } = body || {};

  if (typeof name !== "string" || typeof email !== "string") {
    return { error: "name and email are required" };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName || !trimmedEmail) {
    return { error: "name and email must not be empty" };
  }

  if (trimmedName.length > NAME_MAX) {
    return { error: `name must be ${NAME_MAX} characters or fewer` };
  }

  if (trimmedEmail.length > EMAIL_MAX) {
    return { error: `email must be ${EMAIL_MAX} characters or fewer` };
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return { error: "email must be a valid email address" };
  }

  return { value: { name: trimmedName, email: trimmedEmail } };
}

// GET /users — list every user
router.get("/", (req, res) => {
  res.json(store.getAllUsers());
});

// GET /users/:id — fetch a single user, or 404 if it doesn't exist
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = store.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// POST /users — create a user; name and email are required and validated
router.post("/", (req, res) => {
  const result = validateSignup(req.body);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  if (store.getUserByEmail(result.value.email)) {
    return res.status(409).json({ error: "email already in use" });
  }

  const user = store.createUser(result.value);
  res.status(201).json(user);
});

module.exports = router;
