import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import { storage } from "../config/firebase.js"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

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
  const { buffer } = req.file

  const extension = req.file.originalname.split(".").pop()

  const { collaborators = "", title, subtitle, description, tags } = req.body

  const collaboratorsArray = collaborators.split(",")

  const user = await User.findById(req.user._id)

  // validating all the collaborators
  if (
    collaboratorsArray.length > 0 &&
    collaboratorsArray[0].trim().length > 0
  ) {
    collaboratorsArray.split(",").forEach(async (collaborator) => {
      await User.findById(collaborator)
    })
  }

  if (user) {
    const users = [user._id, ...collaboratorsArray]

    const post = await Post.create({
      users,
      title,
      subtitle,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    })

    const storageRef = ref(storage, `posts/${post._id}.${extension}`)
    const uploadTask = uploadBytesResumable(storageRef, buffer)

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        throw new Error(error)
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          post.path = downloadURL

          await post.save()

          await user.updateOne({
            $push: { posts: { id: post._id, path: downloadURL } },
          })

          res.json({
            _id: post._id,
            path: post.path,
            users: post.users,
            title: post.title,
            subtitle: post.subtitle,
            description: post.description,
            tags: post.tags,
          })
        })
      }
    )
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc get a post
// @route get /api/post/
// @access Private
export const getPosts = asyncHandler(async (req, res) => {
  const latestPosts = await Post.find().sort({ updatedAt: -1 }).limit(10)

  const posts = latestPosts.map((post) => ({
    _id: post._id,
    path: post.path,
    users: post.users,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    tags: post.tags,
    time: post.updatedAt,
  }))

  res.json({
    posts,
  })
})

// @desc get a post
// @route get /api/post/:id
// @access Private
export const getPostDetails = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const post = await Post.findById(postId)

  if (!post) {
    res.status(404)
    throw new Error("Post not found")
  }

  res.json({
    _id: post._id,
    path: post.path,
    users: post.users,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    tags: post.tags,
  })
})

// @desc update a post
// @route PUT /api/post/update
// @access Private
export const updatePost = asyncHandler(async (req, res) => {
  const { id, users, title, subtitle, description, tags } = req.body

  const post = await Post.findById(id)

  if (post) {
    post.users = users || post.users
    post.title = title || post.title
    post.subtitle = subtitle || post.subtitle
    post.description = description || post.description
    post.tags = tags || post.tags

    const updatedPost = await post.save()

    res.json({
      _id: updatedPost._id,
      users: updatedPost.users,
      title: updatedPost.title,
      subtitle: updatedPost.subtitle,
      description: updatedPost.description,
      tags: updatedPost.tags,
    })
  } else {
    res.status(404)
    throw new Error("Post not found")
  }
})
