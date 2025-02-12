import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// routes import
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// routes declaration
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
