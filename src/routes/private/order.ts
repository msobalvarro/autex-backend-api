import {
  CloseOrderController,
  CreateAdditionalTaskListController,
  UpdateFindingsListController,
  UpdateObservationListController,
  UpdateResumeController,
  createOrderController,
  getAllOrdersByClientController,
  getAllOrdersController,
  getAllOrdersRangeReportController,
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
router.get('/all/report', getAllOrdersRangeReportController)
router.get('/get/client/:clientId', ...getByClientProp, getAllOrdersByClientController)
router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

// creates
router.post('/create', ...createOrderProps, createOrderController)
router.post('/create/addtionalTask', ...updateAdditionalTaskListOrder, CreateAdditionalTaskListController)

// updates
router.put('/closeOrder', ...checkUpdateStatusOrder, CloseOrderController)
router.put('/update/resume', ...checkUpdateResume, UpdateResumeController)
router.put('/update/observations', ...checkUpdateListOrder, UpdateObservationListController)
router.put('/update/findings', ...checkUpdateListOrder, UpdateFindingsListController)