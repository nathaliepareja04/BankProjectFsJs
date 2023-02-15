export const cdtValidSchema = {
  body: {
    type: "object",
    required: ["userId", "amount", "cdtTerm"],
    properties: {
      userId: {
        type: "string",
      },
      amount: {
        type: "number",
      },
      cdtTerm: {
        type: "number",
      },
      isPaid: {
        type: "boolean",
        default: false,
      },
    },
  },
};
