import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

import checkAuth from './utils/checkAuth.js'
import {
    registerValidation,
    loginValidation,
    postValidation,
} from './validation.js'

mongoose
    .connect(
        'mongodb+srv://stas:1234@database.si06zn0.mongodb.net/blog?retryWrites=true&w=majority&appName=dataBase'
    )
    .then(() => console.log('DB Ok!'))
    .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },

    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use('/upload', express.static('uploads'))

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`,
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postValidation, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK!')
})
