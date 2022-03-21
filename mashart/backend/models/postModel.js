import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    path: {
      type: String,
      unique: true,
    },
    users: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    comments: [{
      type: mongoose.Types.ObjectId, ref: 'Comment',
      default: [],
    }],
    reportCount: {
      type: Number,
      default: 0,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String, //could be a single post or a collection of posts i.e., a comic
      default: "post",
      enum: ["comic", "post"], 
    },
    collabStatus: { //to check if a post is a collab post or a user post
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model("Post", postSchema)

export default Post
