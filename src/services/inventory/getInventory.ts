import { sumBy, filter } from 'lodash'
import { InventoryCategory, InventoryMinimalPropierties, InventoryPropierties, InventoryResponse } from 'interfaces'
import { InventoryCategoryModel, InventoryModel } from 'models/inventory'
import { Types } from 'mongoose'
import { WorkshopModel } from 'models/workshop'

interface Props {
  workshopId: Types.ObjectId
  categoryId?: string
}

export const getInventoryDataService = async ({ workshopId, categoryId }: Props): Promise<InventoryResponse> => {
  const workshop = await WorkshopModel.findById(workshopId)
  if (!workshop) throw new Error('workshop not found')

  const items = await InventoryModel.find({
    workshop,
    ...(categoryId && {
      category: {
        _id: new Types.ObjectId(categoryId)
      }
    })
  })

  const lowStock = filter(items, (item: InventoryPropierties) => item.stock <= (workshop.configuration.lowStock || 5)).length
  const totalValue = sumBy(items, (item: InventoryPropierties) => (item.stock * item.unitPrice))

  return {
    totalItems: items.length,
    items,
    lowStock,
    totalValue,
  }
}

export const getMinimalInventoryDataService = async ({ workshopId, categoryId }: Props): Promise<InventoryMinimalPropierties[]> => {
  const items = await InventoryModel.find({
    workshop: { _id: workshopId },
    ...(categoryId && {
      category: {
        _id: new Types.ObjectId(categoryId)
      }
    })
  })

  return items.map((item) => ({
    _id: item._id,
    name: item.name,
    stock: item.stock,
    unitPrice: item.unitPrice
  }))
}

export const getCategoriesService = async (workshopId: Types.ObjectId): Promise<InventoryCategory[]> => {
  const categories = await InventoryCategoryModel.find({ workshop: { _id: workshopId } })
  return categories
}
