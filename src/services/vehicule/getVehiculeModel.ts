import { VehiculeBrands, VehiculeModel } from 'interfaces'
import { vehiculeBrandModel, vehiculeCustomModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getVehiculeModelById = async (id: Types.ObjectId): Promise<VehiculeModel | null> => {
  const model = await vehiculeCustomModel.findById(id)
  return model
}

export const getAllModelsService = async (): Promise<VehiculeModel[]> => {
  const data: VehiculeModel[] = await vehiculeCustomModel.find()
  
  return data
}

export const getAllBrandsAndModel = async (): Promise<VehiculeModel[]> => {
  const data: VehiculeBrands[] = await vehiculeBrandModel.find().populate('models')
  
  return data
}
