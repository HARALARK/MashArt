import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import Playlist from "../models/playlistModel.js"

// @desc Create a playlist
// @route POST /api/playlist/create
// @access Private
export const createPost = asyncHandler(async (req, res) => {
    //const userId = req.user._id
    const { posts , visibility, tags} = req.body
  
    postsArray = posts.split(",").map((post) => post.trim())
    // validating all posts 
  if (
      postsArray.length > 0 //&&
   // collaboratorsArray[0].trim().length > 0
  ) {
      postsArray.forEach(async (post) => {
        await Post.findById(post)
      })
  }
    const user = await User.findById(req.user._id)
  
    //validate user
    if (user) {  
      //create playlist
      const playlist = await Playlist.create({
        user,
        visibility,
        content: postsArray,
        tags: tags.split(",").map((tag) => tag.trim()),
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  })
  