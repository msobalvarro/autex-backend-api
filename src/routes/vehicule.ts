import { assignModelToBrandController, createMultpleBrandsController } from 'controllers/vehicule'
import { Router } from 'express'
import { assignModelToBrandProps, createMultipleBrandsProps } from 'middlewares/params'

export const router = Router()

router.post('/createMultipleBrands', ...createMultipleBrandsProps, createMultpleBrandsController)
router.post('/assignModelToBrand', ...assignModelToBrandProps, assignModelToBrandController)
