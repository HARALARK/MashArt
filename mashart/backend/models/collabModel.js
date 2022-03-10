import mongoose from "mongoose"

const collabSchema = mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    content:{ 
        type: String,
        default: "", //for blank canvas
        required: true
    },
  },
  {
    timestamps: true,
  }
)

const Collab = mongoose.model("Collab", collabSchema)

export default Collab
