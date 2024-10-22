import { ErrosList } from 'interfaces'

export class DbErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CONNECTION_ERROR
  }
}

export class ParamsValidationError extends Error {
  constructor() {
    super()
    this.name = ErrosList.PARAMS_VALIDATION_ERROR
  }
}

export class CreateUserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_USER_ERROR
    this.message = message
  }
}

export class UpdateUserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_USER_ERROR
    this.message = message
  }
}

export class ImportModulesErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.IMPORT_MODULE_ERROR
    this.message = message
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.AUTHENTICATION_ERROR
    this.message = message
  }
}

export class CreateClientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_CLIENT_ERROR
    this.message = message
  }
}

export class UpdateClientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_CLIENT_ERROR
    this.message = message
  }
}

export class CreateActivityToDoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_ACTIVITY_TO_DO
    this.message = message
  }
}

export class UpdateVehiculeBrandError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_VEHICULE_BRAND
    this.message = message
  }
}

export class UpdateVehiculeClient extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_VEHICULE_CLIENT
    this.message = message
  }
}

export class CreateVehiculeBrandError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_VEHICULE_BRAND
    this.message = message
  }
}

export class CreateVehiculeModelError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_VEHICULE_MODEL
    this.message = message
  }
}

export class CreateVehiculeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_VEHICULE_ERROR
    this.message = message
  }
}

export class UpdateEstimateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_ESTIMATE_ERROR
    this.message = message
  }
}

export class GetVehiculeDetailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.GET_VEHICULE_DETAIL_ERROR
    this.message = message
  }
}

export class GetVehiculeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.GET_VEHICULE_ERROR
    this.message = message
  }
}

export class CreateDiagnosticError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.GET_VEHICULE_DETAIL_ERROR
    this.message = message
  }
}

export class CreateEstimatedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.GET_VEHICULE_DETAIL_ERROR
    this.message = message
  }
}

export class CreateOrderServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_ORDER_SERVICE_ERROR
    this.message = message
  }
}

export class CreateMultipleBrandsServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_MULTIPLE_BRANDS
    this.message = message
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.AUTHORIZATION_ERROR
    this.message = message
  }
}

export class UpdateOrderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.UPDATE_STATUS_ORDEE
    this.message = message
  }
}

export class CreateWorkshopError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_WORKSHOP
    this.message = message
  }
}


export class CreateUserWorkshopError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_USER_WORKSHOP
    this.message = message
  }
}

export class CreateAtivititiesGroupError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_ACTIVITIES_GROUP_ESTIMATE
    this.message = message
  }
}

export class CreateEstimationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_ESTIMATION_ERROR
    this.message = message
  }
}

export class CreateBillError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_BILL_ERROR
    this.message = message
  }
}

export class CreateOrUpdateInventoryStock extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CREATE_OR_UPDATE_STOCK
    this.message = message
  }
}

