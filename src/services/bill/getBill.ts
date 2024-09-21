import { BillPropierties } from 'interfaces';
import { BillModel } from 'models/bill';
import { Types } from 'mongoose';

export const getAllBillsService = async (workshopId: Types.ObjectId): Promise<BillPropierties[]> => {
  const bills = await BillModel.find({ workshop: { _id: workshopId } })
  return bills
}

export const getBillByOrderIdService = async (orderId: string, workshopId: Types.ObjectId): Promise<BillPropierties | null> => {
  const bill = await BillModel.findOne({
    order: { _id: orderId },
    workshop: {
      _id: workshopId
    }
  })

  return bill
}
