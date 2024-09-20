import { Request, Response } from 'express'
import { getClientByIdService, getAllClients, getAllClientsWithCars } from 'services/client/getClient'
import { Client, ReqHeaderAuthPropierties } from 'interfaces'
import { createClient } from 'services/client/createClient'
import { existErrors } from 'middlewares/params'
import { CreateClientError } from 'errors'
import { Types } from 'mongoose'

export const getAllClientsController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const data = await getAllClients(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllClientsWithCarController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const data = await getAllClientsWithCars(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const id = new Types.ObjectId(req.params.id)
    const data = await getClientByIdService(id)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateClientError(`${message}`)
    }

    const dataParams: Client = req.body
    const dataCreated = await createClient(dataParams, workshopId)
    res.send(dataCreated)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
