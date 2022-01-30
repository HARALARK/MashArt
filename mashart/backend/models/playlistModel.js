import mongoose from 'mongoose'

const playlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    visibility: {
        type: Boolean,
        default: false,
    },
    content: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'contentModelType' 
    }],
    contentModelType: {
        type: String,
        required: true,
        enum: ['Comic', 'Post']  //content can either be a comic or an art post
    },
    tags: [String]
})

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist