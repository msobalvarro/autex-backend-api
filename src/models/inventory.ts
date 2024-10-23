import { InventoryCategory, InventoryPropierties } from 'interfaces'
import { Schema, Types, model } from 'mongoose'

export const Category = new Schema<InventoryCategory>(
  {
    description: {
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

const Inventory = new Schema<InventoryPropierties>(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    category: [{ type: Types.ObjectId, ref: 'inventoryCategory' }],
    workshop: { type: Types.ObjectId, ref: 'workshop' }
  },
  {
    timestamps: true,
    versionKey: false
  },
)

export const InventoryCategoryModel = model('inventoryCategory', Category)
export const InvetoryModel = model('inventory', Inventory)
