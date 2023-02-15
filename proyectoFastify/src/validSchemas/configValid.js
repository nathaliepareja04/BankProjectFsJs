export const configValidSchema = {
  body: {
    type: "object",
    required: [
      "annualIntSavingsAcc",
      "intTransferSameBank",
      "intTransferOtherBank",
      "managementFeeSavingsAcc",
      "minAmountCDT",
      "maxAmountCDT",
      "minTermCDT",
      "maxTermCDT",
      "intRateCDT60",
      "intRateCDT90",
      "intRateCDT120",
      "intRateCDT180",
      "intRateCDT240",
      "intRateCDT360",
      "intRateCDT540",
      "withholdingTax",
      "intRateHouseCred",
      "minTermHouseCred",
      "maxTermHouseCred",
      "intRateCredCard",
      "minQuotaCredCard",
      "maxQuotaCredCard",
      "intRateEducatCred",
      "minTermEducatCred",
      "maxTermEducatCred",
      "intRateTravelCred",
      "minTermTravelCred",
      "maxTermTravelCred",
      "intRateFreeInvestCred",
      "minTermFreeInvestCred",
      "maxTermFreeInvestCred",
    ],
    properties: {
      annualIntSavingsAcc: {
        type: "number",
      },
      intTransferSameBank: {
        type: "number",
      },
      intTransferOtherBank: {
        type: "number",
      },
      managementFeeSavingsAcc: {
        type: "number",
      },
      minAmountCDT: {
        type: "number",
      },
      maxAmountCDT: {
        type: "number",
      },
      minTermCDT: {
        type: "number",
      },
      maxTermCDT: {
        type: "number",
      },
      intRateCDT60: {
        type: "number",
      },
      intRateCDT90: {
        type: "number",
      },
      intRateCDT120: {
        type: "number",
      },
      intRateCDT180: {
        type: "number",
      },
      intRateCDT240: {
        type: "number",
      },
      intRateCDT360: {
        type: "number",
      },
      intRateCDT540: {
        type: "number",
      },
      withholdingTax: {
        type: "number",
      },
      intRateHouseCred: {
        type: "number",
      },
      minTermHouseCred: {
        type: "number"
      },
      maxTermHouseCred: {
        type: "number"
      },
      intRateCredCard: {
        type: "number",
      },
      minQuotaCredCard: {
        type: "number"
      },
      maxQuotaCredCard: {
        type: "number"
      },
      intRateEducatCred: {
        type: "number",
      },
      minTermEducatCred: {
        type: "number"
      },
      maxTermEducatCred: {
        type: "number"
      },
      intRateTravelCred: {
        type: "number",
      },
      minTermTravelCred: {
        type: "number"
      },
      maxTermTravelCred: {
        type: "number"
      },
      intRateFreeInvestCred: {
        type: "number",
      },
      minTermFreeInvestCred: {
        type: "number"
      },
      maxTermFreeInvestCred: {
        type: "number"
      },
    },
  },
};
