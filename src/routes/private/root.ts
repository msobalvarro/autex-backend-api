import { Router } from 'express'
import {
  assignUserAdminToWorkshopController,
  assignUserToWorkshopController,
  createWorkshopController,
  getAllWorkshopsController,
  getWorkshopConfigurationForRootController,
  getWorkshopsController,
  updateSettingWorkshopController,
  updateWorkshopController
} from 'controllers/workshop'
import {
  authMiddleware,
  authUserAdminMiddleware,
  authUserRootMiddleware,
} from 'middlewares/auth'
import {
  checkGetWorkshopConfig,
  checkAssignUserToWorkshop,
  checkCreateWorkshop,
  checkUpdateConfigurationWorkshop,
  checkUpdateWorkshop
} from 'middlewares/params'

export const router = Router()

// GET /
router.get(
  '/workshop/get/all',
  authUserRootMiddleware,
  getAllWorkshopsController
)

router.get(
  '/workshop/get/configuration/:workshopId',
  authUserRootMiddleware,
  ...checkGetWorkshopConfig,
  getWorkshopConfigurationForRootController
)

// POST / 
router.post(
  '/workshop/create',
  ...checkCreateWorkshop,
  authUserRootMiddleware,
  createWorkshopController
)

router.post(
  '/user/assign',
  ...checkAssignUserToWorkshop,
  authUserRootMiddleware,
  assignUserToWorkshopController
)

router.post(
  '/admin/assign',
  ...checkAssignUserToWorkshop,
  authUserRootMiddleware,
  assignUserAdminToWorkshopController
)

router.post(
  '/workshop/updateSettings',
  ...checkUpdateConfigurationWorkshop,
  authUserRootMiddleware,
  updateSettingWorkshopController,
)

// validate token for user admin
router.put(
  '/workshop/update',
  ...checkUpdateWorkshop,
  authUserAdminMiddleware,
  updateWorkshopController,
)
