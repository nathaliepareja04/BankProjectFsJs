import { uploadImageToCloudinary } from "../helpers/cloudinary.accions.js";
import { response } from "../helpers/response.js";
import { savingsAccountModel } from "../models/savingsAccountModel.js";
import { userModel } from "../models/userModel.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { comparePassword } from "../helpers/comparePassword.js";
import { getRandomInt } from "../helpers/generateRandomInt.js";

const savingsAccountCtrl = {};

savingsAccountCtrl.createAccount = async (req, reply) => {
  try {
    const { userId, password } = req.body;

    const foundUserById = await userModel.findOne({ idNumber: userId });

    if (!foundUserById) {
      return response(
        reply,
        404,
        false,
        "",
        `The person with identification number ${userId} does not exist in the system.`
      );
    }

    const foundUserAccount = await savingsAccountModel.findOne({
      userId: foundUserById._id,
    });
    if (foundUserAccount) {
      return response(
        reply,
        403,
        false,
        "",
        `The person with identification number ${userId} already has a savings account.`
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newSavingsAccount = new savingsAccountModel({
      userId: foundUserById._id,
      accountNumber: getRandomInt(1000, 5000),
      password: passwordEncrypt,
    });

    if (req.file) {
      const { secure_url, public_id } = await uploadImageToCloudinary(req.file);
      newSavingsAccount.setImg({ secure_url, public_id });
    }

    await savingsAccountModel.create(newSavingsAccount);

    response(
      reply,
      201,
      true,
      { ...newSavingsAccount.toJSON(), password: null },
      "Savings account has been created successfully."
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

savingsAccountCtrl.getAllActivateAcc = async (req, reply) => {
  try {
    let allAccActivate = await savingsAccountModel
      .find()
      .populate("userId", "-password");
    allAccActivate = allAccActivate.filter((item) => item.isActivated === true);
    allAccActivate.map((item) => (item.password = null));
    response(reply, 200, true, allAccActivate, "List of all savings accounts.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

savingsAccountCtrl.getAllDeletedAcc = async (req, reply) => {
  try {
    let allAccDeleted = await savingsAccountModel.find();
    allAccDeleted = allAccDeleted.filter((item) => item.isDeleted === true);
    allAccDeleted.map((item) => (item.password = null));
    response(reply, 200, true, allAccDeleted, "List of all savings accounts.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

savingsAccountCtrl.getAccountById = async (req, reply) => {
  const { accountNumber, password } = req.body;

  const foundAccount = await savingsAccountModel.findOne({ accountNumber });
  const user = await userModel.findById(foundAccount.userId);

  if (!foundAccount) {
    return response(
      reply,
      404,
      false,
      "",
      "The savings account does not exist, please try again."
    );
  }

  if (!comparePassword(password, foundAccount.password)) {
    return response(
      reply,
      400,
      false,
      "",
      "The credentials are not correct, please try again."
    );
  }

  response(
    reply,
    200,
    true,
    {
      ...foundAccount.toJSON(),
      password: null,
      userId: user.idNumber,
    },
    `Welcome ${user.name}`
  );
};

savingsAccountCtrl.deleteAcc = async (req, reply) => {
  const { accountNumber } = req.body;

  const foundAccount = await savingsAccountModel.findOne({ accountNumber });

  if (!accountNumber) {
    return response(
      reply,
      404,
      false,
      "",
      "Savings account does not exist, try again."
    );
  }

  await foundAccount.updateOne({
    isDeleted: true,
    isActivated: false,
  });
  response(
    reply,
    200,
    true,
    "",
    "The savings account has been successfully deleted."
  );
};

savingsAccountCtrl.updateAcc = async (req, reply) => {};

export default savingsAccountCtrl;
