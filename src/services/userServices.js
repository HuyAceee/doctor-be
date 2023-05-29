import db from "../models";
import bcrypt from "bcryptjs";
import { configGetNotPassword } from "../utils/constants";
import { hashPassword } from '../utils/functions';

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
    if (!id) {
      users = await db.User.findAll(configGetNotPassword);
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

export const createUserServices = async (body) => {
  try {
    const user = await db.User.findOne({
      where: { email: body.email }
    })
    if (user) {
      return {
        statusCode: 400,
        message: "User already exists!",
      }
    }
    const hashPasswordUser = await hashPassword(body.password);
    await db.User.create({
      ...body,
      password: hashPasswordUser,
      gender: !!Number(body.gender),
    });
    return {
      statusCode: 200,
      message: "OK",
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const editUserServices = async (body) => {
  try {

    const user = await db.User.findOne({
      where: { id: body.id },
      raw: false,
    })
    console.log(user)
    if (!user) {
      return {
        statusCode: 404,
        message: "User does not exist!",
      }
    }
    Object.keys(body).filter((i) => i !== "id").forEach((i) => {
      if (i === "gender") {
        user.gender = !!Number(body.gender);
      } else {
        user[i] = body[i]
      }
    })
    await user.save();
    return {
      statusCode: 200,
      message: "OK",
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const deleteUserServices = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      raw: false
    })
    if (!user) {
      return {
        statusCode: 404,
        message: "User not found!",
      };
    }
    await user.destroy();
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
}
