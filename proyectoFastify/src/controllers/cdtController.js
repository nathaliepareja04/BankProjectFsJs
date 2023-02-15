import { uploadImageToCloudinary } from "../helpers/cloudinary.accions.js";
import { response } from "../helpers/response.js";
import { cdtModel } from "../models/cdtModel.js";
import { configModel } from "../models/configModel.js";
import { userModel } from "../models/userModel.js";

const cdtCtrl = {};

cdtCtrl.create = async (req, reply) => {
  try {
    const { userId, amount, cdtTerm } = req.body;
    const foundUserById = await userModel.findOne({ idNumber: userId });

    let cdtInterest;
    let interestGain;
    let withholdingTax;
    let totalGains;

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

    // Si el monto no está dentro de los montos permitidos
    if (amount < config.minAmountCDT || amount > config.maxAmountCDT) {
      return response(
        reply,
        400,
        false,
        "",
        `The amount for the cdt is a minimum of $${config.minAmountCDT} COP and a maximum of $${config.maxAmountCDT} COP.`
      );
    }

    // Si el tiempo no está dentro de los tiempos permitidos
    if (cdtTerm < config.minTermCDT || cdtTerm > config.maxTermCDT) {
      return response(
        reply,
        400,
        false,
        "",
        `The minimum term is ${config.minTermCDT} days and the maximum term is ${config.maxTermCDT} days.`
      );
    }

    if (cdtTerm >= 60 && cdtTerm < 90) {
      cdtInterest = config.intRateCDT60;
    } else if (cdtTerm >= 90 && cdtTerm < 120) {
      cdtInterest = config.intRateCDT90;
    } else if (cdtTerm >= 120 && cdtTerm < 180) {
      cdtInterest = config.intRateCDT120;
    } else if (cdtTerm >= 180 && cdtTerm < 240) {
      cdtInterest = config.intRateCDT180;
    } else if (cdtTerm >= 240 && cdtTerm < 360) {
      cdtInterest = config.intRateCDT240;
    } else if (cdtTerm >= 360 && cdtTerm < 540) {
      cdtInterest = config.intRateCDT360;
    } else {
      cdtInterest = config.intRateCDT540;
    }

    interestGain = amount * (Math.pow(1 + cdtInterest, cdtTerm / 365) - 1);
    withholdingTax = interestGain * config.withholdingTax;
    totalGains = amount + (interestGain - withholdingTax);

    // Constructor
    const newCdt = new cdtModel({
      ...req.body,
      userId: foundUserById._id,
      cdtInterest,
      interestGain: interestGain.toFixed(2),
      withholdingTax: withholdingTax.toFixed(2),
      totalGains: totalGains.toFixed(2),
    });

    // Proceso para recibir la cédula del titular y fiador
    let imgsData = {
      secure_url_holder: null,
      secure_url_beneficiary: null,
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
            secure_url_beneficiary: secure_url,
            public_id2: public_id,
          };
        }
        i = i++;
      }

      newCdt.setImg(imgsData);

      // Creación del nuevo registro
      await cdtModel.create(newCdt);

      response(
        reply,
        200,
        true,
        { ...newCdt.toJSON() },
        "The CDT has been created successfully."
      );
    }
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

cdtCtrl.getAllCdt = async (req, reply) => {
    try {
        const allCdt = await cdtModel.find()
    
        response(reply, 200, true, allCdt, "List of all CDT")
      } catch (error) {
        response(reply, 500, false, "", error.message);
      }
};

cdtCtrl.getAllNotPaid = async (req, reply) => {
    try {
        let allCdtNotPaid = await cdtModel
          .find()
          .populate("userId", "-password");
          allCdtNotPaid = allCdtNotPaid.filter((item) => item.isPaid === false);
        response(reply, 200, true, allCdtNotPaid, "List of all CDT not paid");
      } catch (error) {
        response(reply, 500, false, "", error.message);
      }
};

cdtCtrl.getAllPaid = async (req, reply) => {
    try {
        let allCdtPaid = await cdtModel
          .find()
          .populate("userId", "-password");
          allCdtPaid = allCdtPaid.filter((item) => item.isPaid === true);
        response(reply, 200, true, allCdtPaid, "List of all CDT not paid");
      } catch (error) {
        response(reply, 500, false, "", error.message);
      }
};

cdtCtrl.getCdtById = async (req, reply) => {
    try {
        const { id} = req.params;
        const foundCdt = await cdtModel.findById(id)
        const user = await userModel.findById(req.userId)
    
      if (!foundCdt) {
        return response(
          reply,
          404,
          false,
          "",
          "The CDT does not exist, please try again."
        );
      }
    
      response(
        reply,
        200,
        true,
        {
          ...foundCdt.toJSON(),
        },
        `Welcome ${user.name}`
      );
      } catch (error) {
        response(reply, 500, false, "", error.message);
      }
};

cdtCtrl.makeSimulation = async (req, reply) => {
    const {amount, cdtTerm} = req.body;

    let cdtInterest;
    let interestGain;
    let withholdingTax;
    let totalGains;

    // Búsquedad de la colección config
    const config = await configModel.findById({
      _id: "63e427fadeb7ef3c51340ea7",
    });

    // Si el monto no está dentro de los montos permitidos
    if (amount < config.minAmountCDT || amount > config.maxAmountCDT) {
      return response(
        reply,
        400,
        false,
        "",
        `The amount for the cdt is a minimum of $${config.minAmountCDT} COP and a maximum of $${config.maxAmountCDT} COP.`
      );
    }

    // Si el tiempo no está dentro de los tiempos permitidos
    if (cdtTerm < config.minTermCDT || cdtTerm > config.maxTermCDT) {
      return response(
        reply,
        400,
        false,
        "",
        `The minimum term is ${config.minTermCDT} days and the maximum term is ${config.maxTermCDT} days.`
      );
    }

    if (cdtTerm >= 60 && cdtTerm < 90) {
      cdtInterest = config.intRateCDT60;
    } else if (cdtTerm >= 90 && cdtTerm < 120) {
      cdtInterest = config.intRateCDT90;
    } else if (cdtTerm >= 120 && cdtTerm < 180) {
      cdtInterest = config.intRateCDT120;
    } else if (cdtTerm >= 180 && cdtTerm < 240) {
      cdtInterest = config.intRateCDT180;
    } else if (cdtTerm >= 240 && cdtTerm < 360) {
      cdtInterest = config.intRateCDT240;
    } else if (cdtTerm >= 360 && cdtTerm < 540) {
      cdtInterest = config.intRateCDT360;
    } else {
      cdtInterest = config.intRateCDT540;
    }

    interestGain = amount * (Math.pow(1 + cdtInterest, cdtTerm / 365) - 1);
    withholdingTax = interestGain * config.withholdingTax;
    totalGains = amount + (interestGain - withholdingTax);

    // Constructor
    const newSimulationCdt = new cdtModel({
      ...req.body,
      cdtInterest,
      interestGain: interestGain.toFixed(2),
      withholdingTax: withholdingTax.toFixed(2),
      totalGains: totalGains.toFixed(2),
    });

    response(
        reply,
        200,
        true,
        { ...newSimulationCdt.toJSON()},
        "¡The cdt would look like this ;)!"
    );
    
};

export default cdtCtrl;
