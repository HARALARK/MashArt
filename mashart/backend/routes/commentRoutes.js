import express from "express"
import{
    createComment
}from "../controllers/commentController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route('/').post(protect, createComment)





export default router