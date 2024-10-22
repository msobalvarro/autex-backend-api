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

  // total part cost from estimate
  let totalPartsCost = 0

  // total external activities cost from estimate
  let totalExternalCost = 0

  // total activities planned to be carried out
  let totalLaborCost = 0

  // other requirements total cost
  let totalInputCost = 0

  // total taxes
  let totalTaxes = 0

  // total other services
  let totalOtherServices = 0

  // total all estimations
  let totalEstimate = 0

  // total order, sum adittional tasks
  let totalOrder = 0
  const ordersData = {
    // order complete or closed
    completeOrClose: {
      length: 0,
      sum: 0,
    },

    // order in process or pending
    processOrPending: {
      length: 0,
      sum: 0,
    },

    // total orders
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

      const bill = await BillModel.findOne({ order })
      ordersData.processOrPending.sum += bill?.total || 0
    }

    if (order.status === 'finished' || order.status === 'canceled') {
      ordersData.completeOrClose.length += 1

      const bill = await BillModel.findOne({ order })
      ordersData.completeOrClose.sum += bill?.total || 0
    }
  }

  for (const bill of bills) {
    const { order } = bill
    const { estimateProps: estimation } = order
    const aditionalTaskSum = sumBy(order.additionalTask, task => Number(task.total) || 0)

    // report for parts requireds
    totalPartsCost += estimation.partsCost
    totalExternalCost += estimation.externalCost
    totalLaborCost += estimation.laborCost
    totalInputCost += estimation.inputCost
    totalTaxes += (bill?.tax || 0)
    totalOtherServices = totalOtherServices + aditionalTaskSum
    totalEstimate += bill.order.estimateProps.total

    const totalAdditionalTask = sumBy(bill.order.additionalTask, task => task?.total || 0)
    totalOrder = totalOrder + (bill.order.estimateProps.total + totalAdditionalTask)

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
