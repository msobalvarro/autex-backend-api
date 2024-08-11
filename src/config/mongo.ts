import 'dotenv/config'
import { connect } from 'mongoose'

export const dbConnection = async (): Promise<void> => {
  const DB_URI = <string>process.env.DB_URI
  await connect(DB_URI)
}