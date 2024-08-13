import { createStatusController, getAllStatusController } from 'controllers/status'
import { Router } from 'express'
import { createStatusProps } from 'middlewares/params'

export const router = Router()

router.get('/getAll', getAllStatusController)
router.post('/create', ...createStatusProps, createStatusController)