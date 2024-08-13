import { UserUpdateProps } from 'interfaces'
import { findUserByEmail } from 'services/user/findUser'
import { UserModel } from 'models/user'
import { CreateUserError } from 'errors'

export const updateUser = async (user: UserUpdateProps) => {
  try {
    const currentUser = await findUserByEmail(user.email)
    if (currentUser) {
      throw `User ${user.email} already exists`
    }

    const userCreated = await UserModel.updateOne(
      { _id: user._id },
      { email: user.email }
    )
    return userCreated
  } catch (error) {
    throw new CreateUserError(`${error}`)
  }
}