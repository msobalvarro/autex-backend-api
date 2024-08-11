import { User } from 'interfaces'
import { findUserByEmail } from 'services/findUser'
import { UserModel } from 'models/user.model'
import { CreateUserError } from 'errors'

export const createUser = async (user: User) => {
  const currentUser = await findUserByEmail(user.email)

  if (currentUser) {
    throw new CreateUserError(`email already exists`)
  }

  const userCreated = await UserModel.create(user)
  return userCreated
}