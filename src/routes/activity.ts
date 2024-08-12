import { Router } from 'express'
import { createActivityToDo } from 'controllers/activity'
import { createActivityToDoProps } from 'middlewares/params'

export const router = Router()

router.post('/createActivityToDo', ...createActivityToDoProps, createActivityToDo)
