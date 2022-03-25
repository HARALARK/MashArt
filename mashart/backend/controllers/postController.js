import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import { storage } from "../config/firebase.js"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

// @desc Create a post
// @route POST /api/post/create
// @access Private
export const createPost = asyncHandler(async (req, res) => {
  const { buffer } = req.file

  const extension = req.file.originalname.split(".").pop()

  const { collaborators = "", title, description, tags } = req.body

  const collaboratorsArray =
    collaborators.trim().length === 0 ? [] : collaborators.split(",")

  const user = await User.findById(req.user._id)

  let collaboratorsExist = []
  // validating all the collaborators
  if (
    collaboratorsArray.length > 0 &&
    collaboratorsArray[0].trim().length > 0
  ) {
    collaboratorsExist = await Promise.all(
      collaboratorsArray.map(async (collaborator) => {
        const userExist = await User.findOne({ username: collaborator.trim() })
        if (!userExist) {
          throw new Error("Collaborator doesnt exist")
        }
        return userExist._id
      })
    )
  }

  if (user) {
    const users = [user._id, ...collaboratorsExist]

    const post = await Post.create({
      users,
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    })

    const storageRef = ref(storage, `posts/${post._id}.${extension}`)
    const uploadTask = uploadBytesResumable(storageRef, buffer)

    uploadTask.on(
      //checks if the upload has taken place successfully
      "state_changed",
      (snapshot) => {},
      async (error) => {
        //throw error
        await Post.findByIdAndDelete(post._id)
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
// @route get /api/post/:sort?
// @access Private
export const getPosts = asyncHandler(async (req, res) => {
  const sort = req.params.sort === "true" ? true : false

  const latestPosts = await Post.find({ isFlagged: false }).sort({
    //array of latest posts
    reportCount: sort ? -1 : 1,
    updatedAt: -1,
  })

  const posts = await Promise.all(
    latestPosts.map(async (post) => {
      //for each latest post
      const users = await Promise.all(
        //get the users array of the post
        post.users.map(async (id) => {
          //for every user in the user array of the post
          const user = await User.findById(id)
          return {
            id,
            profileImage: user.profileImage.imageSrc, //get the users profile pic
          }
        })
      )

      return {
        //return the current latest post i.e., store this to the posts array as a new element
        _id: post._id,
        path: post.path,
        users,
        title: post.title,
        type: post.type,
        description: post.description,
        tags: post.tags,
        reportCount: post.reportCount,
        likes: post.likes,
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
// @route PUT /api/post/:id/like
// @access Private
export const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.likes.includes(req.user._id)) {
      await post.updateOne({
        $pull: { likes: req.user._id },
      })
      res.status(200).json({ id: req.user._id })
    } else {
      await post.updateOne({
        $push: { likes: req.user._id },
      })
      res.status(200).json({ id: req.user._id })
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
      $set: { reportCount: newCount },
    })
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
    if (user.role === "moderator" || user.role === "admin") {
      await post.updateOne({
        $set: { isFlagged: true },
      })
      return res.status(200).json("Post Flagged")
    } else {
      return res.status(403).json("Invalid Request") //not authorized to flag
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

// @desc Create a comic
// @route POST /api/post/create/comic
// @access Private
export const createComic = asyncHandler(async (req, res) => {
  const extensions = req.files.map((file) => file.originalname.split(".").pop()) //get extension of first image
  const { collaborators = "", title, description, tags } = req.body

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
      description,
      type: "comic",
      tags: tags.split(",").map((tag) => tag.trim()),
    })

    var num = 0
    const paths = await Promise.all(
      req.files.map(async (img) => {
        num++
        /*create a storage ref*/
        return await uploadTaskPromise(num, img, post, extensions[num - 1])
      })
    )

    post.path = paths
    await post.save()

    await user.updateOne({
      $push: { posts: { id: post._id, path: post.path } },
    })

    res.status(200).json({
      _id: post._id,
      path: post.path,
      users: post.users,
      title: post.title,
      subtitle: post.subtitle,
      description: post.description,
      tags: post.tags,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

const uploadTaskPromise = async (num, img, post, extension) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `posts/${post._id}${num}.${extension}`)
    /*create an upload task function*/
    const uploadTask = uploadBytesResumable(storageRef, img.buffer)

    /*get urls*/
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      async (error) => {
        //throw error
        await Post.findByIdAndDelete(post._id)
        reject()
        throw new Error(error)
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
  })
}

// @desc get comics
// @route get /api/post/comics
// @access Private
export const getComics = asyncHandler(async (req, res) => {
  const latestComics = await Post.find({
    isFlagged: false,
    type: "comic",
  }).sort({
    updatedAt: -1,
  })

  const comics = await Promise.all(
    latestComics.map(async (post) => {
      //for each latest post
      const users = await Promise.all(
        //get the users array of the post
        post.users.map(async (id) => {
          //for every user in the user array of the post
          const user = await User.findById(id)
          return {
            id,
            profileImage: user.profileImage.imageSrc, //get the users profile pic
          }
        })
      )

      return {
        //return the current latest post i.e., store this to the posts array as a new element
        _id: post._id,
        path: post.path,
        users,
        title: post.title,
        type: post.type,
        description: post.description,
        time: post.updatedAt,
      }
    })
  )

  res.json({
    comics,
  })
})
