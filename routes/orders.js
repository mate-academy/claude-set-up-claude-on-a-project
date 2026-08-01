const express = require("express");
const store = require("../db/store");

const router = express.Router();

// GET /orders — list every order
router.get("/", (req, res) => {
  res.json(store.getAllOrders());
});

// GET /orders/:id — fetch a single order, or 404 if it doesn't exist
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = store.getOrderById(id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

// POST /orders — create an order; userId, item, and quantity are required
router.post("/", (req, res) => {
  const { userId, item, quantity, status } = req.body;

  if (!userId || !item || !quantity) {
    return res
      .status(400)
      .json({ error: "userId, item, and quantity are required" });
  }

  const order = store.createOrder({ userId, item, quantity, status });
  res.status(201).json(order);
});

module.exports = router;
