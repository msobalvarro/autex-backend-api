import { SchemaDefinitionProperty, Types } from 'mongoose'

export interface VehiculeBrands {
  _id: Types.ObjectId
  description: string
}

export interface VehiculeModel {
  _id: Types.ObjectId
  description: string
}

export interface Vehicule {
  _id: Types.ObjectId
  model: VehiculeModel
  brand: VehiculeBrands
  name: string
  color: string
  plate: string
  motorNumber: string
  chasisNumber: string
  km: number
  year: number
}

export interface User {
  _id: Types.ObjectId
  email: string
  password?: string
}

export interface Client {
  _id: Types.ObjectId
  name: string
  type: 'Company' | 'Person'
  phoneNumber: string
  email: string
  documentId: string
  vehicules:SchemaDefinitionProperty<Vehicule>[]
}

export interface UserAuthenticationResponse extends User {
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
