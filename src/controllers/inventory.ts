import { CreateOrUpdateInventoryStock } from 'errors'
import { Request, Response } from 'express'
import {
  CreateOrUpdateInventaryCategory,
  UpdateOrNewInventoryProps,
  ReqHeaderAuthPropierties
} from 'interfaces'
import { existErrors } from 'middlewares/params'
import { createInventaryCategoryService } from 'services/inventory/createCategory'
import { CreateStockService } from 'services/inventory/createStock'
import { getCategoriesService, getInventoryDataService } from 'services/inventory/getInventory'
import { updateInvetaryCategoryService } from 'services/inventory/updateCategory'
import { updateStockInventaryService } from 'services/inventory/updateStock'

export const getStockController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrUpdateInventoryStock(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies

    const data = await getInventoryDataService({ workshopId, categoryId: req.query.category && `${req.query.category}` })
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const data = await getCategoriesService(workshopId)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrUpdateInventoryStock(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { description }: CreateOrUpdateInventaryCategory = req.body

    const category = await createInventaryCategoryService({ workshopId, description })
    res.send(category)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrUpdateInventoryStock(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { description, categoryId }: CreateOrUpdateInventaryCategory = req.body
    await updateInvetaryCategoryService({ categoryId, description, workshopId })

    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createInventaryController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrUpdateInventoryStock(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { category, name, stock, unitPrice }: UpdateOrNewInventoryProps = req.body
    const data = await CreateStockService({ categoryIds: category, name, stock, unitPrice, workshopId })
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const updateInventaryController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) throw new CreateOrUpdateInventoryStock(String(message))
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { category, name, stock, unitPrice, inventoryId }: UpdateOrNewInventoryProps = req.body
    await updateStockInventaryService({
      name,
      stock,
      unitPrice,
      workshopId,
      categories: category,
      inventoryId
    })
    res.send(true)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}
