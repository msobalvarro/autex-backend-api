import { ErrosList } from 'interfaces'

export class DbErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = ErrosList.CONNECTION_ERROR
  }
}