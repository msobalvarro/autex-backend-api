import { CreateOrderServiceError } from 'errors'
import { Request, Response } from 'express'
import { NewOrderServiceProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createOrder } from 'services/order/createOrder'
import { getAllOrders, getOrderByIdService } from 'services/order/getOrder'

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrderServiceError(String(message))

    const params: NewOrderServiceProps = req.body
    const newOrder = await createOrder(params)
    res.send(newOrder)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getDetailByIdController = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
    const id = new Types.ObjectId(req.params._id)
    console.log(id)

    
    const newOrder = await getOrderByIdService(id)
    res.send(newOrder)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const data = await getAllOrders()
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}