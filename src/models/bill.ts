import { BillPropierties } from 'interfaces'
import { Schema, Types, model } from 'mongoose'

const bill = new Schema<BillPropierties>(
  {
    order: { ref: 'orderService', type: Types.ObjectId },
    tax: Number,
    total: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const BillModel = model('bill', bill)
