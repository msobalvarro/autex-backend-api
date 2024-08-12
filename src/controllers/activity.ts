import { Request, Response } from 'express'
import { ActivitiesToDoProperties } from 'interfaces'
import { createActitiyToDo } from 'services/createActivitiesToDo'

export const createActivityToDo = async (req: Request, res: Response) => {
  try {
    const { description }: ActivitiesToDoProperties = req.body

    const newActivity = await createActitiyToDo(description)

    res.send(newActivity)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}