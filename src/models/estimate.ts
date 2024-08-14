import { Schema, model } from 'mongoose'
import { RecommendationToDoItemEstimate } from 'interfaces'

const recommendationTodoItemItem = new Schema<RecommendationToDoItemEstimate>(
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