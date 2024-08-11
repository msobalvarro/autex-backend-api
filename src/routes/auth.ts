import { loginController } from 'controllers/authentication'
import { Router } from 'express'

export const router = Router()

router.post('/', loginController)