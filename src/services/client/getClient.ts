import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { Types } from 'mongoose'

export const getAllClients = async (workshopId: Types.ObjectId): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find({ workshop: { _id: workshopId } }).sort({ createdAt: -1 })
  return clients
}

export const getAllClientsWithCars = async (workshopId: Types.ObjectId): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find({ workshop: { _id: workshopId } })
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
    .sort({ createdAt: -1 })
  return clients
}

export const getClientByIdService = async (id: Types.ObjectId): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findById(id).populate({
    path: 'vehicules',
    populate: [{ path: 'brand' }, { path: 'model', select: '-model' }]
  })

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
