import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/uploads", express.static(uploadDir));
app.use("/api/v1", apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Zaminwale API running on port ${PORT}`);
});
