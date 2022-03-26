import express from "express"
import { upload } from "../config/multerSetup.js"
import {
  createPost,
  getPostDetails,
  getPosts,
  updatePost,
  likePost,
  reportPost,
  flagPost,
  createComic,
  getComics,
} from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/comics").get(protect, getComics)
router.route("/:sort?").get(protect, getPosts)
router.route("/create").post([protect, upload.single("image")], createPost)
router
  .route("/create/comic")
  .post([protect, upload.array("image", 5)], createComic)

router.route("/:id").get(protect, getPostDetails)
router.route("/update").put(protect, updatePost)
router.route("/:id/like").put(protect, likePost)
router.route("/:id/report").put(protect, reportPost)
router.route("/:id/flag").put(protect, flagPost)

export default router
