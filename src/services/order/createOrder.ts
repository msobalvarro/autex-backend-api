import { NewOrderServiceProps, OrderServicePropierties } from 'interfaces'
import { OrderServiceModel } from 'models/order'
import { createAttentionTypesService } from './createAtentionType'
import { CreateOrderServiceError } from 'errors'
import { getDetailEstimateById } from 'services/estimate/getDetail'
import { createPreliminarManagmentService } from './createPreliminarManagment'
import { createServiceTypeService } from './createServiceType'
import { createActivitiesToDoModel } from './createActivitiesToDoModel'

export const createOrder = async (order: NewOrderServiceProps): Promise<OrderServicePropierties> => {
  const estimateProps = await getDetailEstimateById(order.estimateId)
  if (!estimateProps) throw new CreateOrderServiceError('Estimate order not found')

  const attentionType = await createAttentionTypesService(order.attentionType)
  if (!attentionType) throw new CreateOrderServiceError('attention could not be created')

  const preliminarManagment = await createPreliminarManagmentService(order.preliminarManagment)
  if (!preliminarManagment) throw new CreateOrderServiceError('Preliminar Managment could not be created')

  const serviceType = await createServiceTypeService(order.serviceType)
  if (!serviceType) throw new CreateOrderServiceError('Service type could not be created')

  const typesActivitiesToDo = await createActivitiesToDoModel(order.typesActivitiesToDo)
  if (!typesActivitiesToDo) throw new CreateOrderServiceError('Types activities to do could not be created')

  const dataCreated = await OrderServiceModel.create({
    attentionType,
    estimateProps,
    preliminarManagment,
    serviceType,
    typesActivitiesToDo,
  })

  return dataCreated
}