import { Router } from 'express'
import {
  createActivitiesGroupController,
  createEstimateController,
  getActivitiesGroupController,
  getAllEstimatesController,
  getEstimateAndOrderDetailByIdController,
  getEstimateDetailByIdController
} from 'controllers/estimate'
import {
  checkCreateAcitivitiesGroup,
  createEstimateProps,
  getDetailIdProp
} from 'middlewares/params'

export const router = Router()

// GET
router.get('/detail/:id', ...getDetailIdProp, getEstimateDetailByIdController)
router.get('/detailWithOrder/:id', ...getDetailIdProp, getEstimateAndOrderDetailByIdController)
router.get('/activitiesGroup', getActivitiesGroupController)
router.get('/all', getAllEstimatesController)

// POST
router.post('/create', ...createEstimateProps, createEstimateController)
router.post('/create/activitiesGroup', ...checkCreateAcitivitiesGroup, createActivitiesGroupController)
