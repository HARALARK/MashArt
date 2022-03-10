import express, { Router } from "express"
import {
    createPlaylist,
    publicVisibility,
    privateVisibility,
    addPosts,
    rmPosts,
    addTags,
    rmTags,
    deletePlaylist,
    getPlaylist
} from "../controllers/playlistController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createPlaylist)
router.route("/:id").get(protect, getPlaylist)
router.route("/:id/delete").delete(protect, deletePlaylist)

router.route("/:id/posts/add").put(protect,addPosts)
router.route("/:id/posts/delete").delete(protect,rmPosts)
router.route("/:id/tags/add").put(protect,addTags)
router.route("/:id/tags/delete").delete(protect,rmTags)
router.route("/:id/public").put(protect,publicVisibility)
router.route("/:id/private").put(protect,privateVisibility)

export default router

