import { getStats } from "../controllers/statsController.js";
import { authClient, isAdministrator } from "../middleware/auth.js";

const middleware = (req, reply, done) => {
    authClient(req, reply, done);
} 

export const statsRoute = (fastify, opts, done) => {
    fastify.get("/", {preValidation: [middleware, isAdministrator]},getStats);

    done();
};
