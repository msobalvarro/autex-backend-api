import { Schema, Types, model } from 'mongoose'
import { User } from '../interfaces'

const userSchema = new Schema<User>({
  uuid: {
    type: Types.UUID
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
}, {
  timestamps: true,
  versionKey: false,
})

export const UserModel = model('user', userSchema)