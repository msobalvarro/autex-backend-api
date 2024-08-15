import { PreliminaryManagementProperties } from 'interfaces'
import { PreliminarManagmentModel } from 'models/order'

export const createPreliminarManagmentService = async (data: PreliminaryManagementProperties): Promise<PreliminaryManagementProperties> => {
  const dataCreated = await PreliminarManagmentModel.create(data)
  return dataCreated
}
