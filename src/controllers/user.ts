import { createUser } from 'bussinesCases/createUser'
import { findUserById } from 'bussinesCases/findUser'
import { updateUser } from 'bussinesCases/updateUser'
import { CreateUserError, UpdateUserError } from 'errors'
import { Request, Response } from 'express'
import { User } from 'interfaces'
import { existErrors } from 'validations'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateUserError(`${message}`)
    }

    const data: User = req.body()
    const dataCreated = await createUser(data)

    res.send(dataCreated)
  } catch (error) {
    res.send(error)
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new UpdateUserError(`${message}`)
    }

    const data: User = req.body()

    const dataUser = await findUserById(data._id)
    
    const dataCreated = await updateUser(data)

    res.send(dataCreated)
  } catch (error) {
    res.send(error)
  }
}
