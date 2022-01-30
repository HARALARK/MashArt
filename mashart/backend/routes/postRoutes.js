import express from "express"
import multer from "multer"
import { createPost } from "../controllers/postController.js"

import { protect } from "../middleware/authMiddleware.js"

const upload = multer({ dest: "backend/uploads/" })

const router = express.Router()

router.route("/create").post([protect, upload.single("image")], createPost)

export default router
