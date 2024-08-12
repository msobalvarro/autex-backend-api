import { createUser } from 'services/createUser'
import { findUserById } from 'services/findUser'
import { updateUser } from 'services/updateUser'
import { CreateUserError, UpdateUserError } from 'errors'
import { Request, Response } from 'express'
import { User, UserUpdateProps } from 'interfaces'
import { existErrors } from 'middlewares/params'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const dataParams: User = req.body
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateUserError(`${message}`)
    }

    const dataCreated = await createUser(dataParams)
    res.send(dataCreated)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new UpdateUserError(`${message}`)
    }

    const dataParams: UserUpdateProps = req.body()
    const userFinded: User | null = await findUserById(dataParams._id)

    if (!userFinded) {
      throw new UpdateUserError('User not found')
    }

    // is diferent email
    if (userFinded.email !== dataParams.email) {
      await updateUser(dataParams)
    }

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
