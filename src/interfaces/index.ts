import { JwtPayload } from 'jsonwebtoken'
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
  vehicules: Vehicule[]
}

export interface AcivitiesProperties {
  _id: Types.ObjectId
  isMaintenance: boolean
  isService: boolean
  isMinorMantenance: boolean
  isPredictive: boolean
  isPreventive: boolean
  isCorrective: boolean
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

export interface ServicesTypesToDoOrderProperties {
  _id: Types.ObjectId
  isMecanic: boolean
  isElectrict: boolean
  isElectroMecanic: boolean
  isElectronic: boolean
  isMultiple: boolean
  isExternal: boolean
}

export interface UnitStatusDiagnosticModelPropierties {
  _id: Types.ObjectId
  onlyDiagnosis: boolean
  improvisedSolution: boolean
  definitiveSolution: boolean
  transferSolution: boolean
}

export interface UserReportDiangnosticPropierties {
  _id?: Types.ObjectId
  description: string[]
  clientType: SchemaDefinitionProperty<'user' | 'owner'>
}

export interface PreviousCheckDiagnosticPropierties {
  _id?: Types.ObjectId
  description: string[]
}

export interface CheckDoneDiagnosticPropierties {
  _id?: Types.ObjectId
  description: string[]
  isComponent: boolean
  isMecanism: boolean
  isKOEO: boolean
  isKOER: boolean
  onRoad: boolean
}

export interface CheckDoneResultDiagnosticPropierties {
  _id?: Types.ObjectId
  description: string[]
}

export interface PossibleFailuresDiagnosticPropierties {
  _id?: Types.ObjectId
  isTechnique: boolean
  isCaused: boolean
  isOmission: boolean
  isNeglect: boolean
  isNegligence: boolean
  isInappropriateManagement: boolean
}

export interface ActivityWithCostToDoItemEstimate {
  description?: string
  unitCost?: number
  quantity?: number
  total?: number
}

export interface RecommendationsDiagnosticPropierties {
  _id?: Types.ObjectId
  activities: ActivityWithCostToDoItemEstimate[]
}

export interface ActivityTypesDiagnosticPropierties {
  _id?: Types.ObjectId
  isReactivate: boolean
  isRestore: boolean
  isPreventive: boolean
  isCorrective: boolean
}

export interface DiagnosticPropierties {
  _id?: Types.ObjectId
  client: Client
  vehicule: Vehicule
  unitStatus: UnitStatusDiagnosticModelPropierties
  previousCheck: PreviousCheckDiagnosticPropierties
  checksDone: CheckDoneDiagnosticPropierties
  possibleFailures: PossibleFailuresDiagnosticPropierties
  recommendations: RecommendationsDiagnosticPropierties
  activityType: ActivityTypesDiagnosticPropierties
}

export interface DiagnosticProps extends DiagnosticPropierties {
  _id?: Types.ObjectId
  clientId: Types.ObjectId
  vehiculeId: Types.ObjectId
}

export interface EstimatePropierties {
  vehicule: Vehicule
  client: Client
  activitiesToDo: ActivityWithCostToDoItemEstimate[]
  requiredParts: ActivityWithCostToDoItemEstimate[]
  otherRequirements: ActivityWithCostToDoItemEstimate[]
  laborCost: number
  partsCost: number
  inputCost: number
  total: number
}

export interface EstimateParamsPropierties extends EstimatePropierties {
  vehiculeId: Types.ObjectId
  clientId: Types.ObjectId
}

export interface OrderServicePropierties { 
  _id?: Types.ObjectId
  attentionType: AttentionsProperties
  estimateProps: EstimatePropierties
  preliminarManagment: PreliminaryManagementProperties
  typesActivitiesToDo: AcivitiesProperties
  serviceType: ServicesTypesToDoOrderProperties
}

export interface NewOrderServiceProps extends OrderServicePropierties {
  estimateId: Types.ObjectId
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
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  PARAMS_VALIDATION_ERROR = 'PARAMS_VALIDATION_ERROR',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR',
  IMPORT_MODULE_ERROR = 'IMPORT_MODULE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR',
  CREATE_ACTIVITY_TO_DO = 'CREATE_ACTIVITY_TO_DO',
  UPDATE_VEHICULE_BRAND = 'UPDATE_VEHICULE_BRAND',
  UPDATE_VEHICULE_CLIENT = 'UPDATE_VEHICULE_CLIENT',
  CREATE_VEHICULE_BRAND = 'CREATE_VEHICULE_BRAND',
  CREATE_VEHICULE_MODEL = 'CREATE_VEHICULE_MODEL',
  CREATE_VEHICULE_ERROR = 'CREATE_VEHICULE_ERROR',
  GET_VEHICULE_DETAIL_ERROR = 'GET_VEHICULE_DETAIL_ERROR',
  CREATE_ORDER_SERVICE_ERROR = 'CREATE_ORDER_SERVICE_ERROR',
  CERATE_MULTIPLE_BRANDS = 'CERATE_MULTIPLE_BRANDS',
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
  brandId: Types.ObjectId
  description: string
}

export interface VehiculeNewModelToBrandProps {
  brandId: Types.ObjectId
  modelId: Types.ObjectId
}


export interface NewMultipleModelsProps {
  brandId: Types.ObjectId
  models: VehiculeModel[]
}

export interface AssignVehiculeToClientProps {
  clientId: Types.ObjectId
  vehiculeId: Types.ObjectId
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

export interface DetailVehiculeProps {
  _id?: Types.ObjectId
}

export interface PropsAuth {
  fileName: string
  routeName: string
  isProtected: boolean
}

export interface IGetUserAuthInfoRequest extends Request {
  user: string | JwtPayload
}

export interface TokenIdProps {
  id: string
}
