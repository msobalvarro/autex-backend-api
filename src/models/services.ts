import { Schema, model } from 'mongoose'
import { PreliminaryManagementProperties } from 'interfaces'

const preliminaryServiceSchema = new Schema<PreliminaryManagementProperties>(
  {
    isDiagnosed: Boolean,
    isProven: Boolean,
    isKOEO: Boolean,
    isKOER: Boolean,
    parked: Boolean,
    onRoad: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const PreliminarServicesModel = model('preliminaryServices', preliminaryServiceSchema)