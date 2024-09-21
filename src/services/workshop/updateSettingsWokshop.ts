import { WorkshopConfigurationsPropierties } from 'interfaces'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

interface Props {
  workshopId: Types.ObjectId
  configuration: WorkshopConfigurationsPropierties
}

export const updateSettingsWorkshopService = async ({ configuration, workshopId }: Props): Promise<boolean> => {
  await WorkshopModel.updateOne({ _id: workshopId }, { configuration })
  return true
}
