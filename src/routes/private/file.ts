import path from 'path'
import { Request, Response } from 'express'
import { Router } from 'express'
import { uploadFileService } from 'services/files/upload'
import { PUBLIC_FOLDER } from 'utils/enviroments'
import { registerLogoService } from 'services/files/registerLogo'
import { ReqHeaderAuthPropierties } from 'interfaces'

export const router = Router()

router.post('/uploadLogo', uploadFileService.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error('File not found')
    const { workshopId }: ReqHeaderAuthPropierties = req.cookies
    const { filename } = req.file

    registerLogoService(filename, workshopId)

    res.send({ file: req.file })
  } catch (error) {
    res.status(500).send(error)
  }
})


router.get('/:imageName', async (req: Request, res: Response) => {
  const uploadDir = path.join(__dirname, PUBLIC_FOLDER)
  const imagePath = path.resolve(`${uploadDir}/${req.params.imageName}`)

  try {
    const fs = await import('fs/promises')
    await fs.access(imagePath)
    res.header('Content-Type', 'image/jpeg').sendFile(imagePath)
  } catch (error) {
    res.status(500).send(String(error))
  }
})