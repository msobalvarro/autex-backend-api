import { Schema, Types, model } from 'mongoose'
import {
  ActivityWithCostToDoItemEstimate,
  EstimatePropierties
} from 'interfaces'

const itemWithCostField = new Schema<ActivityWithCostToDoItemEstimate>(
  {
    description: String,
    total: {
      type: Number,
      default: 0,
    },
    unitCost: {
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
    otherRequirements: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
    inputCost: Number,
    laborCost: Number,
    partsCost: Number,
    total: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ItemWithCostEstimatedFieldModel = model('itemWithCostEstimatedField', itemWithCostField)
export const EstimatedCostsModel = model('estimatedCosts', estimatedCosts)