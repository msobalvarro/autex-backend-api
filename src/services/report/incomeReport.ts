import _ from 'lodash'
import { IncomeReportResponse } from 'interfaces'
import { BillModel } from 'models/bill'
import { Types } from 'mongoose'

interface Props {
  workshopId: Types.ObjectId
  from: Date
  to: Date
}

export const incomeReportService = async ({ workshopId, from, to }: Props): Promise<IncomeReportResponse> => {
  const bills = await BillModel.find({
    workshop: {
      _id: workshopId
    },
    createdAt: {
      $gte: from,
      $lte: to
    },
  }).populate({
    path: 'order',
    populate: {
      path: 'estimateProps',
      populate: [
        { path: 'client', select: '-vehicules' },
        {
          path: 'vehicule',
          populate: [
            { path: 'brand', select: '-models' },
            { path: 'model', select: '-vehicules' },
          ]
        },
        { path: 'activitiesToDo' },
        { path: 'requiredParts' },
        { path: 'otherRequirements' },
        { path: 'externalActivities' },
      ]
    }
  })

  let totalPartsCost: number = 0
  let totalExternalCost: number = 0
  let totalLaborCost: number = 0
  let totalInputCost: number = 0
  let totalTaxes: number = 0
  let totalOtherServices: number = 0

  for (const bill of bills) {
    const { order } = bill
    const { estimateProps: estimation } = order
    const aditionalTaskSum = _.sumBy(order.additionalTask, task => Number(task.total) || 0)

    // report for parts requireds
    totalPartsCost = totalPartsCost + estimation.partsCost
    totalExternalCost = totalExternalCost + estimation.externalCost
    totalLaborCost = totalLaborCost + estimation.laborCost
    totalInputCost = totalInputCost + estimation.inputCost
    totalTaxes = totalTaxes + (Number(bill?.tax) | 0)
    totalOtherServices = totalOtherServices + aditionalTaskSum
  }

  return {
    totalPartsCost,
    totalExternalCost,
    totalLaborCost,
    totalInputCost,
    totalTaxes,
    totalOtherServices
  }
}
