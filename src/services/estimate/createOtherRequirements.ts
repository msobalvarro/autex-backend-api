import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { ItemWithCostEstimatedFieldModel } from 'models/estimate'

export const createOthersRequirements = async (otherRequirements: ActivityWithCostToDoItemEstimate[]): Promise<ActivityWithCostToDoItemEstimate[]> => {
  const dataCreated = await ItemWithCostEstimatedFieldModel.insertMany(otherRequirements)
  return dataCreated
}
