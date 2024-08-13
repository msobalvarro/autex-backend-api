import {
  assignModelToBrandController,
  createBrandController,
  createMultpleBrandsController
} from 'controllers/vehicule'
import {
  assignModelToBrandProps,
  createBrandProps,
  createMultipleBrandsProps
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/createBrand', ...createBrandProps, createBrandController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
