import express from "express"
import multer from "multer"
import path from "path"
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
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const imageStorage = multer.diskStorage({
  destination: "backend/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"))
    }
    cb(undefined, true)
  },
})

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

router.route("/post/:id?").get(protect, getUserPosts)

export default router
