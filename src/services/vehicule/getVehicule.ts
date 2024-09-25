import { GetVehiculeError } from 'errors'
import { Vehicule, VehiculeWithClient } from 'interfaces'
import { ClientModel } from 'models/client'
import { vehiculeModel } from 'models/vehicule'
import { Types } from 'mongoose'

export const getAllVehiculesService = async (workshopId: Types.ObjectId): Promise<VehiculeWithClient[]> => {
  const data = await vehiculeModel.find({ workshop: { _id: workshopId } })
    .populate('brand', '-models')
    .populate('model')

  const vehiculeWithClient: VehiculeWithClient[] = []

  for (const vehicule of data) {
    const client = await ClientModel.findOne({ vehicules: { _id: vehicule._id } }).select('-vehicules')

    const c = client?.toJSON()
    vehiculeWithClient.push({
      ...vehicule.toJSON(),
      client: c
    })
  }

  return vehiculeWithClient
}

export const getClientAllVehiculeListService = async (clientId: string): Promise<Vehicule[]> => {
  const dataUser =
    await ClientModel.findById(clientId)
      .select('vehicules -_id')
      .populate({
        path: 'vehicules',
        populate: [{ path: 'brand', select: '-models' }, { path: 'model' }]

      })
  if (!dataUser) throw new GetVehiculeError('user not found')

  return dataUser.vehicules
}

export const getVehiculeByIdService = async (id: Types.ObjectId): Promise<Vehicule | null> => {
  const data: Vehicule | null = await vehiculeModel.findById(id)
  return data
}

export const getVehiculeDetailService = async (id: string): Promise<Vehicule | null> => {
  const vehicule = await vehiculeModel.findById(id).populate('model').populate('brand', '-models')
  return vehicule
}
