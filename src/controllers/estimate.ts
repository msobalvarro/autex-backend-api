import { Request, Response } from 'express'
import { EstimateParamsPropierties } from 'interfaces'
import { createEstimateService } from 'services/estimate/createEstimate'

export const createEstimateController = async (req: Request, res: Response) => {
  try {
    const newEstimateParams: EstimateParamsPropierties = req.body
    const newEstimate = await createEstimateService(newEstimateParams)
    res.send(newEstimate)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}