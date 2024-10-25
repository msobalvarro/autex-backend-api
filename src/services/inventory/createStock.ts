import { InventoryPropierties } from 'interfaces'
import { InventoryCategoryModel, InvetoryModel } from 'models/inventory'
import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

interface Props {
  name: string
  unitPrice: number
  stock: number
  categoryIds: Types.ObjectId[]
  workshopId: Types.ObjectId
}

export const CreateStockService = async ({ name, stock, unitPrice, workshopId, categoryIds }: Props): Promise<InventoryPropierties> => {
  const categories = await InventoryCategoryModel.find({ _id: { $in: categoryIds } })
  const workshop = await WorkshopModel.findById(workshopId)

  return await InvetoryModel.create({
    name,
    stock,
    unitPrice,
    category: categories,
    workshop,
  })
}