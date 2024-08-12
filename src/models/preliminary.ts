import { Schema, model } from 'mongoose'
import { ServicesProperties } from 'interfaces'

const preliminarSchema = new Schema<ServicesProperties>(
  {
    isMecanic: Boolean,
    isElectrict: Boolean,
    isElectroMecanic: Boolean,
    isElectronic: Boolean,
    isMultiple: Boolean,
    isExternal: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const PreliminarManagmentModel = model('preliminaryManagement', preliminarSchema)