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
  searchPost,
} from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/comics").get(protect, getComics)
router.route("/search").get(protect, searchPost)
router.route("/create").post([protect, upload.single("image")], createPost)
router
  .route("/create/comic")
  .post([protect, upload.array("image", 5)], createComic)

router.route("/sort/:sort?").get(protect, getPosts)

router.route("/detail/:id").get(protect, getPostDetails)
router.route("/update").put(protect, updatePost)
router.route("/:id/like").put(protect, likePost)
router.route("/:id/report").put(protect, reportPost)
router.route("/:id/flag").put(protect, flagPost)

export default router
