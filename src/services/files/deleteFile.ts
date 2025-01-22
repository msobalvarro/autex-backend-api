import path from 'path'
import fs from 'fs'
import { PUBLIC_FOLDER } from 'utils/enviroments'

export const deleteFileService = async (fileName: string) => {
  const filePath = path.join(__dirname, PUBLIC_FOLDER, fileName)

  try {
    await fs.unlinkSync(filePath)
  } catch (error) {
    console.log(`Error deleting file ${error}`)
  }
}