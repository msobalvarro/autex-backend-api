import { Schema, model } from 'mongoose'
import { AcivitiesProperties, ActivitiesToDoProperties } from 'interfaces'

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

const activityToDoSchema = new Schema<ActivitiesToDoProperties>(
  {
    description: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ActivitiesModel = model('activities', activitySchema)
export const ActivitiesToDoModel = model('activitiesToDo', activityToDoSchema)