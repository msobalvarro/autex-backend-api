import { UnitStatusDiagnosticModelPropierties } from 'interfaces';
import { UnitStatusModel } from 'models/diagnostic';

export const createUnitStatus = async (data: UnitStatusDiagnosticModelPropierties): Promise<UnitStatusDiagnosticModelPropierties> => {
  const dataCreated = await UnitStatusModel.create(data)

  return dataCreated
}
