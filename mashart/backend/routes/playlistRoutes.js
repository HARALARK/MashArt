import express from "express"
import {
    createPlaylist
} from "../controllers/playlistController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createPlaylist)


export default router

