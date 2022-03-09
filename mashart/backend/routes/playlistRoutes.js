import express from "express"
import {
    createPlaylist,
    publicVisibility,
    privateVisibility,
    addPosts
} from "../controllers/playlistController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createPlaylist)
router.route("/:id").put(protect,addPosts)
router.route("/:id/public").put(protect,publicVisibility)
router.route("/:id/private").put(protect,privateVisibility)

export default router

