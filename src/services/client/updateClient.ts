import { UpdateClientProps } from 'interfaces';
import { ClientModel } from 'models/client';
import { Types } from 'mongoose';
import { redisClient } from 'utils/redis';

export const updateClientService = async ({ _id, documentId, email, name, phoneNumber, type }: UpdateClientProps, workshopId: Types.ObjectId): Promise<void> => {
  await redisClient.del(`clients-${workshopId}`)
  
  await ClientModel.updateOne({ _id }, {
    documentId,
    email,
    name,
    phoneNumber,
    type
  })
}