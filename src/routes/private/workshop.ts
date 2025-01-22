import { getWorkshopsController } from 'controllers/workshop'
import { Router } from 'express'
import { authMiddleware } from 'middlewares/auth'

export const router = Router()

router.get(
  '/information',
  // authUserRootMiddleware,
  authMiddleware,
  getWorkshopsController
)