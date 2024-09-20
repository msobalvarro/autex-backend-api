import dayjs from 'dayjs'
import { CreateOrderServiceError } from 'errors'
import { Request, Response } from 'express'
import {
  ReqHeaderAuthPropierties,
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
import { getAllOrders, getAllOrdersByClientIdService, getOrderByIdService } from 'services/order/getOrder'
import { updateObservationListService } from 'services/order/observationListUpdate'
import { updateResumeService } from 'services/order/updateResume'
import { closeOrderAndGenerateBillService } from 'services/order/updateStatusOrder'
import { getReportOrderService } from 'services/order/getReport'

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrderServiceError(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
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
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const data = await getAllOrders(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllOrdersRangeReportController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new Error(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { from, to } = req.query
    if (!from || !to) throw new Error('from and to is required')

    const startDate = dayjs(`${from}`).startOf('day').toDate()
    const endDate = dayjs(`${to}`).endOf('day').toDate()

    const data = await getReportOrderService({ from: startDate, to: endDate, workshopId })
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllOrdersByClientController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrderServiceError(String(message))

    const { clientId } = req.params
    const data = await getAllOrdersByClientIdService(new Types.ObjectId(clientId))
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateFindingsListController = async (req: Request, res: Response) => {
  try {
    const params: ListItemOrderFieldsProps = req.body
    await updateFindingsListService(params)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateObservationListController = async (req: Request, res: Response) => {
  try {
    const params: ListItemOrderFieldsProps = req.body
    await updateObservationListService(params)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateResumeController = async (req: Request, res: Response) => {
  try {
    const params: UpdateResumeProps = req.body
    await updateResumeService(params)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createAdditionalTaskListController = async (req: Request, res: Response) => {
  try {
    const props: ListItemOrderResumeFieldsProps = req.body
    const response = await createOrAddAdditionalTask(props.list, props.id)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const closeOrderController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new Error(String(message))
    const { id }: UpdateServiceProps = req.body
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const bill = await closeOrderAndGenerateBillService(id, workshopId)
    res.send(bill)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getOrderActivitiesReportController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new Error(String(message))
    const { from, to } = req.query
    if (!from || !to) throw new Error('from and to is required')

    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const startDate = dayjs(`${from}`).startOf('day').toDate()
    const endDate = dayjs(`${to}`).endOf('day').toDate()
    const response = await getReportOrderService({ from: startDate, to: endDate, workshopId })

    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
