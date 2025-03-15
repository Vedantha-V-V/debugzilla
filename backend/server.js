import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config(); // Load environment variables

// Debugging: Print loaded environment variables
console.log("✅ Loaded ENV Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Not Set");
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Not Set");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api", codeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
