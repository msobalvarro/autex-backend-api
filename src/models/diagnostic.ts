import { Schema, Types, model } from 'mongoose'
import {
  CheckDoneDiagnosticPropierties,
  CheckDoneResultDiagnosticPropierties,
  DiagnosticPropierties,
  PossibleFailuresDiagnosticPropierties,
  PreviusCheckDiagnosticPropierties,
  RecommendationsDiagnosticPropierties,
  UnitStatusDiagnosticModelPropierties,
  UserReportDiangnosticPropierties
} from 'interfaces'

const unitSatatus = new Schema<UnitStatusDiagnosticModelPropierties>(
  {
    definitiveSolution: Boolean,
    improvisedSolution: Boolean,
    onlyDiagnosis: Boolean,
    transferSolution: Boolean,
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const userDiagnostic = new Schema<UserReportDiangnosticPropierties>(
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

const previusCheckDiagnostic = new Schema<PreviusCheckDiagnosticPropierties>(
  {
    description: [String]
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const checksDoneDiagnostic = new Schema<CheckDoneDiagnosticPropierties>(
  {
    description: [{
      type: Types.ObjectId,
      ref: 'checksDoneResultDiagnostic'
    }],
    isComponent: Boolean,
    isKOEO: Boolean,
    isKOER: Boolean,
    isMecanism: Boolean,
    onRoad: Boolean
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const checksDoneResults = new Schema<CheckDoneResultDiagnosticPropierties>(
  {
    description: String,
    result: String
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const possibleFailures = new Schema<PossibleFailuresDiagnosticPropierties>(
  {
    isCaused: Boolean,
    isInappropriateManagement: Boolean,
    isNeglect: Boolean,
    isNegligence: Boolean,
    isOmission: Boolean,
    isTechnique: Boolean,
  }, 
  {
    timestamps: false,
    versionKey: false,
  }
)

const recommendations = new Schema<RecommendationsDiagnosticPropierties>(
  {
    descriptions: [String]
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const DiagnosticReport = new Schema<DiagnosticPropierties>(
  {
    checksDone: {
      type: Types.ObjectId,
      ref: 'checksDoneDiagnostic'
    },
    client: {
      type: Types.ObjectId,
      ref: 'client'
    },
    possibleFailures: {
      type: Types.ObjectId,
      ref: 'PossibleFailiresDiagnostic'
    },
    previusCheck: {
      type: Types.ObjectId,
      ref: 'previusCheckDiagnostic'
    },
    recommendations: {
      type: Types.ObjectId,
      ref: 'recomendationsDiagnostic'
    },
    unitStatus: {
      type: Types.ObjectId,
      ref: 'unitStatusDiagnostic'
    },
    vehicule: {
      type: Types.ObjectId,
      ref: 'vehicule'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const UserDiagnosticModel = model('userStatusDiagnostic', userDiagnostic)
export const UnitStatusModel = model('unitStatusDiagnostic', unitSatatus)
export const PreviusCheckDiagnosticModel = model('previusCheckDiagnostic', previusCheckDiagnostic)
export const ChecksDoneDiagnosticModel = model('checksDoneDiagnostic', checksDoneDiagnostic)
export const ChecksDoneResultDiagnosticModel = model('checksDoneResultDiagnostic', checksDoneResults)
export const PossibleFailuresDiagnosticModel = model('PossibleFailiresDiagnostic', possibleFailures)
export const RecommendationsDiagnosticModel = model('recomendationsDiagnostic', recommendations)
export const DiagnosticModel = model('diagnostic', DiagnosticReport)