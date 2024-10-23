import { UpdateWorkshopProps } from 'interfaces'
import { WorkshopModel } from 'models/workshop'

export const updateWorkshopService = async ({ workshopId, name, slogan, representative, phoneNumber, ruc, location }: UpdateWorkshopProps): Promise<boolean> => {
  const workshop = await WorkshopModel.findById(workshopId)
  if (!workshop) throw new Error('workshop not found')

  await WorkshopModel.updateOne({ _id: workshopId }, { name, slogan, representative, phoneNumber, ruc, location })
  return true
}