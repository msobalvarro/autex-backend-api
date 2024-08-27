import mongoose from 'mongoose'
import {
  NewOrderServiceProps,
  OrderServicePropierties
} from 'interfaces'
import {
  AtentionsTypesModel,
  OrderServiceModel,
  PreliminarManagmentModel,
  ServiceTypeOrderModel,
  TypesActivitiesToDoModel
} from 'models/order'
import { CreateOrderServiceError } from 'errors'
import { getDetailEstimateById } from 'services/estimate/getDetail'
import { vehiculeDistanceModel } from 'models/vehicule'

export const createOrder = async (order: NewOrderServiceProps): Promise<OrderServicePropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const estimateProps = await getDetailEstimateById(order.estimateId)
    if (!estimateProps) throw String('Estimate Service not found')

    const attentionType = new AtentionsTypesModel(order.attentionType)
    const preliminarManagment = new PreliminarManagmentModel(order.preliminarManagment)
    const serviceType = new ServiceTypeOrderModel(order.serviceType)
    const typesActivitiesToDo = new TypesActivitiesToDoModel(order.typesActivitiesToDo)
    const traveled = new vehiculeDistanceModel(order.traveled)
    const dataCreated = new OrderServiceModel({
      attentionType,
      estimateProps,
      preliminarManagment,
      serviceType,
      typesActivitiesToDo,
      traveled,
    })

    attentionType.save({ session })
    preliminarManagment.save({ session })
    serviceType.save({ session })
    typesActivitiesToDo.save({ session })
    dataCreated.save({ session })
    traveled.save({ session })

    await session.commitTransaction()
    return dataCreated
  } catch (error) {
    await session.abortTransaction()
    throw new CreateOrderServiceError(String(error))
  } finally {
    session.endSession()
  }
}