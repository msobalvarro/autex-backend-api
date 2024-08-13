import { DiagnosticPropierties, DiagnosticProps } from 'interfaces'
import { getVehiculeById } from '../vehicule/getVehicule'
import { createUnitStatus } from './createUnitStatus'
import { CreateDiagnosticError } from 'errors'
import { createPreviousCheck } from './createPreviousCheck'
import { createCheckDone } from './createChecksDone'
import { createRecommendation } from './createRecommendations'
import { DiagnosticModel } from 'models/diagnostic'
import { getClientByIdService } from 'services/getClient'
import { createPossibleFailure } from './createPossibleFailures'

export const createDiagnoticService = async (diagnostic: DiagnosticProps): Promise<DiagnosticPropierties> => {
  const vehicule = await getVehiculeById(diagnostic.vehiculeId)
  if (!vehicule) {
    throw new CreateDiagnosticError('Vehicule not found')
  }

  const client = await getClientByIdService(diagnostic.clientId)
  if (!client) {
    throw new CreateDiagnosticError('Client not found')
  }

  const newUnitStatus = await createUnitStatus(diagnostic.unitStatus)
  if (!newUnitStatus) {
    throw new CreateDiagnosticError('Unit status not registered')
  }

  const newPreviousCheck = await createPreviousCheck(diagnostic.previusCheck)
  if (!newPreviousCheck) {
    throw new CreateDiagnosticError('Previous check not registered')
  }

  const newChecksDone = await createCheckDone(diagnostic.checksDone)
  if (!newChecksDone) {
    throw new CreateDiagnosticError('Check done not registered')
  }

  const newPossibleFailures = await createPossibleFailure(diagnostic.possibleFailures)
  if (!newPossibleFailures) {
    throw new CreateDiagnosticError('possible failures not registered')
  }

  const newRecommendations = await createRecommendation(diagnostic.recommendations)
  if (!newRecommendations) {
    throw new CreateDiagnosticError('Recommendations not registered')
  }

  const newDiagnostic = await DiagnosticModel.create({
    checksDone: newChecksDone,
    previusCheck: newPreviousCheck,
    recommendations: newRecommendations,
    unitStatus: newUnitStatus,
    possibleFailures: newPossibleFailures,
    vehicule,
    client,
  })

  return newDiagnostic

}

