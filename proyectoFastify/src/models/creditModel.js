import mongoose from "mongoose";
const { Schema, model } = mongoose;

const creditSchema = new Schema(
  {
    userId: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: [true, "The ID field is required"],
    },
    numberCredit: {
      type: Number
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
    },
    holderId: {
      type: String,
    },
    suretyId: {
      type: String,
    },
    public_id1: String,
    public_id2: String,
    creditType: {
      type: String,
      enum: [
        "HousingCredit",
        "CreditCard",
        "StudyCredit",
        "TravelCredit",
        "FreeInvestmentCredit",
      ],
    },
    creditAmount: {
      type: Number,
    },
    creditTerm: {
      type: Number,
    },
    quotaValue: {
      type: Number
    },
    missingPayments: {
      type: Number
    },
    monthlyInterest: {
      type: Number
    },
    totalToPay: {
      type: Number
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

creditSchema.methods.setImg = function setImg({
  secure_url_holder,
  secure_url_surety,
  public_id1,
  public_id2,
}) {
  this.holderId = secure_url_holder;
  this.suretyId = secure_url_surety;
  this.public_id1 = public_id1;
  this.public_id2 = public_id2;
};

export const creditModel = model("credit", creditSchema);
