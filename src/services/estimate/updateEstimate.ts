import mongoose, { Types } from 'mongoose'
import _ from 'lodash'
import { UpdateEstimateError } from 'errors'
import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { EstimateModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'
import { getOrderByEstimateId } from 'services/order/getOrder'

export const deleteActivityToDoService = async (acitivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw String('estimate not found')
    const itemCost = await ItemWithCostEstimatedFieldModel.findById(acitivityId)
    if (!itemCost) throw String('item cost not found')

    await ItemWithCostEstimatedFieldModel.deleteOne({ _id: acitivityId }, { session })

    await EstimateModel.updateOne(
      { _id: estimate._id },
      {
        $pull: {
          activitiesToDo: { _id: itemCost._id },
        },
        total: (estimate.total - Number(itemCost?.total))
      }, { session }
    )
    await session.commitTransaction()
    return true
  } catch (error) {
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const addActivityToDoService = async (activities: ActivityWithCostToDoItemEstimate[], estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')

    const activitiesModels = await activities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const totalAcum = _.sumBy(activities, (a) => Number(a.total))

    await EstimateModel.updateOne(
      { _id: estimateId },
      { $push: { activitiesToDo: activitiesModels } },
      { total: (estimate.total + totalAcum) }
    )

    await activitiesModels.map(a => a.save({ session }))
    await session.commitTransaction()
    return true
  } catch (error) {
    await session.abortTransaction()
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const deleteRequiredPartService = async (requiredPartId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const itemCost = await ItemWithCostEstimatedFieldModel.findById(requiredPartId)
    if (!itemCost) throw new Error('item cost not found')

    await ItemWithCostEstimatedFieldModel.deleteOne({ _id: requiredPartId }, { session })

    await EstimateModel.updateOne({ _id: estimateId }, {
      $pull: {
        activitiesToDo: { _id: itemCost._id },
      },
      total: (estimate.total - Number(itemCost?.total))
    })

    await session.commitTransaction()
    return true
  } catch (error) {
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const addRequiredPartsService = async (activities: ActivityWithCostToDoItemEstimate[], estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')

    const items = await activities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const totalAcum = _.sumBy(activities, (a) => Number(a.total))

    await EstimateModel.updateOne(
      { _id: estimateId },
      { $push: { requiredParts: items } },
      { total: (estimate.total + totalAcum) }
    )

    await items.map(a => a.save({ session }))
    await session.commitTransaction()
    return true
  } catch (error) {
    await session.abortTransaction()
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const deleteOtherRequirementService = async (otherRequirementId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const itemCost = await ItemWithCostEstimatedFieldModel.findById(otherRequirementId)
    if (!itemCost) throw new Error('item cost not found')

    await ItemWithCostEstimatedFieldModel.deleteOne({ _id: otherRequirementId }, { session })

    await EstimateModel.updateOne({ _id: estimateId }, {
      $pull: {
        otherRequirements: { _id: otherRequirementId },
      },
      total: (estimate.total - Number(itemCost?.total))
    })
    await session.commitTransaction()
    return true
  } catch (error) {
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const addOthersRequirements = async (activities: ActivityWithCostToDoItemEstimate[], estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')

    const items = await activities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const totalAcum = _.sumBy(activities, (a) => Number(a.total))

    await EstimateModel.updateOne(
      { _id: estimateId },
      { $push: { otherRequirements: items } },
      { total: (estimate.total + totalAcum) }
    )

    await items.map(a => a.save({ session }))
    await session.commitTransaction()
    return true
  } catch (error) {
    await session.abortTransaction()
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const deleteExternalActivitiesService = async (externalActivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {

    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const itemCost = await ItemWithCostEstimatedFieldModel.findById(externalActivityId)
    if (!itemCost) throw new Error('item cost not found')

    await ItemWithCostEstimatedFieldModel.deleteOne({ _id: externalActivityId }, { session })

    await EstimateModel.updateOne({ _id: estimateId }, {
      $pull: {
        externalActivities: { _id: externalActivityId },
      },
      total: (estimate.total - Number(itemCost?.total))
    })
    return true
  } catch (error) {
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const addExternalActivitiesServices = async (activities: ActivityWithCostToDoItemEstimate[], estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')
    const order = await getOrderByEstimateId(estimateId)
    if (order) throw String('Could not be update, because existing order')

    const items = await activities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const totalAcum = _.sumBy(activities, (a) => Number(a.total))

    await EstimateModel.updateOne(
      { _id: estimateId },
      { $push: { externalActivities: items } },
      { total: (estimate.total + totalAcum) }
    )

    await items.map(a => a.save({ session }))
    await session.commitTransaction()
    return true
  } catch (error) {
    await session.abortTransaction()
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}