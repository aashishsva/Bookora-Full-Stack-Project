import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

// 👇 ADD THESE
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// 👇 CORS (temporary open for safety)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingRoutes);

// Root test
app.get("/api", (req, res) => {
  res.json({ message: "Bookora Backend Running 🚀" });
});

// =========================
// 🔥 FRONTEND SERVE PART
// =========================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 static frontend serve
app.use(express.static(path.join(__dirname, "../../public")));

// 👇 React routing fix (IMPORTANT)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});