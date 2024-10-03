import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { CreateClientError } from 'errors'
import { getAllClientByEmailService } from './getClient'
import { Types } from 'mongoose'
import { WorkshopModel } from 'models/workshop'

export const createClient = async (client: Client, workshopId: Types.ObjectId): Promise<Client> => {
  const clienFindedByEmail = await getAllClientByEmailService(client.email)
  if (clienFindedByEmail) {
    throw new CreateClientError('Email already exists')
  }

  const workshop = await WorkshopModel.findById(workshopId)
  if (!workshop) throw new CreateClientError('workshop not found')

  const dataCreated = await ClientModel.create({ ...client, workshop })
  return dataCreated
}
