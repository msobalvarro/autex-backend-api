import { createOrderController, getDetailByIdController } from 'controllers/order'
import { createOrderProps, getDetailIdProp } from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.get('/detail/:_id', ...getDetailIdProp, getDetailByIdController)

router.post('/create', ...createOrderProps, createOrderController)