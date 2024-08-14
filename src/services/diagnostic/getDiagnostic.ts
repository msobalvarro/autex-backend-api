import { DiagnosticPropierties } from 'interfaces'
import { DiagnosticModel } from 'models/diagnostic'
import { Types } from 'mongoose'

export const getDiagnosticDetailService = async (id: Types.ObjectId): Promise<DiagnosticPropierties | null> => {
  const data = await DiagnosticModel.findById(id)
      .populate('checksDone')
      .populate('client')
      .populate('possibleFailures')
      .populate('previousCheck')
      .populate({
        path : 'recommendations',
        populate : {
          path : 'activities'
        }
      })
      .populate('unitStatus')
      .populate('vehicule')
      .populate('activityType')
  return data
}
