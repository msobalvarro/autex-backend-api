import { FilePropierties } from 'interfaces'
import { model, Schema } from 'mongoose'

const file = new Schema<FilePropierties>(
  {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const fileModel = model('files', file)