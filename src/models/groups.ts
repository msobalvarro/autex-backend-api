import { ActivitiesGroupPropierties } from 'interfaces'
import { Schema, Types, model } from 'mongoose'

const acitivitiesGroup = new Schema<ActivitiesGroupPropierties>(
  {
    activities: {
      type: [String],
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    workshop: { type: Types.ObjectId, ref: 'workshop' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const ActivitiesGroupModel = model('activitiesGroupEstimate', acitivitiesGroup)
