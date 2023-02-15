import cdtCtrl from "../controllers/cdtController.js";
import { authClient, isAdministrator, isClient, isEmployee } from "../middleware/auth.js";
import { upload } from "../middleware/imgUpload.js";
import { cdtValidSchema } from "../validSchemas/cdtValid.js";

const middleware = (req, reply, done) => {
  authClient(req, reply, done);
};

export const cdtRoutes = (fastify, opts, done) => {
  fastify.post(
    "/",
    {
      schema: cdtValidSchema,preValidation: [middleware,isEmployee,upload.array("imgs", 2)]
    },
    cdtCtrl.create
  );
  fastify.get("/:id", {preValidation: [middleware, isClient]},cdtCtrl.getCdtById);
  fastify.get("/", {preValidation: [middleware, isAdministrator]},cdtCtrl.getAllCdt);
  fastify.get("/not_paid", {preValidation: [middleware, isAdministrator]},cdtCtrl.getAllNotPaid);
  fastify.get("/paid", {preValidation: [middleware, isAdministrator]},cdtCtrl.getAllPaid);
  fastify.post("/simulation",cdtCtrl.makeSimulation);
  done();
};
