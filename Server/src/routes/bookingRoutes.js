import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createBooking,
  getBookings,
  getBookingStats,
  updateBooking,
  deleteBooking,
  getCustomers,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").post(protect, createBooking).get(protect, getBookings);
router.get("/stats", protect, getBookingStats);
router.route("/:id").put(protect, updateBooking).delete(protect, deleteBooking);
router.get("/customers", protect, getCustomers);

export default router;
