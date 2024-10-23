import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  updateUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserByID,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Route for user registration and fetching all users (Admin)
router.route("/").post(registerUser).get(protect, admin, getUsers);

// Route for logging out users
router.post("/logout", logoutUser);

// Route for user login
router.post("/auth", authUser);

// Routes for getting/updating user profile
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);

// Routes for handling specific users by ID (GET, DELETE, PUT)
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

export default router;

