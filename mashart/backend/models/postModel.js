import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const postSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            // needs timestamps?
            //unique: true, - need to check for duplicate contents
        },
        //comments: String list - needs to be a list of strings
        views: {
            type: int,
            required: true,
            default: 0,
        },
        likes: {
            type: int,
            required: true,
            default: 0,
        },
        username: { // or user id? --original
            type: String,
            required: true,
        }
        // collaborators / list of users working on this

        // package/collection id of posts
    }
)

const Post = mongoose.model("Post", postSchema)

export default Post