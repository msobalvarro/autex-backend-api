import {
  assignModelToBrandController,
  assignVehiculeToClientController,
  createBrandController,
  createMultipleModelsController,
  createMultpleBrandsController,
  createNewModelController,
  createVehiculeController,
  getAllBrandsController,
  getAllModelsController,
  getAllUserVehiculesController,
  getAllVehiculesController,
  getVehiculeDetailController
} from 'controllers/vehicule'
import {
  assignModelToBrandProps,
  assignVehiculeToClientProps,
  createBrandProps,
  createModelProps,
  createMultipleBrandsProps,
  createMultipleModelsProps,
  createVehiculeProps,
  getClientsVehiculeDetailProps,
  getVehiculeDetailProps
} from 'middlewares/params'
import { Router } from 'express'

export const router = Router()
// GET Requests
router.get('/detail/:_id', ...getVehiculeDetailProps, getVehiculeDetailController)
router.get('/models/', getAllModelsController)
router.get('/get/list/:clientId', ...getClientsVehiculeDetailProps, getAllUserVehiculesController)
router.get('/getAll', getAllVehiculesController)
router.get('/getAll/brands', getAllBrandsController)

// POST Requests
router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
router.post('/assignVehiculeToClient', ...assignVehiculeToClientProps, assignVehiculeToClientController)
router.post('/create/brand', ...createBrandProps, createBrandController)
router.post('/create/model', ...createModelProps, createNewModelController)
router.post('/create/multiple/models', ...createMultipleModelsProps, createMultipleModelsController)
router.post('/create', ...createVehiculeProps, createVehiculeController)
