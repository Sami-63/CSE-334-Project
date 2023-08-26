import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createFacility,
  getAllFacility,
  getFacilityByCategory,
  getFacilityById,
} from "../controllers/otherFacilityController.js";

const router = express.Router();

router.get("/", getAllFacility);
router.post("/category", getFacilityByCategory);
router.post("/create", protect, admin, createFacility);
router.route("/:id").get(getFacilityById);

export default router;
