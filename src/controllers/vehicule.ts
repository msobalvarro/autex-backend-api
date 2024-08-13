import { CreateVehiculeBrandError, UpdateVehiculeBrandError } from 'errors'
import { Request, Response } from 'express'
import { NewVehiculeModelProps, VehiculeBrands, VehiculeNewModelToBrandProps } from 'interfaces'
import { createMultipleVehiculeBrands, createNewBrand } from 'services/createVehiculeBrand'
import { CreateVehiculeModelService } from 'services/createVehiculeModel'
import { addModelToBrand } from 'services/updateVehiculeBrand'
import { existErrors } from 'middlewares/params'

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

export const createNewModel = async (req: Request, res: Response) => {
  try {
    const { description }: NewVehiculeModelProps = req.body
    const newBrand = await CreateVehiculeModelService({ description })
    if (!newBrand) {
      throw new UpdateVehiculeBrandError('Brand cant be created')
    }

    res.send(newBrand)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
