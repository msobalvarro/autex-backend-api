import { Request, Response } from 'express'
import { Status } from 'interfaces'
import { StatusModel } from 'models/status'
import { createStatus } from 'services/status/createStatus'

export const getAllStatusController = async (req: Request, res: Response) => {
  try {
    const data = await StatusModel.find()
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createStatusController = async (req: Request, res: Response) => {
  try {
    const { description }: Status = req.body
    const response = await createStatus(description)

    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
