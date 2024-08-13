import { VehiculeBrands } from 'interfaces'
import { vehiculeBrandModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getVehiculeBrandById = async (id: Types.ObjectId): Promise<VehiculeBrands | null> => {
  const brand = await vehiculeBrandModel.findById(id)
  return brand
}
