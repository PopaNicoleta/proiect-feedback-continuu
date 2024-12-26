import express from 'express';
import { router } from './routes/config.js';
import { synchronizeDatabase } from './models/config.js';
import cors from 'cors';

const PORT = 8080;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route prefix
app.use("/api/v1", router);

const startServer = async () => {
  try {
    // Synchronize the database before starting the server
    await synchronizeDatabase();
    console.log("Database synchronized successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to synchronize the database:", error.message);
    process.exit(1); // Exit the process with an error code
  }
};

// Start the server
startServer();