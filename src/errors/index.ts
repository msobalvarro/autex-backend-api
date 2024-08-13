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
    this.name = ErrosList.CREATE_USER_ERROR
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

export class GetVehiculeDetailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.GET_VEHICULE_DETAIL_ERROR
    this.message = message
  }
}
