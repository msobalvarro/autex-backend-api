import 'dotenv'
import crypto from 'crypto'
import { sign } from 'jsonwebtoken'
import { User, UserAuthenticationProps, UserAuthenticationResponse } from 'interfaces'
import { UserModel } from 'models/user.model'
import { AuthenticationError } from 'errors'

const SECRET_KEY: string = process.env.SECRET_KEY || ''

export const createHash = (data: string): string => crypto.createHash('sha256').update(data).digest('hex')

export const authenticateUserService = async ({ email, password }: UserAuthenticationProps): Promise<UserAuthenticationResponse> => {
  const passwordSha256 = createHash(password)

  const user: User | null = await UserModel.findOne({ email, password: passwordSha256 })

  if (!user) {
    throw new AuthenticationError('User not found')
  }

  const token = sign({ id: user._id }, SECRET_KEY)

  return { ...user, token }
}