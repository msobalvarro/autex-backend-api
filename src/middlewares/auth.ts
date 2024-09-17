import { AuthorizationError } from 'errors'
import { NextFunction, Response, Request } from 'express'
import { GenerateTokenFnProps } from 'interfaces'
import { verifyToken } from 'utils/jwt'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      throw new AuthorizationError('Token is required')
    }

    const bearer = token.split(' ')[1]
    const data = verifyToken(bearer)
    req.cookies = data
    next()
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}

export const authUserAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isAdmin }: GenerateTokenFnProps = req.cookies
    if (!isAdmin) {
      throw new AuthorizationError('You do not have permissions for this action')
    }
    next()
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}

export const authUserRootMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isRoot }: GenerateTokenFnProps = req.cookies
    if (!isRoot) {
      throw new AuthorizationError('You do not have permissions for this action')
    }
    next()
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}