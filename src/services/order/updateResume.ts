import { UpdateResumeProps } from 'interfaces'
import { OrderServiceModel } from 'models/order'

export const updateResumeService = async ({ description, id }: UpdateResumeProps): Promise<boolean> => {
  await OrderServiceModel.updateOne({ _id: id }, { resume: description })

  return true
}
