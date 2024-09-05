import {
  CreateVehiculeModelError,
  UpdateVehiculeBrandError
} from 'errors'
import {
  NewMultipleModelsProps,
  VehiculeNewModelToBrandProps
} from 'interfaces'
import {
  vehiculeBrandModel,
  vehiculeCustomModel
} from 'models/vehicule'
import mongoose from 'mongoose'

export const addModelToBrand = async ({ brandId, modelId }: VehiculeNewModelToBrandProps) => {
  const brand = await vehiculeBrandModel.findById(brandId)
  if (!brand) throw new UpdateVehiculeBrandError('Brand not found')
  const model = await vehiculeCustomModel.findById(modelId)
  if (!model) throw new UpdateVehiculeBrandError('Model not found')
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

export const addMultipleModels = async (props: NewMultipleModelsProps) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const vehicule = await vehiculeBrandModel.findOne({ _id: props.brandId })
    if (!vehicule) throw String('vehicule not found')

    const models = await props.models.map(async model => {
      const m = new vehiculeCustomModel(model)
      await vehiculeBrandModel.updateOne({ _id: props.brandId }, {
        $push: {
          models: m
        }
      })

      m.save()
    })

    // await models.map(m => m.save({ session }))
    await session.commitTransaction()
    return models
  } catch (error) {
    await session.abortTransaction()
    throw new CreateVehiculeModelError(String(error))
  }
}
