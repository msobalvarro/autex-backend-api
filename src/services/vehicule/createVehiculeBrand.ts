import { VehiculeBrands } from 'interfaces'
import { vehiculeBrandModel, vehiculeCustomModel } from 'models/vehicule'

export const createMultipleVehiculeBrands = async (brands: VehiculeBrands[]) => {
  const response = await vehiculeBrandModel.insertMany(brands, { rawResult: true })

  return response
}

export const createNewBrand = async (brand: VehiculeBrands): Promise<VehiculeBrands> => {
  const models = await vehiculeCustomModel.insertMany(brand.models)
  const response = await vehiculeBrandModel.create({ ...brand, models })

  return response
}