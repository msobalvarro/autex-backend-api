
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

export const createUserValidation = [
  check('name').notEmpty(),
  check('email').notEmpty().isEmail(),
  check('password').notEmpty(),
]

export const updateUserValidation = [
  check('_id').notEmpty(),
  check('name').notEmpty(),
  check('email').notEmpty().isEmail()
]

export const loginValidationProps = [
  check('password').notEmpty(),
  check('email').notEmpty().isEmail()
]
