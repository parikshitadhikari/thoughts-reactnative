import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser); // api/users -> register user
router.post("/auth", authUser); // api/users/auth -> authenticate user
router.post("/logout", logoutUser);
// get: api/users/profile -> get user profile, put: api/users/profie -> update user profile
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile); // protected route

export default router;
