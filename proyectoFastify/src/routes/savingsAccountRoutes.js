import { authClient, isAdministrator, isClient, isEmployee } from "../middleware/auth.js";
import { upload } from "../middleware/imgUpload.js";
import savingsAccountCtrl from "../controllers/savingsAccountController.js";
import { newSavingsAccountValidSchema } from "../validSchemas/newSavingsAccountValid.js";

const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const savingsAccountRoutes = (fastify, opts, done) => {
    fastify.post("/", {schema: newSavingsAccountValidSchema, preValidation: [middleware, isEmployee, upload.single("img")] },savingsAccountCtrl.createAccount);
    fastify.get("/activated", {preValidation: [middleware, isAdministrator]},savingsAccountCtrl.getAllActivateAcc)
    fastify.get("/deleted", {preValidation: [middleware, isAdministrator]},savingsAccountCtrl.getAllDeletedAcc)
    fastify.post("/my_account", {preValidation: [middleware, isClient]},savingsAccountCtrl.getAccountById)
    fastify.post("/delete", {preValidation: [middleware, isAdministrator]},savingsAccountCtrl.deleteAcc)

    done();
}