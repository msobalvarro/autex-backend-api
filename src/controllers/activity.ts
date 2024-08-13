import { Request, Response } from 'express'
import { ActivitiesToDoProperties } from 'interfaces'
import { createActitiyToDo } from 'services/serviceOrder/createActivitiesToDo'
import { existErrors } from 'middlewares/params'
import { CreateActivityToDoError } from 'errors'

export const createActivityToDo = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) { 
      throw new CreateActivityToDoError(String(message))
    }

    const { description }: ActivitiesToDoProperties = req.body
    const newActivity = await createActitiyToDo(description)

    res.send(newActivity)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}