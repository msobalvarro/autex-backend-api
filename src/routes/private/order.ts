import {
  closeOrderController,
  createAdditionalTaskListController,
  getOrderActivitiesReportController,
  updateFindingsListController,
  updateObservationListController,
  updateResumeController,
  createOrderController,
  getAllOrdersByClientController,
  getAllOrdersController,
  getDetailByIdController
} from 'controllers/order'
import {
  checkUpdateStatusOrder,
  checkUpdateListOrder,
  checkUpdateResume,
  createOrderProps,
  getDetailIdProp,
  updateAdditionalTaskListOrder,
  getByClientProp
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

// get api
router.get('/all', getAllOrdersController)
router.get('/all/report', getOrderActivitiesReportController)
router.get('/get/client/:clientId', ...getByClientProp, getAllOrdersByClientController)
router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

// creates
router.post('/create', ...createOrderProps, createOrderController)
router.post('/create/addtionalTask', ...updateAdditionalTaskListOrder, createAdditionalTaskListController)

// updates
router.put('/closeOrder', ...checkUpdateStatusOrder, closeOrderController)
router.put('/update/resume', ...checkUpdateResume, updateResumeController)
router.put('/update/observations', ...checkUpdateListOrder, updateObservationListController)
router.put('/update/findings', ...checkUpdateListOrder, updateFindingsListController)