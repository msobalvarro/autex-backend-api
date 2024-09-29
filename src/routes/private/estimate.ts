import { Router } from 'express'
import {
  addActivityToDoController,
  addExternalActivitiesController,
  addOtherRequirementsController,
  addRequiredPartsControllers,
  createActivitiesGroupController,
  createEstimateController,
  deleteAcitityToDoController,
  deleteExternalActivityController,
  deleteOtherRequirementsControllers,
  deleteRequiredPartController,
  getActivitiesGroupController,
  getAllEstimatesByClientIdController,
  getAllEstimatesController,
  getAllEstimatesRangeDateController,
  getEstimateAndOrderDetailByIdController,
  getEstimateDetailByIdController,
  updateActivitiesGroupController
} from 'controllers/estimate'
import {
  checkCreateAcitivitiesGroup,
  checkPushItemsFieldEstimate,
  checkDeleteItemsFieldEstimate,
  createEstimateProps,
  getDetailIdProp,
  checkGetAllEstimateByRange,
  checUpdateActivityGroup
} from 'middlewares/params'

export const router = Router()

// GET
router.get('/detail/:id', ...getDetailIdProp, getEstimateDetailByIdController)
router.get('/detailWithOrder/:id', ...getDetailIdProp, getEstimateAndOrderDetailByIdController)
router.get('/activitiesGroup', getActivitiesGroupController)
router.get('/get/client/:clientId', getAllEstimatesByClientIdController)
router.get('/all', getAllEstimatesController)
router.get('/all/report', checkGetAllEstimateByRange, getAllEstimatesRangeDateController)

// POST
router.post('/create', ...createEstimateProps, createEstimateController)
router.post('/create/activitiesGroup', ...checkCreateAcitivitiesGroup, createActivitiesGroupController)

router.post('/delete/acitivitiesToDo', ...checkDeleteItemsFieldEstimate, deleteAcitityToDoController)
router.post('/add/acitivitiesToDo', ...checkPushItemsFieldEstimate, addActivityToDoController)

router.post('/delete/requiredPart', ...checkDeleteItemsFieldEstimate, deleteRequiredPartController)
router.post('/add/requiredPart', ...checkPushItemsFieldEstimate, addRequiredPartsControllers)

router.post('/delete/otherRequirement', ...checkDeleteItemsFieldEstimate, deleteOtherRequirementsControllers)
router.post('/add/otherRequirement', ...checkPushItemsFieldEstimate, addOtherRequirementsController)

router.post('/delete/externalActivity', ...checkDeleteItemsFieldEstimate, deleteExternalActivityController)
router.post('/add/externalActivity', ...checkPushItemsFieldEstimate, addExternalActivitiesController)

router.get('/activitiesGroup/update', ...checUpdateActivityGroup, updateActivitiesGroupController)
