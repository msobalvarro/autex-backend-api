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

export const estimatedCosts = new Schema<EstimatePropierties>(
  {
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
export const EstimatedCosts = model('estimatedCosts', estimatedCosts)