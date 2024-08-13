import { Schema, Types, model } from 'mongoose'
import {
  CheckDoneReportPropierties,
  CheckDoneResultReportPropierties,
  PreviusCheckReportPropierties,
  UnitStatusPropierties,
  UserReportPropierties
} from 'interfaces'

const unitSatatus = new Schema<UnitStatusPropierties>(
  {
    definitiveSolution: {
      type: Boolean,
      default: false,
    },
    improvisedSolution: {
      type: Boolean,
      default: false,
    },
    onlyDiagnosis: {
      type: Boolean,
      default: false,
    },
    transferSolution: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const userReport = new Schema<UserReportPropierties>(
  {
    description: [String],
    clientType: {
      type: String,
      enum: ['user', 'owner'],
      default: 'owner',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const previusCheckReport = new Schema<PreviusCheckReportPropierties>(
  {
    description: [String]
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const checksDoneReport = new Schema<CheckDoneReportPropierties>(
  {
    description: [{
      type: Types.ObjectId,
      ref: 'checksDoneResultReports'
    }],
    isComponent: {
      type: Boolean,
      default: false,
    },
    isKOEO: {
      type: Boolean,
      default: false,
    },
    isKOER: {
      type: Boolean,
      default: false,
    },
    isMecanism: {
      type: Boolean,
      default: false,
    },
    onRoad: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const checksDoneResults = new Schema<CheckDoneResultReportPropierties>(
  {
    description: String,
    result: String
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const UserReportModel = model('unitStatus', userReport)
export const UnitStatusModel = model('unitStatus', unitSatatus)
export const PreviusCheckReportModel = model('previusCheckReports', previusCheckReport)
export const ChecksDoneReportModel = model('checksDoneReports', checksDoneReport)
export const ChecksDoneResultReportModel = model('checksDoneResultReports', checksDoneResults)