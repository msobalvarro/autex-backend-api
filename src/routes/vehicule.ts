import {
  assignModelToBrandController,
  assignVehiculeToClientController,
  createBrandController,
  createMultpleBrandsController,
  createNewModelController,
  createVehiculeController,
  getAllBrandsController,
  getAllModelsController,
  getAllVehiculesController,
  getVehiculeDetailController
} from 'controllers/vehicule'
import {
  assignModelToBrandProps,
  assignVehiculeToClientProps,
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
router.get('/getAll', getAllVehiculesController)
router.get('/getAll/brands',  getAllBrandsController)

// POST Requests
router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
router.post('/assignVehiculeToClient', ...assignVehiculeToClientProps, assignVehiculeToClientController)
router.post('/create/brand', ...createBrandProps, createBrandController)
router.post('/create/model', ...createModelProps, createNewModelController)
router.post('/create', ...createVehiculeProps, createVehiculeController)
