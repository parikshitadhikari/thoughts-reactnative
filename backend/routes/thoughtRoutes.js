import express from "express";
import {
  getAllThought,
  addThought,
  deleteThought,
  editThought,
} from "../controllers/thoughtController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/thoughts , public
router.get("/", getAllThought);
// add thought, /api/thoughts/add , private
router.post("/add/:userId", protect, addThought);
router.delete("/:thoughtId", protect, deleteThought);
router.put("/", protect, editThought);

export default router;
