import express from "express"
import { pathToFileURL } from "url"
import {
    createPost,
    getPost,
    updatePost,
    deletePost,
} from "../controllers/postController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(createPost)
router.route("/getPost").post(deletePost)
router.route("/updatePost").post(deletePost)
router.route("/deletePost").post(deletePost)

router
    .route("/")
    .get(protect, getPost)
    .put(protect, updatePost)

export default router