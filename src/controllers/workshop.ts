import { Request, Response } from 'express';
import { AssignUserToWorkshopProps, WorkshopPropierties } from 'interfaces';
import { assignUserAdminToWorkshopService, assignUserToWorkshopService } from 'services/workshop/assignUserToWorkshop';
import { createWorkshopService } from 'services/workshop/createWorkshop';
import { getAllWorkshops } from 'services/workshop/getWorkshops';

export const createWorkshopController = async (req: Request, res: Response) => {
  try {
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
    await assignUserAdminToWorkshopService(params.userId, params.workshopId) 

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
