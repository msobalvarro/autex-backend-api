import { VehiculeModel } from 'interfaces'
import { vehiculeCustomModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getVehiculeModelById = async (id: Types.ObjectId): Promise<VehiculeModel | null> => {
  const model = await vehiculeCustomModel.findById(id)
  return model
}

export const getAllModelsService = async (): Promise<VehiculeModel[]> => {
  const data: VehiculeModel[] = await vehiculeCustomModel.find()
  
  return data
}
