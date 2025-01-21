import { UserModel } from 'models/user'

export const deleteUserService = async (userId: string): Promise<boolean> => {
  await UserModel.deleteOne({ _id: userId })
  return true
}
