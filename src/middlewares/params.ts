
import { Request } from 'express'
import { body, check, param, validationResult } from 'express-validator'
import { ErrorResultProps } from 'interfaces'

// regex for MM-DD-YYY
// const regexForDate = `/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/`

export const existErrors = (req: Request): ErrorResultProps => {
  const errors = validationResult(req)
  const existError = errors.array().length > 0

  return {
    error: existError,
    message: existError ? errors.array().map(e => e.msg).toString().replaceAll(',', ', ') : null
  }
}

export const createUserValidation = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('isAdmin', 'admin prop is required').isBoolean(),
]

export const createUserForRootValidation = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
  check('isAdmin', 'admin prop is required').isBoolean(),
  check('workshopId', 'admin prop is required').isMongoId(),
]

export const createUserAndWorkshopIdValidation = [
  check('workshopId', 'Workshop id is required').isMongoId(),
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
]

export const updateUserValidation = [
  check('_id', 'ID is required').isMongoId(),
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('isAdmin', 'is admin check is required').isBoolean(),
]

export const updateUserStatusValidation = [
  check('_id', 'ID is required').isMongoId(),
  check('status', 'status is required').isIn(['active', 'inactive', 'blocked']),
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
  check('type', 'Client Type Incorrect').isIn(['company', 'person']),
]

