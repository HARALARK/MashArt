import express from "express"
import multer from "multer"
import { createPost, updatePost } from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const upload = multer({ dest: "backend/uploads/" })

const router = express.Router()

router.route("/create").post([protect, upload.single("image")], createPost)
router.route("/update").put(protect, updatePost)

export default router
