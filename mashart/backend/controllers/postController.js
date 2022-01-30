import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

import User from "../models/userModel.js"
import Post from "../models/postModel.js"

/**
 * Post
 * Create
 * Update
 * Read (get)
 * Delete
 *
 * inc/dec likes
 * inc/dec dislikes
 * inc/dec reportCount
 *
 * add/remove comment
 *
 * get list of post randomly
 *
 */

// @desc Create a post
// @route POST /api/post/create
// @access Private
export const createPost = asyncHandler(async (req, res) => {
  const { path } = req.file
  const { title, subtitle, description, tags } = req.body

  const user = await User.findById(req.user._id)

  if (user) {
    const post = await Post.create({
      path,
      title,
      subtitle,
      description,
      tags: tags.split(","),
    })

    await user.updateOne({
      $push: { posts: post._id },
    })

    res.json({
      success: "Post created successfully",
    })
  } else {
    throw new Error("User not found")
  }
})
