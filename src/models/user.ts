import { Schema, model } from 'mongoose'
import { User } from '../interfaces'

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true
  },
  name: String,
  password: String,
  isRoot: Boolean,
  isAdmin: Boolean,
}, {
  timestamps: true,
  versionKey: false,
})

export const UserModel = model('user', userSchema)