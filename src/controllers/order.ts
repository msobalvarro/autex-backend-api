import { CreateOrderServiceError } from 'errors'
import { Request, Response } from 'express'
import {
  GenerateTokenFnProps,
  ListItemOrderFieldsProps,
  ListItemOrderResumeFieldsProps,
  NewOrderServiceProps,
  UpdateResumeProps,
  UpdateServiceProps
} from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createOrder } from 'services/order/createOrder'
import { createOrAddAdditionalTask } from 'services/order/createAdditionalTask'
import { updateFindingsListService } from 'services/order/findingsListUpdate'
import { getAllOrders, getOrderByIdService } from 'services/order/getOrder'
import { updateObservationListService } from 'services/order/observationListUpdate'
import { updateResumeService } from 'services/order/updateResume'
import { closeOrderService } from 'services/order/updateStatusOrder'

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrderServiceError(String(message))
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const params: NewOrderServiceProps = req.body
    const newOrder = await createOrder(params, workshopId)
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
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const data = await getAllOrders(workshopId)
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

export const UpdateResumeController = async (req: Request, res: Response) => {
  try {
    const params: UpdateResumeProps = req.body
    await updateResumeService(params)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const CreateAdditionalTaskListController = async (req: Request, res: Response) => {
  try {
    const props: ListItemOrderResumeFieldsProps = req.body
    const response = await createOrAddAdditionalTask(props.list, props.id)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const CloseOrderController = async (req: Request, res: Response) => {
  try {
    const { id }: UpdateServiceProps = req.body
    await closeOrderService(id)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
