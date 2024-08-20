import { ImportModulesErrors } from 'errors'
import { Router } from 'express'
import { readdirSync } from 'fs'
import { PropsAuth } from 'interfaces'
import { authMiddleware } from 'middlewares/auth'

export const router = Router()
const FileName = (file: string): PropsAuth => {
  const PRIVATE = '[private]'
  const isProtected = file.search(PRIVATE) > -1
  const fileName = file.replace('.ts', '')
  
  console.log(file.search(PRIVATE), fileName)
  return {
    isProtected,
    fileName: fileName,
    routeName: isProtected ? fileName.replace(PRIVATE, '').trim() : fileName,
  }
}
const pathRoute = `${__dirname}`
const allRoutes = readdirSync(pathRoute)
const totalRotes = allRoutes.length - 1 // TODO: -1 because index is not allowed
let totalAdded = 0

allRoutes.map(async fileName => {
  const routeFile = FileName(fileName)
  let success = false
  if (routeFile.fileName !== 'index') {
    try {
      const module = await import(`./${routeFile.fileName}`)
      if (routeFile.isProtected) {
        router.use(`/${routeFile.routeName}`, authMiddleware, module.router)
      } else {
        router.use(`/${routeFile.routeName}`, module.router)
      }

      totalAdded++
      success = true
    } catch (error) {
      throw new ImportModulesErrors(`${error} - ${routeFile.fileName} is not added`)
    } finally {
      console.log(`[${totalAdded}/${totalRotes}] ${routeFile.fileName} (${success ? 'added' : 'not added'})`)
    }
  }
})