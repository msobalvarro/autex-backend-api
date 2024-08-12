import { loginController } from 'controllers/authentication'
import { loginValidationProps } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/', ...loginValidationProps, loginController)