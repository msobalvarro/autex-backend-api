import express from 'express'
import cors from 'cors'
import path from 'path'
import { router } from './routes'
import { dbConnection } from './config/mongo'
import { PORT } from 'utils/enviroments'

const app = express()

const main = async () => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
  })

  app.use(cors())
  app.use(express.json())
  app.use(router)

  app.get('*', (__, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  })

  try {
    await dbConnection()
  } catch (error) {
    console.error('Error connecting to database:', error)
  }

  app.listen(PORT, () => console.log(`ready into port ${PORT}`))
}

main()