import express from "express"
import { createCollab, joinCollab } from "../controllers/collabController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createCollab)
router.route("/join").post(protect, joinCollab)

export default router
