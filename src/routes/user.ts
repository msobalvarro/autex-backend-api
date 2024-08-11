import { createUserController, updateUserController } from 'controllers/user'
import { validationCreateUser, validationUpdateUser } from 'midlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/create', ...validationCreateUser, createUserController)
router.put('/update', ...validationUpdateUser, updateUserController)