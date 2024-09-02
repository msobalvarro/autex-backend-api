import { ActivitiesGroupPropierties, ActivitiesGroupProps } from 'interfaces'
import { ActivitiesGroupModel } from 'models/groups'

export const createAcitivitiesGroupService = async (data: ActivitiesGroupProps): Promise<ActivitiesGroupPropierties> => {
  const dataCreated = await ActivitiesGroupModel.create(data)
  return dataCreated
}
