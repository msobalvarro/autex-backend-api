import { Types } from 'mongoose'

export interface User {
  __id?: Types.ObjectId;
  uuid?: string;
  email: string;
  password?: string;
}

export enum ErrosList {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
}