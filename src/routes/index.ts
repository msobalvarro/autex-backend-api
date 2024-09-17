import { ImportModulesErrors } from 'errors'
import { Router } from 'express'
import { readdirSync } from 'fs'
import { authMiddleware } from 'middlewares/auth'

const PRIVATE = 'private'
const PUBLIC = 'public'

const pathRoute = `${__dirname}`
const privateRoutes = readdirSync(`${pathRoute}/${PRIVATE}`)
const publicRoutes = readdirSync(`${pathRoute}/${PUBLIC}`)
const totalRotes = (privateRoutes.length + publicRoutes.length)
let totalAdded = 0

export const router = Router()
const FileName = (file: string): string => file.replace('.ts', '')

const mapFiles = async (fileName: string, path: string) => {
  const routeFile = FileName(fileName)
  let success = false

  try {
    const module = await import(`./${path}/${routeFile}`)

    if (path === PRIVATE) {
      router.use(`/${routeFile}`, authMiddleware, module.router)
    } else {
      router.use(`/${routeFile}`, module.router)
    }

    totalAdded++
    success = true
  } catch (error) {
    throw new ImportModulesErrors(`${error} - ${routeFile} is not added`)
  } finally {
    console.log(`[${totalAdded}/${totalRotes}] ${routeFile} (${success ? 'added' : 'not added'})`)
  }
}

privateRoutes.map(e => mapFiles(e, PRIVATE))
publicRoutes.map(e => mapFiles(e, PUBLIC))