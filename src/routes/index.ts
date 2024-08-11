import { ImportModulesErrors } from 'errors'
import { Router } from 'express'
import { readdirSync } from 'fs'

export const router = Router()
const pathRoute = `${__dirname}`

const FileName = (file: string) => file.replace('.ts', '')

readdirSync(pathRoute).map(async fileName => {
  const nameRoute = FileName(fileName)

  if (nameRoute !== 'index') {
    try {
      const module = await import(`./${nameRoute}`)
      router.use(`/${nameRoute}`, module.router)
      console.log(`/${nameRoute} added successfully`)
    } catch (error) {
      new ImportModulesErrors(`${error}`)
    }
  }
})