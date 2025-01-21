import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/", urlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
