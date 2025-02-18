import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { UploadFileError } from 'errors'
import { PUBLIC_FOLDER } from 'utils/enviroments'

// outside of project directory
const externalStoragePath = path.join(__dirname, PUBLIC_FOLDER)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(externalStoragePath)) {
      fs.mkdirSync(externalStoragePath)
    }

    cb(null, externalStoragePath)
  },
  filename: (req, file, cb) => {
    const fileName = crypto.randomUUID()
    cb(null, `${fileName}.png`)
  },
})

export const uploadFileService = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // max: 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new UploadFileError('Tipo de archivo no permitido'))
    }
  }
})
