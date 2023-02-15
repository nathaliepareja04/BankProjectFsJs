export const newSavingsAccountValidSchema = {
  body: {
    type: "object",
    required: ["userId", "password"],
    properties: {
      userId: {
        type: "string",
      },
      password: {
        type: "string",
      },
      accountNumber: {
        type: "number"
      },
      idImg: {
        type: "string"
      }
    },
  },
};
