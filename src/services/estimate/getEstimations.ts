import { Types } from 'mongoose'
import {
  ActivitiesGroupPropierties,
  EstimatePropierties,
  ReportResponsePropierties,
  ReportProps
} from 'interfaces'
import { EstimateModel } from 'models/estimate'
import { ActivitiesGroupModel } from 'models/groups'
import { WorkshopModel } from 'models/workshop'

export const getDetailEstimateByIdService = async (id: Types.ObjectId): Promise<EstimatePropierties | null> => {
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

export const getDetailEstimateWithOrderByIdService = async (id: Types.ObjectId): Promise<EstimatePropierties | null> => {
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
    .populate('client')
    .populate('vehicule')
    .sort({ createdAt: -1 })
  return dataResult
}

export const getAllEstimatesByClientIdService = async (clientId: string): Promise<EstimatePropierties[]> => {
  const dataResult = await EstimateModel.find({ client: { _id: clientId } })
    .populate({
      path: 'vehicule',
      populate: [{ path: 'brand', select: '-model' }, { path: 'model' }]
    })
    .sort({ createdAt: -1 })
    .select('-client')
  return dataResult
}

export const getActivitiesGroupService = async (): Promise<ActivitiesGroupPropierties[]> => {
  const data = await ActivitiesGroupModel.find()
  return data
}

export const getReportEstimationByDateService = async ({ from, to, workshopId }: ReportProps): Promise<ReportResponsePropierties[]> => {
  // const workshop = await WorkshopModel.findById(workshopId)

  const result = await EstimateModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: from,
          $lte: to
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%m-%d-%Y', date: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { 
      $sort: { _id: 1 }
    }

  ]);

  const data: ReportResponsePropierties[] = await result.map(res => ({ count: res.count, date: res._id }))
  return data
}
