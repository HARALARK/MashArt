import express from "express"
import { upload } from "../config/multerSetup.js"
import {
  createPost,
  getPostDetails,
  getPosts,
  updatePost,
} from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(protect, getPosts)
router.route("/create").post([protect, upload.single("image")], createPost)
router.route("/:id").get(protect, getPostDetails)
router.route("/update").put(protect, updatePost)

export default router
