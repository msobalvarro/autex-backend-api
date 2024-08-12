import { Schema, model } from 'mongoose'
import { AcivitiesProperties } from 'interfaces'

const activitySchema = new Schema<AcivitiesProperties>(
  {
    isMaintenance: Boolean,
    isMinorMantenance: Boolean,
    isService: Boolean,
    type: {
      type: String,
      enum: ['predictive', 'prenventive', 'corrective'],
      default: 'Person',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ActivitiesModel = model('activities', activitySchema)