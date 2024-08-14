import { ActivityToDoEstimatePropierties } from 'interfaces'
import { ActivitiesToDoModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'

export const createActivityToDoService = async (activities: ActivityToDoEstimatePropierties): Promise<ActivityToDoEstimatePropierties> => {
  const activitiesField = await ItemWithCostEstimatedFieldModel.insertMany(activities.activities)

  const dataCreated = await ActivitiesToDoModel.create({
    ...activities,
    activities: activitiesField
  })
  return dataCreated
}
