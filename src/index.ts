import express from 'express'
import cors from 'cors'
import path from 'path'
import { router } from './routes'
import { dbConnection } from './config/mongo'
import { PORT } from 'utils/enviroments'

const app = express()
dbConnection().then(() => {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
  })

  app.use(cors())
  app.use(express.json())
  app.use(router)
  app.get('*', (__, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  })
  // app.use()
  app.listen(PORT, () => console.log(`ready into port ${PORT}`))
}).catch(err => console.log(`database connection error: ${err}`))