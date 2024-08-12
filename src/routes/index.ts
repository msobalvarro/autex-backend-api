import { ImportModulesErrors } from 'errors'
import { Router } from 'express'
import { readdirSync } from 'fs'

export const router = Router()
const pathRoute = `${__dirname}`

const FileName = (file: string) => file.replace('.ts', '')

const allRoutes = readdirSync(pathRoute)

const totalRotes = allRoutes.length - 1 // TODO: -1 because index is not allowed
let totalAdded = 0

allRoutes.map(async fileName => {
  const nameRoute = FileName(fileName)

  if (nameRoute !== 'index') {
    try {
      const module = await import(`./${nameRoute}`)
      router.use(`/${nameRoute}`, module.router)
      totalAdded++
    } catch (error) {
      console.log(`${nameRoute} is not added`)
      throw new ImportModulesErrors(`${error} - ${nameRoute} is not added`)
    } finally {
      console.log(`[${totalAdded} of ${totalRotes}] ${nameRoute} `)
    }
  }
})