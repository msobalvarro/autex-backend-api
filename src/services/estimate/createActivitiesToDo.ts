import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { ItemWithCostEstimatedFieldModel } from 'models/estimate'

export const createActivityToDoService = async (items: ActivityWithCostToDoItemEstimate[]): Promise<ActivityWithCostToDoItemEstimate[]> => {
  const activitiesField = await ItemWithCostEstimatedFieldModel.insertMany(items)
  return activitiesField
}
