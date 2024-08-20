import { AuthenticationError } from 'errors'
import { Request, Response } from 'express'
import { UserAuthenticationProps, UserAuthenticationResponse } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { authenticateUserService } from 'services/user/authentication'

export const loginController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new AuthenticationError(`${message}`)
    }

    const data: UserAuthenticationProps = req.body
    const response: UserAuthenticationResponse = await authenticateUserService(data)

    res.cookie(
      'token',
      response.token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      }
    ).send(response)
  } catch (error) {
    console.log(error)
    res.status(500).send(`${error}`)
  }
}