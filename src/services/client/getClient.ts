import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { Types } from 'mongoose'

export const getAllClients = async (): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find()
  return clients
}

export const getAllClientsWithCars = async (): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find()
    .populate({
      path: 'vehicules',
      populate: [
        {
          path: 'model'
        },
        {
          path: 'brand'
        }
      ]
    })
  return clients
}

export const getClientByIdService = async (id: Types.ObjectId): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findById(id)

  return client
}

export const getAllClientByEmail = async (email: string): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findOne({ email })

  return client
}

export const getAllClientById = async (id: Types.ObjectId): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findById(id)

  return client
}
