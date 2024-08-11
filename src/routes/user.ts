import { createUser } from 'bussinesCases/createUser'
import { CreateUserError } from 'errors'
import { Request, Response, Router } from 'express'
import { User } from 'interfaces'
import { existErrors, validationCreateUser } from 'validations'

const router = Router()

router.post('/create', validationCreateUser, async (req: Request, res: Response) => {
  const { error, message } = existErrors(req)

  if (error) {
    throw new CreateUserError(`${message}`)
  }

  const data: User = req.body()
  const dataCreated = await createUser(data)

  res.send(dataCreated)
})

export { router }