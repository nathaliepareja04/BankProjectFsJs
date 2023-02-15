import {rolesModel} from "../models/rolesModel.js";

export const createRoles = async () => {
  try {
    // Verificar si existen roles ya creados (para que no se ejecute)
    const count = await rolesModel.estimatedDocumentCount();

    if (count > 0) return;

    // Si no existen, se ejecuta la función.
    const values = await Promise.all([
      new rolesModel({ name: "Administrator" }).save(),
      new rolesModel({ name: "Employee" }).save(),
      new rolesModel({ name: "Client" }).save(),
      new rolesModel({ name: "User" }).save(),
    ]);

    console.log(values)

  } catch (error) {
    console.log(error.message);
  }
};
