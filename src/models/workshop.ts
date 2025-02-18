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
    representative: String,
    phoneNumber: String,
    ruc: String,
    location: String,
    configuration: {
      fee: {
        type: Boolean,
        default: true,
        required: true,
      },
      lowStock: {
        type: Number,
        default: 5,
        required: true,
      },
    },
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