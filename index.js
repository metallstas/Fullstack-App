import express from 'express'
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

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK!')
})
