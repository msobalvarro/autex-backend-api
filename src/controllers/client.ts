import { Request, Response } from 'express'
import { getAllClients } from 'services/getClient'
import { Client } from 'interfaces'
import { createClient } from 'services/createClient'

export const getAllClientsController = async (__: Request, res: Response) => {
  try {
    const data = await getAllClients()
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createClientController = async (req: Request, res: Response) => {
  try {
    const dataParams: Client = req.body
    const dataCreated = await createClient(dataParams)

    res.send(dataCreated)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
