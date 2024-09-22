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
  }).populate({
    path: 'order',
    populate: [
      {
        path: 'estimateProps',
        populate: [
          { path: 'client', select: '-vehicules' },
          {
            path: 'vehicule',
            populate: [
              { path: 'brand', select: '-models' },
              { path: 'model', select: '-vehicules' },
            ]
          },
          { path: 'activitiesToDo' },
          { path: 'requiredParts' },
          { path: 'otherRequirements' },
          { path: 'externalActivities' },
        ]
      },
      { path: 'additionalTask' }
    ]
  })

  return bill
}
