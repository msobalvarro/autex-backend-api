import _ from 'lodash'
import { UpdateEstimateError } from 'errors'
import { ActivityWithCostToDoItemEstimate } from 'interfaces'
import { EstimateModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'
import mongoose, { Types } from 'mongoose'

export const deleteActivityToDoService = async (acitivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const estimate = await EstimateModel.findById(estimateId)
  if (!estimate) throw new Error('estimate not found')
  const itemCost = await ItemWithCostEstimatedFieldModel.findById(acitivityId)
  if (!itemCost) throw new Error('item cost not found')
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      activitiesToDo: { _id: acitivityId },
    },
    total: (estimate.total - Number(itemCost?.total))
  })
  return true
}

export const addActivityToDoService = async (acitivities: ActivityWithCostToDoItemEstimate[], estimateId: Types.ObjectId): Promise<boolean> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const estimate = await EstimateModel.findById(estimateId)
    if (!estimate) throw new Error('estimate not found')

    const acitivitiesModels = acitivities.map(act => new ItemWithCostEstimatedFieldModel(act))
    const totalAcum = _.sumBy(acitivities, (a) => Number(a.total))

    await EstimateModel.updateOne({ _id: estimateId }, {
      $push: {
        activitiesToDo: acitivitiesModels
      }
    }, { session })

    await EstimateModel.updateOne({ _id: estimateId }, {
      total: (estimate.total + totalAcum)
    }, { session })

    acitivitiesModels.map(act => act.save({ session }))
    await session.commitTransaction()
    return true
  } catch (error) {
    await session.abortTransaction()
    throw new UpdateEstimateError(String(error))
  } finally {
    session.endSession()
  }
}

export const deleteRequiredPart = async (requiredPartId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const estimate = await EstimateModel.findById(estimateId)
  if (!estimate) throw new Error('estimate not found')
  const itemCost = await ItemWithCostEstimatedFieldModel.findById(requiredPartId)
  if (!itemCost) throw new Error('item cost not found')
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      requiredParts: { _id: requiredPartId },
    },
    total: (estimate.total - Number(itemCost?.total))
  })
  return true
}

export const deleteOtherRequirement = async (otherRequirementId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const estimate = await EstimateModel.findById(estimateId)
  if (!estimate) throw new Error('estimate not found')
  const itemCost = await ItemWithCostEstimatedFieldModel.findById(otherRequirementId)
  if (!itemCost) throw new Error('item cost not found')
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      otherRequirements: { _id: otherRequirementId },
    },
    total: (estimate.total - Number(itemCost?.total))
  })
  return true
}

export const deleteExternalActivities = async (externalActivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const estimate = await EstimateModel.findById(estimateId)
  if (!estimate) throw new Error('estimate not found')
  const itemCost = await ItemWithCostEstimatedFieldModel.findById(externalActivityId)
  if (!itemCost) throw new Error('item cost not found')
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      externalActivities: { _id: externalActivityId },
    },
    total: (estimate.total - Number(itemCost?.total))
  })
  return true
}
