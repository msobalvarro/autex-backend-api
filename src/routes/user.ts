import { createUserController, updateUserController } from 'controllers/user'
import { Router } from 'express'
import { validationCreateUser, validationUpdateUser } from 'validations'

const router = Router()

router.post('/create', validationCreateUser, createUserController)
router.put('/update', validationUpdateUser, updateUserController)

export { router }