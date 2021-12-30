import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  checkUsername,
  checkEmail,
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

export default router
