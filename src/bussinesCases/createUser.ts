import { User } from 'interfaces'
import { findUserByEmail } from 'bussinesCases/findUser'
import { UserModel } from 'models/user.model'
import { CreateUserError } from 'errors'

export const createUser = async (user: User) => {
  try {
    const currentUser = await findUserByEmail(user.email)
    if (currentUser) {
      throw `User ${user.email} already exists`
    }

    const userCreated = await UserModel.create(user)
    return userCreated
  } catch (error) {
    throw new CreateUserError(`${error}`)
  }
}