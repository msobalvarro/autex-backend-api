import {
  createCategoryController,
  createInventaryController,
  getStockController,
  updateCategoryController,
  updateInventaryController
} from 'controllers/inventory'
import { Router } from 'express'
import {
  checkCreateCategory,
  checkCreateInventory,
  checkUpdateCategory,
  checkUpdateInventory
} from 'middlewares/params'

export const router = Router()

// get
router.get('/', getStockController)

// post
router.post('/create', ...checkCreateInventory, createInventaryController)
router.post('/create/category', ...checkCreateCategory, createCategoryController)

// put
router.put('/update', ...checkUpdateInventory, updateInventaryController)
router.put('/update/category', ...checkUpdateCategory, updateCategoryController)
