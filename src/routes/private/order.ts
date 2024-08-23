import { createOrderController, getAllOrdersController, getDetailByIdController } from 'controllers/order'
import { createOrderProps, getDetailIdProp } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.get('/getAll', getAllOrdersController)
router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

router.post('/create', ...createOrderProps, createOrderController)