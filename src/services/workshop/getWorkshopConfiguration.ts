import { WorkshopConfigurationsPropierties } from 'interfaces'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

export const getWorkshopConfigurationService = async (workshopId: Types.ObjectId): Promise<WorkshopConfigurationsPropierties | null> => {
  const workshop = await WorkshopModel.findById(workshopId).populate('configuration')
  return workshop?.configuration || null
}