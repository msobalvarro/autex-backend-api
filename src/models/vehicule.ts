import { Schema, model } from 'mongoose'
import { Vehicule, VehiculeBrands } from '../interfaces'

const vehiculeSchema = new Schema<Vehicule>(
  {
    name: String,
    color: String,
    motorNumber: String,
    chasisNumber: String,
    km: Number,
    year: Number,
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
    description: String
  },
  {
    timestamps: false,
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
    timestamps: false,
    versionKey: false,
  }
)

export const vehiculeModel = model('vehicule', vehiculeSchema)
export const vehiculeBrandModel = model('vehiculeBrand', vehiculeBrandSchema)
export const vehiculeCustomModel = model('vehiculeModel', vehiculeModelSchema)