export const updateClientValidationProps = [
  check('_id', 'id is required').isMongoId(),
  check('name', 'Name is required').notEmpty().isString(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('phoneNumber', 'Phone Number required').notEmpty().isString(),
  check('documentId', 'Document is required').notEmpty().isString(),
  check('type', 'Client Type Incorrect').isIn(['company', 'person']),
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
  check('models', 'Model list is required').isArray(),
  check('models.*.description', 'Description model is required').isString().exists(),
]

export const createModelProps = [
  check('brandId', 'Brand Id is required').isMongoId(),
  check('description', 'Description is required').isString().exists(),
]

export const createMultipleModelsProps = [
  check('brandId', 'Brand Id is required').isMongoId(),
  check('models', 'Model list is required').isArray(),
  check('models.*.description', 'Description is required').isString().exists(),
]

export const createStatusProps = [
  check('description', 'Description is required').isString().isEmpty(),
]

export const assignModelToBrandProps = [
  check('modelId', 'Model Id is required').isMongoId(),
  check('brandId', 'Brand Id is required').isMongoId(),
]

export const assignVehiculeToClientProps = [
  check('clientId', 'Client Id is required').isMongoId(),
  check('vehiculeId', 'Vehicule D Id is required').isMongoId(),
]

export const createVehiculeProps = [
  check('clientId', 'Model Id is required').isMongoId(),
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

export const getClientsVehiculeDetailProps = [
  check('clientId', 'Client Id is required').isMongoId(),
]

export const createDiagnosticProps = [
  check('clientId', 'Client Id is required').isMongoId(),
  check('vehiculeId', 'vehicule Id is required').isMongoId(),
  check('unitStatus.onlyDiagnosis', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.improvisedSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.definitiveSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.transferSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('previousCheck.description', 'Previous check description is incorrect').isArray(),
  check('checksDone.description', 'Checks done description prop is required').isArray(),
  check('checksDone.isComponent', 'Checks done component prop is required').isBoolean(),
  check('checksDone.isMecanism', 'Checks done mecanism prop is required').isBoolean(),
  check('checksDone.isKOEO', 'Checks done isKOEO prop is required').isBoolean(),
  check('checksDone.isKOER', 'Checks done isKOER prop is required').isBoolean(),
  check('checksDone.onRoad', 'Checks done onRoad prop is required').isBoolean(),
  check('recommendations.activities.*.description', 'Recommendations is required').isString(),
  check('activityType.isReactivate', 'Activity type reactivate prop is required').isBoolean(),
  check('activityType.isRestore', 'Activity type restore prop is required').isBoolean(),
  check('activityType.isPreventive', 'Activity type preventive prop is required').isBoolean(),
  check('activityType.isCorrective', 'Activity type corrective prop is required').isBoolean(),
]

export const getDetailIdProp = [
  check('_id', 'Id is required').isMongoId(),
]

export const getByClientProp = [
  check('clientId', 'Id is required').isMongoId(),
]

export const createEstimateProps = [
  check('clientId', 'Client Id is required').isMongoId(),
  check('vehiculeId', 'vehicule Id is required').isMongoId(),
  check('activitiesToDo', 'Activity list prop is incorrect').isArray(),
  check('activitiesToDo.*.description', 'Activity list description prop is incorrect').isString(),
  check('activitiesToDo.*.unitCost', 'Activity unit cost prop is incorrect').isFloat(),
  check('activitiesToDo.*.quantity', 'Activity quantity prop is incorrect').isFloat(),
  check('activitiesToDo.*.total', 'Activity total prop is incorrect').isFloat(),
  check('requiredParts', 'Require part list prop is incorrect').isArray(),
  check('requiredParts.*.description', 'Require part list description prop is incorrect').isString(),
  check('requiredParts.*.unitCost', 'Part required unit cost prop is incorrect').isFloat(),
  check('requiredParts.*.quantity', 'Part required quantity prop is incorrect').isFloat(),
  check('requiredParts.*.total', 'Part required total prop is incorrect').isFloat(),
  check('laborCost', 'Labor cost prop is incorrect').isNumeric(),
  check('externalActivities', 'External activities list prop is incorrect').isArray(),
  check('externalActivities.*.description', 'Require part list description prop is incorrect').isString(),
  check('externalActivities.*.unitCost', 'Other required unit cost prop is incorrect').isFloat(),
  check('externalActivities.*.quantity', 'Other required quantity prop is incorrect').isFloat(),
  check('externalActivities.*.total', 'Other required total prop is incorrect').isFloat(),
  check('partsCost', 'Part cost prop is incorrect').isNumeric(),
  check('inputCost', 'Input cost prop is incorrect').isNumeric(),
  check('externalCost', 'Input cost prop is incorrect').isNumeric(),
  check('total', 'Total cost prop is incorrect').isNumeric(),
  check('traveled.distance', 'distance prop is not valid').isNumeric(),
  check('traveled.type', 'distance traveled type is incorrect').isIn(['km', 'miles']),
]

export const createOrderProps = [
  check('estimateId', 'Estimate order id is required').isMongoId(),
  check('attentionType.isLocal', 'Attention type prop is not valid').isBoolean(),
  check('attentionType.isExpress', 'Attention express prop is not valid').isBoolean(),
  check('attentionType.isHome', 'Attention home prop is not valid').isBoolean(),
  check('attentionType.isRescue', 'Attention rescue prop is not valid').isBoolean(),
  check('preliminarManagment.isDiagnosed', 'Preliminar managment diagnosed prop is not valid').isBoolean(),
  check('preliminarManagment.isProven', 'Preliminar managment proven prop is not valid').isBoolean(),
  check('preliminarManagment.isKOER', 'Preliminar managment KOER prop is not valid').isBoolean(),
  check('preliminarManagment.isKOEO', 'Preliminar managment KOEO prop is not valid').isBoolean(),
  check('preliminarManagment.parked', 'Preliminar managment parke prop is not valid').isBoolean(),
  check('preliminarManagment.onRoad', 'Preliminar managment road prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isMaintenance', 'Types activities to do maintenance prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isService', 'Types activities to do service prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isMinorMantenance', 'Types activities to do minor mantenance prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isMajorMantenance', 'Types activities to do minor mantenance prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isPredictive', 'Types activities to do predictive prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isPreventive', 'Types activities to do preventive prop is not valid').isBoolean(),
  check('typesActivitiesToDo.isCorrective', 'Types activities to do corrective prop is not valid').isBoolean(),
  check('serviceType.isMecanic', 'Service type mecanic prop is not valid').isBoolean(),
  check('serviceType.isElectrict', 'Service type electrict prop is not valid').isBoolean(),
  check('serviceType.isElectroMecanic', 'Service type electro mecanic prop is not valid').isBoolean(),
  check('serviceType.isElectronic', 'Service type electronic prop is not valid').isBoolean(),
  check('serviceType.isMultiple', 'Service type multiple prop is not valid').isBoolean(),
  check('serviceType.isExternal', 'Service type externa prop is not valid').isBoolean(),
  check('traveled.distance', 'distance prop is not valid').isNumeric(),
  check('traveled.type', 'distance traveled type is incorrect').isIn(['km', 'miles']),
  check('estimationDate', 'estimation date prop is incorrect').isISO8601().toDate(),
]

export const checkUpdateResume = [
  check('id', 'Order ID is required').isMongoId(),
  check('description', 'description prop is incorrect').isString(),
]

export const checkUpdateListOrder = [
  check('id', 'Order ID is required').isMongoId(),
  check('list', 'list prop is incorrect').isArray(),
]

export const updateAdditionalTaskListOrder = [
  check('id', 'Order ID is required').isMongoId(),
  check('list.*.description', 'Activity list description prop is incorrect').isString(),
  check('list.*.unitCost', 'Activity unit cost prop is incorrect').isFloat(),
  check('list.*.quantity', 'Activity quantity prop is incorrect').isFloat(),
  check('list.*.total', 'Activity total prop is incorrect').isFloat(),
]

export const checkUpdateStatusOrder = [
  check('id', 'Order ID is required').isMongoId(),
]

export const checkCreateWorkshop = [
  check('name', 'Name prop is required').isString(),
  check('slogan', 'Slogan prop is required').isString(),
  check('representative', 'Representative name prop is required').isString(),
  check('phoneNumber', 'Phone Number prop is required').isString(),
  check('location', 'Location prop is required').isString(),
  check('ruc', 'RUC prop is required').isString(),
  check('fixedFee', 'Fixed fee is required').isBoolean(),
]

export const checkAssignUserToWorkshop = [
  check('userId', 'User id prop is required').isMongoId(),
  check('workshopId', 'Workshop id prop is required').isMongoId(),
]

export const checkCreateAcitivitiesGroup = [
  check('name', 'name prop is required').isString(),
  check('activities', 'activities is not valid').isArray({ min: 1 }),
  check('activities.*', 'activity item is not valid').isString(),
]

export const checkDeleteItemsFieldEstimate = [
  check('itemId', 'item field prop is required').isMongoId(),
  check('estimateId', 'estimate id prop is required').isMongoId(),
]

export const checkPushItemsFieldEstimate = [
  check('estimateId', 'estimate id prop is required').isMongoId(),
  check('acitivities.*.description', 'Activity list description prop is incorrect').isString(),
  check('acitivities.*.unitCost', 'Activity unit cost prop is incorrect').isFloat(),
  check('acitivities.*.quantity', 'Activity quantity prop is incorrect').isFloat(),
  check('acitivities.*.total', 'Activity total prop is incorrect').isFloat(),
]

export const checkGetAllEstimateByRange = [
  // query('from', 'from prop is required').matches(regexForDate),
  // query('to', 'to prop is required').matches(regexForDate),
]

export const checkUpdateConfigurationWorkshop = [
  check('workshopId', 'workshop id is required').isMongoId(),
  check('configuration.fee', 'fee prop is not valid').isBoolean()
]

export const checkGetWorkshopConfig = [
  param('workshopId', 'workshop id is required').isMongoId(),
]

export const checkGetBillId = [
  param('orderId', 'workshop id is required').isMongoId(),
]

export const checUpdateActivityGroup = [
  body('activityId', 'activity id is required').isMongoId(),
  body('activities', 'activities is required').isArray(),
  body('activities.*', 'activities item is not valid').isString(),
]

export const checkUpdateWorkshop = [
  check('workshopId', 'workshop id is required').isMongoId(),
  check('name', 'Name prop is required').isString(),
  check('slogan', 'Slogan prop is required').isString(),
  check('representative', 'Representative name prop is required').isString(),
  check('phoneNumber', 'Phone Number prop is required').isString(),
  check('location', 'Location prop is required').isString(),
  check('ruc', 'RUC prop is required').isString()
]
