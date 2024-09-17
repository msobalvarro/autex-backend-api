import {
  OrderDataReportResponsePropierties,
  ReportProps,
  ReportResponsePropierties,
} from 'interfaces'
import { OrderServiceModel, TypesActivitiesToDoModel } from 'models/order'
import { Types } from 'mongoose'

export const getReportCountOrderService = async ({ from, to, workshopId }: ReportProps): Promise<ReportResponsePropierties[]> => {
  // const workshop = await WorkshopModel.findById(workshopId)

  const result = await OrderServiceModel.aggregate([
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
  ])

  const data: ReportResponsePropierties[] = await result.map(res => ({ count: res.count, date: res._id }))
  return data
}

export const getReportOrderService = async ({ from, to, workshopId }: ReportProps): Promise<OrderDataReportResponsePropierties> => {
  const orders = await OrderServiceModel.find({
    workshop: {
      _id: workshopId,
    },
    createdAt: {
      $gte: from,
      $lte: to
    },
  })

  const typesActivitiesIds: Types.ObjectId[] = orders.map(order => order.typesActivitiesToDo._id)
  const allServicesTypes = await TypesActivitiesToDoModel.find({ _id: { $in: typesActivitiesIds } })

  const corrective = allServicesTypes.filter(order => order.isCorrective).length
  const maintenance = allServicesTypes.filter(order => order.isMaintenance).length
  const minorMantenance = allServicesTypes.filter(order => order.isMinorMantenance).length
  const predictive = allServicesTypes.filter(order => order.isPredictive).length
  const preventive = allServicesTypes.filter(order => order.isPreventive).length
  const service = allServicesTypes.filter(order => order.isService).length

  return {
    corrective,
    maintenance,
    minorMantenance,
    predictive,
    preventive,
    service,
    total: typesActivitiesIds.length
  }
}
