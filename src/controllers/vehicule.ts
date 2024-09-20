import {
  CreateMultipleBrandsServiceError,
  CreateVehiculeBrandError,
  CreateVehiculeModelError,
  GetVehiculeDetailError,
  GetVehiculeError,
  UpdateVehiculeBrandError,
  UpdateVehiculeClient
} from 'errors'
import {
  AssignVehiculeToClientProps,
  CreateVehiculeProps,
  ReqHeaderAuthPropierties,
  NewMultipleModelsProps,
  NewVehiculeModelProps,
  VehiculeBrands,
  VehiculeNewModelToBrandProps
} from 'interfaces'
import {
  createMultipleVehiculeBrands,
  createNewBrand
} from 'services/vehicule/createVehiculeBrand'
import { CreateVehiculeModelService } from 'services/vehicule/createVehiculeModel'
import { addModelToBrand, addMultipleModels } from 'services/vehicule/updateVehiculeBrand'
import { existErrors } from 'middlewares/params'
import { createVehiculeService } from 'services/vehicule/createVehicule'
import { Request, Response } from 'express'
import { getAllVehiculesService, getClientAllVehiculeListService, getVehiculeDetailService } from 'services/vehicule/getVehicule'
import { getAllBrandsAndModel, getAllModelsService } from 'services/vehicule/getVehiculeModel'
import { assignVehiculeToClientService } from 'services/vehicule/assignVehiculeToClient'

export const getVehiculeDetailController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new GetVehiculeDetailError(String(message))
    }

    const { _id } = req.params    
    const vehicule = await getVehiculeDetailService(_id)
    res.send(vehicule)
  } catch (error) {
    res.status(404).send(`${error}`)
  }
}

export const getAllModelsController = async (req: Request, res: Response) => {
  try {
    const models = await getAllModelsService()
    res.send(models)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllBrandsController = async (req: Request, res: Response) => {
  try {
    const models = await getAllBrandsAndModel()
    res.send(models)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createMultpleBrandsController = async (req: Request, res: Response) => {
  try {
    const brands: VehiculeBrands[] = req.body
    const response = await createMultipleVehiculeBrands(brands)

    res.send(response)
  } catch (error) {
    res.status(404).send(`${error}`)
  }
}

export const createBrandController = async (req: Request, res: Response) => {
  try {
    const brand: VehiculeBrands = req.body
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateVehiculeBrandError(String(message))
    }

    const response = await createNewBrand(brand)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const assignModelToBrandController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    const { brandId, modelId }: VehiculeNewModelToBrandProps = req.body
    if (error) {
      throw new UpdateVehiculeBrandError(String(message))
    }

    const response = await addModelToBrand({ brandId, modelId })
    res.send(response)
  } catch (error) {
    res.status(404).send(`${error}`)
  }
}

export const assignVehiculeToClientController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    const { clientId, vehiculeId }: AssignVehiculeToClientProps = req.body
    if (error) {
      throw new UpdateVehiculeClient(String(message))
    }

    await assignVehiculeToClientService({ clientId, vehiculeId })

    res.send(true)
  } catch (error) {
    res.status(404).send(`${error}`)
  }
}

export const createNewModelController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateVehiculeModelError(String(message))
    }

    const { description, brandId }: NewVehiculeModelProps = req.body
    const newBrand = await CreateVehiculeModelService({ description, brandId })
    if (!newBrand) {
      throw new CreateVehiculeModelError('Brand cant be created')
    }

    res.send(newBrand)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createVehiculeController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateVehiculeModelError(String(message))
    }

    const params: CreateVehiculeProps = req.body
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const vehicule = await createVehiculeService(params, workshopId)

    await assignVehiculeToClientService({
      clientId: params.clientId,
      vehiculeId: vehicule._id
    })

    res.send(vehicule)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllVehiculesController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const data = await getAllVehiculesService(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createMultipleModelsController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {
      throw new CreateMultipleBrandsServiceError(String(message))
    }
    const params: NewMultipleModelsProps = req.body
    const response = await addMultipleModels(params)
    res.send(response)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getAllUserVehiculesController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    const { clientId } = req.params
    if (error) throw new GetVehiculeError(String(message))
    if (!clientId) throw new GetVehiculeError('clientId is required')

    const data = await getClientAllVehiculeListService(clientId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
