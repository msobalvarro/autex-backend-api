import { WorkshopModel } from 'models/workshop'
import { Types } from 'mongoose'
import { deleteFileService } from 'services/files/deleteFile'

export const UpdateWorkshopLogoService = async (src: string, workshopId: string | Types.ObjectId) => {
  const workshop = await WorkshopModel.findOne({ _id: workshopId })

  if (workshop?.pictureUrl) {
    await deleteFileService(workshop.pictureUrl)
  }

  await WorkshopModel.updateOne({ _id: workshopId }, { pictureUrl: src })
}