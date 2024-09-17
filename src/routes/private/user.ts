import {
  createUserController,
  getAllUserFromWorkshopController,
  updateUserController,
  updateUserStatusController
} from 'controllers/user'
import {
  createUserValidation,
  updateUserStatusValidation,
  updateUserValidation
} from 'middlewares/params'
import { Router } from 'express'
import { authUserAdminMiddleware, authUserRootMiddleware } from 'middlewares/auth'

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
  authUserAdminMiddleware,
  ...createUserValidation,
  createUserController
)

router.post(
  '/create/assignWorkshop',
  authUserRootMiddleware,
  ...createUserValidation,
  createUserController
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