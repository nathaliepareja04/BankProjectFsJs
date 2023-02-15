import configCtrl from "../controllers/configController.js";
import { authClient, isAdministrator } from "../middleware/auth.js";
import { configValidSchema } from "../validSchemas/configValid.js";

const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const configRoutes = (fastify, opts, done) => {
    fastify.get("/", {preValidation: [middleware, isAdministrator]} ,configCtrl.get);
    fastify.post("/", {schema: configValidSchema ,preValidation: [middleware, isAdministrator]},configCtrl.create)
    done();
}