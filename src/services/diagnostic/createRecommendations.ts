import { RecommendationsDiagnosticPropierties } from 'interfaces';
import { RecommendationsDiagnosticModel } from 'models/diagnostic';

export const createRecommendation = async (recommendations: RecommendationsDiagnosticPropierties): Promise<RecommendationsDiagnosticPropierties> => {
  const dataCreated = await RecommendationsDiagnosticModel.create(recommendations)
  return dataCreated
}