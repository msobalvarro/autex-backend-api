import { assignUserAdminToWorkshopController, assignUserToWorkshopController, createWorkshopController, getAllWorkshopsController } from 'controllers/workshop'
import { Router } from 'express'
import { authUserAdminMiddleware } from 'middlewares/auth'
import { checkAssignUserToWorkshop, checkCreateWorkshop } from 'middlewares/params'

export const router = Router()

// GET /
router.get('/workshop/get/all',
  authUserAdminMiddleware,
  getAllWorkshopsController)

// POST / 
router.post('/workshop/create',
  ...checkCreateWorkshop,
  authUserAdminMiddleware,
  createWorkshopController)

router.post('/user/assign',
  ...checkAssignUserToWorkshop,
  authUserAdminMiddleware,
  assignUserToWorkshopController)

router.post('/admin/assign',
  ...checkAssignUserToWorkshop,
  authUserAdminMiddleware,
  assignUserAdminToWorkshopController)