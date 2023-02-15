import creditCtrl from "../controllers/creditsController.js";
import { authClient, isAdministrator, isClient, isEmployee } from "../middleware/auth.js";
import { upload } from "../middleware/imgUpload.js";
import { creditValidSchema } from "../validSchemas/creditValid.js";


const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const creditRoutes = (fastify, opts, done) => {
    fastify.post("/", {schema: creditValidSchema, preValidation: [ middleware,isEmployee,upload.array("imgs", 2)] }, creditCtrl.createNewCredit);
    fastify.get("/", {preValidation: [middleware, isAdministrator]},creditCtrl.getAllCredits)
    fastify.get("/completed", {preValidation: [middleware, isAdministrator]},creditCtrl.getAllCompleted)
    fastify.get("/not_completed", {preValidation: [middleware, isAdministrator]},creditCtrl.getAllNotCompleted)
    fastify.post("/my_credit", {preValidation: [middleware, isClient]},creditCtrl.getCreditById)

    done();
}