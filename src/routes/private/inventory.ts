import {
  createCategoryController,
  createInventaryController,
  getStockController,
  updateCategoryController,
  updateInventaryController
} from 'controllers/inventory'
import { Router } from 'express'
import { checkCreateCategory, checkCreateInventory, checkUpdateCategory, checkUpdateInventory } from 'middlewares/params'

export const router = Router()

// get
router.get('/', getStockController)

// post
router.post('/create/category', ...checkCreateCategory, createCategoryController)
router.post('/create/inventory', ...checkCreateInventory, createInventaryController)

// put
router.put('/update/inventory', ...checkUpdateInventory, updateInventaryController)
router.put('/update/category', ...checkUpdateCategory, updateCategoryController)
