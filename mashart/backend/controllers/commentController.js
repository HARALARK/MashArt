import asyncHandler from "express-async-handler"

import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"


// @desc create a comment
// @route POST /api/comment
// @access Private
export const createComment = asyncHandler(async (req, res) => {
    try {

        const{postId, text} = req.body
        const user = await User.findById(req.user._id)
        const post = await Post.findById(postId)
        
        if(!post) return res.status(400).json({msg: "Post not found."})
        if(!user) return res.status(400).json({msg: "User not found."})

        const comment = await Comment.create({
            user,
            text
        })

        await post.updateOne({
            $push: { comments: comment }, //add comment to post's comments list
        })
        res.status(200).json(comment);


    } catch (err) {
        return res.status(500).json(err)
    }
})


   