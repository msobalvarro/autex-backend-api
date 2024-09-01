import { UserModel } from 'models/user'
import { Types } from 'mongoose'

export const UpdateUserStatus = async (userId: Types.ObjectId, status: string): Promise<boolean> => {
  await UserModel.updateOne({ _id: userId }, { status })
  return true
}
