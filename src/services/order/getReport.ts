import {
  ReportProps,
  ReportResponsePropierties
} from 'interfaces'
import { OrderServiceModel } from 'models/order'

export const getReportOrderService = async ({ from, to, workshopId }: ReportProps): Promise<ReportResponsePropierties[]> => {
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
