import mongoose from "mongoose";
const { Schema, model } = mongoose;

const configSchema = new Schema(
  {
    annualIntSavingsAcc: {
      type: Number,
      required: true,
    },
    intTransferSameBank: {
      type: Number,
      required: true,
    },
    intTransferOtherBank: {
      type: Number,
      required: true,
    },
    managementFeeSavingsAcc: {
      type: Number,
      required: true,
    },
    minAmountCDT: {
      type: Number,
      required: true,
    },
    maxAmountCDT: {
      type: Number,
      requiered: true,
    },
    minTermCDT: {
      type: Number,
      required: true,
    },
    maxTermCDT: {
      type: Number,
      requiered: true,
    },
    intRateCDT60: {
      type: Number,
      required: true,
    },
    intRateCDT90: {
      type: Number,
      required: true,
    },
    intRateCDT120: {
      type: Number,
      required: true,
    },
    intRateCDT180: {
      type: Number,
      required: true,
    },
    intRateCDT240: {
      type: Number,
      required: true,
    },
    intRateCDT360: {
      type: Number,
      required: true,
    },
    intRateCDT540: {
      type: Number,
      required: true,
    },
    withholdingTax: {
      type: Number,
      required: true,
    },
    intRateHouseCred: {
      type: Number,
      required: true,
    },
    minTermHouseCred: {
      type: Number,
      required: true,
    },
    maxTermHouseCred: {
      type: Number,
      required: true,
    },
    intRateCredCard: {
      type: Number,
      required: true,
    },
    minQuotaCredCard: {
      type: Number,
      required: true,
    },
    maxQuotaCredCard: {
      type: Number,
      required: true,
    },
    intRateEducatCred: {
      type: Number,
      required: true,
    },
    minTermEducatCred: {
      type: Number,
      required: true,
    },
    maxTermEducatCred: {
      type: Number,
      required: true,
    },
    intRateTravelCred: {
      type: Number,
      required: true,
    },
    minTermTravelCred: {
      type: Number,
      required: true,
    },
    maxTermTravelCred: {
      type: Number,
      required: true,
    },
    intRateFreeInvestCred: {
      type: Number,
      required: true,
    },
    minTermFreeInvestCred: {
      type: Number,
      required: true,
    },
    maxTermFreeInvestCred: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const configModel = model("config", configSchema);
