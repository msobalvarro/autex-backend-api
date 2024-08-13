import { Schema, Types, model } from 'mongoose'
import { Vehicule, VehiculeBrands, VehiculeModel } from '../interfaces'

const vehiculeSchema = new Schema<Vehicule>(
  {
    color: {
      type: String,
      required: true,
    },
    motorNumber: {
      type: String,
      unique: true,
      required: true,
    },
    chasisNumber: {
      type: String,
      unique: true,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['auto', 'pickup', 'ban', 'truck', 'motorcycle'],
      default: 'auto',
      required: true,
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeModel',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeBrand',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const vehiculeBrandSchema = new Schema<VehiculeBrands>(
  {
    description: {
      type: String,
      unique: true,
    },
    models: [{
      type: Types.ObjectId,
      ref: 'vehiculeModel',
    }]
  },
  {
    timestamps: false,
    versionKey: false,
  }
)


const vehiculeModelSchema = new Schema<VehiculeModel>(
  {
    description: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const vehiculeModel = model('vehicule', vehiculeSchema)
export const vehiculeBrandModel = model('vehiculeBrand', vehiculeBrandSchema)
export const vehiculeCustomModel = model('vehiculeModel', vehiculeModelSchema)