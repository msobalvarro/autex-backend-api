import { assignUserAdminToWorkshopController, assignUserToWorkshopController, createWorkshopController, getAllWorkshopsController } from 'controllers/workshop'
import { Router } from 'express'
import { authUserAdminMiddleware } from 'middlewares/auth'
import { checkAssignUserToWorkshop, checkCreateWorkshop } from 'middlewares/params'

export const router = Router()

// GET /
router.get('/getAll', authUserAdminMiddleware, getAllWorkshopsController)

// POST / 
router.post('/create',
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