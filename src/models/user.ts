import { Schema, model } from 'mongoose'
import { User } from '../interfaces'

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true
  },
  password: String
}, {
  timestamps: true,
  versionKey: false,
})

export const UserModel = model('user', userSchema)