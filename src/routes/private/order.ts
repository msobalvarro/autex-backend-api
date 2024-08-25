import { UpdateFindingsListController, UpdateObservationListController, createOrderController, getAllOrdersController, getDetailByIdController } from 'controllers/order'
import { checkUpdateListOrder, createOrderProps, getDetailIdProp } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.get('/getAll', getAllOrdersController)
router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

router.post('/create', ...createOrderProps, createOrderController)
router.put('/update/observations', ...checkUpdateListOrder, UpdateObservationListController)
router.put('/update/findings', ...checkUpdateListOrder, UpdateFindingsListController)