import { Schema, Types, model } from 'mongoose'
import {
  ActivityWithCostToDoItemEstimate,
  EstimatePropierties
} from 'interfaces'

const itemWithCostEstimatedField = new Schema<ActivityWithCostToDoItemEstimate>(
  {
    description: String,
    quantity: {
      type: Number,
      default: 0,
    },
    unitCost: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const estimatedCosts = new Schema<EstimatePropierties>(
  {
    client: {
      type: Types.ObjectId,
      ref: 'client'
    },
    vehicule: {
      type: Types.ObjectId,
      ref: 'vehicule'
    },
    activitiesToDo: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
    requiredParts: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
    requiredPartsInventory: [{
      inventory: { type: Types.ObjectId, ref: 'inventory' },
      count: Number
    }],
    otherRequirements: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
    externalActivities: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
    activitiesGroup: {
      type: Types.ObjectId,
      ref: 'activitiesGroupEstimate'
    },
    traveled: { type: Types.ObjectId, ref: 'vehiculeDistance' },
    activitiesGroupCost: Number,
    externalCost: Number,
    inputCost: Number,
    laborCost: Number,
    partsCost: Number,
    total: Number,
    workshop: { type: Types.ObjectId, ref: 'workshop' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ItemWithCostEstimatedFieldModel = model('itemWithCostEstimatedField', itemWithCostEstimatedField)
export const EstimateModel = model('estimatedCosts', estimatedCosts)
