import { Router } from 'express'
import { getIncomeReportController } from 'controllers/report'

export const router = Router()

router.get(
  '/income',
  getIncomeReportController
)

