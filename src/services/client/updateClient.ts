import { UpdateClientProps } from 'interfaces';
import { ClientModel } from 'models/client';

export const updateClientService = async ({ _id, documentId, email, name, phoneNumber, type }: UpdateClientProps): Promise<void> => {
  await ClientModel.updateOne({ _id }, {
    documentId,
    email,
    name,
    phoneNumber,
    type
  })
}