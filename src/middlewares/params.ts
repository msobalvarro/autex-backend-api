
import { Request } from 'express'
import { body, check, validationResult } from 'express-validator'
import { ErrorResultProps } from 'interfaces'

export const existErrors = (req: Request): ErrorResultProps => {
  const errors = validationResult(req)
  const existError = errors.array().length > 0

  return {
    error: existError,
    message: existError ? errors.array()[0].msg : null
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

export const createActivityToDoProps = [
  check('description', 'Description is Required').notEmpty().isString(),
]

export const createMultipleBrandsProps = [
  body().isArray().withMessage('data is not an array'),
  body('*.description')
    .isString().withMessage('description is not valid')
    .notEmpty().withMessage('description is not empty')
]

export const createBrandProps = [
  check('description', 'Description is Required').isString().exists(),
]

export const createStatusProps = [
  check('description', 'Description is Required').isString().isEmpty(),
]


export const assignModelToBrandProps = [
  check('modelId', 'Model ID is Required').isMongoId(),
  check('brandId', 'Brand ID is Required').isMongoId(),
]
