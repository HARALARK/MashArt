import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  checkUsername,
  checkEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser)
router.route("/username").post(checkUsername)
router.route("/email").post(checkEmail)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route("/forgot-password").put(forgotPassword)
router.route("/reset-password").put(resetPassword)

export default router
