import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createBooking,
  createPublicBooking,
  getBookings,
  getBookingStats,
  updateBooking,
  deleteBooking,
  getCustomers,
} from "../controllers/bookingController.js";

const router = express.Router();

/* Public */
router.post("/public", createPublicBooking);

/* Protected */
router.route("/").post(protect, createBooking).get(protect, getBookings);
router.get("/stats", protect, getBookingStats);
router.get("/customers", protect, getCustomers);
router.route("/:id").put(protect, updateBooking).delete(protect, deleteBooking);

export default router;