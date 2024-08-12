import { createUserController, updateUserController } from 'controllers/user'
import { createUserValidation, updateUserValidation } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/create', ...createUserValidation, createUserController)
router.put('/update', ...updateUserValidation, updateUserController)