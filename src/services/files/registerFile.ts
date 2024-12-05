import { FilePropierties } from 'interfaces'
import { fileModel } from 'models/file'

export const registerFileService = async (props: FilePropierties): Promise<FilePropierties> => {
  const newFile = await fileModel.create(props)
  return newFile
}
