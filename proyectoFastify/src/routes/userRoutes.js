import userCtrl from "../controllers/userController.js";
import { userValidSchema } from "../validSchemas/userValid.js";
import { authClient } from "../middleware/auth.js";
import { upload } from "../middleware/imgUpload.js";

const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const userRoutes = (fastify, opts, done) => {
    fastify.post("/register", {schema: userValidSchema},userCtrl.register);
    fastify.post("/login", userCtrl.login);

    done();
}