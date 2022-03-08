import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import Playlist from "../models/playlistModel.js"
import asyncHandler from "express-async-handler"

// @desc Create a playlist
// @route POST /api/playlist/create
// @access Private
export const createPlaylist = asyncHandler(async (req, res) => {

  try{
    //const userId = req.user._id
    const { posts , visibility, tags} = req.body
  
    const postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
    if (postsArray.length > 0 /*&& collaboratorsArray[0].trim().length > 0*/) {
      postsArray.forEach(async (postId) => {
        await Post.findById(postId)
      })
    }
    const user = await User.findById(req.user._id)
  
    //validate user
    if (user) {  
      //create playlist
      const playlist = await Playlist.create({
        userId: req.user._id,
        visibility,
        content: postsArray,
        tags: tags.split(",").map((tag) => tag.trim()),
      })
      res.status(200).json("Playlist Created " + playlist);
      } else {
      res.status(404)
      throw new Error("User not found")
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

// @desc Update playlist visibility
// @route PUT /api/playlist/:id/public
// @access Private
export const changeVisibility = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    if(playlist.visibility.equals(false)){
      res.status(400).json("Invalid Request: Playlist is already public.");
    }
    //check if playlist belongs to user
    if (req.user._id.equals(playlist.userId)){
      await playlist.updateOne({
        $set: {visibility: false}
    })
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})


  