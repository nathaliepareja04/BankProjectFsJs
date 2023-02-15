export const transferValidSchema = {
  body: {
    type: "object",
    required: [
      "amount",
    ],
    properties: {
      creditId: {
        type: "string"
      },
      savingsAccId: {
        type: "string"
      },
      receivesAccountNumber: {
        type: "string"
      },
      bank: {
        type: "string",
        enum: ["Same", "Other"]
      },
      transferType: {
        type: "string",
        enum: ["WireTransfer", "Payment", "BankDeposit"]
      },
      amount: {
        type: "number",
        default: 0
      },
    },
  },
};
