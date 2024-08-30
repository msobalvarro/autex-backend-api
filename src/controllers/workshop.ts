import { Request, Response } from 'express';
import { WorkshopPropierties } from 'interfaces';
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
