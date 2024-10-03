import { JwtPayload } from 'jsonwebtoken'
import { ClientSession, SchemaDefinitionProperty, Types } from 'mongoose'

export interface VehiculeBrands {
  _id: Types.ObjectId
  description: string
  models: VehiculeModel[]
}

export interface VehiculeModel {
  _id: Types.ObjectId
  description: string
}

export interface DistanceTraveledPropierties {
  _id: Types.ObjectId
  distance: number
  type: SchemaDefinitionProperty<'km' | 'miles'>
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
  workshop: WorkshopPropierties
}

export interface User {
  _id?: Types.ObjectId
  name: string
  email: string
  password?: string
  isAdmin?: boolean
  isRoot?: boolean
  status?: SchemaDefinitionProperty<'active' | 'inactive' | 'blocked'>
}

export interface UserRequestProps extends User {
  workshopId: Types.ObjectId
}

export interface NewUserWithWorkshopIdProps {
  workshopId: Types.ObjectId
  name: string
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
  workshop: WorkshopPropierties
}

export interface AcivitiesProperties {
  _id: Types.ObjectId
  isMaintenance: boolean
  isService: boolean
  isMinorMantenance: boolean
  isMajorMantenance: boolean
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
  traveled: DistanceTraveledPropierties
}

export interface DiagnosticProps extends DiagnosticPropierties {
  _id?: Types.ObjectId
  clientId: Types.ObjectId
  vehiculeId: Types.ObjectId
}

export interface EstimatePropierties {
  _id: Types.ObjectId,
  estimateNumber?: number
  vehicule: Vehicule
  client: Client
  activitiesToDo: ActivityWithCostToDoItemEstimate[]
  requiredParts: ActivityWithCostToDoItemEstimate[]
  otherRequirements: ActivityWithCostToDoItemEstimate[]
  externalActivities: ActivityWithCostToDoItemEstimate[]
  traveled: DistanceTraveledPropierties
  activitiesGroup?: ActivitiesGroupPropierties
  laborCost: number
  partsCost: number
  inputCost: number
  externalCost: number
  activitiesGroupCost: number
  total: number
  workshop: WorkshopPropierties
}

export interface EstimateWithOrderPropierties extends EstimatePropierties {
  order: OrderServicePropierties | null
}

export interface EstimateParamsPropierties extends EstimatePropierties {
  vehiculeId: Types.ObjectId
  activitiesGroupId: Types.ObjectId
  clientId: Types.ObjectId
  traveled: DistanceTraveledPropierties
}

export interface OrderServicePropierties {
  _id?: Types.ObjectId
  attentionType: AttentionsProperties
  estimateProps: EstimatePropierties
  preliminarManagment: PreliminaryManagementProperties
  typesActivitiesToDo: AcivitiesProperties
  serviceType: ServicesTypesToDoOrderProperties
  additionalTask: ActivityWithCostToDoItemEstimate[]
  traveled: DistanceTraveledPropierties
  estimationDate: Date
  findings: string[]
  observations: string[]
  resume: string
  workshop: WorkshopPropierties
  status: SchemaDefinitionProperty<'pending' | 'process' | 'finished' | 'canceled'>
}

export interface NewOrderServiceProps extends OrderServicePropierties {
  estimateId: Types.ObjectId
}

export interface UserAuthenticationResponse extends User {
  token: string
  isAdmin: boolean
  isRoot: boolean
  workshop: WorkshopPropierties | null
}

export interface UserAuthenticationProps {
  email: string
  password: string
}

export interface UserUpdateProps {
  _id: Types.ObjectId
  email: string
  name: string
}

