import { Schema, Types, model } from 'mongoose'
import { ActivityToDoEstimatePropierties, ActivityWithCostToDoItemEstimate, EstimatePropierties, OtherRequirementsEstimatePropierties, RequiredPartsEstimatePropierties } from 'interfaces'

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

export const activitiesToDo = new Schema<ActivityToDoEstimatePropierties>(
  {
    isService: Boolean,
    isMaintenance: Boolean,
    isMinorTypeService: Boolean,
    activities: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const requiredParts = new Schema<RequiredPartsEstimatePropierties>(
  {
    descriptions: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const otherRequirements = new Schema<OtherRequirementsEstimatePropierties>(
  {
    descriptions: [{
      type: Types.ObjectId,
      ref: 'itemWithCostEstimatedField'
    }],
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
    activitiesToDo: {
      type: Types.ObjectId,
      ref: 'activitiesToDoEstimate'
    },
    requiredParts: {
      type: Types.ObjectId,
      ref: 'requiredParts'
    },
    otherRequirements: {
      type: Types.ObjectId,
      ref: 'otherRequirements'
    },
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
export const ActivitiesToDoModel = model('activitiesToDoEstimate', activitiesToDo)
export const RequiredPartsModel = model('requiredParts', requiredParts)
export const OtherRequirementsModel = model('otherRequirements', otherRequirements)
export const EstimatedCostsModel = model('estimatedCosts', estimatedCosts)