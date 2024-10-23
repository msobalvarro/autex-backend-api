import { CreateOrUpdateInventaryCategory } from 'interfaces'
import { InventoryCategoryModel } from 'models/inventory'
import { WorkshopModel } from 'models/workshop'

export const createInventaryCategoryService = async ({ description, workshopId }: CreateOrUpdateInventaryCategory): Promise<void> => {
  const workshop = await WorkshopModel.findById(workshopId)

  await InventoryCategoryModel.create({
    description,
    workshop
  })
}