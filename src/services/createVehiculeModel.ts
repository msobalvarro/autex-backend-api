import { NewVehiculeModelProps, VehiculeModel } from 'interfaces'
import { vehiculeCustomModel } from 'models/vehicule'

export const CreateVehiculeModelService = async ({ description }: NewVehiculeModelProps): Promise<VehiculeModel> => {
  const newModel = await vehiculeCustomModel.create({ description })

  return newModel
}
