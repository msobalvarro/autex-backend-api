import {
  createUserAndAddToWorkshopController,
  createUserController,
  updateUserController,
  updateUserStatusController
} from 'controllers/user'
import {
  createUserAndWorkshopIdValidation,
  createUserValidation,
  updateUserStatusValidation,
  updateUserValidation
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/create', ...createUserValidation, createUserController)
router.post('/create/workshop', ...createUserAndWorkshopIdValidation, createUserAndAddToWorkshopController)
router.put('/update', ...updateUserValidation, updateUserController)
router.put('/update/status', ...updateUserStatusValidation, updateUserStatusController)