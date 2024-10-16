import { CreateBillError } from 'errors'
import { ActivityWithCostToDoItemEstimate, BillPropierties } from 'interfaces'
import _ from 'lodash'
import { BillModel } from 'models/bill'
import { OrderServiceModel } from 'models/order'
import { WorkshopModel } from 'models/workshop'
import mongoose, { Types } from 'mongoose'
import { getOrderByIdService } from 'services/order/getOrder'

export const closeOrderAndGenerateBillService = async (orderId: Types.ObjectId, workshopId: Types.ObjectId): Promise<BillPropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await OrderServiceModel.updateOne(
      { _id: orderId },
      { status: 'finished' },
      { session }
    )

    const order = await getOrderByIdService(orderId)
    if (!order) throw new CreateBillError('order not found')

    const totalDetail = {
      activities: _.sumBy(order.estimateProps?.activitiesToDo, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
      parts: _.sumBy(order.estimateProps?.requiredParts, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
      external: _.sumBy(order.estimateProps?.externalActivities, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
      other: _.sumBy(order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
      additionalTask: _.sumBy(order.additionalTask, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    }

    const workshop = await WorkshopModel.findById(workshopId)
    const total = _.sum(Object.values(totalDetail))
    const tax = workshop?.configuration.fee ? (total * 0.15) : 0
    const bill = new BillModel({
      subtotal: total,
      tax,
      total: total + tax,
      order,
      workshop,
    })

    await bill.save({ session })
    await session.commitTransaction()
    return bill
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}