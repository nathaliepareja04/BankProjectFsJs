import { response } from "../helpers/response.js";
import { creditModel } from "../models/creditModel.js";
import { savingsAccountModel } from "../models/savingsAccountModel.js";
import { statsModel } from "../models/statsModel.js";

export const getStats = async (req, reply) => {
  try {
    const numAccs = await savingsAccountModel.estimatedDocumentCount();

    console.log(numAccs);
    const credit = await creditModel.estimatedDocumentCount();
    console.log(credit);
    const savingAccs = await savingsAccountModel.find();

    var suma = 0;

    savingAccs.forEach((item) => {
      suma = suma + item.balance;
    });

    const total = suma;
    console.log(total);

    let allAccBlocked = await savingsAccountModel.find();
    allAccBlocked = allAccBlocked.map((item) => item.isActive === false).length;

    const newStats = new statsModel({
      savingsAccounts: numAccs,
      totalSavings: total,
      credits: credit,
      blockedAccounts: allAccBlocked,
    });
    await newStats.save();

    return response(reply, 200, true, newStats, "Bank Stats");
  } catch (error) {
    console.log(error.message);
  }
};
