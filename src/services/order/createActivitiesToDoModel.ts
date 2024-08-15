import { AcivitiesProperties } from 'interfaces'
import { TypesActivitiesToDoModel } from 'models/order'

export const createActivitiesToDoModel = async (data: AcivitiesProperties): Promise<AcivitiesProperties> => {
  const dataCreated = await TypesActivitiesToDoModel.create(data)
  return dataCreated
}
