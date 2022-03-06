import express from "express"
import{
    createComment,
    likeComment,
    deleteComment
}from "../controllers/commentController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route('/').post(protect, createComment)
router.route('/:id').put(protect, likeComment)
router.route('/:id').delete(protect, deleteComment)



export default router