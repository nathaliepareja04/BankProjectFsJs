import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cdtSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "The userId field is required"]
    },
    amount: {
      type: Number,
      required: [true, "The amount field is required"],
    },
    cdtTerm: {
      type: Number,
      required: [true, "The cdtTerm field is required"],
    },
    holderId: {
      type: String,
    },
    beneficiaryId: {
      type: String,
    },
    cdtInterest: {
      type: Number,
    },
    interestGain: {
      type: Number
    },
    withholdingTax: {
      type: Number
    },
    totalGains: {
      type: Number
    },
    public_id1: String,
    public_id2: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

cdtSchema.methods.setImg = function setImg({
  secure_url_holder,
  secure_url_beneficiary,
  public_id1,
  public_id2,
}) {
  this.holderId = secure_url_holder;
  this.beneficiaryId = secure_url_beneficiary;
  this.public_id1 = public_id1;
  this.public_id2 = public_id2;
};

export const cdtModel = model("cdt", cdtSchema);
