import { EstimateModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'
import { Types } from 'mongoose'

export const deleteActivityToDo = async (acitivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  const estimate = await EstimateModel.findById(estimateId)
  if (!estimate) throw new Error('estimate not found')
  const itemCost = await ItemWithCostEstimatedFieldModel.findById(acitivityId)
  if (!itemCost) throw new Error('item cost not found')

  await EstimateModel.find({ _id: estimateId }, {
    $pull: {
      activitiesToDo: { _id: acitivityId },
    },
    total: (estimate.total - Number(itemCost?.total))
  })


  return true
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
