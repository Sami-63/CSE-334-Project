import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createFacilityBooking,
  getAllFacilityBookings,
  giveRating,
  filterFacility,
  isFacilityBookingPossible,
  myOtherBookings,
} from "../controllers/otherBookingController.js";

const router = express.Router();

router.get("/", protect, admin, getAllFacilityBookings);
router.get("/myotherbookings", protect, myOtherBookings);
router.post("/create", protect, createFacilityBooking);

router.put("/rating", protect, giveRating);

router.post("/filter-rooms", filterFacility);
router.post("/check-booking", isFacilityBookingPossible);

export default router;
