import { CreateDiagnosticError } from 'errors'
import { Request, Response } from 'express'
import { DiagnosticProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { Types } from 'mongoose'
import { createDiagnoticService } from 'services/diagnostic/createDiagnostic'
import { getDiagnosticDetailService } from 'services/diagnostic/getDiagnostic'

export const createDiagnosticController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateDiagnosticError(String(message))

    const diagnosticData: DiagnosticProps = req.body
    const newDiagnostic = await createDiagnoticService(diagnosticData)
    res.send(newDiagnostic)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getDiagnosticController = async (req: Request, res: Response) => {
  try {
    const id = new Types.ObjectId(req.params.id)
    const response = await getDiagnosticDetailService(id)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
