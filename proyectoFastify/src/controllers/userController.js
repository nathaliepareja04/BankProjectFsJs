import { response } from "../helpers/response.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { userModel } from "../models/userModel.js";
import { rolesModel } from "../models/rolesModel.js";

const userCtrl = {};

userCtrl.register = async (req, reply) => {
  try {
    const { name, lastname, age, idType, idNumber, email, role, password } =
      req.body;

    const user = await userModel.findOne({ idNumber });
    if (user) {
      return response(
        reply,
        409,
        false,
        "",
        "The ID number is already being used by someone else."
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new userModel({
      name,
      lastname,
      age,
      idType,
      idNumber,
      email,
      role,
      password: passwordEncrypt,
    });

    if (role) {
      const foundRoles = await rolesModel.find({ name: { $in: role } });
      newUser.role = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await rolesModel.findOne({ name: "User" });
      newUser.role = [defaultRole._id];
    }

    await newUser.save();

    const userRole = await userModel.findOne({ idNumber }).populate("role");

    const roleName = userRole.role.map(role => role.name)
    
    response(
      reply,
      201,
      true,
      { ...newUser.toJSON(), password: null, role: roleName.toString()},
      `The user has been created successfully.`
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

// Función para loguearse
userCtrl.login = async (req, reply) => {
  try {
    const { password, idNumber } = req.body;
    const user = await userModel.findOne({ idNumber }).populate("role");

    if (!user){
      return response(reply, 404, false, "", "The user does not exist, try again")
    }

    const roleUser = user.role.map(role => role.name)

    if (user && user.matchPassword(password)) {
      const token = generateToken({ user: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON(), password: null, role: roleUser.toString(), entryToken:token },
        `Welcome ${user.name}`
      );
    }

    response(
      reply,
      400,
      false,
      "",
      "The credentials are not correct, please try again."
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default userCtrl;
