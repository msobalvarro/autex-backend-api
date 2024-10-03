import {
  updateClientController,
  createClientController,
  getAllClientsController,
  getAllClientsWithCarController,
  getClientByIdController
} from 'controllers/client'
import { Router } from 'express'
import {
  createClientValidationProps,
  updateClientValidationProps
} from 'middlewares/params'

export const router = Router()

// get all clients
router.get('/getAll', getAllClientsController)
router.get('/getAllWithCars', getAllClientsWithCarController)

// get specific client
router.get('/get/:id', getClientByIdController)

// create new client
router.post('/create', ...createClientValidationProps, createClientController)
router.put('/update', ...updateClientValidationProps, updateClientController)
