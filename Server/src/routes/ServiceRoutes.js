import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/")
  .post(protect, createService)
  .get(protect, getServices);

router.route("/:id")
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;