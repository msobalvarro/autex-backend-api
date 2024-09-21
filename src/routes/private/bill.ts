import { getBillController } from 'controllers/bill'
import { Router } from 'express'
import { checkGetBillId } from 'middlewares/params'

export const router = Router()

router.get(
  '/get/order/:orderId',
  ...checkGetBillId,
  getBillController
)

