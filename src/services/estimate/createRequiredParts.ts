import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { ItemWithCostEstimatedFieldModel } from 'models/estimate'

export const createRequiredPartService = async (parts: ActivityWithCostToDoItemEstimate[]): Promise<ActivityWithCostToDoItemEstimate[]> => {
  const dataCreated = await ItemWithCostEstimatedFieldModel.insertMany(parts)

  return dataCreated
}
