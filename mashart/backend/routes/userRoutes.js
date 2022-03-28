import express from "express"
import { upload } from "../config/multerSetup.js"

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  checkUsername,
  checkEmail,
  forgotPassword,
  resetPassword,
  searchUser,
  followUser,
  unfollowUser,
  deleteUser,
  getUserPosts,
  blockUser,
  unblockUser,
  getBlockedUsers,
  changeUserRole,
  getUserPlaylists,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", authUser)

router.route("/username").post(checkUsername)
router.route("/email").post(checkEmail)

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put([protect, upload.single("profileImage")], updateUserProfile)
  .delete(protect, deleteUser)

router.route("/forgot-password").put(forgotPassword)
router.route("/reset-password").put(resetPassword)

router.route("/search").get(protect, searchUser)

router.route("/profile/follow").put(protect, followUser)
router.route("/profile/unfollow").put(protect, unfollowUser)

router.route("/blocked").get(protect, getBlockedUsers)
router.route("/profile/block").put(protect, blockUser)
router.route("/profile/unblock").put(protect, unblockUser)

router.route("/role").put(protect, changeUserRole)

router.route("/playlist/:id?").get(protect, getUserPlaylists)
router.route("/post/:id?").get(protect, getUserPosts)

export default router
