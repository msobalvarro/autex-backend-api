import {
  assignModelToBrandController,
  createBrandController,
  createMultpleBrandsController,
  createNewModelController,
  createVehiculeController,
  getAllModelsController,
  getVehiculeDetailController
} from 'controllers/vehicule'
import {
  assignModelToBrandProps,
  createBrandProps,
  createModelProps,
  createMultipleBrandsProps,
  createVehiculeProps,
  getVehiculeDetailProps
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()
// GET Requests
router.get('/detail/:_id', ...getVehiculeDetailProps, getVehiculeDetailController)
router.get('/models/',  getAllModelsController)

// POST Requests
router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
router.post('/createBrand', ...createBrandProps, createBrandController)
router.post('/createModel', ...createModelProps, createNewModelController)
router.post('/create', ...createVehiculeProps, createVehiculeController)
