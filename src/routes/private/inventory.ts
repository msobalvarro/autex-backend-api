import {
  createCategoryController,
  createInventaryController,
  getStockController,
  updateCategoryController
} from 'controllers/inventory'
import { Router } from 'express'
import { checkCreateInventory } from 'middlewares/params'

export const router = Router()

// get
router.get('/', getStockController)

// post
router.post('/create/inventory', ...checkCreateInventory, createInventaryController)
router.post('/create/category', createCategoryController)

// put
router.put('/update/category', updateCategoryController)
