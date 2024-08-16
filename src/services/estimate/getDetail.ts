import { Types } from 'mongoose'
import { EstimatePropierties } from 'interfaces'
import { EstimatedCostsModel } from 'models/estimate'

export const getDetailEstimateById = async (id: Types.ObjectId): Promise<EstimatePropierties | null> => {
  const dataResult = await EstimatedCostsModel.findById(id)
    .populate('activitiesToDo')
    .populate('requiredParts')
    .populate('otherRequirements')

  return dataResult
}

export const getAllEstimatesService = async (): Promise<EstimatePropierties[]> => {
  const dataResult = await EstimatedCostsModel.find()
    .populate('client')
    .populate('vehicule')
  return dataResult
}
