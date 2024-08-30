import { UserModel } from 'models/user';
import { WorkshopModel } from 'models/workshop';
import { Types } from 'mongoose';

export const assignUserToWorkshop = async (userId: Types.ObjectId, workshopId: Types.ObjectId): Promise<boolean> => {
  const user = await UserModel.findById(userId)

  await WorkshopModel.updateOne({ _id: workshopId }, {
    $push: { users: user }
  })

  return true
}