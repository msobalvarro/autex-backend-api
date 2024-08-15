import { AttentionsProperties } from 'interfaces'
import { AtentionsTypesModel } from 'models/order'

export const createAttentionTypesService = async (types: AttentionsProperties): Promise<AttentionsProperties> => {
  const dataCreated = await AtentionsTypesModel.create(types)
  return dataCreated
}
