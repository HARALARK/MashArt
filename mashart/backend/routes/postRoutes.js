import express from "express"
import multer from "multer"
import path from "path"

import {
  createPost,
  getPostDetails,
  getPosts,
  updatePost,
} from "../controllers/postController.js"

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
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"))
    }
    cb(undefined, true)
  },
})

const router = express.Router()

router.route("/").get(protect, getPosts)
router.route("/create").post([protect, upload.single("image")], createPost)
router.route("/:id").get(protect, getPostDetails)
router.route("/update").put(protect, updatePost)

export default router
