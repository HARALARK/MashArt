import express from "express"
import{
    newMessage,
    getMessages
}from "../controllers/messageController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route("/:id").post(protect,newMessage)
router.route("/:id").get(protect,getMessages)


export default router