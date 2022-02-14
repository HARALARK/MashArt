import express from "express"
import{
    newMessage
}from "../controllers/messageController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route("/:id").post(protect,newMessage)


export default router