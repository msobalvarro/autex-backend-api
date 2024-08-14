import { Router } from 'express'
import { createEstimateController } from 'controllers/estimate'
import { createEstimateProps } from 'middlewares/params'

export const router = Router()

router.post('/create', ...createEstimateProps, createEstimateController)