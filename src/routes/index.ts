import { Router } from 'express'
import { readdirSync } from 'fs'

export const router = Router()
const pathRoute = `${__dirname}`

const FileName = (file: string) => file.replace('.ts', '')

readdirSync(pathRoute).filter(fileName => {
  const nameRoute = FileName(fileName)
  
  if (nameRoute !== 'index') {
    console.log(nameRoute)
    
    import(`./${nameRoute}`).then((module) => {
      router.use(`/${nameRoute}`, module.router)
    })
  }
})