import { createUser } from 'bussinesCases/createUser'
import { Request, Response, Router } from 'express'
import { User } from 'interfaces'
import { schemaCreateUser } from 'validations'

export const router = Router()

router.post('/create', async (req: Request, res: Response) => {
  const data: User = req.body()

  const dataCreated = await createUser(data)
  
  res.send(dataCreated)
})