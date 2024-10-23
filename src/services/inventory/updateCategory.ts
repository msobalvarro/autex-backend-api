import { CreateOrUpdateInventaryCategory } from 'interfaces'
import { InventoryCategoryModel } from 'models/inventory'
import { Types } from 'mongoose'

interface Props extends CreateOrUpdateInventaryCategory {
  categoryId: Types.ObjectId
  workshopId: Types.ObjectId
}

export const updateInvetaryCategoryService = async ({ categoryId, workshopId, description }: Props): Promise<void> => {
  const category = await InventoryCategoryModel.findById(categoryId)
  if (category?.workshop._id !== workshopId) throw new Error('not authorized')
  await InventoryCategoryModel.updateOne({ _id: categoryId }, { description })
}
