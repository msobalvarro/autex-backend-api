import { AssignVehiculeToClientProps } from 'interfaces'
import { getVehiculeByIdService } from './getVehicule'
import { UpdateVehiculeClient } from 'errors'
import { ClientModel } from 'models/client'

export const assignVehiculeToClientService = async ({ clientId, vehiculeId }: AssignVehiculeToClientProps) => {
  const vehicule = await getVehiculeByIdService(vehiculeId)

  if (!vehicule) {
    throw new UpdateVehiculeClient('Vehicule not found')
  }

  await ClientModel.updateOne(
    { _id: clientId },
    {
      $push: {
        vehicules: vehicule
      }
    }
  )
}