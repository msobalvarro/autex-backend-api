import { UpdateVehiculeBrandError } from 'errors'
import { VehiculeNewModelToBrandProps } from 'interfaces'
import { vehiculeBrandModel, vehiculeCustomModel } from 'models/vehicule'

export const addModelToBrand = async ({brandId, modelId}: VehiculeNewModelToBrandProps) => {
  const brand = await vehiculeBrandModel.findById(brandId)
  if (!brand) {
    throw new UpdateVehiculeBrandError('Brand not found')
  }

  const model = await vehiculeCustomModel.findById(modelId)
  if (!model) {
    throw new UpdateVehiculeBrandError('Model not found')
  }

  const response = await vehiculeBrandModel.updateOne(
    { _id: brandId },
    {
      $push: {
        models: model
      }
    }
  )

  return response
}