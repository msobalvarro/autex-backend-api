import { ActivityTypesDiagnosticPropierties } from 'interfaces'
import { ActivityTypeDiagnosticModel } from 'models/diagnostic'

export const createActivityTypeService =async  (activity: ActivityTypesDiagnosticPropierties): Promise<ActivityTypesDiagnosticPropierties> => { 
  const dataCreated = await ActivityTypeDiagnosticModel.create(activity)
  return dataCreated
}
