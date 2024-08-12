import { Client } from 'interfaces';
import { ClientModel } from 'models/client';

export const getAllClients = async (): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find()

  return clients
}

export const getAllClientById = async (id: string): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findById(id)

  return client
}

export const getAllClientByEmail = async (email: string): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findOne({ email })

  return client
}
