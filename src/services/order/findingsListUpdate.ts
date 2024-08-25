import { ListItemOrderFieldsProps } from 'interfaces'
import { OrderServiceModel } from 'models/order'

export const updateFindingsListService = async ({ id, list }: ListItemOrderFieldsProps): Promise<boolean> => {
  await OrderServiceModel.updateOne({ _id: id }, { findings: list })

  return true
}