export enum ErrosList {
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  PARAMS_VALIDATION_ERROR = 'PARAMS_VALIDATION_ERROR',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR',
  UPDATE_USER_ERROR = 'UPDATE_USER_ERROR',
  IMPORT_MODULE_ERROR = 'IMPORT_MODULE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR',
  UPDATE_CLIENT_ERROR = 'UPDATE_CLIENT_ERROR',
  CREATE_ACTIVITY_TO_DO = 'CREATE_ACTIVITY_TO_DO',
  UPDATE_VEHICULE_BRAND = 'UPDATE_VEHICULE_BRAND',
  UPDATE_VEHICULE_CLIENT = 'UPDATE_VEHICULE_CLIENT',
  CREATE_VEHICULE_BRAND = 'CREATE_VEHICULE_BRAND',
  CREATE_VEHICULE_MODEL = 'CREATE_VEHICULE_MODEL',
  CREATE_VEHICULE_ERROR = 'CREATE_VEHICULE_ERROR',
  UPDATE_ESTIMATE_ERROR = 'UPDATE_ESTIMATE_ERROR',
  GET_VEHICULE_DETAIL_ERROR = 'GET_VEHICULE_DETAIL_ERROR',
  GET_VEHICULE_ERROR = 'GET_VEHICULE_ERROR',
  CREATE_ORDER_SERVICE_ERROR = 'CREATE_ORDER_SERVICE_ERROR',
  CREATE_MULTIPLE_BRANDS = 'CERATE_MULTIPLE_BRANDS',
  UPDATE_STATUS_ORDEE = 'UPDATE_STATUS_ORDEE',
  CREATE_WORKSHOP = 'CREATE_WORKSHOP',
  CREATE_USER_WORKSHOP = 'CREATE_USER_WORKSHOP',
  CREATE_ACTIVITIES_GROUP_ESTIMATE = 'CREATE_ACTIVITIES_GROUP_ESTIMATE',
  CREATE_ESTIMATION_ERROR = 'CREATE_ESTIMATION_ERROR',
  CREATE_BILL_ERROR = 'CREATE_BILL_ERROR',
}

export interface GenerateErrorProps {
  message: string
  type: ErrosList
}

export interface ErrorResultProps {
  error: boolean
  message: string | null
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
  clientId: Types.ObjectId
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
  _id: Types.ObjectId
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

export interface ListItemOrderFieldsProps {
  id: Types.ObjectId
  list: string[]
}

export interface UpdateResumeProps {
  id: Types.ObjectId
  description: string[]
}


export interface ListItemOrderResumeFieldsProps {
  id: Types.ObjectId
  list: ActivityWithCostToDoItemEstimate[]
}

export interface UpdateServiceProps {
  id: Types.ObjectId
}

export interface WorkshopConfigurationsPropierties {
  fee: boolean
}

export interface WorkshopPropierties {
  _id: Types.ObjectId
  name: string
  slogan: string
  pictureUrl: string | null
  representative: string
  phoneNumber: string
  location: string
  ruc: string
  administrators?: User[]
  users?: User[]
  configuration: WorkshopConfigurationsPropierties
}

export interface AssignUserToWorkshopProps {
  userId: Types.ObjectId
  workshopId: Types.ObjectId
}

export interface UserUpdateStatusProps {
  userId: Types.ObjectId
  status: string
}

export interface ActivitiesGroupPropierties {
  _id: Types.ObjectId
  name: string
  activities: string[]
  workshop: WorkshopPropierties
}

export interface ActivitiesGroupProps {
  name: string
  activities: string[]
}

export interface ReqHeaderAuthPropierties {
  id: Types.ObjectId
  isAdmin: boolean
  isRoot: boolean
  workshopId: Types.ObjectId
}

export interface UpdateItemCostFieldProps {
  itemId: Types.ObjectId
  estimateId: Types.ObjectId
}

export interface PushItemCostFieldProps {
  estimateId: Types.ObjectId
  activities: ActivityWithCostToDoItemEstimate[]
}

export interface ListClientDataReportProps {
  clientId: Types.ObjectId
}

export interface ReportProps {
  from: Date
  to: Date
  workshopId: Types.ObjectId
}

export interface ReportResponsePropierties {
  date: Date
  count: number
}

export interface OrderDataReportProps {
  clientId: Types.ObjectId
}

export interface OrderDataReportResponsePropierties {
  maintenance: number
  service: number
  minorMantenance: number
  predictive: number
  preventive: number
  corrective: number
  total: number
}

export interface BillPropierties {
  _id: Types.ObjectId
  order: OrderServicePropierties
  workshop: WorkshopPropierties
  subtotal: number
  tax?: number
  total: number
}

export interface BillCreateProps {
  orderId: Types.ObjectId
  sessionClient: ClientSession
}

export interface UpdateConfigurationWorkshopProps {
  workshopId: Types.ObjectId
  configuration: WorkshopConfigurationsPropierties
}

export interface GetWorkshopConfigurationRootProps {
  workshopId: Types.ObjectId
}

export interface GetBillByOrderIdProps {
  orderId: Types.ObjectId
}

export interface IncomeReportResponse {
  totalPartsCost: number
  totalExternalCost: number
  totalLaborCost: number
  totalInputCost: number
  totalTaxes: number
  totalOtherServices: number
}

export interface VehiculeWithClient extends Vehicule {
  client?: Client | null
}

export interface UpdateActivityParams {
  activityId: Types.ObjectId
  activities: string[]
}

export interface UpdateClientProps {
  _id: Types.ObjectId
  name: string
  type: string
  phoneNumber: string
  email: string
  documentId: string
}
