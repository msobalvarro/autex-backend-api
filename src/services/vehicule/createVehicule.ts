import { CreateVehiculeProps, Vehicule } from 'interfaces'
import { getVehiculeBrandById } from './getVehiculeBrand'
import { getVehiculeModelById } from './getVehiculeModel'
import { CreateVehiculeError } from 'errors'
import { vehiculeModel } from 'models/vehicule'
import { Types } from 'mongoose'
import { WorkshopModel } from 'models/workshop'

export const createVehiculeService = async (vehicule: CreateVehiculeProps, workshopId: Types.ObjectId): Promise<Vehicule> => {
  const brand = await getVehiculeBrandById(vehicule.brandId)
  if (!brand) throw new CreateVehiculeError('brand not found')
  const model = await getVehiculeModelById(vehicule.modelId)
  if (!model) throw new CreateVehiculeError('model not found')
  const workshop = await WorkshopModel.findById(workshopId)
  if (!workshop) throw new CreateVehiculeError('workshop not found')

  const { chasisNumber, color, km, motorNumber, year, plate, type } = vehicule

  const vehiculeCreated = await vehiculeModel.create({
    brand,
    model,
    chasisNumber,
    color,
    motorNumber,
    type,
    plate,
    year: parseInt(year),
    km: parseInt(km),
    workshop,
  })

  if (!vehiculeCreated) {
    throw new CreateVehiculeError('vehicule could not be created')
  }

  return vehiculeCreated
}
