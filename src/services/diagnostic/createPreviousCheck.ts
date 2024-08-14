import { PreviousCheckDiagnosticPropierties } from 'interfaces';
import { PreviousCheckDiagnosticModel } from 'models/diagnostic';

export const createPreviousCheck = async (data: PreviousCheckDiagnosticPropierties): Promise<PreviousCheckDiagnosticPropierties> => {
  const dataCreated = await PreviousCheckDiagnosticModel.create(data)
  return dataCreated
}
