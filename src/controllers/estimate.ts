import { CreateAtivititiesGroupError, CreateEstimationError } from 'errors'
import { Request, Response } from 'express'
import { ActivitiesGroupPropierties, ActivitiesGroupProps, EstimateParamsPropierties } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createAcitivitiesGroupService } from 'services/estimate/createAcitivitiesGroup'
import { createEstimateService } from 'services/estimate/createEstimate'
import { getAllEstimatesService, getDetailEstimateById } from 'services/estimate/getDetail'
import { getOrderByEstimateId } from 'services/order/getOrder'

export const createEstimateController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateEstimationError(String(message))
    }

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

export const createActivitiesGroupController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateAtivititiesGroupError(String(message))
    }

    const data: ActivitiesGroupProps = req.body
    const acitivities: ActivitiesGroupPropierties = await createAcitivitiesGroupService(data)

    res.send(acitivities)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

