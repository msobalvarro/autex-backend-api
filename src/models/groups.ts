import { ActivitiesGroupPropierties } from 'interfaces'
import { Schema, model } from 'mongoose'

const acitivitiesGroup = new Schema<ActivitiesGroupPropierties>(
  {
    activities: {
      type: [String],
      required: true
    },
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const ActivitiesGroupModel = model('activitiesGroupEstimate', acitivitiesGroup)
