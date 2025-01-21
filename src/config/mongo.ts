import { DB_URI } from 'utils/enviroments'
import { connect } from 'mongoose'

export const dbConnection = async (): Promise<void> => {
  await connect(DB_URI)
}