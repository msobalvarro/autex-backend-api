import { UploadFileError } from 'errors'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"))
  },
  filename: (req, file, cb) => {
    const fileName = crypto.randomUUID()
    cb(null, fileName)
  },
})

export const uploadFileService = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max: 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new UploadFileError('Tipo de archivo no permitido'))
    }
  }
})
