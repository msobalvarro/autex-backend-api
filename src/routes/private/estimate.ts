import { Router } from 'express'
import { createEstimateController, getAllEstimatesController, getEstimateDetailByIdController } from 'controllers/estimate'
import { createEstimateProps, getDetailIdProp } from 'middlewares/params'

export const router = Router()

// GET
router.get('/detail/:id', ...getDetailIdProp, getEstimateDetailByIdController)
router.get('/all', getAllEstimatesController)

// POST
router.post('/create', ...createEstimateProps, createEstimateController)