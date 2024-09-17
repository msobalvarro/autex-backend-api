import { User } from 'interfaces'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

export const getAllUserFromWorkshopId = async (workshopId: Types.ObjectId): Promise<User[]> => {
  const workshop = await WorkshopModel.findById(workshopId).populate('users')

  return workshop?.users || []
}