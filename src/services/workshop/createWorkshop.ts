import { WorkshopPropierties } from 'interfaces';
import { WorkshopModel } from 'models/workshop';

export const createWorkshopService = async (workshop: WorkshopPropierties): Promise<WorkshopPropierties> => {
  const dataCreated = await WorkshopModel.create(workshop)
  return dataCreated
}
