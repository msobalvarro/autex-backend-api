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
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active',
  },
}, {
  timestamps: true,
  versionKey: false,
})

export const UserModel = model('user', userSchema)