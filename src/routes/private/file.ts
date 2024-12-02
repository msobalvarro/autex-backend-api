import { Request, Response } from 'express'
import { Router } from 'express'
import { uploadFileService } from 'services/files/upload'

export const router = Router()

router.post('/upload', uploadFileService.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('File not found')
    }

    res.send({ file: req.file })
  } catch (error) {
    res.status(500).send(error)
  }
})
