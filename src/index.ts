import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { dbConnection } from './config/mongo'

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
dbConnection().then(() => console.log('db connected'))
app.listen(PORT, () => console.log(`ready into port ${PORT}`))