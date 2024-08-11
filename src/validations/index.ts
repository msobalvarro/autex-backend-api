import { Request } from 'express'
import { check, validationResult } from 'express-validator'
import { ErrorResultProps } from 'interfaces'

export const existErrors = (req: Request): ErrorResultProps => {
  const errors = validationResult(req)

  return {
    error: !errors.isEmpty(),
    message: `${errors.array()[0]}`
  }
}

export const validationCreateUser = () => [
  check('name').notEmpty(),
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
]
