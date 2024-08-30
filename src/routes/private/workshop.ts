import { createWorkshopController, getAllWorkshopsController } from 'controllers/workshop'
import { Router } from 'express'
import { checkCreateWorkshop } from 'middlewares/params'

export const router = Router()

// GET /
router.get('/getAll', getAllWorkshopsController)

// POST / 
router.post('/create', checkCreateWorkshop, createWorkshopController)