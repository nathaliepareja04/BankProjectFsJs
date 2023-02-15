export const creditValidSchema = {
  body: {
    type: "object",
    required: [
      "userId",
      "password",
      "creditType",
      "creditAmount",
      "creditTerm",
    ],
    properties: {
      userId: {
        type: "string",
      },
      numberCredit: {
        type: "number",
      },
      password: {
        type: "string",
      },
      creditType: {
        type: "string",
        enum: [
          "HousingCredit",
          "CreditCard",
          "StudyCredit",
          "TravelCredit",
          "FreeInvestmentCredit",
        ],
      },
      creditAmount: {
        type: "number",
      },
      creditTerm: {
        type: "number",
      },
      monthlyInterest: {
        type: "number"
      },
      quotaValue: {
        type: "number",
      },
      missingPayments: {
        type: "number",
      },
      totalToPay: {
        type: "number",
      },
    },
  },
};
