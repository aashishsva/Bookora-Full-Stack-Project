import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ✅ API routes FIRST
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingRoutes);

// ✅ path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 IMPORTANT
const publicPath = path.join(__dirname, "../public");

// ✅ static serve
app.use(express.static(publicPath));

// ❗ VERY IMPORTANT FIX (SPA fallback)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});