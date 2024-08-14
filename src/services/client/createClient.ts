import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { CreateClientError } from 'errors'
import { getAllClientByEmail } from './getClient'

export const createClient = async (client: Client): Promise<Client> => {
  const clienFindedByEmail = await getAllClientByEmail(client.email)
  if (clienFindedByEmail) {
    throw new CreateClientError('Email already exists')
  }
  
  const dataCreated = await ClientModel.create(client)
  return dataCreated
}
