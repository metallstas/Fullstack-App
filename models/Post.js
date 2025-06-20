import mongoose from 'mongoose'

const PostShema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        avatarUrl: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        imageUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Post', PostShema)
