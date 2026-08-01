// A tiny in-memory data store. It stands in for a real database so the
// project stays easy to run. Data is not persisted — it resets every time
// the server restarts.

let users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Alan Turing", email: "alan@example.com" },
];

let nextId = 3;

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser({ name, email }) {
  const user = { id: nextId, name, email };
  nextId += 1;
  users.push(user);
  return user;
}

let orders = [
  { id: 1, userId: 1, item: "Keyboard", quantity: 1, status: "pending" },
  { id: 2, userId: 2, item: "Monitor", quantity: 2, status: "shipped" },
];

let nextOrderId = 3;

function getAllOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function createOrder({ userId, item, quantity, status = "pending" }) {
  const order = { id: nextOrderId, userId, item, quantity, status };
  nextOrderId += 1;
  orders.push(order);
  return order;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getAllOrders,
  getOrderById,
  createOrder,
};
