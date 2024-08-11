import { User } from 'interfaces'
import { UserModel } from 'models/user.model'

export const createUser = async (user: User) => {
  try {
    const userCreated = await UserModel.create(user)

    return userCreated
  } catch (error) {
    throw new Error(`${error}`)
  }
}