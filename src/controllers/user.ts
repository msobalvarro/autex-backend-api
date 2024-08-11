import { createUser } from 'services/createUser'
import { findUserByEmail, findUserById } from 'services/findUser'
import { updateUser } from 'services/updateUser'
import { CreateUserError, UpdateUserError } from 'errors'
import { Request, Response } from 'express'
import { User, UserUpdateProps } from 'interfaces'
import { existErrors } from 'midlewares/params'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const dataParams: User = req.body
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateUserError(`${message}`)
    }

    const userFinded: User | null = await findUserByEmail(dataParams.email)
    if (userFinded) {
      console.log('user already exists')
      throw new CreateUserError('Email already exists')
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
