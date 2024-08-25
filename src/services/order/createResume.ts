import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { ItemWithCostEstimatedFieldModel } from 'models/estimate'

export const createResumeList = async (resume: ActivityWithCostToDoItemEstimate[]): Promise<ActivityWithCostToDoItemEstimate[]> => {
  const dataCreated = await ItemWithCostEstimatedFieldModel.insertMany(resume)
  return dataCreated
}
