import {
  createUserAndAddToWorkshopController,
  createUserController,
  getAllUserFromWorkshopController,
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
import { authUserRootMiddleware } from 'middlewares/auth'

export const router = Router()
// get
router.get(
  '/get/all',
  authUserRootMiddleware,
  getAllUserFromWorkshopController
)

// actions
router.post(
  '/create',
  authUserRootMiddleware,
  ...createUserValidation,
  createUserController
)
router.post(
  '/create/workshop',
  authUserRootMiddleware,
  ...createUserAndWorkshopIdValidation,
  createUserAndAddToWorkshopController
)
router.put(
  '/update',
  authUserRootMiddleware,
  ...updateUserValidation,
  updateUserController
)
router.put(
  '/update/status',
  authUserRootMiddleware,
  ...updateUserStatusValidation,
  updateUserStatusController
)