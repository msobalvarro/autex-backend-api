import { Router } from 'express'
import { createEstimateController, getEstimateDetailByIdController } from 'controllers/estimate'
import { createEstimateProps, getDetailIdProp } from 'middlewares/params'

export const router = Router()

router.get('/detail/:id', ...getDetailIdProp, getEstimateDetailByIdController)
router.post('/create', ...createEstimateProps, createEstimateController)