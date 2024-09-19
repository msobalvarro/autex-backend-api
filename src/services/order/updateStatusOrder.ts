import { CreateBillError } from 'errors'
import { ActivityWithCostToDoItemEstimate, BillPropierties } from 'interfaces'
import _ from 'lodash'
import { BillModel } from 'models/bill'
import { OrderServiceModel } from 'models/order'
import mongoose, { Types } from 'mongoose'

export const closeOrderAndGenerateBillService = async (orderId: Types.ObjectId): Promise<BillPropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await OrderServiceModel.updateOne(
      { _id: orderId },
      { status: 'finished' },
      { session }
    )

    const order = await OrderServiceModel.findById(orderId)
      .populate('estimateProps')
    if (!order) throw new CreateBillError('order not found')

    const totalDetail = {
      activities: _.sumBy(order.estimateProps?.activitiesToDo, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
      parts: _.sumBy(order.estimateProps?.requiredParts, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
      external: _.sumBy(order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
      other: _.sumBy(order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
      additionalTask: _.sumBy(order.additionalTask, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
    }

    const total = _.sum(Object.values(totalDetail))
    const bill = new BillModel({
      tax: 0,
      total: total, // total + (total * 0.15)
      order,
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