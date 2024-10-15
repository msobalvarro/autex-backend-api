import { sumBy } from 'lodash'
import { IncomeReportResponse } from 'interfaces'
import { BillModel } from 'models/bill'
import { Types } from 'mongoose'
import { OrderServiceModel } from 'models/order'

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
    populate: [
      {
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
      },
      {
        path: 'typesActivitiesToDo'
      }
    ]
  })

  const orders = await OrderServiceModel.find({ workshop: { _id: workshopId } })

  let totalPartsCost = 0
  let totalExternalCost = 0
  let totalLaborCost = 0
  let totalInputCost = 0
  let totalTaxes = 0
  let totalOtherServices = 0
  let totalEstimate = 0
  let totalOrder = 0
  const ordersData = {
    completeOrClose: {
      length: 0,
      sum: 0,
    },
    processOrPending: {
      length: 0,
      sum: 0,
    },
    total: {
      length: 0,
      sum: 0,
    },
  }
  const billsData = {
    total: bills.length,
    totalTaxes: sumBy(bills, bill => bill.tax || 0),
    totalBill: sumBy(bills, bill => bill.total)
  }
  const receipts = {
    mantMajor: {
      length: 0,
      sum: 0,
    },
    mantMenor: {
      length: 0,
      sum: 0,
    },
    servMenor: {
      length: 0,
      sum: 0,
    },
    servMajor: {
      length: 0,
      sum: 0,
    },
  }

  for (const order of orders) {
    if (order.status === 'pending' || order.status === 'process') {
      ordersData.processOrPending.length += 1
      // ordersData.processOrPending.sum += bill.total
    }

    if (order.status === 'finished' || order.status === 'canceled') {
      ordersData.completeOrClose.length += 1
      // ordersData.completeOrClose.sum += bill.total
    }
  }

  for (const bill of bills) {
    const { order } = bill
    const { estimateProps: estimation } = order
    const aditionalTaskSum = sumBy(order.additionalTask, task => Number(task.total) || 0)

    // report for parts requireds
    totalPartsCost = totalPartsCost + estimation.partsCost
    totalExternalCost = totalExternalCost + estimation.externalCost
    totalLaborCost = totalLaborCost + estimation.laborCost
    totalInputCost = totalInputCost + estimation.inputCost
    totalTaxes = totalTaxes + (bill?.tax || 0)
    totalOtherServices = totalOtherServices + aditionalTaskSum
    totalEstimate = totalEstimate + bill.order.estimateProps.total
    totalOrder = totalOrder + (bill.order.estimateProps.total + sumBy(bill.order.additionalTask, task => task?.total || 0))

    if (order.typesActivitiesToDo.isMaintenance && order.typesActivitiesToDo.isMajorMantenance) {
      receipts.mantMajor.sum += bill.total
      receipts.mantMajor.length += 1
    }

    if (order.typesActivitiesToDo.isMaintenance && order.typesActivitiesToDo.isMinorMantenance) {
      receipts.mantMenor.sum += bill.total
      receipts.mantMenor.length += 1
    }

    if (order.typesActivitiesToDo.isService && order.typesActivitiesToDo.isMajorMantenance) {
      receipts.servMajor.sum = receipts.servMajor.sum + bill.total
      receipts.servMajor.length += 1
    }

    if (order.typesActivitiesToDo.isService && order.typesActivitiesToDo.isMinorMantenance) {
      receipts.servMenor.sum += bill.total
      receipts.servMenor.length += 1
    }
  }

  return {
    totalPartsCost,
    totalExternalCost,
    totalLaborCost,
    totalInputCost,
    totalTaxes,
    totalOtherServices,
    totalEstimate,
    bill: billsData,
    order: ordersData,
    receipts,
  }
}
