import { UserAuthenticationProps, UserAuthenticationResponse } from 'interfaces'
import { UserModel } from 'models/user'
import { AuthenticationError } from 'errors'
import { createHash, generateToken } from 'utils/jwt'
import { WorkshopModel } from 'models/workshop'

export const authenticateUserService = async ({ email, password }: UserAuthenticationProps): Promise<UserAuthenticationResponse> => {
  const passwordSha256 = createHash(password)
  const user = await UserModel.findOne({ email, password: passwordSha256 })

  if (!user) {
    throw new AuthenticationError('User not found')
  }

  if (user.status !== 'active') {
    throw new AuthenticationError('User not available, contact the administrator')
  }

  const workshop = await WorkshopModel.findOne({ users: { _id: user._id } })

  if (!workshop) { 
    throw new AuthenticationError('User not activate, contact the administrator')
  }
  
  const token = generateToken({
    id: user._id,
    workshopId: workshop._id,
    isAdmin: user.isAdmin || false,
    isRoot: user.isRoot || false,
  })

  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    token,
    isAdmin: user.isAdmin || false,
    isRoot: user.isRoot || false,
    workshop,
  }
}
