import { Client } from 'interfaces'
import { ClientModel } from 'models/client'
import { Types } from 'mongoose'
import { redisClient } from 'utils/redis'

export const getAllClientsService = async (workshopId: Types.ObjectId): Promise<Client[]> => {
  const reply = await redisClient.get(`clients-${workshopId}`)

  if (reply) {
    return JSON.parse(reply)
  }

  const clients: Client[] = await ClientModel.find({ workshop: { _id: workshopId } }).sort({ createdAt: -1 })

  await redisClient.set(`clients-${workshopId}`, JSON.stringify(clients))
  
  return clients
}

export const getAllClientsWithCarsService = async (workshopId: Types.ObjectId): Promise<Client[]> => {
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

export const getAllClientByEmailService = async (email: string): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findOne({ email })

  return client
}

export const getAllClientByIdService = async (id: Types.ObjectId): Promise<Client | null> => {
  const client: Client | null = await ClientModel.findById(id)

  return client
}
