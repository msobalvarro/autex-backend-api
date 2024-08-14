import { ActivityToDoEstimatePropierties } from 'interfaces'
import { ActivitiesToDoModel } from 'models/estimate'

export const createActivityToDoService = async (activities: ActivityToDoEstimatePropierties): Promise<ActivityToDoEstimatePropierties> => {
  const dataCreated = await ActivitiesToDoModel.create(activities)

  return dataCreated
}
