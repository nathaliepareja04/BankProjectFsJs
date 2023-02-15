import jwt from "jsonwebtoken";
import { response } from "../helpers/response.js";
import { rolesModel } from "../models/rolesModel.js";
import { userModel } from "../models/userModel.js";

const messageNoAuth = (reply) => {
  return response(
    reply,
    401,
    false,
    "",
    "No estás autorizado para realizar la petición."
  );
};

export const authClient = async (req, reply, done) => {
  let token = null;

  // Capturar el valor de la autorización y SI este existe
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Separación de elementos para convertir en array y buscar por index
    token = req.headers.authorization.split(" ")[1];

    // Verificar si el token es verdadero gracias a la desencriptación por la "palabra mágica"
    jwt.verify(token, "abc123", async (error, payload) => {
      if (error) {
        return messageNoAuth(reply);
      }

      // Verificar si existe o no el usuario para impedir la entrada sin autenticación
      const user = await userModel.findById({ _id: payload.user });
      if (!user) {
        return messageNoAuth(reply);
      }

      // Capturar el ID del usuario
      req.userId = payload.user;
      done();
    });
  }

  if (!token) {
    return messageNoAuth(reply);
  }
};

// Verificar si su rol es administrador
export const isAdministrator = async (req, reply, done) => {
  const user = await userModel.findById(req.userId);
  const userRole = await rolesModel.find({ _id: { $in: user.role } });

  for (let i = 0; i < userRole.length; i++) {
    if (userRole[i].name === "Administrator") {
      return;
    }
  }

  return response(
    reply,
    403,
    false,
    "",
    "You are not authorized to make this request (you need to be an administrator)"
  );
};

// Verificar si su rol es empleado
export const isEmployee = async (req, reply, done) => {
  const user = await userModel.findById(req.userId);
  const userRole = await rolesModel.find({ _id: { $in: user.role } });

  for (let i = 0; i < userRole.length; i++) {
    if (userRole[i].name === "Employee") {
      return;
    }
  }

  return response(
    reply,
    403,
    false,
    "",
    "You are not authorized to make this request (you need to be an employee)"
  );
};

// Verificar si su rol es cliente
export const isClient = async (req, reply, done) => {
  const user = await userModel.findById(req.userId);
  const userRole = await rolesModel.find({ _id: { $in: user.role } });

  for (let i = 0; i < userRole.length; i++) {
    if (userRole[i].name === "Client") {
      return;
    }
  }

  return response(
    reply,
    403,
    false,
    "",
    "You are not authorized to make this request (you need to be an client)"
  );
};

// Información importante
// Los middleware se ejecutan primero que los controladores.
