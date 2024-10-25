import { createCategoryController, updateCategoryController } from 'controllers/inventory';
import { Router } from 'express';

export const router = Router()

router.post('/create/category', createCategoryController)
router.put('/update/category', updateCategoryController)
