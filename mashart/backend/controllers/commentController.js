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

// @desc like or dislike a comment
// @route PUT /api/comment/:id
// @access Private
export const likeComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (comment.comments.includes(req.user._id)){
            await comment.updateOne({ 
                $pull: { likes: req.user._id } 
            });
            res.status(200).json("Unliked Comment"); 
        }
        else{
            await comment.updateOne({ 
                $push: { likes: req.user._id } 
            });
            res.status(200).json("Liked Comment!");
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})


// @desc delete a comment
// @route DELETE /api/comment/:id
// @access Private
export const deleteComment = asyncHandler(async (req, res) => {
    try {
        const postId = req.body
        const post = await Post.findById(postId)
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.user._id) {
            await post.updateOne({
                $pull: {comments: comment._id}
            })
            await comment.deleteOne();
            res.status(200).json("The comment has been deleted");
        } else {
          res.status(403).json("you can delete only your own comment");
        }
      } catch (err) {
        res.status(500).json(err);
      }
})



