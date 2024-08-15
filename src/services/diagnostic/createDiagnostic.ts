import { DiagnosticPropierties, DiagnosticProps } from 'interfaces'
import { getVehiculeById } from '../vehicule/getVehicule'
import { CreateDiagnosticError } from 'errors'
import { createRecommendation } from './createRecommendations'
import {
  ActivityTypeDiagnosticModel,
  ChecksDoneDiagnosticModel,
  DiagnosticModel,
  PossibleFailuresDiagnosticModel,
  PreviousCheckDiagnosticModel,
  UnitStatusModel
} from 'models/diagnostic'
import { getClientByIdService } from 'services/client/getClient'
import mongoose from 'mongoose'

export const createDiagnoticService = async (diagnostic: DiagnosticProps): Promise<DiagnosticPropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const vehicule = await getVehiculeById(diagnostic.vehiculeId)
    if (!vehicule) {
      throw new CreateDiagnosticError('Vehicule not found')
    }

    const client = await getClientByIdService(diagnostic.clientId)
    if (!client) {
      throw new CreateDiagnosticError('Client not found')
    }

    const unitStatus = new UnitStatusModel(diagnostic.unitStatus)
    const previousCheck = new PreviousCheckDiagnosticModel(diagnostic.previousCheck)
    const checksDone = new ChecksDoneDiagnosticModel(diagnostic.checksDone)
    const possibleFailures = new PossibleFailuresDiagnosticModel(diagnostic.possibleFailures)
    const activityType = new ActivityTypeDiagnosticModel(diagnostic.activityType)
    const recommendations = await createRecommendation(diagnostic.recommendations)
    if (!recommendations) {
      throw new CreateDiagnosticError('Recommendations not registered')
    }

    const newDiagnostic = new DiagnosticModel({
      checksDone,
      previousCheck,
      recommendations,
      unitStatus,
      possibleFailures,
      activityType,
      vehicule,
      client,
    })

    unitStatus.save({ session })
    previousCheck.save({ session })
    checksDone.save({ session })
    possibleFailures.save({ session })
    newDiagnostic.save({ session })

    return newDiagnostic
  } catch (error) {
    await session.abortTransaction()
    throw new CreateDiagnosticError(String(error))
  } finally {
    session.endSession()
  }
}

