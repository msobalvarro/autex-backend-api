import { RecommendationsDiagnosticPropierties } from 'interfaces';
import { RecommendationsDiagnosticModel } from 'models/diagnostic';
import { ItemWithCostEstimatedFieldModel } from 'models/estimate';

export const createRecommendation = async (recommendations: RecommendationsDiagnosticPropierties): Promise<RecommendationsDiagnosticPropierties> => {
  const activities = await ItemWithCostEstimatedFieldModel.insertMany(recommendations.activities)
  const dataCreated = await RecommendationsDiagnosticModel.create({ activities })
  return dataCreated
}