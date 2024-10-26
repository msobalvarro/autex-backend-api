import { CreateOrUpdateInventaryCategory, InventoryCategory } from 'interfaces'
import { InventoryCategoryModel } from 'models/inventory'
import { WorkshopModel } from 'models/workshop'

export const createInventaryCategoryService = async ({ description, workshopId }: CreateOrUpdateInventaryCategory): Promise<InventoryCategory> => {
  const workshop = await WorkshopModel.findById(workshopId)

  const category = await InventoryCategoryModel.create({
    description,
    workshop
  })

  return category
}