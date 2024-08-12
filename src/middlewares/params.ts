
import { Request } from 'express'
import { check, validationResult } from 'express-validator'
import { ErrorResultProps } from 'interfaces'

export const existErrors = (req: Request): ErrorResultProps => {
  const errors = validationResult(req)

  return {
    error: !errors.isEmpty(),
    message: `${errors.array()[0].msg}`
  }
}

export const createUserValidation = [
  check('name', 'Name is Required').notEmpty(),
  check('email', 'Email is Required').notEmpty().isEmail(),
  check('password', 'Password is Required').notEmpty(),
]

export const updateUserValidation = [
  check('_id', 'ID is Required').notEmpty(),
  check('name', 'Name is Required').notEmpty(),
  check('email', 'Email is Required').notEmpty().isEmail(),
]

export const loginValidationProps = [
  check('password').notEmpty(),
  check('email').notEmpty().isEmail()
]

export const createClientValidationProps = [
  check('name', 'Name is Required').notEmpty().isString(),
  check('email', 'Email is Required').notEmpty().isEmail(),
  check('phoneNumber', 'Phone Number Required').notEmpty().isString(),
  check('documentId', 'Document is Required').notEmpty().isString(),
  check('type', 'Client Type Incorrect').isIn(['Company', 'Person']),
]
