import mongoose from "mongoose";
const { Schema, model } = mongoose;

const rolesSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    versionKey: false,
  }
);

export const rolesModel = model("roles", rolesSchema);
