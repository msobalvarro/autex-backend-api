import { UserAuthenticationProps } from 'interfaces'
import { UserModel } from 'models/user.model'
import { Types } from 'mongoose'

export const findUserByEmailAndPassword = async ({ email, password }: UserAuthenticationProps) => {
  const user = await UserModel.findOne({ email, password })
  return user
}

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })
  return user
}

export const findUserById = async (id: Types.ObjectId) => {
  const user = await UserModel.findById(id)
  return user
}
