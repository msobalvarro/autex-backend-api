import mongoose, { Types } from 'mongoose'
import {
  NewOrderServiceProps,
  OrderServicePropierties
} from 'interfaces'
import {
  AtentionsTypesModel,
  OrderServiceModel,
  PreliminarManagmentModel,
  ServiceTypeOrderModel,
  TypesActivitiesToDoModel
} from 'models/order'
import { CreateOrderServiceError } from 'errors'
import { getDetailEstimateByIdService } from 'services/estimate/getEstimations'
import { vehiculeDistanceModel } from 'models/vehicule'
import { WorkshopModel } from 'models/workshop'
import { InventoryModel } from 'models/inventory'

export const createOrder = async (order: NewOrderServiceProps, workshopId: Types.ObjectId): Promise<OrderServicePropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const estimation = await getDetailEstimateByIdService(order.estimateId)
    if (!estimation) throw String('Estimate Service not found')
    const workshop = await WorkshopModel.findById(workshopId)
    if (!workshop) throw String('Workshop not found')

    const attentionType = new AtentionsTypesModel(order.attentionType)
    const preliminarManagment = new PreliminarManagmentModel(order.preliminarManagment)
    const serviceType = new ServiceTypeOrderModel(order.serviceType)
    const typesActivitiesToDo = new TypesActivitiesToDoModel(order.typesActivitiesToDo)
    const traveled = new vehiculeDistanceModel(order.traveled)
    const dataCreated = new OrderServiceModel({
      attentionType,
      estimateProps: estimation,
      preliminarManagment,
      serviceType,
      typesActivitiesToDo,
      traveled,
      workshop,
      estimationDate: order.estimationDate,
    })

    for (const partsOfInventort of estimation.requiredPartsInventory || []) {
      const stock = await InventoryModel.findOne({ _id: partsOfInventort.inventory?._id })

      if (!stock) throw String('Inventory not found')

      // update stock
      await InventoryModel.updateOne(
        { _id: partsOfInventort.inventory?._id },
        {
          stock: (stock.stock - partsOfInventort.count)
        },
        { session }
      )
    }

    attentionType.save({ session })
    preliminarManagment.save({ session })
    serviceType.save({ session })
    typesActivitiesToDo.save({ session })
    dataCreated.save({ session })
    traveled.save({ session })

    await session.commitTransaction()
    return dataCreated
  } catch (error) {
    await session.abortTransaction()
    throw new CreateOrderServiceError(String(error))
  } finally {
    session.endSession()
  }
}