import { Schema, Types, model } from 'mongoose'
import { Vehicule, VehiculeBrands, VehiculeModel } from '../interfaces'

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