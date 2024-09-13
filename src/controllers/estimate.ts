import { CreateAtivititiesGroupError, CreateEstimationError, UpdateEstimateError } from 'errors'
import { Request, Response } from 'express'
import { ActivitiesGroupPropierties, ActivitiesGroupProps, EstimateParamsPropierties, GenerateTokenFnProps, PushItemCostFieldProps, ReportEstimateProps, UpdateItemCostFieldProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createAcitivitiesGroupService } from 'services/estimate/createAcitivitiesGroup'
import { createEstimateService } from 'services/estimate/createEstimate'
import { getActivitiesGroupService, getAllEstimatesByClientIdService, getAllEstimatesService, getDetailEstimateByIdService, getReportEstimationByDateService } from 'services/estimate/getEstimations'
import { addActivityToDoService, addExternalActivitiesServices, addOthersRequirements, addRequiredPartsService, deleteActivityToDoService, deleteExternalActivitiesService, deleteOtherRequirementService, deleteRequiredPartService } from 'services/estimate/updateEstimate'
import { getOrderByEstimateId } from 'services/order/getOrder'

export const createEstimateController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateEstimationError(String(message))

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
    const newEstimate = await getDetailEstimateByIdService(id)
    res.send(newEstimate)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getEstimateAndOrderDetailByIdController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: GenerateTokenFnProps = req.cookies
    const id = new Types.ObjectId(req.params.id)
    const estimate = await getDetailEstimateByIdService(id)

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

export const getAllEstimatesByClientIdController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateEstimationError(String(message))
    const { clientId } = req.params
    const data = await getAllEstimatesByClientIdService(clientId)
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

export const deleteAcitityToDoController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: UpdateItemCostFieldProps = req.body
    await deleteActivityToDoService(params.itemId, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const addActivityToDoController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: PushItemCostFieldProps = req.body
    await addActivityToDoService(params.activities, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const deleteRequiredPartController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: UpdateItemCostFieldProps = req.body
    await deleteRequiredPartService(params.itemId, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const addRequiredPartsControllers = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: PushItemCostFieldProps = req.body
    await addRequiredPartsService(params.activities, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const deleteOtherRequirementsControllers = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: UpdateItemCostFieldProps = req.body
    await deleteOtherRequirementService(params.itemId, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const addOtherRequirementsController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: PushItemCostFieldProps = req.body
    await addOthersRequirements(params.activities, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const deleteExternalActivityController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: UpdateItemCostFieldProps = req.body
    await deleteExternalActivitiesService(params.itemId, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const addExternalActivitiesController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new UpdateEstimateError(String(message))

    const params: PushItemCostFieldProps = req.body
    await addExternalActivitiesServices(params.activities, params.estimateId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllEstimatesRangeDateController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new Error(String(message))

    const { workshopId }: GenerateTokenFnProps = req.cookies
    const { from, to }: ReportEstimateProps = req.body
    const data = await getReportEstimationByDateService({ from, to, workshopId })
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
