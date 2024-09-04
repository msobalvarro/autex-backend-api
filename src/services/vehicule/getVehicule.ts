import { Vehicule } from 'interfaces'
import { vehiculeModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getAllVehicles = async (workshopId: Types.ObjectId): Promise<Vehicule[]> => {
  const data: Vehicule[] = await vehiculeModel.find({ workshop: { _id: workshopId } })
    .populate('brand', '-models')
    .populate('model')
  return data
}

export const getVehiculeById = async (id: Types.ObjectId): Promise<Vehicule | null> => {
  const data: Vehicule | null = await vehiculeModel.findById(id)
  return data
}

export const getVehiculeDetailService = async (id: Types.ObjectId): Promise<Vehicule | null> => {
  const vehicule = await vehiculeModel.findById(id).populate('model').populate('brand', '-models')
  return vehicule
}
