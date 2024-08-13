import { Status } from 'interfaces'
import { StatusModel } from 'models/status'

export const createStatus = async (description: string): Promise<Status> => {
  const response = await StatusModel.create({ description })

  return response
}
