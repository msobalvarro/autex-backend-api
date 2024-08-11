import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response) => {
  try {
     
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}