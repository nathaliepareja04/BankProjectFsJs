import mongoose from "mongoose";
const { Schema, model } = mongoose;

const transferSchema = new Schema(
  {
    creditId: {
      ref: "credit",
      type: Schema.Types.ObjectId
    },
    savingsAccId: {
      ref: "savingsAccount",
      type: Schema.Types.ObjectId
    },
    receivesAccountNumber: {
      type: Number,
    },
    bank: {
        type: String,
        enum: ["Same", "Other"]
    },
    transferType: {
      type: String,
      enum: ["BankTransfer", "Payment", "BankDeposit"],
    },
    amount: {
      type: Number,
      default: 0
    },
    intTransferBank: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
);

export const transferModel = model("transfer", transferSchema);
