import 'dotenv/config'

export const {
  PORT = 3002,
  DB_URI = '',
  SECRET_KEY = '',
  PUBLIC_FOLDER = ''
} = process.env