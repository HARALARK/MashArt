import express from "express"
import{
    newChat
}from "../controllers/chatController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route("/").post(protect,newChat)


export default router