import { UserUpdateProps } from 'interfaces'
import { findUserByEmail } from 'services/user/findUser'
import { UserModel } from 'models/user'
import { UpdateUserError } from 'errors'
import { Types, UpdateWriteOpResult } from 'mongoose'

export const updateUserService = async (user: UserUpdateProps) => {
  try {
    const currentUser = await findUserByEmail(user.email)
    const objectId = new Types.ObjectId(user._id)

    if (objectId._id.toString() !== currentUser?._id._id.toString()) {
      throw `User ${user.email} already exists`
    }

    const userCreated = await UserModel.updateOne(
      { _id: user._id },
      {
        email: user.email,
        name: user.name,
      }
    )
    return userCreated
  } catch (error) {
    throw new UpdateUserError(`${error}`)
  }
}

export const updateAdminUserService = async (userId: Types.ObjectId, isAdmin: boolean): Promise<UpdateWriteOpResult> => {
  const user = await UserModel.updateOne({ _id: userId }, { isAdmin })
  return user
}
