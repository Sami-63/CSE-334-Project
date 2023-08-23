import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import { createFacility } from "../controllers/otherFacilityController.js";

const router = express.Router();

router.post("/create", protect, admin, createFacility);

export default router;
