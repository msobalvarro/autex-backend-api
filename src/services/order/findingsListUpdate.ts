import { ListItemOrderFieldsProps } from 'interfaces'
import { OrderServiceModel } from 'models/order'
import { getOrderByIdService } from './getOrder'
import { UpdateOrderError } from 'errors'

export const updateFindingsListService = async ({ id, list }: ListItemOrderFieldsProps): Promise<boolean> => {
  const order = await getOrderByIdService(id)

  if (!order) { 
    throw new UpdateOrderError('Order not found')
  }

  if (order.status === 'finished') {
    throw new UpdateOrderError('Order could not be update, because the order be finished')
  }
  await OrderServiceModel.updateOne({ _id: id }, { findings: list })

  return true
}
