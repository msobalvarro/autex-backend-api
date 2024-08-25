import { CreateOrderServiceError } from 'errors'
import { Request, Response } from 'express'
import { ActivityWithCostToDoItemEstimate, ListItemOrderFieldsProps, NewOrderServiceProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createOrder } from 'services/order/createOrder'
import { createResumeList } from 'services/order/createResume'
import { updateFindingsListService } from 'services/order/findingsListUpdate'
import { getAllOrders, getOrderByIdService } from 'services/order/getOrder'
import { updateObservationListService } from 'services/order/observationListUpdate'

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
    const id = new Types.ObjectId(req.params._id.trim())
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

export const UpdateFindingsListController = async (req: Request, res: Response) => {
  try {
    const params: ListItemOrderFieldsProps = req.body

    await updateFindingsListService(params)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const UpdateObservationListController = async (req: Request, res: Response) => {
  try {
    const params: ListItemOrderFieldsProps = req.body
    await updateObservationListService(params)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const CreateResumeListController = async (req: Request, res: Response) => {
  try {
    const list: ActivityWithCostToDoItemEstimate[] = req.body
    await createResumeList(list)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
