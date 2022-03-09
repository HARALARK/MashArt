import express from "express"
import {
    createPlaylist,
    publicVisibility,
    privateVisibility,
    addPosts,
    rmPosts,
    addTags,
    rmTags
    //getPlaylists
} from "../controllers/playlistController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createPlaylist)
//router.route("/").get(getPlaylists)
router.route("/:id/posts/add").put(protect,addPosts)
router.route("/:id/posts/delete").put(protect,rmPosts)
//router.route("/:id/tags/add").put(protect,addTags)
//router.route("/:id/tags/delete").put(protect,rmTags)
router.route("/:id/public").put(protect,publicVisibility)
router.route("/:id/private").put(protect,privateVisibility)

export default router

