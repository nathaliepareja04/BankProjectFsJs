import mongoose from "mongoose";
const { Schema, model } = mongoose;

const statSchema = new Schema({
    savingsAccounts: {
        type: Number,
        required: [true, "The field savingsAccounts is requiered"]
    },
    totalSavings: {
        type: Number,
        required: [true, "The field totalSavings is requiered"]
    },
    blockedAccounts: {
        type: Number,
        required: [true, "The field blockedAccounts is requiered"]
    },
    gains: {
        type: Number,
        required: [true, "The field gains is requiered"]
    },
    credits: {
        type: Number,
        required: [true, "The field credits is requiered"]
    },
})

export const statsModel = model("stats", statSchema)