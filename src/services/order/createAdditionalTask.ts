import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { ItemWithCostEstimatedFieldModel } from 'models/estimate'
import { OrderServiceModel } from 'models/order'
import { Types } from 'mongoose'

export const createOrAddAdditionalTask = async (resume: ActivityWithCostToDoItemEstimate[], id: Types.ObjectId): Promise<ActivityWithCostToDoItemEstimate[]> => {
  const list = await ItemWithCostEstimatedFieldModel.insertMany(resume)

  await OrderServiceModel.updateOne({ _id: id }, {
    $push: {
      additionalTask: list
    }
  })

  return resume
}
