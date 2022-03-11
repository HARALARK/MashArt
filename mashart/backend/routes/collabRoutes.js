import express from "express"
import { createCollab } from "../controllers/collabController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createCollab)

export default router
