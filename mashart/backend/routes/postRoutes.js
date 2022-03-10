import express from "express"
import { upload } from "../config/multerSetup.js"
import {
  createPost,
  getPostDetails,
  getPosts,
  updatePost,
  likePost,
  reportPost,
  flagPost
} from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(protect, getPosts)
router.route("/create").post([protect, upload.single("image")], createPost)
router.route("/:id").get(protect, getPostDetails)
router.route("/update").put(protect, updatePost)
router.route("/:id").put(protect, likePost)
router.route("/:id/report").put(protect, reportPost)
router.route("/:id/flag").put(protect, flagPost)


export default router
