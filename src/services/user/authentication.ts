import { UserAuthenticationProps, UserAuthenticationResponse } from 'interfaces'
import { UserModel } from 'models/user'
import { AuthenticationError } from 'errors'
import { createHash, generateToken } from 'utils/jwt'

export const authenticateUserService = async ({ email, password }: UserAuthenticationProps): Promise<UserAuthenticationResponse> => {
  const passwordSha256 = createHash(password)
  const user = await UserModel.findOne({ email, password: passwordSha256 })

  if (!user) {
    throw new AuthenticationError('User not found')
  }

  const token = generateToken(user.id)
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    token,
  }
}
