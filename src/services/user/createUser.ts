import { User } from 'interfaces'
import { findUserByEmail } from 'services/user/findUser'
import { UserModel } from 'models/user'
import { CreateUserError } from 'errors'
import { createHash } from 'utils/jwt'

export const createUser = async (user: User) => {
  const currentUser = await findUserByEmail(user.email)
  const passwordEncripted = createHash(`${user.password}`)

  if (currentUser) {
    throw new CreateUserError(`email already exists`)
  }

  const userCreated = await UserModel.create({
    ...user,
    password: passwordEncripted
  })
  return userCreated
}