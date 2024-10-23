import { InventoryCategoryModel, InvetoryModel } from 'models/inventory'
import { Types } from 'mongoose'

interface Props {
  inventoryId: Types.ObjectId
  categories: Types.ObjectId[]
  name: string
  stock: number
  unitPrice: number
}

export const updateStockInventaryService = async ({ inventoryId, categories, name, stock, unitPrice }: Props): Promise<void> => {
  const item = await InvetoryModel.findById(inventoryId)
  if (!item) throw new Error('item not found')

  if (item?.category.toString() !== categories.toString()) {
    const newCategories = await InventoryCategoryModel.find({ _id: { $in: categories } })
    await InvetoryModel.updateOne({ _id: inventoryId }, { category: newCategories })
  }

  if (item?.name !== name || item?.unitPrice !== unitPrice || item?.stock !== stock) {
    await InvetoryModel.updateOne({ _id: inventoryId }, { name, stock, unitPrice })
  }
}
