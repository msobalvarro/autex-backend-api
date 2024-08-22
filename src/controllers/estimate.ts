import { Request, Response } from 'express'
import { EstimateParamsPropierties } from 'interfaces'
import { Types } from 'mongoose'
import { createEstimateService } from 'services/estimate/createEstimate'
import { getAllEstimatesService, getDetailEstimateById } from 'services/estimate/getDetail'
import { getOrderByEstimateId } from 'services/order/getOrder'

export const createEstimateController = async (req: Request, res: Response) => {
  try {
    const newEstimateParams: EstimateParamsPropierties = req.body
    const newEstimate = await createEstimateService(newEstimateParams)
    res.send(newEstimate)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getEstimateDetailByIdController = async (req: Request, res: Response) => {
  try {
    const id = new Types.ObjectId(req.params.id)
    const newEstimate = await getDetailEstimateById(id)
    res.send(newEstimate)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getEstimateAndOrderDetailByIdController = async (req: Request, res: Response) => {
  try {
    const id = new Types.ObjectId(req.params.id)
    const estimate = await getDetailEstimateById(id)
    const order = await getOrderByEstimateId(new Types.ObjectId(estimate?._id))
    res.send({ estimate, order })
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}


export const getAllEstimatesController = async (req: Request, res: Response) => {
  try {
    const data = await getAllEstimatesService()
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

