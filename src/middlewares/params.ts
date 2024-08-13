
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
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
]

export const updateUserValidation = [
  check('_id', 'ID is required').notEmpty(),
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
]

export const loginValidationProps = [
  check('password').notEmpty(),
  check('email').notEmpty().isEmail()
]

export const createClientValidationProps = [
  check('name', 'Name is required').notEmpty().isString(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('phoneNumber', 'Phone Number required').notEmpty().isString(),
  check('documentId', 'Document is required').notEmpty().isString(),
  check('type', 'Client Type Incorrect').isIn(['Company', 'Person']),
]

export const createActivityToDoProps = [
  check('description', 'Description is required').notEmpty().isString(),
]

export const createMultipleBrandsProps = [
  body().isArray().withMessage('data is not an array'),
  body('*.description')
    .isString().withMessage('description is not valid')
    .notEmpty().withMessage('description is not empty')
]

export const createBrandProps = [
  check('description', 'Description is required').isString().exists(),
]

export const createModelProps = [
  check('description', 'Description is required').isString().exists(),
]

export const createStatusProps = [
  check('description', 'Description is required').isString().isEmpty(),
]

export const assignModelToBrandProps = [
  check('modelId', 'Model Id is required').isMongoId(),
  check('brandId', 'Brand Id is required').isMongoId(),
]

export const createVehiculeProps = [
  check('modelId', 'Model Id is required').isMongoId(),
  check('brandId', 'Brand Id is required').isMongoId(),
  check('color', 'Color is required').isString(),
  check('plate', 'Plate is required').isString(),
  check('motorNumber', 'Motor number is required').isString(),
  check('chasisNumber', 'Chasis number is required').isString(),
  check('km', 'kilometers is required').isNumeric(),
  check('year', 'Year is required').isNumeric(),
  check('type', 'Vehicule type is incorrect').isIn(['auto', 'pickup', 'ban', 'truck', 'motorcycle']),
]

export const getVehiculeDetailProps = [
  check('_id', 'Id is required').isMongoId(),
]

