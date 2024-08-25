import { ListItemOrderFieldsProps } from 'interfaces'
import { OrderServiceModel } from 'models/order'

export const updateObservationListService = async ({ id, list }: ListItemOrderFieldsProps): Promise<boolean> => {
  await OrderServiceModel.updateOne({ _id: id }, { observations: list })

  return true
}
