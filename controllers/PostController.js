import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map((post) => post.tags)
        res.json(tags.flat())
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        console.log(req)
        const posts = await PostModel.find().populate('author').exec()
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                new: false,
            }
        ).then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                })
            }

            res.json(post)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        }).then((post) => {
            if (!post) {
                res.status(404).json({
                    message: 'Статья не найдена',
                })
            }

            res.json({
                success: true,
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось удалить статью',
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                author: req.userId,
            }
        )

        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью',
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
