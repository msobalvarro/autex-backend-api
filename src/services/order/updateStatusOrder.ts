import { OrderServiceModel } from 'models/order'
import { Types } from 'mongoose'

export const closeOrderService = async (id: Types.ObjectId):Promise<boolean> => {
  await OrderServiceModel.updateOne({ _id: id }, { status: 'finished' })
  return true
}