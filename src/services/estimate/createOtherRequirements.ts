import { OtherRequirementsEstimatePropierties } from 'interfaces'
import { OtherRequirementsModel } from 'models/estimate'

export const createOthersRequirements = async (otherRequirements: OtherRequirementsEstimatePropierties): Promise<OtherRequirementsEstimatePropierties> => {
  const dataCreated = await OtherRequirementsModel.create(otherRequirements)
  return dataCreated
}
