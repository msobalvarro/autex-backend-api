import { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  uuid?: string
  email: string
  password?: string
}

export interface UserAuthenticationResponse extends User{
  token: string
}

export interface UserAuthenticationProps {
  email: string
  password: string
}

export interface UserUpdateProps {
  _id: Types.ObjectId
  email: string
}

export enum ErrosList {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  PARAMS_VALIDATION_ERROR = 'PARAMS_VALIDATION_ERROR',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR',
  IMPORT_MODULE_ERROR = 'IMPORT_MODULE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
}

export interface GenerateErrorProps {
  message: string
  type: ErrosList
}

export interface ErrorResultProps {
  error: boolean
  message?: string
}
