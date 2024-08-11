import { UserModel } from 'models/user.model'
import { Types } from 'mongoose'

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })
  return user
}

export const findUserById = async (id: Types.ObjectId) => {
  const user = await UserModel.findById(id)
  return user
}
