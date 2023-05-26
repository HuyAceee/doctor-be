import db from "../models";
import bcrypt from "bcryptjs";
import { configGetNotPassword } from "../utils/constants";

export const loginServices = async (data) => {
  const { email, password } = data;
  try {
    if (!email || !password) {
      return {
        statusCode: 404,
        message: "Invalid inputs",
      };
    }
    let user = await db.User.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return {
        statusCode: 401,
        message: "Invalid password",
      };
    }
    delete user.password;
    console.log(user);
    return {
      ...user,
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const getUsersServices = async (id) => {
  try {
    let users;
    console.log(id);
    if (!id) {
      users = await db.User.findAll(configGetNotPassword);
      console.log(users);
    } else {
      users = await db.User.findOne({ where: { id }, ...configGetNotPassword });
    }
    return {
      statusCode: 200,
      message: "OK",
      users,
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};
