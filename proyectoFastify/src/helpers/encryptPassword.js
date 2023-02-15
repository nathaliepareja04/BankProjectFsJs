import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptada = bcrypt.hashSync(password, salt);
    return passwordEncriptada;
  } catch (error) {
    console.log("An error has occurred in the function encryptPassword", error.message);
  }
};
