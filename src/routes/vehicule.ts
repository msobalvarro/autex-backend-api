import {
  assignModelToBrandController,
  createBrandController,
  createMultpleBrandsController,
  createNewModelController,
  createVehiculeController
} from 'controllers/vehicule'
import {
  assignModelToBrandProps,
  createBrandProps,
  createModelProps,
  createMultipleBrandsProps,
  createVehiculeProps
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()

router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/createBrand', ...createBrandProps, createBrandController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
router.post('/createModel', ...createModelProps, createNewModelController)
router.post('/create', ...createVehiculeProps, createVehiculeController)
