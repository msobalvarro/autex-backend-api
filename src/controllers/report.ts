import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { ReqHeaderAuthPropierties } from 'interfaces'
import { existErrors } from 'middlewares/params'
import { incomeReportService } from 'services/report/incomeReport'


export const getIncomeReportController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new Error(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { from, to } = req.query
    if (!from || !to) throw new Error('from and to is required')

    const fromDate = dayjs(`${from}`).startOf('day').toDate()
    const toDate = dayjs(`${to}`).endOf('day').toDate()
    const report = await incomeReportService({ workshopId, from: fromDate, to: toDate })

    res.send(report)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
