import {
  createCategoryController,
  createInventaryController,
  getStockController,
  updateCategoryController
} from 'controllers/inventory'
import { Router } from 'express'

export const router = Router()

router.get('/', getStockController)

router.post('/create/inventory', createInventaryController)
router.post('/create/category', createCategoryController)
router.put('/update/category', updateCategoryController)
