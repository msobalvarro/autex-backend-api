import { Vehicule } from 'interfaces'
import { vehiculeModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getAllVehicles = async (): Promise<Vehicule[]> => {
  const data: Vehicule[] = await vehiculeModel.find()
  return data
}

export const getVehiculeDetailService = async (id: Types.ObjectId): Promise<Vehicule | null> => {
  const vehicule = await vehiculeModel.findById(id)
  return vehicule
}
