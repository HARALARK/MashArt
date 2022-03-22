import mongoose from "mongoose"

const playlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  visibility: {
    type: Boolean,
    default: false,
  },
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  tags: [String],
  type: {
    type: String,
    default: "mixed",
    enum: ["personal", "mixed"],
  },
})

const Playlist = mongoose.model("Playlist", playlistSchema)

export default Playlist
