import { Schema, model } from 'mongoose'
import { Vehicule, VehiculeBrands } from '../interfaces'

const vehiculeSchema = new Schema<Vehicule>(
  {
    name: { type: String },
    color: { type: String },
    motorNumber: { type: String },
    chasisNumber: { type: String },
    km: { type: Number },
    year: { type: Number },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeModel'
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeBrand'
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)


const vehiculeModelSchema = new Schema<VehiculeBrands>(
  {
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const vehiculeModel = model('vehicule', vehiculeSchema)
export const vehiculeBrandModel = model('vehiculeBrand', vehiculeBrandSchema)
export const vehiculeCustomModel = model('vehiculeModel', vehiculeModelSchema)