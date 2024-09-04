import { CreateAtivititiesGroupError, CreateEstimationError } from 'errors'
import { Request, Response } from 'express'
import { ActivitiesGroupPropierties, ActivitiesGroupProps, EstimateParamsPropierties, GenerateTokenFnProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createAcitivitiesGroupService } from 'services/estimate/createAcitivitiesGroup'
import { createEstimateService } from 'services/estimate/createEstimate'
import { getActivitiesGroupService, getAllEstimatesService, getDetailEstimateById } from 'services/estimate/getEstimations'
import { getOrderByEstimateId } from 'services/order/getOrder'

export const createEstimateController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateEstimationError(String(message))
    }
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const newEstimateParams: EstimateParamsPropierties = req.body
    const newEstimate = await createEstimateService(newEstimateParams, workshopId)
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
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const id = new Types.ObjectId(req.params.id)
    const estimate = await getDetailEstimateById(id)

    if (String(workshopId) !== estimate?.workshop._id.toString()) {
      return res.status(403).send('You not have permission')
    }

    const order = await getOrderByEstimateId(new Types.ObjectId(estimate?._id))
    res.send({ estimate, order })
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllEstimatesController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const data = await getAllEstimatesService(workshopId)
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

export const getActivitiesGroupController = async (__: Request, res: Response) => {
  try {
    const acitivities: ActivitiesGroupPropierties[] = await getActivitiesGroupService()
    res.send(acitivities)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

