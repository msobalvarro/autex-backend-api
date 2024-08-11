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
