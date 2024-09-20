import { BillPropierties } from 'interfaces';
import { BillModel } from 'models/bill';
import { Types } from 'mongoose';

export const getAllBills = async (workshopId: Types.ObjectId): Promise<BillPropierties[]> => {
  const bills = await BillModel.find({ workshop: { _id: workshopId } })
  return bills
}