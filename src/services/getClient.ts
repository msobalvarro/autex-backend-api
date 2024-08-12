import { Client } from 'interfaces';
import { ClientModel } from 'models/client';

export const getAllClients = async (): Promise<Client[]> => {
  const clients: Client[] = await ClientModel.find()

  return clients
}
