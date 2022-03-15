import express from "express"
import {
  createCollab,
  getCollabUsers,
  joinCollab,
} from "../controllers/collabController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protect, createCollab)
router.route("/join").post(protect, joinCollab)
router.route("/users/:roomCode").get(protect, getCollabUsers)

export default router
