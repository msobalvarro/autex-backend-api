import { EstimateModel } from 'models/estimate'
import { Types } from 'mongoose'


export const deleteActivityToDo = async (acitivityId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      activitiesToDo: { _id: acitivityId },
    }
  })
  return true
}

export const deleteRequiredPart = async (requiredPartId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      requiredParts: { _id: requiredPartId },
    }
  })
  return true
}

export const deleteOtherRequirement = async (otherRequirementId: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      otherRequirements: { _id: otherRequirementId },
    }
  })
  return true
}

export const deleteExternalActivities = async (externalActivity: Types.ObjectId, estimateId: Types.ObjectId): Promise<boolean> => {
  await EstimateModel.updateOne({ _id: estimateId }, {
    $pull: {
      externalActivities: { _id: externalActivity },
    }
  })
  return true
}
