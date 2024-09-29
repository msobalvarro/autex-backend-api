import { ActivitiesGroupModel } from 'models/groups'
import { Types } from 'mongoose'

interface Props {
  workshopId: Types.ObjectId
  activityId: Types.ObjectId
  activities: string[]
}

export const updateActivityGroupService = async ({ activities, activityId, workshopId }: Props): Promise<boolean> => {
  await ActivitiesGroupModel.updateOne(
    {
      _id: activityId,
      workshop: {
        _id: workshopId
      }
    },
    {

      activities
    }
  )
  return true
}