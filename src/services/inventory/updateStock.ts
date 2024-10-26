import { InventoryCategoryModel, InventoryModel } from 'models/inventory'
import { Types } from 'mongoose'

interface Props {
  inventoryId: Types.ObjectId
  categories: Types.ObjectId[]
  name: string
  stock: number
  unitPrice: number
  workshopId: Types.ObjectId
}

export const updateStockInventaryService = async ({ inventoryId, categories, name, stock, unitPrice, workshopId }: Props): Promise<void> => {
  const item = await InventoryModel.findById(inventoryId)
  if (!item) throw new Error('item not found')
  if (item.workshop._id !== workshopId) throw new Error('not authorized')

  if (item?.category.toString() !== categories.toString()) {
    const newCategories = await InventoryCategoryModel.find({ _id: { $in: categories } })
    await InventoryModel.updateOne({ _id: inventoryId }, { category: newCategories })
  }

  if (item?.name !== name || item?.unitPrice !== unitPrice || item?.stock !== stock) {
    await InventoryModel.updateOne({ _id: inventoryId }, { name, stock, unitPrice })
  }
}
