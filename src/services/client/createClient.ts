import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { CreateClientError } from 'errors'
import { getAllClientByEmail } from './getClient'
import { Types } from 'mongoose'
import { WorkshopModel } from 'models/workshop'

export const createClient = async (client: Client, workshopId: Types.ObjectId): Promise<Client> => {
  const clienFindedByEmail = await getAllClientByEmail(client.email)
  if (clienFindedByEmail) {
    throw new CreateClientError('Email already exists')
  }

  const workshop = await WorkshopModel.findById(workshopId)
  if (!workshop) throw new Error('workshop not found')

  const dataCreated = await ClientModel.create({ ...client, workshop })
  return dataCreated
}
