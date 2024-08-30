import { assignUserAdminToWorkshopController, assignUserToWorkshopController, createWorkshopController, getAllWorkshopsController } from 'controllers/workshop'
import { Router } from 'express'
import { checkAssignUserToWorkshop, checkCreateWorkshop } from 'middlewares/params'

export const router = Router()

// GET /
router.get('/getAll', getAllWorkshopsController)

// POST / 
router.post('/create', ...checkCreateWorkshop, createWorkshopController)
router.post('/user/assign', ...checkAssignUserToWorkshop, assignUserToWorkshopController)
router.post('/admin/assign', ...checkAssignUserToWorkshop, assignUserAdminToWorkshopController)