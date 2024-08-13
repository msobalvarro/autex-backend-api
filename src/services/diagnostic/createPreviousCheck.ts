import { PreviusCheckDiagnosticPropierties } from 'interfaces';
import { PreviusCheckDiagnosticModel } from 'models/diagnostic';

export const createPreviousCheck = async (data: PreviusCheckDiagnosticPropierties): Promise<PreviusCheckDiagnosticPropierties> => {
  const dataCreated = await PreviusCheckDiagnosticModel.create(data)
  return dataCreated
}
