import transferCtrl from "../controllers/transferController.js";
import { authClient, isAdministrator, isClient, isEmployee } from "../middleware/auth.js";

const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const transferRoutes = (fastify, opts, done) => {
    fastify.get("/", {preValidation: [middleware, isAdministrator]},transferCtrl.getAllTransfers)
    fastify.post("/bank_transfer", {preValidation: [middleware, isClient]},transferCtrl.makeBankTransfers)
    fastify.post("/payment", {preValidation: [middleware, isClient]},transferCtrl.paymentInstallments)
    fastify.post("/bank_deposit", {preValidation: [middleware, isEmployee]},transferCtrl.bankDeposit)

    done();
}