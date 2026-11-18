const express = require("express");

const usersRoutes = require("./routes/users");
const healthRoutes = require("./routes/health");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/health", healthRoutes);

const PORT = process.env.PORT || 3000;
const API_NAME = process.env.API_NAME || "users-api";

// Only start the server when this file is run directly (e.g. `npm run dev`),
// so the tests can import `app` without opening a real port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`${API_NAME} listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
