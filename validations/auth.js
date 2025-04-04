import { body } from 'express-validator'

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
