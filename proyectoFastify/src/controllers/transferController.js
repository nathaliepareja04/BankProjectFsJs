import { response } from "../helpers/response.js";
import { configModel } from "../models/configModel.js";
import { creditModel } from "../models/creditModel.js";
import { savingsAccountModel } from "../models/savingsAccountModel.js";
import { transferModel } from "../models/transferModel.js";

const transferCtrl = {};

transferCtrl.getAllTransfers = async(req, reply) => {
    const allTransfer = await transferModel.find()

    response(reply, 200, true, allTransfer, "List.")
}

transferCtrl.makeBankTransfers = async(req, reply) => {
    const {savingsAccId, receivesAccountNumber, bank, amount} = req.body

    const foundAccNumber = await savingsAccountModel.findOne({accountNumber: savingsAccId})

    // Búsquedad de la colección config
    const config = await configModel.findById({
        _id: "63e427fadeb7ef3c51340ea7",
      });

    let intTransferBank;

    if(!foundAccNumber){
        return response(reply, 404, false, "", "The savings account does not exist, try again.")
    }

    if(foundAccNumber.balance < amount){
        return response(reply, 400, false, "", "Insufficient balance")
    }

    if(bank === "Same"){
        const foundReceivesAcc = await savingsAccountModel.findOne({accountNumber: receivesAccountNumber})

        if(!foundReceivesAcc){
            return response(reply, 404, false, "", "The savings account does not exist, try again.")
        }

        intTransferBank = config.intTransferSameBank

        await foundReceivesAcc.updateOne({
            balance: foundReceivesAcc.balance + amount
        });

    } 

    if(bank === "Other"){
        intTransferBank = config.intTransferOtherBank
    }

    await foundAccNumber.updateOne({
        balance: (foundAccNumber.balance - amount) - intTransferBank
    });

    const newBankTransfer = new transferModel({
        savingsAccId: foundAccNumber._id,
        transferType: "BankTransfer",
        receivesAccountNumber,
        bank,
        amount,
        intTransferBank
    });

    await transferModel.create(newBankTransfer);

    response(reply, 200, true, newBankTransfer, "Successful request.")
}

transferCtrl.paymentInstallments = async(req, reply) => {
    const { creditId, amount } = req.body

    const foundCredit = await creditModel.findOne({numberCredit: creditId})

    if(!foundCredit){
        return response(reply, 404, false, "", `The credit number ${creditId} does not exist, try again`)
    }

    if(amount != foundCredit.quotaValue){
        return response(reply, 400, false, "", `The amount to be paid is not equal to the value of the credit installment, try again`)
    }

    if(foundCredit.isCompleted === true){
        return response(reply, 400, false, "", `The credit payment is now complete.`)
    }

    const newPayment = new transferModel({
        creditId: foundCredit._id,
        transferType: "Payment",
        amount
    });

    await foundCredit.updateOne({
        missingPayments: foundCredit.missingPayments - 1
    });

    if(foundCredit.missingPayments === 0){
        await foundCredit.updateOne({
            isCompleted: true
        })
    };

    await transferModel.create(newPayment);

    response(reply, 200, true, newPayment, "The credit payment has been made correctly.")
}

transferCtrl.bankDeposit = async(req, reply) => {
    const {savingsAccId, amount} = req.body

    const foundAccNumber = await savingsAccountModel.findOne({accountNumber: savingsAccId})

    if(!foundAccNumber){
        return response(reply, 404, false, "", "The savings account does not exist, try again.")
    }

    const newBankDeposit = new transferModel({
        savingsAccId: foundAccNumber._id,
        transferType: "BankDeposit",
        amount
    });

    await foundAccNumber.updateOne({
        balance: foundAccNumber.balance + amount
    });

    await transferModel.create(newBankDeposit);

    response(reply, 200, true, newBankDeposit, "Successful request.")

}

export default transferCtrl;