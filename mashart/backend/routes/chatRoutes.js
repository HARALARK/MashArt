import express from "express"
import{
    newChat,
    getChats,
    leaveChat,
    //addUser
}from "../controllers/chatController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route("/").post(protect,newChat)
router.route("/").get(protect,getChats)
router.route("/:id/leave").put(protect, leaveChat)
//router.route("/:id/add").put.apply(protect, addUser)

export default router