import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').exec()
        console.log(posts)
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            author: req.userId,
        })

        const post = await doc.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}
