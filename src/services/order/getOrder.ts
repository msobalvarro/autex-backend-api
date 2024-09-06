import { OrderServicePropierties } from 'interfaces'
import { EstimateModel } from 'models/estimate'
import { OrderServiceModel } from 'models/order'
import { Types } from 'mongoose'

export const getAllOrders = async (workshopId: Types.ObjectId): Promise<OrderServicePropierties[]> => {
  const order = await OrderServiceModel.find({ workshop: { _id: workshopId } })
    .populate('attentionType')
    .populate({
      path: 'estimateProps',
      populate: [{
        path: 'vehicule',
        populate: [{ path: 'brand' }, { path: 'model' }]
      }]
    })
    .populate('preliminarManagment')
    .populate('serviceType')
    .populate('typesActivitiesToDo')
    .sort({ createdAt: -1 })
  return order
}

export const getAllOrdersByClientIdService = async (clientId: string): Promise<OrderServicePropierties[]> => {
  const orders: OrderServicePropierties[] = []

  const estimates = await EstimateModel.find({ client: { _id: clientId } }).select('_id')
  for (const estimate of estimates) {
    const orderFinded = await OrderServiceModel.findOne({
      estimateProps: {
        _id: estimate._id
      }
    }).populate('attentionType')
      .populate({
        path: 'estimateProps',
        populate: [{
          path: 'vehicule',
          populate: [{ path: 'brand' }, { path: 'model' }]
        }]
      })
      .populate('preliminarManagment')
      .populate('serviceType')
      .populate('typesActivitiesToDo')
      .sort({ createdAt: -1 })

    if (orderFinded) orders.push(orderFinded)
  }

  return orders
}

export const getOrderByIdService = async (id: Types.ObjectId): Promise<OrderServicePropierties | null> => {
  const order = await OrderServiceModel.findById(id)
    .populate('attentionType')
    .populate({
      path: 'estimateProps',
      populate: [
        { path: 'client', select: '-vehicules' },
        {
          path: 'vehicule',
          populate: [
            { path: 'brand', select: '-models' },
            { path: 'model', select: '-vehicules' },
          ]
        },
        { path: 'activitiesToDo' },
        { path: 'requiredParts' },
        { path: 'otherRequirements' },
        { path: 'externalActivities' },
      ]
    })
    .populate('preliminarManagment')
    .populate('serviceType')
    .populate('typesActivitiesToDo')
    .populate('additionalTask')
    .populate('traveled')

  return order
}

export const getOrderByEstimateId = async (id: Types.ObjectId): Promise<OrderServicePropierties | null> => {
  const order = await OrderServiceModel.findOne({ estimateProps: id })
    .populate('attentionType')
    .populate('preliminarManagment')
    .populate('serviceType')
    .populate('typesActivitiesToDo')

  return order
}