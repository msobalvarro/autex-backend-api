import _ from 'lodash'
import { CreateBillError } from 'errors'
import { ActivityWithCostToDoItemEstimate, BillCreateProps, BillPropierties } from 'interfaces'
import { BillModel } from 'models/bill'
import { OrderServiceModel } from 'models/order'

export const createBillService = async ({ orderId }: BillCreateProps): Promise<BillPropierties> => {
  const order = await OrderServiceModel.findById(orderId)
    .populate('estimateProps')
  if (!order) throw new CreateBillError('order not found')

  const totalDetail = {
    activities: _.sumBy(order.estimateProps?.activitiesToDo, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
    parts: _.sumBy(order.estimateProps?.requiredParts, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
    external: _.sumBy(order.estimateProps?.externalActivities, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
    other: _.sumBy(order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
    additionalTask: _.sumBy(order.additionalTask, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)) || 0,
  }

  const total = _.sum(Object.values(totalDetail))

  const bill = await BillModel.create({
    tax: 0,
    total: total, // total + (total * 0.15)
    order,
  })
  return bill
}