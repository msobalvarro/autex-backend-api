import { PossibleFailuresDiagnosticPropierties } from 'interfaces'
import { PossibleFailuresDiagnosticModel } from 'models/diagnostic'

export const createPossibleFailure = async(failure: PossibleFailuresDiagnosticPropierties): Promise<PossibleFailuresDiagnosticPropierties> => {
  const dataCreated = await PossibleFailuresDiagnosticModel.create(failure)
  return dataCreated
}
