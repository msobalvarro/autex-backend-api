import { SchemaDefinitionProperty, Types } from 'mongoose'

export interface VehiculeBrands {
  _id: Types.ObjectId
  description: string
  models: VehiculeModel[]
}

export interface VehiculeModel {
  _id: Types.ObjectId
  description: string
}

export interface Status {
  _id: Types.ObjectId
  description: string
}

export interface Vehicule {
  _id: Types.ObjectId
  model?: VehiculeModel
  brand?: VehiculeBrands
  type: SchemaDefinitionProperty<'auto' | 'pickup' | 'ban' | 'truck' | 'motorcycle'>
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
  type: SchemaDefinitionProperty<'company' | 'person'>
  phoneNumber: string
  email: string
  documentId: string
  vehicules: SchemaDefinitionProperty<Vehicule>[]
}

export interface AcivitiesProperties {
  _id: Types.ObjectId
  isMaintenance: boolean
  isService: boolean
  isMinorMantenance: boolean
  type: SchemaDefinitionProperty<'predictive' | 'prenventive'>
}

export interface ActivitiesToDoProperties {
  _id: Types.ObjectId
  description: string
}

export interface PreliminaryManagementProperties {
  _id: Types.ObjectId
  isDiagnosed: boolean
  isProven: boolean
  isKOER: boolean
  isKOEO: boolean
  parked: boolean
  onRoad: boolean
}

export interface AttentionsProperties {
  _id: Types.ObjectId
  isLocal: boolean
  isExpress: boolean
  isHome: boolean
  isRescue: boolean
}

export interface ServicesProperties {
  _id: Types.ObjectId
  isMecanic: boolean
  isElectrict: boolean
  isElectroMecanic: boolean
  isElectronic: boolean
  isMultiple: boolean
  isExternal: boolean
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
  CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR',
  CREATE_ACTIVITY_TO_DO = 'CREATE_ACTIVITY_TO_DO',
  UPDATE_VEHICULE_BRAND = 'UPDATE_VEHICULE_BRAND',
  CREATE_VEHICULE_BRAND = 'CREATE_VEHICULE_BRAND',
  CREATE_VEHICULE_MODEL = 'CREATE_VEHICULE_MODEL',
  CREATE_VEHICULE_ERROR = 'CREATE_VEHICULE_ERROR',
}

export interface GenerateErrorProps {
  message: string
  type: ErrosList
}

export interface ErrorResultProps {
  error: boolean
  message?: string | null
}

export interface NewVehiculeModelProps {
  description: string
}

export interface VehiculeNewModelToBrandProps {
  brandId: Types.ObjectId
  modelId: Types.ObjectId
}

export interface CreateVehiculeProps {
  modelId: Types.ObjectId
  brandId: Types.ObjectId
  type: string
  color: string
  plate: string
  motorNumber: string
  chasisNumber: string
  km: string
  year: string
}
