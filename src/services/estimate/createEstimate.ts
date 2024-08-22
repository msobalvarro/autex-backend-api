import { CreateEstimatedError } from 'errors'
import { EstimateParamsPropierties, EstimatePropierties } from 'interfaces'
import { getClientByIdService } from 'services/client/getClient'
import { getVehiculeById } from 'services/vehicule/getVehicule'
import { createRequiredPartService } from './createRequiredParts'
import { createActivityToDoService } from './createActivitiesToDo'
import { createOthersRequirements } from './createOtherRequirements'
import { EstimatedCostsModel } from 'models/estimate'

export const createEstimateService = async (estimate: EstimateParamsPropierties): Promise<EstimatePropierties> => {
  const vehicule = await getVehiculeById(estimate.vehiculeId)
  if (!vehicule) {
    throw new CreateEstimatedError('Vehicule not found')
  }

  const client = await getClientByIdService(estimate.clientId)
  if (!client) {
    throw new CreateEstimatedError('Client not found')
  }

  const activitiesToDo = await createActivityToDoService(estimate.activitiesToDo)
  if (!activitiesToDo) {
    throw new CreateEstimatedError('Activity could not be created')
  }

  const requiredParts = await createRequiredPartService(estimate.requiredParts)
  if (!requiredParts) {
    throw new CreateEstimatedError('Parts could not be created')
  }

  const otherRequirements = await createOthersRequirements(estimate.otherRequirements)
  if (!otherRequirements) {
    throw new CreateEstimatedError('OtherRequirements could not be created')
  }

  const { inputCost, laborCost, partsCost, total } = estimate

  const estimateCreated = await EstimatedCostsModel.create({
    activitiesToDo,
    client,
    inputCost,
    laborCost,
    otherRequirements,
    requiredParts,
    partsCost,
    total,
    vehicule,
  })

  return estimateCreated
}
