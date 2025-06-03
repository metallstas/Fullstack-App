import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({
        min: 4,
    }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({
        min: 4,
    }),
    body('fullName', 'Имя должно содержать минимум 2 символа').isLength({
        min: 2,
    }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
]

export const postValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 5 }).isString(),
    body('tags', 'Неверный формат тегов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
