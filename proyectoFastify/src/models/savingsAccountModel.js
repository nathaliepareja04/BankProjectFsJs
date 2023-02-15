import mongoose from "mongoose";
const { Schema, model } = mongoose;

const savingsAccountSchema = new Schema(
  {
    userId: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: [true, "The ID field is required"],
    },
    accountNumber: {
      type: Number,
      unique: [true, "The account number field is unique"],
    },
    idImg: {
      type: String,
      default: null,
    },
    public_id: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
    },
    balance: {
      type: Number,
      default: 0
    },
    interestEarnings: {
      type: Number,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

savingsAccountSchema.methods.setImg = function setImg({
  secure_url,
  public_id,
}) {
  this.idImg = secure_url;
  this.public_id = public_id;
};

export const savingsAccountModel = model(
  "savingsAccount",
  savingsAccountSchema
);
