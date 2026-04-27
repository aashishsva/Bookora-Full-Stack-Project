import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getSettings,
  saveSettings,
} from "../controllers/settingController.js";

const router = express.Router();

router.route("/")
  .get(protect, getSettings)
  .put(protect, saveSettings);

export default router;