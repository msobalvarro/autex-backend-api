import { Request, Response } from 'express'
import { Router } from 'express'
import { registerFileService } from 'services/files/registerFile'
import { uploadFileService } from 'services/files/upload'

export const router = Router()

router.post('/upload', uploadFileService.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error('File not found')
    const { filename, originalname, size, mimetype } = req.file
    const file = await registerFileService({
      fileName: filename,
      originalName: originalname,
      size,
      type: mimetype
    })
    res.send(file)
  } catch (error) {
    res.status(500).send(error)
  }
})
