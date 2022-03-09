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

// @desc Update playlist visibility to public
// @route PUT /api/playlist/:id/public
// @access Private
export const publicVisibility = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    if(playlist.visibility.equals(true)){
      res.status(400).json("Invalid Request: Playlist is already public.");
    }
    //check if playlist belongs to user
    if (req.user._id.equals(playlist.userId)){
      await playlist.updateOne({
        $set: {visibility: true}
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


// @desc Update playlist visibility to private
// @route PUT /api/playlist/:id/private
// @access Private
export const privateVisibility = asyncHandler(async (req, res) => {
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
      res.status(400).json("Invalid Request: Playlist is already private.");
    }
    //check if playlist belongs to user
    if (req.user._id.equals(playlist.userId)){
      await playlist.updateOne({
        $set: {visibility: false}
    })
    res.status(200).json("Updated visibility to private.");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

// @desc Add posts to playlist
// @route PUT /api/playlist/:id/add
// @access Private
export const addPosts = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    const { posts } = req.body
    const postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
    if (postsArray.length > 0 /*&& collaboratorsArray[0].trim().length > 0*/) {
      postsArray.forEach(async (postId) => {
        await Post.findById(postId)
      })
    }
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      postsArray.forEach(async (postId) => {
        await playlist.updateOne({
          $push: {content: postId}
        })
      })
    res.status(200).json("Removed Posts.");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

// @desc Remove posts from playlist
// @route PUT /api/playlist/:id/delete
// @access Private
export const rmPosts = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    const { posts } = req.body
    const postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
    if (postsArray.length > 0 /*&& collaboratorsArray[0].trim().length > 0*/) {
      postsArray.forEach(async (postId) => {
        await Post.findById(postId)
      })
    }
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      postsArray.forEach(async (postId) => {
        //specific error handling if post doesn't exist?
        await playlist.updateOne({
          $pull: {content: postId}
        })
      })
      res.status(200).json("Removed Posts.");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})



// @desc Add tags to playlist
// @route PUT /api/playlist/:id/tags/add
// @access Private
export const addTags = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    const { tags } = req.body
    const tagsArray = tags.split(",").map((post) => post.trim())
   
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      tagsArray.forEach(async (tag) => {
        await playlist.updateOne({
          $push: {tags: tag}
        })
    })
    res.status(200).json("Added tags");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})


// @desc Remove tags from playlist
// @route PUT /api/playlist/:id/tags/delete
// @access Private
export const rmTags = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

    const { tags } = req.body
    const tagsArray = tags.split(",").map((post) => post.trim())
   
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      tagsArray.forEach(async (tag) => {
        await playlist.updateOne({
          $pull: {tags: tag}
        })
    })
    res.status(200).json("Removed tags");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})


// @desc Remove tags from playlist
// @route PUT /api/playlist/:id/tags/delete
// @access Private
export const deletePlaylist = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.user._id)
    const playlist = await Playlist.findById(req.params.id)

    if (!user){
      res.status(404).json("User not found.");
    }
    if (!playlist){
      res.status(404).json("Playlist not found.");
    }

   
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
        await user.updateOne({
          $pull: {playlist: playlist}        
        })
        await playlist.deleteOne();//delete playlist from database

    res.status(200).json("Deleted Playlist");
    }
    else{
      res.status(403).json("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})


