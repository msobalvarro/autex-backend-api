import { Client } from 'interfaces'
import { ClientModel } from 'models/client'

export const createClient = async (client: Client): Promise<Client> => {
  const dataCreated = await ClientModel.create(client)

  return dataCreated
}
