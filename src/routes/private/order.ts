import { CloseOrderController, CreateAdditionalTaskListController, UpdateFindingsListController, UpdateObservationListController, UpdateResumeController, createOrderController, getAllOrdersController, getDetailByIdController } from 'controllers/order'
import { checkUpdateStatusOrder, checkUpdateListOrder, checkUpdateResume, createOrderProps, getDetailIdProp, updateAdditionalTaskListOrder } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

// get api
router.get('/getAll', getAllOrdersController)
router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

// creates
router.post('/create', ...createOrderProps, createOrderController)
router.post('/create/addtionalTask', ...updateAdditionalTaskListOrder, CreateAdditionalTaskListController)

// updates
router.put('/closeOrder', ...checkUpdateStatusOrder, CloseOrderController)
router.put('/update/resume', ...checkUpdateResume, UpdateResumeController)
router.put('/update/observations', ...checkUpdateListOrder, UpdateObservationListController)
router.put('/update/findings', ...checkUpdateListOrder, UpdateFindingsListController)