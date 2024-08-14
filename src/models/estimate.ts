import { Schema, model } from 'mongoose'
import { ActivityWithCostToDoItemEstimate } from 'interfaces'

const recommendationTodoItemItem = new Schema<ActivityWithCostToDoItemEstimate>(
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

export const RecommendationToDoItemModel = model('recommendationToDOItem', recommendationTodoItemItem)