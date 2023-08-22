import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  deleteRoom,
  updateRoom,
} from "../controllers/roomController.js";

const router = express.Router();
router.get("/", getAllRooms);
router.post("/create", protect, admin, createRoom);
router
  .route("/:id")
  .get(getRoomById)
  .delete(protect, admin, deleteRoom)
  .put(protect, admin, updateRoom);

export default router;
