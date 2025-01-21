import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'

export const registerLogoService = async (src: string, workshopId: string | Types.ObjectId) => {
  await WorkshopModel.updateOne({ _id: workshopId }, { pictureUrl: src })
}