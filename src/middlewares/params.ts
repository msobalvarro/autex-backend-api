
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
  check('name').notEmpty().withMessage('Name is Required'),
  check('email').notEmpty().isEmail().withMessage('Email is Required'),
  check('password').notEmpty().withMessage('Password is Required'),
]

export const updateUserValidation = [
  check('_id').notEmpty().withMessage('ID is Required'),
  check('name').notEmpty().withMessage('Name is Required'),
  check('email').notEmpty().isEmail().withMessage('Email is Required')
]

export const loginValidationProps = [
  check('password').notEmpty(),
  check('email').notEmpty().isEmail()
]

export const createClientValidationProps = [
  check('name').notEmpty().isString().withMessage('Name is Required'),
  check('email').notEmpty().isEmail().withMessage('Email is Required'),
  check('phoneNumber').notEmpty().isString().withMessage('Phone Number Required'),
  check('documentId').notEmpty().isString().withMessage('Document is Required'),
  check('type').isIn(['Company', 'Person']).withMessage('Client Type Incorrect'),
]
