import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import Playlist from "../models/playlistModel.js"
import asyncHandler from "express-async-handler"

// @desc Create a playlist
// @route POST /api/playlist/create
// @access Private
export const createPlaylist = asyncHandler(async (req, res) => {

  try{
    const { name, posts , visibility, tags} = req.body
    const postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
    if (postsArray.length > 0) {
      postsArray.forEach(async (postId) => {
        await Post.findById(postId)
      })
    }
    const user = await User.findById(req.user._id)

    //validate user
    if (user) {  
      //create playlist
      if(!name.trim() == ""){  //don't allow only whitespaces as a name
        const playlist = await Playlist.create({
          name : name,
          userId: req.user._id,
          visibility,
          content: postsArray,
          tags: tags.split(",").map((tag) => tag.trim()),
        })
        res.status(200).json("Playlist Created " + playlist);
      } else{
        throw new Error("Invalid name for playlist")
      }
    }else {
      throw new Error("User not found")
    }
  }
  catch(err) {
    throw new Error(err)
  }
})



// @desc Update playlist visibility to public
// @route PUT /api/playlist/:id/public
// @access Private
export const publicVisibility = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)

    if (!playlist){
      throw new Error("Playlist not found.");
    }
    
    //check if playlist belongs to user
    if (req.user._id.equals(playlist.userId)){
      if((playlist.visibility) == true){
        throw new Error("Invalid Request: Playlist is already public.");
      }
      await playlist.updateOne({
        $set: {visibility: true}
    })
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err);
  }
})


// @desc Update playlist visibility to private
// @route PUT /api/playlist/:id/private
// @access Private
export const privateVisibility = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)
  
    if (!playlist){
      throw new Error("Playlist not found.");
    }

    //check if playlist belongs to user
    if (req.user._id.equals(playlist.userId)){
      if(playlist.visibility == false){
        throw new Error("Invalid Request: Playlist is already private.");
      }
      await playlist.updateOne({
        $set: {visibility: false}
    })
    res.status(200).json("Updated visibility to private.");
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err);
  }
})

// @desc Add posts to playlist
// @route PUT /api/playlist/:id/posts/add
// @access Private
export const addPosts = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)

    if (!playlist){
      throw new Error("Playlist not found.");
    }

    const { posts } = req.body
    const postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
    if (postsArray.length > 0) {
      postsArray.forEach(async (postId) => {
        await Post.findById(postId)
      })
    }
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      postsArray.forEach(async (postId) => {
        await playlist.updateOne({
          //allow duplicates?
          $push: {content: postId}
        })
      })
    res.status(200).json("Added Posts.");
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err);
  }
})

// @desc Remove posts from playlist
// @route PUT /api/playlist/:id/posts/delete
// @access Private
export const rmPosts = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)

    if (!playlist){
      throw new Error("Playlist not found.");
    }

    const { posts } = req.body
    const postsArray = posts.split(",").map((post) => post.trim())

    // validating all posts 
    if (postsArray.length > 0) {
      postsArray.forEach(async (postId) => {
       await Post.findById(postId)
      })

    }
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      postsArray.forEach(async (postId) => {
        await playlist.updateOne({
          //test for checking posts in playlist?
          $pull: {content: postId}
        })
      })
      res.status(200).json("Removed Posts.");
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err);
  }
})



// @desc Add tags to playlist
// @route PUT /api/playlist/:id/tags/add
// @access Private
export const addTags = asyncHandler(async (req, res) => {
  try{

    const playlist = await Playlist.findById(req.params.id)

    if (!playlist){
      throw new Error("Playlist not found.");
    }

    const { tags } = req.body
    const tagsArray = tags.split(",").map((post) => post.trim())
   
    //check if playlist belongs to user then add each new post to the playlist
    if (req.user._id.equals(playlist.userId)){
      tagsArray.forEach(async (tag) => {
        //allow duplicate tags? yes
        await playlist.updateOne({
          $push: {tags: tag}
        })
    })
    res.status(200).json("Added tags");
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
   throw new Error(err);
  }
})


// @desc Remove tags from playlist
// @route PUT /api/playlist/:id/tags/delete
// @access Private
export const rmTags = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)

    if (!playlist){
      throw new Error("Playlist not found.");
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
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err);
  }
})


// @desc Delete a user's playlist
// @route DELETE /api/playlist/:id/delete
// @access Private
export const deletePlaylist = asyncHandler(async (req, res) => {
  try{
    
    const playlist = await Playlist.findById(req.params.id)
    const user = await User.findById(req.user._id)

    if (!user){
      throw new Error("User not found.");
    }
    if (!playlist){
      throw new Error("Playlist not found.")
    }
    //check if playlist belongs to user then add each new post to the playlist

    if (req.user._id.equals(playlist.userId)){
      await user.updateOne({
        $pull: {playlist: playlist._id}        
      })
      await playlist.deleteOne();//delete playlist from database
      res.status(200).json("Deleted Playlist");
    }
    else{
      throw new Error("Invalid Request. You don't have access to this playlist");
    }
  }
  catch(err){
    throw new Error(err)
  }
})



// @desc get a playlist
// @route get /api/playlist/:id
// @access Private
export const getPlaylist = asyncHandler(async (req, res) => {
  try{
    const playlist = await Playlist.findById(req.params.id)
    
    if (!playlist) {
      res.status(404)
      throw new Error("Playlist not found")
    }

    if(playlist.userId.equals(req.user._id)){
      res.status(200).json({
        playlist
      })
    }
    else{
      //only sent other user's playlist if its visibility is set to public
      if(playlist.visibility == true){
        res.json({playlist})
      }
      else{
        throw new Error("Invalid Request")
      }
    }
  }
  catch(err){
    throw new Error(err)
  }
})


