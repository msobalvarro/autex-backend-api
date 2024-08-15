import { OrderServicePropierties } from 'interfaces';
import { OrderServiceModel } from 'models/order';
import { Types } from 'mongoose';

export const getOrderByIdService = (id: Types.ObjectId): Promise<OrderServicePropierties | null> => {
  const order = OrderServiceModel.findById(id)
    .populate('attentionType')
    .populate('estimateProps')
    .populate('preliminarManagment')
    .populate('serviceType')
    .populate('typesActivitiesToDo')
  return order
}
