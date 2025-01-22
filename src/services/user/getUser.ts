import { User } from 'interfaces'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'
import { redisClient } from 'utils/redis'

export const getAllUserFromWorkshopId = async (workshopId: Types.ObjectId): Promise<User[]> => {
  const reply = await redisClient.get(`users-${workshopId}`)
  
    if (reply) {
      return JSON.parse(reply)
    }
  
  const workshop = await WorkshopModel.findById(workshopId).populate('users')

  await redisClient.set(`users-${workshopId}`, JSON.stringify(workshop?.users || []))

  return workshop?.users || []
}