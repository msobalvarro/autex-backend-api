import {
  createClientController,
  getAllClientsController,
  getClientById
} from 'controllers/client'
import { Router } from 'express'
import { createClientValidationProps } from 'middlewares/params'

export const router = Router()

// get all clients
router.get('/', getAllClientsController)

// get specific client
router.get('/get/:id', getClientById)

// create new client
router.post('/create', ...createClientValidationProps, createClientController)
