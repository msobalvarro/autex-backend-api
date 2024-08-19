import { NewVehiculeModelProps, VehiculeModel } from 'interfaces'
import { vehiculeBrandModel, vehiculeCustomModel } from 'models/vehicule'

export const CreateVehiculeModelService = async ({ description, brandId }: NewVehiculeModelProps): Promise<VehiculeModel> => {
  const newModel = await vehiculeCustomModel.create({ description })

  await vehiculeBrandModel.updateOne(
    { _id: brandId },
    {
      $push: {
        models: newModel
      }
    }
  )
  
  return newModel
}
