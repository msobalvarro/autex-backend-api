import { CheckDoneDiagnosticPropierties } from 'interfaces'
import { ChecksDoneDiagnosticModel } from 'models/diagnostic'

export const createCheckDone = async (data: CheckDoneDiagnosticPropierties): Promise<CheckDoneDiagnosticPropierties> => {  
  const dataCreated = await ChecksDoneDiagnosticModel.create(data)

  return dataCreated
}