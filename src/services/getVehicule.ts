import { Vehicule } from 'interfaces'
import { vehiculeModel } from 'models/vehicule'

export const getAllVehicles = async (): Promise<Vehicule[]> => {
  const data: Vehicule[] = await vehiculeModel.find()

  return data
}
