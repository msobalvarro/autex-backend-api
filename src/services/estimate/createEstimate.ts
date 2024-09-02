import mongoose from 'mongoose'
import { CreateEstimatedError } from 'errors'
import { EstimateParamsPropierties, EstimatePropierties } from 'interfaces'
import { getClientByIdService } from 'services/client/getClient'
import { getVehiculeById } from 'services/vehicule/getVehicule'
import { EstimatedCostsModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'
import { vehiculeDistanceModel } from 'models/vehicule'
import { ActivitiesGroupModel } from 'models/groups'

export const createEstimateService = async (estimate: EstimateParamsPropierties): Promise<EstimatePropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const vehicule = await getVehiculeById(estimate.vehiculeId)
    if (!vehicule) {
      throw new CreateEstimatedError('Vehicule not found')
    }

    const client = await getClientByIdService(estimate.clientId)
    if (!client) {
      throw new CreateEstimatedError('Client not found')
    }

    const activitiesToDo = await estimate.activitiesToDo.map(a => new ItemWithCostEstimatedFieldModel(a))
    const requiredParts = await estimate.requiredParts.map(a => new ItemWithCostEstimatedFieldModel(a))
    const otherRequirements = await estimate.otherRequirements.map(a => new ItemWithCostEstimatedFieldModel(a))
    const externalActivities = await estimate.externalActivities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const activitiesGroups = await estimate.activitiesGroups.map(act  => new ActivitiesGroupModel(act))
    const traveled = new vehiculeDistanceModel(estimate.traveled)

    const { inputCost, laborCost, partsCost, total, externalCost, activitiesGroupCost } = estimate

    const estimateCreated = new EstimatedCostsModel({
      activitiesToDo,
      client,
      inputCost,
      laborCost,
      otherRequirements,
      requiredParts,
      partsCost,
      externalCost,
      total,
      vehicule,
      externalActivities,
      traveled,
      activitiesGroups,
      activitiesGroupCost,
    })

    activitiesToDo.map(e => e.save({ session }))
    requiredParts.map(e => e.save({ session }))
    otherRequirements.map(e => e.save({ session }))
    externalActivities.map(e => e.save({ session }))
    traveled.save({ session })
    estimateCreated.save({ session })

    await session.commitTransaction()
    return estimateCreated
  } catch (error) {
    await session.abortTransaction()
    throw new CreateEstimatedError(String(error))
  } finally {
    session.endSession()
  }
}
