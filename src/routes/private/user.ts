import {
  createUserAndAddToWorkshopController,
  createUserController,
  updateUserController
} from 'controllers/user'
import {
  createUserAndWorkshopIdValidation,
  createUserValidation,
  updateUserValidation
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/create', ...createUserValidation, createUserController)
router.post('/create/workshop', ...createUserAndWorkshopIdValidation, createUserAndAddToWorkshopController)
router.put('/update', ...updateUserValidation, updateUserController)