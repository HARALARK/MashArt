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

  const collaboratorsArray =
    collaborators.trim().length === 0 ? [] : collaborators.split(",")

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
  const latestPosts = await Post.find().sort({ updatedAt: -1 })

  const posts = await Promise.all(
    latestPosts.map(async (post) => {
      const users = await Promise.all(
        post.users.map(async (id) => {
          const user = await User.findById(id)
          return {
            id,
            profileImage: user.profileImage.imageSrc,
          }
        })
      )

      return {
        _id: post._id,
        path: post.path,
        users,
        title: post.title,
        subtitle: post.subtitle,
        description: post.description,
        tags: post.tags,
        time: post.updatedAt,
      }
    })
  )

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

// @desc like/unlike a post
// @route PUT /api/post/:id
// @access Private

export const likePost = asyncHandler(async (req, res) => {

  try {
      const post = await Post.findById(req.params.id)
      if (post.likes.includes(req.user._id)){
          await post.updateOne({ 
              $pull: { likes: req.user._id } 
          });
          res.status(200).json("Unliked Post"); 
      }
      else{
          await post.updateOne({ 
              $push: { likes: req.user._id } 
          });
          res.status(200).json("Liked Post!");
      }
  } catch (err) {
      return res.status(500).json(err)
  }
})


// @desc report a post
// @route PUT /api/post/:id/report
// @access Private

export const reportPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const newCount = post.reportCount + 1
    await post.updateOne({ 
      $set: { reportCount: newCount } 
    });
    return res.status(200).json(post.reportCount)
  } catch (err) {
      return res.status(500).json(err)
  }
})

// @desc flag a post
// @route PUT /api/post/:id/flag
// @access Private
export const flagPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  const user = await User.findById(req.user._id)
  try {
    
    if (user.role === "moderator"){
      await post.updateOne({ 
        $set: { isFlagged: true } 
      });
      return res.status(200).json("Post Flagged")
    }
    else{
      return res.status(403).json("Invalid Request") //not authorized to flag
    }
    
  } catch (err) {
      return res.status(500).json(err)
  }
})