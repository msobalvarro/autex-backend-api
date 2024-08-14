import { CreateDiagnosticError } from 'errors'
import { Request, Response } from 'express'
import { DiagnosticProps } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { createDiagnoticService } from 'services/diagnostic/createDiagnostic'

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