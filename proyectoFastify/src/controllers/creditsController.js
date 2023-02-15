import { uploadImageToCloudinary } from "../helpers/cloudinary.accions.js";
import { comparePassword } from "../helpers/comparePassword.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { getRandomInt } from "../helpers/generateRandomInt.js";
import { response } from "../helpers/response.js";
import { configModel } from "../models/configModel.js";
import { creditModel } from "../models/creditModel.js";
import { transferModel } from "../models/transferModel.js";
import { userModel } from "../models/userModel.js";

const creditCtrl = {};

creditCtrl.createNewCredit = async (req, reply) => {
  /* Formula para calcular las cuotas a pagar 
    tasa mensual = r

    pago = r * prestamo / 1 - (1 + r) ^ - periodo
  */

  try {
    const { userId, password, creditType, creditAmount, creditTerm } = req.body;

    const foundUserById = await userModel.findOne({ idNumber: userId });

    let interestCredit;
    let quotaValue;
    let totalToPay;

    if (!foundUserById) {
      return response(
        reply,
        404,
        false,
        "",
        `The person with identification number ${userId} does not exist in the system.`
      );
    }

    // Búsquedad de la colección config
    const config = await configModel.findById({
      _id: "63e427fadeb7ef3c51340ea7",
    });

    // Si el crédito es de vivienda
    if (creditType === "HousingCredit") {
      if (
        creditTerm < config.minTermHouseCred ||
        creditTerm > config.maxTermHouseCred
      ) {
        return response(
          reply,
          400,
          false,
          "",
          `The terms for this credit are a minimum of ${config.minTermHouseCred} quotas and a maximum of ${config.maxTermHouseCred} quotas.`
        );
      }

      // Interés por el crédito
      interestCredit = config.intRateHouseCred;
    }

    // Si es una targeta de crédito
    if (creditType === "CreditCard") {
      if (
        creditTerm < config.minQuotaCredCard ||
        creditTerm > config.maxQuotaCredCard
      ) {
        return response(
          reply,
          400,
          false,
          "",
          `The terms for this credit are a minimum of ${config.minQuotaCredCard} quotas and a maximum of ${config.maxQuotaCredCard} quotas.`
        );
      }

      // Interés para targeta de crédito
      interestCredit = config.intRateCredCard;
    }

    // Si es un crédito de estudio
    if (creditType === "StudyCredit") {
      if (
        creditTerm < config.minTermEducatCred ||
        creditTerm > config.maxTermEducatCred
      ) {
        return response(
          reply,
          400,
          false,
          "",
          `The terms for this credit are a minimum of ${config.minTermEducatCred} quotas and a maximum of ${config.maxTermEducatCred} quotas.`
        );
      }

      // Interés para el crédito de estudio
      interestCredit = config.intRateEducatCred;
    }

    // Si es un crédito para viajes
    if (creditType === "TravelCredit") {
      if (
        creditTerm < config.minTermTravelCred ||
        creditTerm > config.maxTermTravelCred
      ) {
        return response(
          reply,
          400,
          false,
          "",
          `The terms for this credit are a minimum of ${config.minTermTravelCred} quotas and a maximum of ${config.maxTermTravelCred} quotas.`
        );
      }

      // Interés para el crédito de viajes
      interestCredit = config.intRateTravelCred;
    }

    // Si el crédito es de libre inversión
    if (creditType === "FreeInvestmentCredit") {
      if (
        creditTerm < config.minTermFreeInvestCred ||
        creditTerm > config.maxTermFreeInvestCred
      ) {
        return response(
          reply,
          400,
          false,
          "",
          `The terms for this credit are a minimum of ${config.minTermFreeInvestCred} quotas and a maximum of ${config.maxTermFreeInvestCred} quotas.`
        );
      }

      // Interés para el crédito de libre inversión
      interestCredit = config.intRateFreeInvestCred;
    }

    // Valor de la cuota de acuerdo al interés del crédito
    quotaValue =
      (creditAmount * interestCredit) /
      (1 - Math.pow(1 + interestCredit, -creditTerm));

    // Valor del préstamo más el total de intereses a pagar
    totalToPay = quotaValue * creditTerm;

    // Función para encriptar la contraseña dada
    const passwordEncrypt = encryptPassword(password);

    // Constructor
    const newCredit = new creditModel({
      ...req.body,
      userId: foundUserById._id,
      password: passwordEncrypt,
      numberCredit: getRandomInt(1000, 5000),
      monthlyInterest: interestCredit,
      quotaValue: Math.round(quotaValue),
      totalToPay: Math.round(totalToPay),
      missingPayments: creditTerm
    });

    // Proceso para recibir la cédula del titular y fiador
    let imgsData = {
      secure_url_holder: null,
      secure_url_surety: null,
      public_id1: null,
      public_id2: null,
    };

    let i = 0;

    if (req.files) {
      for (const file of req.files) {
        const { secure_url, public_id } = await uploadImageToCloudinary(file);

        if (i === 0) {
          imgsData = {
            ...imgsData,
            secure_url_holder: secure_url,
            public_id1: public_id,
          };
        } else if (i === 1) {
          imgsData = {
            ...imgsData,
            secure_url_surety: secure_url,
            public_id2: public_id,
          };
        }
        i = i++;
      }

      newCredit.setImg(imgsData);

      // Creación del nuevo registro
      await creditModel.create(newCredit);

      response(
        reply,
        200,
        true,
        { ...newCredit.toJSON(), password: null },
        "The credit has been created successfully."
      );
    }
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

creditCtrl.getAllCredits = async(req, reply) => {
  try {
    const allCredits = await creditModel.find()
    allCredits.map((item) => (item.password = null));

    response(reply, 200, true, allCredits, "List of all credits")
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
 
}

creditCtrl.getAllCompleted = async (req, reply) => {
  try {
    let allCredCompleted = await creditModel
      .find()
      .populate("userId", "-password");
      allCredCompleted = allCredCompleted.filter((item) => item.isCompleted === true);
      allCredCompleted.map((item) => (item.password = null));
    response(reply, 200, true, allCredCompleted, "List of all credits.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

creditCtrl.getAllNotCompleted = async (req, reply) => {
  try {
    let allCredNotCompleted = await creditModel
      .find()
      allCredNotCompleted = allCredNotCompleted.filter((item) => item.isCompleted === false);
      allCredNotCompleted.map((item) => (item.password = null));
    response(reply, 200, true, allCredNotCompleted, "List of all credits not completed.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

creditCtrl.getCreditById = async(req, reply) => {
  try {
    const { numberCredit, password } = req.body;

  const foundCredit = await creditModel.findOne({ numberCredit });
  const user = await userModel.findOne({_id: foundCredit.userId});
  const transfers = await transferModel.find({creditId: foundCredit._id})

  if (!foundCredit) {
    return response(
      reply,
      404,
      false,
      "",
      "The credit does not exist, please try again."
    );
  }

  if (!comparePassword(password, foundCredit.password)) {
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
      ...foundCredit.toJSON(),
      password: null,
      userId: user.idNumber,
      transfers
    },
    `Welcome ${user.name}`
  );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
}

export default creditCtrl;
