import { CreateWorkshopError } from 'errors'
import { Request, Response } from 'express'
import {
  AssignUserToWorkshopProps,
  WorkshopPropierties,
  UpdateConfigurationWorkshopProps,
  UpdateWorkshopProps,
  ReqHeaderAuthPropierties,
} from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { updateAdminUserService } from 'services/user/updateUser'
import { assignUserAdminToWorkshopService, assignUserToWorkshopService } from 'services/workshop/assignUserToWorkshop'
import { createWorkshopService } from 'services/workshop/createWorkshop'
import { getWorkshopConfigurationService } from 'services/workshop/getWorkshopConfiguration'
import { getAllWorkshops } from 'services/workshop/getWorkshops'
import { updateSettingsWorkshopService } from 'services/workshop/updateSettingsWokshop'
import { updateWorkshopService } from 'services/workshop/updateWorkshop'

export const createWorkshopController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateWorkshopError(String(message))

    const params: WorkshopPropierties = req.body
    const workshop = await createWorkshopService(params)
    res.send(workshop)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllWorkshopsController = async (req: Request, res: Response) => {
  try {
    const worksops = await getAllWorkshops()
    res.send(worksops)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const assignUserToWorkshopController = async (req: Request, res: Response) => {
  try {
    const params: AssignUserToWorkshopProps = req.body
    await assignUserToWorkshopService(params.userId, params.workshopId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const assignUserAdminToWorkshopController = async (req: Request, res: Response) => {
  try {
    const params: AssignUserToWorkshopProps = req.body
    await updateAdminUserService(params.userId, true)
    await assignUserAdminToWorkshopService(params.userId, params.workshopId)

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateSettingWorkshopController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw String(message)

    const params: UpdateConfigurationWorkshopProps = req.body
    const response = await updateSettingsWorkshopService(params)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateWorkshopController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw String(message)

    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const params: UpdateWorkshopProps = req.body
    const response = await updateWorkshopService({ ...params, workshopId })
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getWorkshopConfigurationForRootController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw message

    const workshopId = new Types.ObjectId(req.params.workshopId)
    const data = await getWorkshopConfigurationService(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(String(error))
  }
}
