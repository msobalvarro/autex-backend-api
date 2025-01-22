import { OrderServicePropierties } from 'interfaces'
import { EstimateModel } from 'models/estimate'
import { OrderServiceModel } from 'models/order'
import { Types } from 'mongoose'
import { redisClient } from 'utils/redis'

export const getAllOrders = async (workshopId: Types.ObjectId): Promise<OrderServicePropierties[]> => {
  const reply = await redisClient.get(`orders-${workshopId}`)

  if (reply) {
    return JSON.parse(reply)
  }

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

  await redisClient.set(`orders-${workshopId}`, JSON.stringify(order))

  return order
}

export const getAllOrdersByClientIdService = async (clientId: Types.ObjectId): Promise<OrderServicePropierties[]> => {
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
