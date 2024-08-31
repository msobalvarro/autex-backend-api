import { NewUserWithWorkshopIdProps, User } from 'interfaces'
import { findUserByEmail } from 'services/user/findUser'
import { UserModel } from 'models/user'
import { CreateUserError } from 'errors'
import { createHash } from 'utils/jwt'
import { WorkshopModel } from 'models/workshop'

export const createUser = async (user: User) => {
  const currentUser = await findUserByEmail(user.email)
  const passwordEncripted = createHash(`${user.password}`)

  if (currentUser) {
    throw new CreateUserError(`email already exists`)
  }

  const userCreated = await UserModel.create({
    email: user.email,
    name: user.name,
    password: passwordEncripted,
    ...(user.isAdmin ? { isAdmin: true } : {})
  })
  return userCreated
}

export const createUserAndAssignToWorkshop = async (props: NewUserWithWorkshopIdProps): Promise<User> => {
  const { email, name, workshopId, password } = props
  const user = await createUser({ email, name, password })
  await WorkshopModel.updateOne({ _id: workshopId }, {
    $push: { users: user }
  })

  return user
}

export const createUserAdminAndAssignToWorkshop = async (props: NewUserWithWorkshopIdProps): Promise<User> => {
  const { email, name, workshopId, password } = props
  const user = await createUser({ email, name, password, isAdmin: true })
  await WorkshopModel.updateOne({ _id: workshopId }, {
    $push: { administrators: user }
  })

  return user
}