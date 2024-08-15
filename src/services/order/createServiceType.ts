import { ServicesTypesToDoOrderProperties } from 'interfaces'
import { ServiceTypeOrderModel } from 'models/order'

export const createServiceTypeService = async (data: ServicesTypesToDoOrderProperties): Promise<ServicesTypesToDoOrderProperties> => {
  const dataCreated = await ServiceTypeOrderModel.create(data)
  return dataCreated
}
