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
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model("Post", postSchema)

export default Post
