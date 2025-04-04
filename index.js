import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose
    .connect(
        'mongodb+srv://stas:1234@database.si06zn0.mongodb.net/?retryWrites=true&w=majority&appName=dataBase'
    )
    .then(() => console.log('DB Ok!'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/register', (req, res) => {})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK!')
})
