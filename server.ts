import express from "express";

import usersRoutes from "./routes/users";
import healthRoutes from "./routes/health";
import statusRoutes from "./routes/status";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/health", healthRoutes);
app.use("/status", statusRoutes);

const PORT = process.env.PORT || 3000;

// Only start the server when this file is run directly (e.g. `npm run dev`),
// so the tests can import `app` without opening a real port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export default app;
