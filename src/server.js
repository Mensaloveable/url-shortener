import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const frontendUrl = process.env.FRONTEND_URL;
console.log(`Frontend URL: ${frontendUrl}`);

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Allow requests from frontend
app.use(
  cors({
    origin: frontendUrl,
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/", urlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
