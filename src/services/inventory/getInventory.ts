import { sumBy, filter } from 'lodash'
import { InventoryPropierties, InventoryResponse } from 'interfaces'
import { InventoryModel } from 'models/inventory'
import { Types } from 'mongoose'

interface Props {
  workshopId: Types.ObjectId
  categoryId?: string
}

export const getInventoryDataService = async ({ workshopId, categoryId }: Props): Promise<InventoryResponse> => {
  console.log(categoryId)

  const items = await InventoryModel.find({
    workshop: { _id: workshopId },
    ...(categoryId && {
      category: {
        _id: new Types.ObjectId(categoryId)
      }
    })
  }).populate('workshop')

  const lowStock = filter(items, (item: InventoryPropierties) => item.stock > (item.workshop.configuration.lowStock || 5)).length
  const totalValue = sumBy(items, (item: InventoryPropierties) => (item.stock * item.unitPrice))

  return {
    totalItems: items.length,
    items,
    lowStock,
    totalValue,
  }
}