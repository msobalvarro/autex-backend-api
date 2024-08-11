import { UserModel } from 'models/user.model'

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })

  return user
}