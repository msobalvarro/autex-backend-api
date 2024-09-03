import { OrderServicePropierties } from 'interfaces'
import { OrderServiceModel } from 'models/order'
import { Types } from 'mongoose'

export const getAllOrders = async (): Promise<OrderServicePropierties[]> => {
  const order = await OrderServiceModel.find()
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