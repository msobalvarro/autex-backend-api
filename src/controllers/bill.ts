import { Request, Response } from 'express'
import { ReqHeaderAuthPropierties } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { getBillByOrderIdService } from 'services/bill/getBill'

export const getBillController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw message

    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const bill = await getBillByOrderIdService(req.params.orderId, workshopId)
    res.send(bill)
  } catch (error) {
    res.status(500).send(error)
  }
}