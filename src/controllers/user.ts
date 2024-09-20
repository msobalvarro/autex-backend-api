import { assignUserToWorkshop, createUserService } from 'services/user/createUser'
import { findUserById } from 'services/user/findUser'
import { updateUserService } from 'services/user/updateUser'
import { CreateUserError, UpdateUserError } from 'errors'
import { Request, Response } from 'express'
import {
  ReqHeaderAuthPropierties,
  User,
  UserRequestProps,
  UserUpdateProps,
  UserUpdateStatusProps
} from 'interfaces'
import { existErrors } from 'middlewares/params'
import { UpdateUserStatus } from 'services/user/updateStatus'
import { getAllUserFromWorkshopId } from 'services/user/getUser'
import { Types } from 'mongoose'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateUserError(`${message}`)

    const dataParams: User = req.body
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const user = await createUserService(dataParams)

    if (user) {
      await assignUserToWorkshop(new Types.ObjectId(user._id), workshopId)
    }

    res.send(user)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createUserForRootController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateUserError(`${message}`)

    const dataParams: UserRequestProps = req.body
    const user = await createUserService(dataParams)

    if (user) {
      await assignUserToWorkshop(new Types.ObjectId(user._id), dataParams.workshopId)
    }

    res.send(user)
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

export const getAllUserFromWorkshopController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const users = await getAllUserFromWorkshopId(workshopId)
    res.send(users)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
