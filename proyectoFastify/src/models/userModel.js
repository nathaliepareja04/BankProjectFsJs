import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    lastname: {
      type: String,
      required: [true, "The lastname field is required"],
    },
    age: {
      type: Number,
      required: [true, "The age field is required"],
    },
    idType: {
      type: String,
      required: [true, "The ID type field is required"],
      enum: ["TI", "CC"],
    },
    idNumber: {
      type: String,
      required: [true, "The ID number field is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "The email field is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
    },
    role: [{
      ref: "roles",
      type: Schema.Types.ObjectId
    }],
  },
  {
    timestamps: true,
  }
);

// Methods
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const userModel = model("user", userSchema);
