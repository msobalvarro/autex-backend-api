import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { router } from './routes'
import { dbConnection } from './config/mongo'

const PORT = process.env.PORT
const app = express()
dbConnection().then(() => {
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })

  app.use(cors())
  app.use(express.json())
  app.use(router)
  // app.use()
  app.listen(PORT, () => console.log(`ready into port ${PORT}`))
}).catch(err => console.log(`database connection error: ${err}`))