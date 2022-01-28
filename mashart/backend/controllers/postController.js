import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken.js"
import Post from "../models/postModel.js"

export const createPost = asyncHandler(async (req, res) => {
    const {content, username} = req.body

    const post = await Post.create({
        content,
        username
    })

    if (post) {
        res.status(200)
        res.json({
            _id: post._id,
            content: post.content,
        })
    } else {
        res.status(400)
        throw new Error("Failed to create Post")
    }
})

export const getPost = asyncHandler(async (req, res) => {
    const {content, username, views, likes} = req.body // what about collection?

    const post = await Post.findById(req.post._id)

    if (post) {
        res.json({
            _id: post._id,
            content: post.content,
            username: post.username,
            views: post.views,
            likes: post.likes,
        })
    } else {
        res.status(404)
        throw new Error("Post not found")
    }
})

export const updatePost = asyncHandler(async (req, res) => {
    const {content, username, views, likes} = req.body // what about collection?

    const post = await Post.findById(req.post._id)

    if (post) {
        post.content = content || post.content
        post.username = username || post.username
        post.views = views || post.views
        post.likes = likes || post.likes
    

        const updatePost = await post.save()

        res.json({
            _id: updatePost._id,
            content: updatePost.content,
            username: updatePost.username,
            views: updatePost.views,
            likes: updatePost.likes,
    })

    } else {
        res.status(404)
        throw new Error("Post not found")
    }
})

export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.post._id)
        .then(() => res.json('post removed'))
        .catch(err => res.status(400).json('e : ' + err));
})

// inc views
// inc likes
// replace content with image:
//      link to image id
// report post
