import { Schema, model } from 'mongoose'
import { User } from '../interfaces'

const statusSchema = new Schema<User>(
  {
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const StatusModel = model('user', statusSchema)