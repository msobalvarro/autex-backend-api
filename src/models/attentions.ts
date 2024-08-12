import { Schema, model } from 'mongoose'
import { AttentionsProperties } from 'interfaces'

const attentionsSchema = new Schema<AttentionsProperties>(
  {
    isLocal: Boolean,
    isExpress: Boolean,
    isHome: Boolean,
    isRescue: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const PreliminarManagmentModek = model('attentions', attentionsSchema)