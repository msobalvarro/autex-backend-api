import { ActivitiesToDoProperties } from 'interfaces'
import { ActivitiesToDoModel } from 'models/activities'

export const createActitiyToDo = async (description: string): Promise<ActivitiesToDoProperties> => {
  const response = await ActivitiesToDoModel.create({ description })

  return response
}
