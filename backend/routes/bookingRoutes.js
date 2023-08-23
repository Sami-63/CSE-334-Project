import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  confirmPayment,
  createBooking,
  getAllBooking,
  giveRating,
  myBookings,
  filterRoom,
  isBookingPossible,
} from "../controllers/bookingController.js";

const router = express.Router();
router.get("/", protect, admin, getAllBooking);
router.post("/mybookings", protect, myBookings);
router.post("/create", protect, createBooking);

router.put("/rating", protect, giveRating);
router.put("/payment", protect, confirmPayment);

router.post("/filter-rooms", filterRoom);
router.post("/check-booking", isBookingPossible);

export default router;
