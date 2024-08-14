import { DiagnosticPropierties, DiagnosticProps } from 'interfaces'
import { getVehiculeById } from '../vehicule/getVehicule'
import { createUnitStatus } from './createUnitStatus'
import { CreateDiagnosticError } from 'errors'
import { createPreviousCheck } from './createPreviousCheck'
import { createCheckDone } from './createChecksDone'
import { createRecommendation } from './createRecommendations'
import { DiagnosticModel } from 'models/diagnostic'
import { getClientByIdService } from 'services/client/getClient'
import { createPossibleFailure } from './createPossibleFailures'
import { createActivityTypeService } from './createActivityType'

export const createDiagnoticService = async (diagnostic: DiagnosticProps): Promise<DiagnosticPropierties> => {
  const vehicule = await getVehiculeById(diagnostic.vehiculeId)
  if (!vehicule) {
    throw new CreateDiagnosticError('Vehicule not found')
  }
  
  const client = await getClientByIdService(diagnostic.clientId)
  if (!client) {
    throw new CreateDiagnosticError('Client not found')
  }

  const unitStatus = await createUnitStatus(diagnostic.unitStatus)
  if (!unitStatus) {
    throw new CreateDiagnosticError('Unit status not registered')
  }

  console.log(unitStatus)

  const previousCheck = await createPreviousCheck(diagnostic.previousCheck)
  if (!previousCheck) {
    throw new CreateDiagnosticError('Previous check not registered')
  }


  const checksDone = await createCheckDone(diagnostic.checksDone)
  if (!checksDone) {
    throw new CreateDiagnosticError('Check done not registered')
  }

  const possibleFailures = await createPossibleFailure(diagnostic.possibleFailures)
  if (!possibleFailures) {
    throw new CreateDiagnosticError('possible failures not registered')
  }

  const activityType = await createActivityTypeService(diagnostic.activityType)
  if (!activityType) {
    throw new CreateDiagnosticError('activity types not registered')
  }

  const recommendations = await createRecommendation(diagnostic.recommendations)
  if (!recommendations) {
    throw new CreateDiagnosticError('Recommendations not registered')
  }

  const newDiagnostic = await DiagnosticModel.create({
    checksDone,
    previousCheck,
    recommendations,
    unitStatus,
    possibleFailures,
    activityType,
    vehicule,
    client,
  })

  return newDiagnostic

}

