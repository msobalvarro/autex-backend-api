import { WorkshopPropierties } from 'interfaces'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

export const getWorkshopDetailService = async (id: Types.ObjectId): Promise<WorkshopPropierties | null> => {
  const data = await WorkshopModel.findById(id)
  return data  
}

export const getAllWorkshops = async (): Promise<WorkshopPropierties[]> => {
  const data = await WorkshopModel.find()
  return data
}
