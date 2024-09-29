import { ActivitiesGroupPropierties, ActivitiesGroupProps } from 'interfaces'
import { ActivitiesGroupModel } from 'models/groups'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

interface Props {
  data: ActivitiesGroupProps
  workshopId: Types.ObjectId
}

export const createAcitivitiesGroupService = async ({ data, workshopId }: Props): Promise<ActivitiesGroupPropierties> => {
  const workshop = await WorkshopModel.findById(workshopId)
  const dataCreated = await ActivitiesGroupModel.create({ ...data, workshop })
  return dataCreated
}
