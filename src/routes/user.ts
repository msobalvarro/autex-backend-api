import { Request, Response, Router } from 'express'
import { User } from 'interfaces'

export const router = Router()

router.post('/create', async (req: Request, res: Response) => {
  const data: User = req.body()

  // const dataCreated = await UserModel
})