import { Types } from 'mongoose'
import { ActivitiesGroupPropierties, EstimatePropierties } from 'interfaces'
import { EstimateModel } from 'models/estimate'
import { ActivitiesGroupModel } from 'models/groups'

export const getDetailEstimateById = async (id: Types.ObjectId): Promise<EstimatePropierties | null> => {
  const dataResult = await EstimateModel.findById(id)
    .populate('activitiesToDo')
    .populate('client')
    .populate('traveled')
    .populate({
      path: 'vehicule',
      populate: [
        {
          path: 'model',
        },
        {
          path: 'brand',
        }
      ]
    })
    .populate('requiredParts')
    .populate('otherRequirements')
    .populate('externalActivities')
    .populate('activitiesGroup')

  return dataResult
}

export const getDetailEstimateWithOrderById = async (id: Types.ObjectId): Promise<EstimatePropierties | null> => {
  const dataResult = await EstimateModel.findById(id)
    .populate('activitiesToDo')
    .populate('client')
    .populate({
      path: 'vehicule',
      populate: [
        {
          path: 'model',
        },
        {
          path: 'brand',
        }
      ]
    })
    .populate('requiredParts')
    .populate('otherRequirements')
    .populate('externalActivities')
    .populate('activitiesGroup')

  return dataResult
}

export const getAllEstimatesService = async (workshopId: Types.ObjectId): Promise<EstimatePropierties[]> => {
  const dataResult = await EstimateModel.find({ workshop: { _id: workshopId } })
    // const dataResult = await EstimatedCostsModel.find()
    .populate('client')
    .populate('vehicule')
    .sort({ createdAt: -1 })
  return dataResult
}

export const getActivitiesGroupService = async (): Promise<ActivitiesGroupPropierties[]> => {
  const data = await ActivitiesGroupModel.find()
  return data
}
