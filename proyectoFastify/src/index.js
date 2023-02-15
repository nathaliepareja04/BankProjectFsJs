// Importación de paquetes
import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";

// Importación de la base de datos 
import { connectDb } from "./database.js";

// Importación del initialSetup
import { createRoles } from "./libs/initialSetup.js";

// Importación de las rutas
import { configRoutes } from "./routes/configRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { savingsAccountRoutes } from "./routes/savingsAccountRoutes.js";
import { transferRoutes } from "./routes/transferRoutes.js";
import { creditRoutes } from "./routes/creditRoutes.js";
import { cdtRoutes } from "./routes/cdtRoutes.js";
import {statsRoute} from "./routes/statsRoute.js";


// Conexión a la base de datos
connectDb();

// Crear el servidor de Fastify
const fastify = Fastify({
  logger: true,
});

// InitialSetup
// createRoles();

// Regístrar y modificar los paquetes
fastify.register(cors, { origin: "*" });
fastify.register(formBody);
fastify.register(multer.contentParser);

// Regístrar las rutas
fastify.register(configRoutes, {prefix: "/config"})
fastify.register(userRoutes, {prefix: "/user"})
fastify.register(savingsAccountRoutes, {prefix: "/savings_account"})
fastify.register(transferRoutes, {prefix: "/transfer"})
fastify.register(creditRoutes, {prefix: "/credit"})
fastify.register(cdtRoutes, {prefix: "/cdt"})
fastify.register(statsRoute, {prefix: "/stats"})

// Función para inicializar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("El servidor está escuchando por el puerto 4000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

// Inicializar el servidor
start();
