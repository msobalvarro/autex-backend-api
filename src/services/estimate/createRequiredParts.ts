import { RequiredPartsEstimatePropierties } from 'interfaces'
import { RequiredPartsModel } from 'models/estimate'

export const createRequiredPartService = async (parts: RequiredPartsEstimatePropierties): Promise<RequiredPartsEstimatePropierties> => {
  const dataCreated = await RequiredPartsModel.create(parts)

  return dataCreated
}
