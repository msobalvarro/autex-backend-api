import { WorkshopPropierties } from 'interfaces'
import { Schema, model } from 'mongoose'

const workshop = new Schema<WorkshopPropierties>(
  {
    name: {
      required: true,
      type: String,
    },
    slogan: String,
    pictureUrl: String,
    administrators: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const WorkshopModel = model('workshop', workshop)