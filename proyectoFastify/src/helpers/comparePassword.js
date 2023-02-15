import bcrypt from "bcrypt";

export const comparePassword = (inputPassword, savedPassword) => {
  try {
    return bcrypt.compareSync(inputPassword, savedPassword);
  } catch (error) {
    console.log(
      "An error has occurred in the function comparePassword",
      error.message
    );
  }
};
