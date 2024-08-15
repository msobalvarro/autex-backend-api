import { Request, Response } from 'express'
import { EstimateParamsPropierties } from 'interfaces'
import { Types } from 'mongoose'
import { createEstimateService } from 'services/estimate/createEstimate'
import { getDetailEstimateById } from 'services/estimate/getDetail'

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
