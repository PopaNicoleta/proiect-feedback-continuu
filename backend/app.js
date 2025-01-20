import express from 'express';
import { router } from './routes/config.js';
import { synchronizeDatabase } from './models/config.js';
import cors from 'cors';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const startServer = async () => {
  try {
    await synchronizeDatabase();
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to synchronize the database:", error.message);
    process.exit(1); 
  }
};

startServer();