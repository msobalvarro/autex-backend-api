import { createUser, createUserAndAssignToWorkshop } from 'services/user/createUser'
import { findUserById } from 'services/user/findUser'
import { updateUserService } from 'services/user/updateUser'
import { CreateUserError, UpdateUserError } from 'errors'
import { Request, Response } from 'express'
import {
  NewUserWithWorkshopIdProps,
  User,
  UserUpdateProps,
  UserUpdateStatusProps
} from 'interfaces'
import { existErrors } from 'middlewares/params'
import { UpdateUserStatus } from 'services/user/updateStatus'

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

export const createUserAndAddToWorkshopController = async (req: Request, res: Response) => {
  try {
    const dataParams: NewUserWithWorkshopIdProps = req.body
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateUserError(`${message}`)
    }

    const dataCreated = await createUserAndAssignToWorkshop(dataParams)
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

    const dataParams: UserUpdateProps = req.body
    const userFinded: User | null = await findUserById(dataParams._id)

    if (!userFinded) {
      throw new UpdateUserError('User not found')
    }

    // is diferent email
    if (userFinded.email !== dataParams.email || userFinded.name !== dataParams.name) {
      await updateUserService(dataParams)
    }

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateUserStatusController = async (req: Request, res: Response) => {
  try {
    const { status, userId }: UserUpdateStatusProps = req.body
    await UpdateUserStatus(userId, status)
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
